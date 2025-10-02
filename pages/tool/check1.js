import React, { useState } from "react";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import { Dialog, DialogActionsBar } from "@progress/kendo-react-dialogs";
import { Button } from "@progress/kendo-react-buttons";
import "@progress/kendo-theme-default/dist/all.css";

// Dummy provider data
const providers = [
    {
        id: 1,
        name: "Dr. John Smith",
        address: "123 Main Street, New York, NY 10001",
        phone: "(123) 456-7890",
    },
    {
        id: 2,
        name: "Dr. Emily Johnson",
        address: "456 Park Ave, San Francisco, CA 94102",
        phone: "(987) 654-3210",
    },
    {
        id: 3,
        name: "Dr. Michael Brown",
        address: "789 Broadway, Chicago, IL 60601",
        phone: "(555) 111-2222",
    },
];

// Custom item renderer for dropdown list
const ProviderItem = (li, itemProps) => {
    const item = itemProps.dataItem;
    if (!item || !item.name) return li;
    return (
        <div
            style={{
                padding: "10px",
                lineHeight: "1.5",
                borderBottom: "1px solid #eee",
                whiteSpace: "normal",
            }}
        >
            <div style={{ fontWeight: "bold", fontSize: "14px" }}>{item.name}</div>
            <div style={{ fontSize: "12px", color: "#555" }}>
                {item.address} | {item.phone}
            </div>
        </div>
    );
};

// Custom value renderer to show selected item in input
const ProviderValueRender = (element, value) => {
    if (!value || !value.name) return element;
    return (
        <div style={{ fontWeight: "bold", fontSize: "14px", whiteSpace: "normal" }}>
            {value.name}
        </div>
    );
};

export default function ChangePcpDialog() {
    const [showDialog, setShowDialog] = useState(false);
    const [selectedProvider, setSelectedProvider] = useState(null);

    const handleSave = () => {
        if (selectedProvider) {
            alert(`Saved provider: ${selectedProvider.name}`);
            setShowDialog(false);
        } else {
            alert("Please select a provider first.");
        }
    };

    return (
        <div style={{ padding: 30 }}>
            <Button themeColor="primary" onClick={() => setShowDialog(true)}>
                Change PCP
            </Button>

            {showDialog && (
                <Dialog
                    title="Select New PCP"
                    onClose={() => setShowDialog(false)}
                    width={600} // Wider dialog
                >
                    <div style={{ padding: "20px" }}>
                        {/* Show selected provider above dropdown */}
                        {selectedProvider && selectedProvider.id && (
                            <div
                                style={{
                                    marginBottom: "20px",
                                    padding: "10px",
                                    border: "1px solid #ccc",
                                    borderRadius: "6px",
                                    background: "#f9f9f9",
                                }}
                            >
                                <p style={{ fontWeight: "bold", margin: 0 }}>{selectedProvider.name}</p>
                                <p style={{ margin: 0 }}>{selectedProvider.address}</p>
                                <p style={{ margin: 0 }}>{selectedProvider.phone}</p>
                            </div>
                        )}

                        <DropDownList
                            data={providers}
                            textField="name"
                            dataItemKey="id"
                            value={selectedProvider}
                            onChange={(e) => setSelectedProvider(e.value)}
                            itemRender={ProviderItem}
                            valueRender={ProviderValueRender}
                            defaultItem={{ id: null, name: "-- Select Provider --" }}
                            style={{ width: "100%", fontSize: "16px", marginBottom: "20px" }}
                            popupSettings={{ height: "250px", width: 580 }} // make popup wider
                        />

                        {/* Cancel & Save buttons always visible */}
                        <DialogActionsBar>
                            <Button onClick={() => setShowDialog(false)}>Cancel</Button>
                            <Button themeColor="primary" onClick={handleSave}>
                                Save
                            </Button>
                        </DialogActionsBar>
                    </div>
                </Dialog>
            )}
        </div>
    );
}
