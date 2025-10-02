import React from "react";
import {
    CModal,
    CModalHeader,
    CModalTitle,
    CModalBody,
    CModalFooter,
    CButton,
} from "@coreui/react";
//D: \A New Theme Member\member - dashboard - nextjs\styles\idcard.css
//import styles from "../styles/idcard.css";
import styles from "../../styles/idcard.module.css";
import logo from "images/SenderoHealthPlans_PrimaryLogo.jpg";
import logoIDBack from "images/SenderoHealthPlans_PrimaryLogo_icard.png";
import Navitus_2 from "images/Navitus_2.png";
import Head from "next/head";

console.log(styles);
const MemberCardModal = ({ visible, onClose, member }) => {
    if (!member) return null;
    const {
        VBA_division_ID,
        PLAN_NAME,
        Plan_start,
        Flag_Ind,
        First_Middle_Last_Suffix,
        SubscriberID_Seq,
        PCP_First_Last_Designation,
        phone_number,
        OFFICEVISIT,
        SPECIALIST,
        INPATIENT,
        EMERGENCYROOM,
        DEDUCTIBLEIND,
        MAX_OOPIND,
        MAX_OOPFAM,
        DEDUCTIBLEFAM,
        RXGENERIC,
        RXBRAND
    } = member;
    console.log("Image path:", logo);
    return (

         <>
            <Head>
                <meta charSet="UTF-8" />
                <title>ID Card</title>
            </Head>
            <CModal visible={visible} onClose={onClose} size="lg">
            <CModalHeader>
                <CModalTitle>ID Card </CModalTitle>
            </CModalHeader>
            <CModalBody>
                <>
                    <div className={styles.flipBox}>
                            {/*<div className="flip-box">*✅/}
                        {/*<div className="flip-box-inner">*/}
                        <div className={styles.flipBoxInner}>
                            {/*<div className="flip-box-front">*/}
                            <div className={styles.flipBoxFront}>
                                <div
                                    id="cardPrint"
                                    style={{
                                        backgroundColor: "#FFFFFF",
                                        color: "#000",
                                        paddingRight: 8,
                                        //width: "5.1in",
                                        border: "1px solid #ccc",
                                        borderRadius: 5,
                                        padding:10
                                        //overflow: "auto"
                                    }}>
                                    <div id="cardPrintFront">
                                        <div
                                            className="row"
                                            style={{
                                                fontSize: "0.8rem",
                                                marginTop: 10,
                                                marginBottom: 20,
                                                padding: "0px !important"
                                            }}
                                        >
                                            <div
                                                className="col-xs-5 col-sm-5 col-md-5 col-lg-5 col-xl-5 col-xxl-5"
                                                style={{ paddingRight: "0px !important" }}
                                            >
                                                <img
                                                    height={70}
                                                    width={600}
                                                    src={logo.src}
                                                />
                                            </div>
                                            <div
                                                className="col-xs-5 col-sm-5 col-md-5 col-lg-5 col-xl-5 col-xxl-5 headerDetail"
                                                style={{ padding: "0px !important", margin: 0 }}
                                            >
                                                <>
                                                    <span className="text-center">
                                                        { PLAN_NAME }
                                                    </span>
                                                    <br />
                                                    <span className="text-center">
                                                        Effective Date:{ Plan_start }
                                                    </span>
                                                </>
                                            </div>
                                            <div
                                                className="col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2 col-xxl-2 cardtypeD"
                                                style={{ padding: "0px !important", margin: 0 }}
                                            >
                                                <>
                                                    <span>
                                                        { Flag_Ind }
                                                    </span>
                                                    <br />
                                                    <span>
                                                        { VBA_division_ID }
                                                    </span>
                                                </>
                                            </div>
                                        </div>
                                        <div
                                            className="row text-left MemberDetails"
                                                style={{ fontSize: "0.8rem", lineHeight: 1, marginLeft: 20 }}
                                        >
                                            <p>Name: { First_Middle_Last_Suffix }</p>
                                            <p>Member ID#: { SubscriberID_Seq }</p>
                                            <p>PCP: { PCP_First_Last_Designation }</p>
                                            <p>PCP Phone#: { phone_number }</p>
                                        </div>
                                        <div className="row" style={{ marginTop: 10 }}>
                                            <div
                                                className="col-xs-8 col-sm-8 col-md-8 col-lg-8 col-xl-8 col-xxl-8 text-left"
                                                    style={{ fontSize: "0.8rem" }}
                                            >
                                                <span className="idDetails">
                                                    <>
                                                        Office Visit: { OFFICEVISIT } Specialist: { SPECIALIST } *<br />
                                                        In-Patient Stay:{ INPATIENT } Emergency Room: { EMERGENCYROOM }
                                                        <br />
                                                        Deductible:{ DEDUCTIBLEIND } individual / { DEDUCTIBLEFAM } family
                                                        <br />
                                                        Maximum-Out-of-Pocket: { MAX_OOPIND } individual / { MAX_OOPFAM } family
                                                        <br />
                                                    </>
                                                </span>
                                                    <span style={{ fontSize: "0.6rem" }}>
                                                    *Indicates copayment applies after deductible **Indicates copayment
                                                    applies with deductible
                                                </span>
                                                <br />
                                                    <span style={{ fontSize: "0.6rem" }}>
                                                    ***Indicates coinsurance deductible does not apply. Coinsurance %
                                                    applies after deductible
                                                </span>
                                                <br />
                                                <br />
                                                    <span className="text-right" style={{ fontSize: "0.6rem", float: "right" }}>
                                                    <a href="www.senderohealth.com/">
                                                        www.senderohealth.com
                                                    </a>
                                                </span>
                                            </div>
                                            <div
                                                className="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 col-xxl-4 text-left"
                                                style={{ paddingLeft: 0 }}
                                            >
                                                <div className="row text-center" style={{ paddingBottom: 10, marginTop: "-70px" }}>
                                                    <img height={20} width={80} src={Navitus_2.src} />
                                                </div>
                                                <div
                                                    style={{
                                                        border: "2px solid #000",
                                                        padding: "24px",
                                                        textAlign: "center",
                                                        fontSize: "0.8rem",
                                                        marginTop: "-10px",
                                                        lineHeight: "1.4",
                                                    }}
                                                >
                                                    <div>
                                                        RX Generic / Brand: {RXGENERIC} / {RXBRAND}
                                                    </div>
                                                    <div>
                                                        <b>RX GROUP #:</b> SNXA,
                                                    </div>
                                                    <div>
                                                        <b>PCN:</b> NVT and <b>BIN #:</b> 610602
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>



                            {/*<div className="flip-box-back">*/}
                            <div className={styles.flipBoxBack}>
                                <div
                                    id="cardPrint"
                                    style={{
                                        backgroundColor: "#FFFFFF",
                                        color: "#000",
                                        padding: 10,
                                        //width: "5.1in",
                                        height: "auto",
                                        border: "1px solid #ccc",
                                        borderRadius: 5,

                                        overflow: "hidden",
                                        fontSize: "0.8rem"
                                    }}
                                >
                                
                                    <div className={styles.infoHeader}>
                                        IMPORTANT INFORMATION / INFORMACIÓN IMPORTANTE
                                    </div>
                                    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "20px" }}>
                                        <div className={styles.infoContent} style={{ flex: 1, textAlign: "left" }}>
                                            <div className={styles.infoRow} >
                                                <span>CUSTOMER SERVICE/ SERVICIO AL CLIENTE </span>
                                                <span className={styles.dotted}></span>
                                                <span>1-844-800-4693</span>
                                            </div>
                                            <div className={styles.infoRow}>
                                                <span>TTY/ LÍNEA DE AYUDA TTY</span>
                                                <span className={styles.dotted}></span>
                                                <span>1-844-800-4693</span>
                                            </div>
                                            <div className={styles.infoRow}>
                                                <span>VISION SERVICES/ SERVICIOS PARA LA VISTA.</span>
                                                    <span className={styles.dotted}></span>
                                                    <span>1-844-800-4693</span>
                                            </div>
                                            <div className={styles.infoRow}>
                                                <span>PHARMACY/FARMACIA</span>
                                                        <span className={styles.dotted}></span><span>1-844-800-4693</span>
                                            </div>
                                            <div className={styles.infoRow}>
                                                <span>PROVIDER UM FAX</span>
                                                        <span className={styles.dotted}></span><span>1-844-800-4693</span>
                                            </div>
                                            <div className={styles.infoRow}>
                                                <span>UM QUESTIONS</span>
                                                        <span className={styles.dotted}></span><span>1-844-800-4693</span>
                                            </div>
                                            <div className={styles.infoRow}>
                                            <span>SUICIDE & CRISIS LINE (988Lifeline.org)
                                            </span>
                                            </div>
                                            <div className={styles.infoRow}>
                                                    <span>LÍNEA DE SUICIDIO Y CRISIS</span>
                                                        <span className={styles.dotted}></span><span>1-844-800-4693</span>
                                            </div>
                                        </div>

                                            <div style={{ paddingLeft: 20, paddingRight: 20, paddingBottom: 20, }}>
                                                <img src={logoIDBack.src} alt="Logo" style={{ width: '100%', height: 'auto', maxWidth: '250px' }} />
                                        </div>
                                    </div>
                                  
                                    <div>
                                        <p>
                                            24/7 ON-DEMAND VIRTUAL URGENT CARE - CONNECT TO A DOCTOR WITHIN
                                            MINUTES ANYWHERE IN TEXAS:{" "}
                                            <a
                                                href="https://care.normanmd.com/en/#/security/login"
                                                target="_blank"
                                            >
                                                https://care.normanmd.com/en/#/security/login
                                            </a>
                                        </p>
                                    </div>
                                    <div>
                                        <p>
                                            24/7 ON-DEMAND VIRTUAL URGENT CARE - CONNECT TO A DOCTOR WITHIN
                                            MINUTES ANYWHERE IN TEXAS:{" "}
                                            <a
                                                href="https://care.normanmd.com/en/#/security/login"
                                                target="_blank"
                                            >
                                                https://care.normanmd.com/en/#/security/login
                                            </a>
                                        </p>
                                    </div>

                                        <div>
                                            <div>
                                                Submit Professional Claims to: Sendero Health Plans, P.O. Box 17307,
                                                Austin, TX 78760
                                                <br />
                                                Payor ID: Trizetto/Cognizant: MV440
                                            </div>
                                            <div className={styles.infoRev}>REV09/24</div>
                                        </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </>
                
            </CModalBody>
            <CModalFooter>
                <CButton color="secondary" onClick={onClose}>
                    Close
                </CButton>
            </CModalFooter>
        </CModal>
    </>);
};

export default MemberCardModal;
