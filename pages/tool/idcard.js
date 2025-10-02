import React, { useEffect, useState } from "react";
import {
    CRow,
    CCol,
    CCard,
    CCardBody,
    CBadge,
    CButton,
    CModal,
    CModalHeader,
    CModalTitle,
    CModalBody,
    CModalFooter
} from "@coreui/react";
import { Input } from "@progress/kendo-react-inputs";
import { ListView } from "@progress/kendo-react-listview";
import Navbar from "../../components/Navbar";
import { Pager } from "@progress/kendo-react-data-tools";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import { orderBy } from "@progress/kendo-data-query";
import ToastService from "@services/ToastService";
import { fetchMembersWithUrls } from "@services/MemberListService";
import { fetchMemberCard } from "@services/fetchMemberCard";
import MemberCardModal from "../tool/MemberCardModal";
import Head from "next/head";

export default function MemberDetailList() {
    const [membersList, setMembers] = useState([]);
    const [plan, setPlan] = useState(null);
    const [fileUrls, setFileUrls] = useState({});
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [sort, setSort] = useState({ field: "First_Name", dir: "asc" });
    const [processing, setProcessing] = useState({});

    const [modalVisible, setModalVisible] = useState(false);
    const [selectedMember, setSelectedMember] = useState(null);

    const [skip, setSkip] = useState(0);
    const take = 5;

    const sortFields = [
        { text: "First Name", value: "First_Name" },
        { text: "Last Name", value: "Last_Name" },
        { text: "Member ID", value: "Member_ID" },
        { text: "City", value: "City" },
        { text: "State", value: "State" },
        { text: "Zip Code", value: "Zip_Code" },
    ];

    const sortDirections = [
        { text: "Ascending", value: "asc" },
        { text: "Descending", value: "desc" },
    ];

    useEffect(() => {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("userId");
        const username = localStorage.getItem("username");
        const memberId = localStorage.getItem("memberId");

        const loadData = async () => {
            try {
                const { members, plan } = await fetchMembersWithUrls(username, memberId, token);
                setMembers(members);
                setPlan(plan);

                const urlsMap = members.reduce((map, m) => {
                    map[m.Member_ID] = m.fileUrl;
                    return map;
                }, {});
                setFileUrls(urlsMap);
            } catch (err) {
                console.error("Load data failed:", err);
                ToastService.error("Session expired. Please login again.");
                ToastService.error(err.message || "Failed to fetch members");
                //window.location.href = "/login";
                
            } finally {
                setLoading(false);
            }
        };

        loadData();

    }, []);

    const filteredMembers = membersList.filter((m) => {
        const q = search.trim().toLowerCase();
        return (
            !q ||
            m.First_Name?.toLowerCase().includes(q) ||
            m.Last_Name?.toLowerCase().includes(q) ||
            m.Member_ID?.toLowerCase().includes(q) ||
            m.Address?.toLowerCase().includes(q) ||
            m.City?.toLowerCase().includes(q) ||
            m.State?.toLowerCase().includes(q) ||
            m.Zip_Code?.toLowerCase().includes(q)
        );
    });

    const sortedMembers = orderBy(filteredMembers, [sort]);
    const pagedData = sortedMembers.slice(skip, skip + take);

    const getActionButtons = (member) => {
        console.log(member);
        const fileUrl = fileUrls[member.Member_ID];
        const hasUrl = typeof fileUrl === "string" && fileUrl.trim() !== "";
        const [processing, setProcessing] = useState({});
        //const isProcessing = processingIds.includes(member.Member_ID);

        const handleDownload = async (member) => {
            setProcessing((prev) => ({ ...prev, [member.Member_ID]: "download" }));
            try {
                const response = await fetch(
                    `/api/Test/idcard-download?memberId=${encodeURIComponent(member.Member_ID)}`
                );

                if (!response.ok) {
                    const errorData = await response.json().catch(() => null);
                    const errorMsg = errorData?.error || "Failed to download ID card PDF.";
                    ToastService.error(errorMsg);
                    return;
                }
                console.log(response);
                const blob = await response.blob();
                if (!blob || blob.size === 0) {
                    ToastService.error("Error in idcard file.");
                    return;
                }
                console.log("blob");
                console.log(blob);
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
                ToastService.error(err?.message || "Failed to download ID card PDF.");
            } finally {
                setProcessing((prev) => ({ ...prev, [member.Member_ID]: null }));
            }
        };

        const handleRequest = async (member) => {
            setProcessing((prev) => ({ ...prev, [member.Member_ID]: "request" }));
            try {
                const token = localStorage.getItem("token");
                const userId = localStorage.getItem("userId");

                const response = await fetch(`https://localhost:7012/api/AzureAPI/request-pdfidcard`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ memberId: member.Member_ID, userId, Token: token }),
                });

                const result = await response.json();
                if (!response.ok) {
                    const errorMsg = result?.error || "Failed to card request";
                    ToastService.error(errorMsg);
                    return;
                }

                ToastService.success(result.message || "ID Card request submitted.");
            } catch (err) {
                console.error("Request error:", err);
                ToastService.error("Failed to submit ID card request.");
            } finally {
                setProcessing((prev) => ({ ...prev, [member.Member_ID]: null }));
            }
        };

        const handleViewH = async (member) => {
            setProcessing((prev) => ({ ...prev, [member.Member_ID]: "view" }));
            try {
                const token = localStorage.getItem("token");
                const data = await fetchMemberCard(member.Member_ID, token);
                const memberCard = data?.Data?.[0];
                setSelectedMember(memberCard);
                setModalVisible(true);
            } catch (err) {
                console.error("View ID Card error:", err);
                ToastService.error(err?.message || "Failed to view ID card.");
            } finally {
                setProcessing((prev) => ({ ...prev, [member.Member_ID]: null }));
            }
        };

        const handleRequestAPI = async (member) => {
            setProcessing((prev) => ({ ...prev, [member.Member_ID]: "requestApi" }));
            try {
                const token = localStorage.getItem("token");
                const response = await fetch(`/api/card/request`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({ memberID: member.Member_ID, requestType: "A" }),
                });

                const result = await response.json();
                if (!response.ok) {
                    const errorMsg = result?.error || "Failed to Request ID card.";
                    ToastService.error(errorMsg);
                    return;
                }
                console.log(result);
                ToastService.success(result.message || `PCP request submitted for ${member.Member_ID}`);
            } catch (err) {
                console.error("Request PCP error:", err);
                ToastService.error(err.message || "Failed to submit PCP request");
            } finally {
                setProcessing((prev) => ({ ...prev, [member.Member_ID]: null }));
            }
        };

        return (
            <div className="btn-group" role="group">
                {hasUrl ? (
                    <CButton
                        color="success"
                        variant="outline"
                        onClick={() => handleDownload(member)}
                        disabled={processing[member.Member_ID] === "download"}
                    >
                        {processing[member.Member_ID] === "download" ? "Downloading..." : "Download"}
                    </CButton>
                ) : (
                    <CButton
                        color="primary"
                        variant="outline"
                        onClick={() => handleRequest(member)}
                        disabled={processing[member.Member_ID] === "request"}
                    >
                        {processing[member.Member_ID] === "request" ? "Processing..." : "Request ID Card"}
                    </CButton>
                )}
                <CButton
                    color="secondary"
                    variant="outline"
                    onClick={() => handleViewH(member)}
                    disabled={processing[member.Member_ID] === "view"}
                >
                    {processing[member.Member_ID] === "view" ? "Loading..." : "View Card"}
                </CButton>
                <CButton
                    color="info"
                    variant="outline"
                    onClick={() => handleRequestAPI(member)}
                    disabled={processing[member.Member_ID] === "requestApi"}
                >
                    {processing[member.Member_ID] === "requestApi" ? "Requesting..." : "Request ID"}
                </CButton>
            </div>

        );
    };



    const itemRender = (props) => {
        const member = props.dataItem;
        return (
            <>
               <Head>
        <meta charSet="UTF-8" />
        <title>ID Card</title>
      </Head>
            <CCard className="mb-3 shadow-sm">
                <CCardBody>
                    <CRow>
                        <CCol md={12} className="d-flex justify-content-between">
                            <div>
                                <h6 className="fw-bold mb-0">
                                    {member.First_Name} {member.Last_Name} ({member.Description})
                                </h6>
                                <small className="text-muted">Member ID: {member.Member_ID}</small>
                            </div>
                            <div>{getActionButtons(member)}</div>
                        </CCol>
                        <hr className="my-2" />
                        <CCol md={6}>
                            <strong>Address:</strong>
                            <div>
                                {member.Address}, {member.City}, {member.State}, {member.Zip_Code}
                            </div>
                            <div>Phone: {member.Phone_Number}</div>
                        </CCol>

                        <CCol md={6}>
                            <strong>PCP:</strong>
                            <div>
                                {member.PCP_First_Name} {member.PCP_Last_Name}, {member.Provider_Type}
                            </div>
                            <div>
                                {member.PCP_Address}, {member.PCP_City}, {member.PCP_State} {member.PCP_Zip}
                            </div>
                            <div>Phone: {member.PCP_Phone}</div>
                        </CCol>
                    </CRow>

                    {plan && (
                        <div className="mt-3">
                            <h6 className="fw-bold">Plan: {plan.Plan_Description}</h6>
                            <small>
                                Start: {new Date(plan.Plan_Start).toLocaleDateString()} - End:{" "}
                                {new Date(plan.Plan_End).toLocaleDateString()} |{" "}
                                <CBadge color="transparent" textColor="success">
                                    {plan.Status}
                                </CBadge>
                            </small>
                        </div>
                    )}
                </CCardBody>
            </CCard>
            </>);
    };

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "200px" }}>
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    if (!membersList.length) return <div>No members found.</div>;

    return (
        <main className="font-sans bg-slate-50 min-h-screen">
            <Navbar />
            <div className="mx-auto max-w-7xl px-6 py-8 space-y-8">
                <div className="p-3">
                    <CRow>
                        <CCol md={12}>
                            <CCard className="p-4">
                                {/* Header */}
                                <CRow className="align-items-center mb-4 g-3">
                                    <CCol md="auto">
                                        <h5 className="fw-bold mb-0">
                                            Results{" "}
                                            <span className="badge bg-light text-dark ms-1">
                                                {sortedMembers.length}
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

                                <hr className="my-2" />
                                {/* List Daa */}
                                <ListView data={pagedData} item={itemRender} />

                                {/* ✅ Pager */}
                                <div className="mt-4">
                                    <Pager
                                        skip={skip}
                                        take={take}
                                        total={sortedMembers.length}
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

            <MemberCardModal
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                member={selectedMember}
            />


        </main>
    );
}
