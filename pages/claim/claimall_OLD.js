// src/views/table/BothList.js
import React, { useState, useEffect } from "react";
import { Form, Field, FormElement } from "@progress/kendo-react-form";
import { CRow, CCol, CCard, CCardBody } from "@coreui/react";
import { Input } from "@progress/kendo-react-inputs";
import { orderBy } from "@progress/kendo-data-query";
import { Button } from "@progress/kendo-react-buttons";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import { ListView } from "@progress/kendo-react-listview";
import { Pager } from "@progress/kendo-react-data-tools";
import Navbar from "../../components/Navbar";

export default function BothList({ memberId = "242749470-01", claimType = "M" }) {
    const [claims, setClaims] = useState([]); // 🔹 API data
    const [loading, setLoading] = useState(true);

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
            try {
                setLoading(true);
                setClaims([]);
                claimType = category == "Pharmacy" ? "P" : "M";
                const token = localStorage.getItem("authToken");
                console.log("token claim", token);
                const res = await fetch(
                    `/api/member/claim?memberId=${memberId}&claimType=${claimType}`,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`, 
                        },
                    }
                );
                const json = await res.json();

                if (json?.Data?.Claims) {
                    setClaims(
                        json.Data.Claims.map((c) => ({
                            claimnumber: c.Claim_Number,
                            servicedate: c.Service_Date,
                            yourresp: c.Your_Rep,
                            statusdesc: c.Status_Description,
                            providername: c.Provider_Name,
                            category: claimType // add category if needed
                        }))
                    );
                } else {
                    setClaims([]); // empty fallback
                }
            } catch (err) {
                console.error("Error fetching claims:", err);
                setClaims([]);
            } finally {
                setLoading(false);
            }
        };
        fetchClaims();
    }, [memberId, category]);

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
        return (
           

             <div className="d-flex justify-content-between align-items-center p-3 mb-3 rounded shadow-sm border bg-white">
                <div>
                    <h6 className="fw-bold mb-1">{d.servicedate}</h6>
                    <div className="text-muted small">
                        Claim #: <span className="fw-semibold">{d.claimnumber}</span> <br/>
                        Provider Name:<span className="fw-semibold">{d.providername}</span>
                    </div>
                </div>
                <div className="text-end">
                Your Resp:<span className="fw-semibold">{d.yourresp}</span><br/>
                Status:<span className="fw-semibold">{d.statusdesc}</span> <br/>
                {d.category === "M" && (
                        <Button look="outline" themeColor="primary" icon="eye">
                            Download EOB
                        </Button>
                    )}
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
