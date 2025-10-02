import React, { useState, useEffect } from "react";
import { CRow, CCol, CCard } from "@coreui/react";
import { Button } from "@progress/kendo-react-buttons";
import { Input } from "@progress/kendo-react-inputs";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import { ListView } from "@progress/kendo-react-listview";
import { orderBy } from "@progress/kendo-data-query";
import { Pager } from "@progress/kendo-react-data-tools";
import { Dialog, DialogActionsBar } from "@progress/kendo-react-dialogs";
import Navbar from "../../components/Navbar";

export default function PcpList({
    memberId = "242749470-01",
    username = "tapan.bhatt@eixsys.com",
}) {
    const [search, setSearch] = useState("");
    const [pcp, setPcp] = useState([]); // 🔹 API data
    const [provider, setProvider] = useState([]); // 🔹 API data
    const [loading, setLoading] = useState(true);
    const [sort, setSort] = useState({ field: "fullname", dir: "asc" });

    // 🔹 Pagination
    const [skip, setSkip] = useState(0);
    const take = 5;

    // 🔹 Dialog state
    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedPcp, setSelectedPcp] = useState(null); // for dropdown
    const [currentMember, setCurrentMember] = useState(null); // clicked PCP

    const sortFields = [
        { text: "Full Name", value: "fullname" },
        { text: "Provider Name", value: "providername" },
    ];
    const sortDirections = [
        { text: "Ascending", value: "asc" },
        { text: "Descending", value: "desc" },
    ];

    useEffect(() => {
        const fetchPcp = async () => {
            try {
                setLoading(true);
                setPcp([]);
                const token = localStorage.getItem("authToken");

                const res1 = await fetch(
                    `/api/member/details?memberId=${memberId}&username=${username}`,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                const json1 = await res1.json();

                if (json1?.Data?.Members) {
                    setPcp(
                        json1.Data.Members.map((c) => ({
                            providerid: c.PCP_ID,
                            fullname: `${c.First_Name} ${c.Last_Name} (${c.Provider_Type})`,
                            providername: `${c.PCP_First_Name} ${c.PCP_Last_Name}`,
                            provideraddress: `${c.PCP_Address} ${c.PCP_Address2}`,
                            providercity: `${c.PCP_City} ${c.PCP_State} ${c.PCP_Zip}`,
                            providerphone: c.Phone_Number,
                        }))
                    );
                } else {
                    setPcp([]);
                }
            } catch (err) {
                console.error("Error fetching PCP:", err);
                setPcp([]);
            } finally {
                setLoading(false);
            }
        };
        fetchPcp();
    }, [memberId, username]);

    // Filtering + Sorting + Paging
    const filtered = pcp.filter(
        (d) =>
            search === "" ||
            d.fullname.toLowerCase().includes(search.toLowerCase())
    );
    const sorted = orderBy(filtered, [sort]);
    const pagedData = sorted.slice(skip, skip + take);

    // ✅ Open dialog
    // state for provider dropdown list
    const [providers, setProviders] = useState([]);

    const handleChangeClick = async (member) => {
        try {
            setLoading(true);
            const token = localStorage.getItem("authToken");

            const res2 = await fetch("/api/providers/search", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({}), // send empty object
            });

            const json2 = await res2.json();
            console.log("Providers response:", json2);

            if (json2?.Data) {
                setProvider(
                    json2.Data.map((p) => ({
                        providerid: p.Provider_ID,
                        providername: `${p.FirstName} ${p.LastName}`,
                        provideraddress: `${p.Address} `,
                        providercity: `${p.City} ${p.State} ${p.ZipCode}`,
                        providerphone: p.PhoneNumber,
                    }))
                );
            } else {
                setProvider([]);
                console.log("Providers response last :", provider);
            }
            setDialogOpen(true);
        } catch (err) {
            setProvider([]);
            console.error("Error fetching providers:", err);
        } finally {
            setLoading(false);
        }
    };


    // ✅ Save change
    const handleSave = async () => {
        try {
            const token = localStorage.getItem("authToken");
            const res = await fetch(`/api/pcp/change`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    memberId,
                    providerId: selectedPcp?.providerid,
                }),
            });

            if (!res.ok) throw new Error("Failed to change PCP");

            alert("PCP changed successfully!");
            setDialogOpen(false);
        } catch (err) {
            console.error(err);
            alert("Error saving PCP change.");
        }
    };

    // ✅ ListView Template
    const itemRender = (props) => {
        const d = props.dataItem;
        return (
            <div className="d-flex justify-content-between align-items-center p-3 mb-3 rounded shadow-sm border bg-white">
                <div>
                    <h6 className="fw-bold mb-1">{d.fullname}</h6>
                    <div className="text-muted small">
                        Provider: <span className="fw-semibold">{d.providername}</span>
                        <br />
                        Phone Number:
                        <span className="fw-semibold">{d.providerphone}</span>
                    </div>
                </div>
                <div className="text-end">
                    Address:
                    <span className="fw-semibold">{d.provideraddress}</span>
                    <br />
                    <span className="fw-semibold">{d.providercity}</span> <br />
                    <Button
                        look="outline"
                        themeColor="primary"
                        icon="eye"
                        onClick={() => handleChangeClick(d)}
                    >
                        Change PCP
                    </Button>
                </div>
            </div>
        );
    };

    return (
        <main className="font-sans bg-slate-50 min-h-screen">
            <Navbar />
            <div className="mx-auto max-w-7xl px-6 py-8 space-y-8">
                <div className="p-3">
                    <CRow>
                        <CCol md={12}>
                            <CCard className="p-4">
                                {/* 🔹 Header Row */}
                                <CRow className="align-items-center mb-4 g-3">
                                    <CCol md="auto">
                                        <h5 className="fw-bold mb-0">
                                            Results{" "}
                                            <span className="badge bg-light text-dark ms-1">
                                                {sorted.length}
                                            </span>
                                        </h5>
                                    </CCol>

                                    {/* Search */}
                                    <CCol md={3}>
                                        <Input
                                            value={search}
                                            onChange={(e) => setSearch(e.value)}
                                            placeholder="Search by name..."
                                        />
                                    </CCol>

                                    {/* Sort Controls */}
                                    <CCol className="text-end d-flex justify-content-end align-items-center">
                                        <span className="me-2 fw-semibold">Sort by:</span>
                                        <DropDownList
                                            data={sortFields}
                                            textField="text"
                                            dataItemKey="value"
                                            value={sortFields.find((f) => f.value === sort.field)}
                                            onChange={(e) =>
                                                setSort({ field: e.value.value, dir: sort.dir })
                                            }
                                            style={{ width: 180 }}
                                        />

                                        <DropDownList
                                            data={sortDirections}
                                            textField="text"
                                            dataItemKey="value"
                                            value={sortDirections.find((d) => d.value === sort.dir)}
                                            onChange={(e) =>
                                                setSort({ ...sort, dir: e.value.value })
                                            }
                                            style={{ width: 150, marginLeft: 8 }}
                                        />
                                    </CCol>
                                </CRow>

                                {/* ✅ List */}
                                <ListView data={pagedData} item={itemRender} />

                                {/* ✅ Pager */}
                                <div className="mt-4">
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
                                </div>
                            </CCard>
                        </CCol>
                    </CRow>
                </div>
            </div>

            {/* ✅ PCP Change Dialog */}
            {dialogOpen && (
                <Dialog
                    title="Change PCP"
                    onClose={() => setDialogOpen(false)}
                    width={500}
                >
                    <div className="mb-3">
                        <DropDownList
                            data={provider}  
                            textField="providername"
                            dataItemKey="providerid"
                            value={selectedPcp}
                            onChange={(e) => setSelectedPcp(e.value)}
                            style={{ width: "100%" }}
                        />
                    </div>

                    {selectedPcp && (
                        <div className="p-2 border rounded bg-light">
                            <strong>{selectedPcp.providername}</strong>
                            <br />
                            {selectedPcp.provideraddress}
                            <br />
                            {selectedPcp.providercity}
                            <br />
                            Phone: {selectedPcp.providerphone}
                        </div>
                    )}

                    <DialogActionsBar>
                        <Button themeColor="primary" onClick={handleSave}>
                            Save
                        </Button>
                        <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
                    </DialogActionsBar>
                </Dialog>
            )}
        </main>
    );
}
