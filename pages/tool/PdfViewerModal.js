// File: ../tool/PdfViewerModal.js
import React from "react";
import { CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter, CButton } from "@coreui/react";

const PdfViewerModal = ({ visible, onClose, pdfUrl }) => {
    if (!pdfUrl) return null;

    return (
        <CModal visible={visible} onClose={onClose} size="xl">
            <CModalHeader>
                <CModalTitle>Member ID Card PDF</CModalTitle>
            </CModalHeader>
            <CModalBody style={{ height: "80vh" }}>
                <iframe
                    src={pdfUrl}
                    style={{ width: "100%", height: "100%" }}
                    title="Member ID Card"
                ></iframe>
            </CModalBody>
            <CModalFooter>
                <CButton color="secondary" onClick={onClose}>
                    Close
                </CButton>
            </CModalFooter>
        </CModal>
    );
};

export default PdfViewerModal;
