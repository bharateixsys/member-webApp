
// src/views/table/BothList.js
import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  CRow,
  CCol,
  CCard
} from "@coreui/react";
import { Input } from "@progress/kendo-react-inputs";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import { ListView } from "@progress/kendo-react-listview";
import { Pager } from "@progress/kendo-react-data-tools";
import { Button } from "@progress/kendo-react-buttons";
import { orderBy } from "@progress/kendo-data-query";

import Navbar from "../../components/Navbar";
import ToastService from "@services/ToastService";

export default function BothList({ memberId: initialMemberId = "242749470-01", claimType: initialClaimType = "M" }) {
  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [processingIds, setProcessingIds] = useState([]);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(initialClaimType === "P" ? "Pharmacy" : "Medical");
  const [sort, setSort] = useState({ field: "claimnumber", dir: "asc" });

  const [skip, setSkip] = useState(0);
  const take = 5;

  const sortFields = [
    { text: "Claim Number", value: "claimnumber" },
    { text: "Service Date", value: "servicedate" }
  ];
  const sortDirections = [
    { text: "Ascending", value: "asc" },
    { text: "Descending", value: "desc" }
  ];
  const categories = ["Medical", "Pharmacy"];

  /**
   * Fetch claims from API + resolve file URLs
   */
  const fetchClaims = useCallback(async () => {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");
    const memberId = localStorage.getItem("memberId");

    if (!token || !username || !memberId) {
      setError("Missing login information. Redirecting to login...");
      setLoading(false);
      setTimeout(() => (window.location.href = "/login"), 1500);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const claimType = category === "Pharmacy" ? "P" : "M";
      const res = await fetch(`/api/member/claim?memberId=${memberId}&claimType=${claimType}`, {
        headers: { Authorization: `Bearer ${ token } ` }
      });

        if (res.status === 401 || res.status === 403) {
            window.location.href = "/login";
            return;
        }
      if (!res.ok) throw new Error(`Claim fetch failed(${ res.status })`);

      const json = await res.json();
      if (!json?.Data?.Claims) {
        setClaims([]);
        return;
      }

      const claimsWithFiles = await Promise.all(

          json.Data.Claims.map(async (c) => {
            
          let fileurls = "";
          try {
              const resp_eobpdf = await fetch(
                  `https://localhost:7012/api/AzureAPI/eob-pdf?memberId=${encodeURIComponent(c.Member_Id)}&ClaimNumber=${encodeURIComponent(c.Claim_Number)}`
                );
              if (resp_eobpdf.status === 403) {
                  console.error("403 Unauthorize while fetching EOB PDF");
                  fileurls = "";
                  return;
              }
              if (resp_eobpdf.ok && resp_eobpdf.headers.get("content-type")?.includes("application/json")) {
                  const data = await resp_eobpdf.json();
                  fileurls = data?.url || "";
                  console.log("eob-pdf resp", data);
              } else {
                  fileurls = "";
              }
          } catch (err) {
                console.warn("Error fetching EOB PDF:", err.message);
          }

             
              console.log("c", c);

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
                fileurl: fileurls
            };
        })
      );

        console.log("claimsWithFiles", claimsWithFiles);
    setClaims(claimsWithFiles);
    } catch (err) {
    console.error("Claim fetch error:", err);
    setError(err.message);
    setClaims([]);
} finally {
    setLoading(false);
}
  }, [category]);

useEffect(() => {
    fetchClaims();
}, [fetchClaims]);


const handleEOBRequest = async (claim) => {
    const token = localStorage.getItem("token");
    const memberId = localStorage.getItem("memberId");
    const userId = localStorage.getItem("userId");

    if (!token || !memberId || !userId) {
        ToastService.error("Missing authentication details. Please log in again.");
        return;
    }

    setProcessingIds((prev) => [...prev, claim.claimnumber]);

    try {
        const response = await fetch("https://localhost:7012/api/AzureAPI/request-eob", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                ClaimNumber: claim.claimnumber,
                MemberId: memberId,
                UserId: userId,
                Token: token
            })
        });

        const result = await response.json().catch(() => null);

        if (!response.ok) {
            ToastService.error(result?.error || `EOB request failed (${response.status})`);
        } else {
            ToastService.success(result?.message || "EOB request submitted successfully.");
        }
    } catch (err) {
        console.error("EOB request error:", err);
        ToastService.error("Unexpected error while requesting EOB.");
    } finally {
        setProcessingIds((prev) => prev.filter((id) => id !== claim.claimnumber));
    }
};

    const handleDownload = async (claim) => {
        
        try {
            console.log(claim);
        const response = await fetch(
            `https://localhost:7012/api/AzureAPI/eob-download?memberId=${encodeURIComponent(claim.Member_Id)}&ClaimNumber=${encodeURIComponent(claim.Claim_Number)}`
        );
        if (!response.ok) {
            const errorData = await response.json().catch(() => null);
            const errorMsg = errorData?.error || "Failed to download EOB.";
            ToastService.error(errorMsg);
            return;
        }
        const blob = await response.blob();
        if (!blob || blob.size === 0) throw new Error("Downloaded file is empty.");
        console.log(blob);
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${claim.claimnumber}.pdf`;
        a.click();
        window.URL.revokeObjectURL(url);

        ToastService.success("EOB downloaded successfully.");
    } catch (err) {
        console.error("Download error:", err);
        ToastService.error(err.message);
    }
};


const filtered = useMemo(
    () => claims.filter((c) => !search || c.claimnumber?.toLowerCase().includes(search.toLowerCase())),
    [claims, search]
);
const sorted = useMemo(() => orderBy(filtered, [sort]), [filtered, sort]);
const pagedData = useMemo(() => sorted.slice(skip, skip + take), [sorted, skip]);

const itemRender = (props) => {
    const d = props.dataItem;
    const isProcessing = processingIds.includes(d.claimnumber);

    const statusColors = {
        Approved: "bg-success text-white",
        Denied: "bg-danger text-white",
        Pending: "bg-secondary text-white",
        Processed: "bg-primary text-white",
        "Denied Partial": "bg-warning text-dark"
    };

    return (
        <div className="p-3 mb-3 border rounded bg-white shadow-sm">
            <div className="row align-items-center">
                <div className="col-md-4">
                    <h6 className="fw-bold mb-1">Claim #: {d.claimnumber}</h6>
                    <span className={`px-3 py-1 rounded-pill small fw-semibold ${statusColors[d.statusdesc] || "bg-dark text-white"}`}>
                        {d.statusdesc}
                    </span>
                </div>
                <div className="col-md-8 text-end">
                    {d.category === "M" && (
                        d.fileurl ? (
                             <Button look="outline" themeColor="primary" onClick={() => handleDownload(d)}  icon="eye" className="k-button k-primary">
                                Download EOP
                            </Button>
                        ) : (
                            <Button
                                look="outline"
                                    themeColor="primary"
                                    className="k-button k-primary"
                                onClick={() => handleEOBRequest(d)}
                                disabled={isProcessing}
                            >
                                {isProcessing ? "Processing..." : "Request EOB"}
                            </Button>
                        )
                    )}
                </div>
            </div>
            <hr className="my-2" />
            <div className="row text-sm">
                <div className="col-md-4 mb-2">
                    <div><strong>Service Date:</strong> {d.servicedate || "-"}</div>
                    <div className="mt-2"><strong>Plan Paid:</strong> {d.planpaid || "-"}</div>
                </div>
                <div className="col-md-4 mb-2">
                    <div><strong>Bill Amount:</strong> {d.billamount || "-"}</div>
                    <div className="mt-2"><strong>Diagnosis:</strong> {d.diagnosis || "-"}</div>
                </div>
                <div className="col-md-4 mb-2">
                    <div><strong>Your Resp:</strong> {d.yourresp || "-"}</div>
                    <div className="mt-2"><strong>Provider:</strong> {d.providername || "-"}</div>
                </div>
            </div>
        </div>
    );
};

return (
    <main className="font-sans bg-slate-50 min-h-screen">
        <Navbar />
        <div className="mx-auto max-w-7xl px-6 py-8 space-y-8">
            <CRow className="g-4">
                {/* Sidebar filters */}
                <CCol md={3}>
                    <CCard className="p-3 shadow-sm h-100">
                        <h6 className="fw-bold mb-3 border-bottom pb-2">Filters</h6>
                        <div className="mb-4">
                            <label className="form-label fw-semibold">Search</label>
                            <Input value={search} onChange={(e) => setSearch(e.value)} placeholder="Search claims..." />
                        </div>
                        <div className="mb-4">
                            <label className="form-label fw-semibold">Category</label>
                            <DropDownList data={categories} value={category} onChange={(e) => setCategory(e.value)} />
                        </div>
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
                    </CCard>
                </CCol>

                {/* Results */}
                <CCol md={9}>
                    <CCard className="p-3 shadow-sm">
                        <CRow className="align-items-center mb-3">
                            <CCol>
                                <h6 className="fw-bold">
                                    Results <span className="badge bg-light text-dark">{sorted.length} items</span>
                                </h6>
                            </CCol>
                            <CCol className="d-flex justify-content-end">
                                <DropDownList
                                    data={sortFields}
                                    textField="text"
                                    dataItemKey="value"
                                    value={sortFields.find(f => f.value === sort.field)}
                                    onChange={(e) => setSort({ field: e.value.value, dir: sort.dir })}
                                    style={{ width: 180, marginRight: 8 }}
                                />
                                <DropDownList
                                    data={sortDirections}
                                    textField="text"
                                    dataItemKey="value"
                                    value={sortDirections.find(d => d.value === sort.dir)}
                                    onChange={(e) => setSort({ ...sort, dir: e.value.value })}
                                    style={{ width: 150 }}
                                />
                            </CCol>
                        </CRow>

                        <div style={{ maxHeight: "400px", overflowY: "auto" }}>
                            {loading ? <p>Loading claims...</p> : <ListView data={pagedData} item={itemRender} />}
                            {error && <p className="text-danger">{error}</p>}
                        </div>

                        <Pager
                            skip={skip}
                            take={take}
                            total={sorted.length}
                            buttonCount={5}
                            type="numeric"
                            info
                            previousNext
                            onPageChange={(e) => setSkip(e.skip)}
                        />
                    </CCard>
                </CCol>
            </CRow>
        </div>
    </main>
);
}