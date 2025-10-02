// src/views/table/BothList.js
import React, { useState, useEffect } from "react";
//import { apiFetch } from "../../utils/api.js";
import { Form, Field, FormElement } from "@progress/kendo-react-form";
import { CRow, CCol, CCard, CCardBody } from "@coreui/react";
import { Input } from "@progress/kendo-react-inputs";
import { orderBy } from "@progress/kendo-data-query";
import { Button } from "@progress/kendo-react-buttons";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import { ListView } from "@progress/kendo-react-listview";
import { Pager } from "@progress/kendo-react-data-tools";
import Navbar from "../../components/Navbar";
//import ToastService from "../services/ToastService";

export default function BothList({ memberId = "242749470-01", claimType = "M" }) {
    const [claims, setClaims] = useState([]); // 🔹 API data
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [processingIds, setProcessingIds] = useState([]);

    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("Medical");
    const [sort, setSort] = useState({ field: "claimnumber", dir: "asc" });

    // 🔹 Pagination state
    const [skip, setSkip] = useState(0);
    const take = 5; // items per page

    const sortFields = [
        { text: "Claim Number", value: "claimnumber" },
        { text: "Service Date", value: "servicedate" },
    ];
    const sortDirections = [
        { text: "Ascending", value: "asc" },
        { text: "Descending", value: "desc" },
    ];
    const categories = ["Medical", "Pharmacy"];

    // 🔹 Fetch API data
    useEffect(() => {
        const fetchClaims = async () => {
            const token = localStorage.getItem("token");
            const username = localStorage.getItem("username");
            const memberId = localStorage.getItem("memberId");

            if (!token || !username || !memberId) {
                setError("Missing login information. Redirecting to login...");
                setLoading(false);
                setTimeout(() => router.push("/login"), 1500);
                return;
            }
            try {
                setLoading(true);
                setClaims([]);
                claimType = category == "Pharmacy" ? "P" : "M";
                //const token = localStorage.getItem("token");
                console.log("token claim", token);
                const res = await fetch(`/api/member/claim?memberId=${memberId}&claimType=${claimType}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const json = await res.json();
                console.log("res claim", json);
                //const json = await res;
                if (json?.Data?.Claims) {
                    //setClaims(
                    //    json.Data.Claims.map((c) => ({
                    //        diagnosis: c.Diag_Description,
                    //        planpaid:c.Paid_Amount,
                    //        billamount:c.Billed_Amount,
                    //        memberid: c.Member_Id,
                    //        claimnumber: c.Claim_Number,
                    //        servicedate: c.Service_Date,
                    //        yourresp: c.Your_Rep,
                    //        statusdesc: c.Status_Description,
                    //        providername: c.Provider_Name,
                    //        category: claimType // add category if needed
                    //    }))
                    //);

                    const claimsWithFiles = await Promise.all(
                        json.Data.Claims.map(async (c) => {
                            let fileUrl = "";
                            try {
                                const resp = await fetch(
                                    `https://localhost:7012/api/AzureAPI/eob-pdf?memberId=${encodeURIComponent(c.Member_Id)}&ClaimNumber=${encodeURIComponent(c.Claim_Number)}`
                                    // { headers: { Authorization: `Bearer ${token}` } }
                                );

                                if (resp.ok) {
                                    const contentType = resp.headers.get("content-type");
                                    if (contentType?.includes("application/json")) {
                                        const data = await resp.json();
                                        fileUrl = data?.Value?.Url || "";
                                    } else {
                                        console.warn("Invalid API response:", await resp.text());
                                    }
                                }
                            } catch (err) {
                                console.warn("Error fetching EOB PDF for claim:", c.Claim_Number, err.message);
                            }

                            return {
                                diagnosis: c.Diag_Description,
                                planpaid: c.Paid_Amount,
                                billamount: c.Billed_Amount,
                                memberid: c.Member_Id,
                                claimnumber: c.Claim_Number,
                                servicedate: c.Service_Date,
                                yourresp: c.Your_Rep,
                                statusdesc: c.Status_Description,
                                providername: c.Provider_Name,
                                category: claimType,
                                fileurl
                            };
                        })
                    );

                    setClaims(claimsWithFiles);
                } else {
                    setClaims([]); 
                }
            } catch (err) {
                setClaims([]);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchClaims();
    }, [memberId, category]);

    const handleEOBRequest = async (claimNo) => {
        //const claimNo = claim.claimnumber;
        //setProcessingIds((p) => [...p, claimNo]);
        try {
            const token = localStorage.getItem("token");
            const memberId = localStorage.getItem("memberId");
            const userId = localStorage.getItem("userId");
            console.log(claimNo);
            console.log(claimNo);
            console.log(memberId);
            console.log(userId);
            console.log(token);
            if (!token || !memberId || !userId) {
                ToastService.error("Missing authentication details. Please log in again.");
                return;
            }

            const response = await fetch(`https://localhost:7012/api/AzureAPI/request-eob`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    //Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    ClaimNumber: claimNo,
                    MemberId: memberId,
                    UserId: userId,
                    Token: token
                }),
            });

            //const result = await response.json();
            
            //if (!response.ok) {
            //    const errorMsg = result?.error || "Failed to request EOB.";
            //    ToastService.error(errorMsg);
            //    return;
            //}

            const result = await res.json().catch(() => null);
            if (!res.ok) {
                ToastService.error(result?.error || `EOB request failed (${res.status})`);
                return;
            }

            ToastService.success(result.message || "EOB request submitted successfully.");
        } catch (err) {
            console.error("Request error:", err);
            ToastService.error("An unexpected error occurred while requesting EOB.");
        }
    };

    const handleDownload = async () => {
        try {
            const response = await fetch(
                `https://localhost:7012/api/AzureAPI/eob-download?memberId=${encodeURIComponent(member.Member_ID)}`
            );
            if (!response.ok) {
                const errorData = await response.json().catch(() => null);
                const errorMsg = errorData?.error || "Failed to download ID card PDF.";
                ToastService.error(errorMsg);
                return;
            }
            const blob = await response.blob();

            if (!blob || blob.size === 0) {
                ToastService.error("Error in idcard file.");
                return;
            }
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `${member.Member_ID}.pdf`;
            document.body.appendChild(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(url);
            ToastService.success("ID Card downloaded successfully!");

        } catch (err) {
            console.error("Download error:", err);
            const message = err?.message || "Failed to download ID card PDF.";
            ToastService.error(message);
        }
    };

    //filter
    const filtered = claims.filter(
        (d) =>
        (search === "" ||
            d.claimnumber?.toLowerCase().includes(search.toLowerCase()))
    );

    // 🔹 Sorting
    const sorted = orderBy(filtered, [sort]);

    // 🔹 Paging
    const pagedData = sorted.slice(skip, skip + take);

    // 🔹 ListView Template
    const itemRender = (props) => {
        const d = props.dataItem;
        const isProcessing = processingIds.includes(d.claimnumber);

        // Status color mapping
        const statusColors = {
            Approved: "bg-success text-white",   // green
            Denied: "bg-danger text-white",     // red
            Pending: "bg-secondary text-white", // gray
            Processed: "bg-primary text-white", // blue 
            "Denied Partial": "bg-warning text-white",     // yellow
        };

        return (
            <div className="p-3 mb-3 border rounded bg-white shadow-sm">
                {/* Header Row */}
                <div className="row align-items-center">
                    {/* Left: Member Info */}
                    <div className="col-md-4">
                        <h6 className="fw-bold mb-1">
                            Claim #: <span className="fw-semibold">{d.claimnumber}</span>
                        </h6>
                        <span
                            className={`px-3 py-1 rounded-pill small fw-semibold ${statusColors[d.statusdesc] || "bg-dark text-white"}`}
                        >
                            {d.statusdesc}
                        </span>
                    </div>

                    {/* Right: Status Badge */}
                    <div className="col-md-8 text-end">
                       
                        {d.category === "M" && (
                            d.fileurl ? (
                                <Button look="outline" themeColor="primary" onClick={() => handleDownload(d)} icon="eye" className="k-button k-primary">
                                    Download EOP
                                </Button>
                            ) : (
                                <Button
                                    look="outline"
                                    //onClick={() => handleEOBRequest(d.claimnumber)}
                                    onClick={() => handleEOBRequest(d)}
                                    themeColor="primary" icon="eye" className="k-button k-primary"
                                >
                                    {isProcessing ? "Processing..." : "Request EOB"}
                                </Button>
                        ))}
                    </div>
                </div>

                {/* 🔹 Divider */}
                <hr className="my-2" />

                {/* Details */}
                <div className="row text-sm">
                    <div className="col-md-4 mb-2">
                        <div>
                            <strong>Service Date:</strong> {d.servicedate || "-"}
                        </div>
                        <div className="mt-2">
                            <strong>Plan Paid:</strong> {d.planpaid || "-"}
                        </div>
                    </div>
                    <div className="col-md-4 mb-2">
                        <div>
                            <strong>Bill Amount:</strong> {d.billamount || "-"}
                        </div>
                        <div className="mt-2">
                            <strong>Diagnosis:</strong> {d.diagnosis || "-"}
                        </div>
                    </div>
                    <div className="col-md-4 mb-2">
                        <div>
                            <strong>Your Resp:</strong> {d.yourresp || "-"}
                        </div>
                        <div className="mt-2">
                            <strong>Provider:</strong> {d.providername || "-"}
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (

        <main className="font-sans bg-slate-50 min-h-screen">
            <Navbar />

            <div className="mx-auto max-w-7xl px-6 py-8 space-y-8">
                <div className="p-3">

                   {/* 🔹 Main Row */}
                    <CRow className="g-4">
                        {/* Left Sidebar - Filters */}
                        <CCol md={3}>
                            <CCard className="p-3 shadow-sm h-100">
                                <h6 className="fw-bold mb-3 border-bottom pb-2">Filters</h6>

                                {/* Search */}
                                <div className="mb-4">
                                    <label className="form-label fw-semibold">Search</label>
                                    <Input
                                        value={search}
                                        onChange={(e) => setSearch(e.value)}
                                        placeholder="Search claims..."
                                        style={{ width: "100%" }}
                                    />
                                </div>

                                {/* Category */}
                                <div className="mb-4">
                                    <label className="form-label fw-semibold">Category</label>
                                    <DropDownList
                                        data={categories}
                                        value={category}
                                        onChange={(e) => setCategory(e.value)}
                                        style={{ width: "100%" }}
                                    />
                                </div>

                                {/* Reset Button */}
                                <div className="d-grid">
                                    <Button
                                        look="solid"
                                        themeColor="error"
                                        className="bg-danger text-white border-0"
                                        onClick={() => {
                                            setSearch("");
                                            setCategory("Medical");
                                            setSort({ field: "claimnumber", dir: "asc" });
                                            setSkip(0);
                                        }}
                                    >
                                        Reset
                                    </Button>
                                </div>
                            </CCard>
                        </CCol>

                        {/* Right Side - Results */}
                        <CCol md={9}>
                            <CCard className="p-3 shadow-sm">
                                <CRow className="align-items-center mb-3">
                                    <CCol>
                                        <h6 className="fw-bold">
                                            Results{" "}
                                            <span className="badge bg-light text-dark">
                                                {sorted.length} items
                                            </span>
                                        </h6>
                                    </CCol>
                                    <CCol className="d-flex justify-content-end align-items-center">
                                        <span className="me-2">Sort:</span>
                                        <DropDownList
                                            data={sortFields}
                                            textField="text"
                                            dataItemKey="value"
                                            value={sortFields.find(f => f.value === sort.field)}
                                            onChange={(e) => setSort({ field: e.value.value, dir: sort.dir })}
                                            style={{ width: 180 }}
                                        />

                                        <DropDownList
                                            data={sortDirections}
                                            textField="text"
                                            dataItemKey="value"
                                            value={sortDirections.find(d => d.value === sort.dir)}
                                            onChange={(e) => setSort({ ...sort, dir: e.value.value })}
                                            style={{ width: 150, marginLeft: 8 }}
                                        />
                                    </CCol>
                                </CRow>

                                {/* ListView */}
                                <div style={{ maxHeight: "400px", overflowY: "auto" }}>
                                    {loading ? (
                                        <p>Loading claims...</p>
                                    ) : (
                                        <ListView data={pagedData} item={itemRender} />
                                    )}
                                </div>

                                {/* Pager */}
                                <Pager
                                    skip={skip}
                                    take={take}
                                    total={sorted.length}
                                    buttonCount={5}
                                    type="numeric"
                                    info={true}
                                    previousNext={true}
                                    onPageChange={(e) => setSkip(e.skip)}
                                />
                            </CCard>
                        </CCol>
                    </CRow>
                </div>
            </div>
        </main>
    );
}
