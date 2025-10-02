import React, { useState } from "react";
import { Dialog, DialogActionsBar } from "@progress/kendo-react-dialogs";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import { Button } from "@progress/kendo-react-buttons";
import { ListView } from "@progress/kendo-react-listview";

// Dummy provider list
const dummyProviders = [
    {
        fullname: "John Doe (PCP)",
        providername: "Dr. John Doe",
        provideraddress: "123 Main St",
        providercity: "Austin, TX 78701",
        providerphone: "555-1234",
    },
    {
        fullname: "Jane Smith (PCP)",
        providername: "Dr. Jane Smith",
        provideraddress: "456 Oak Ave",
        providercity: "Dallas, TX 75001",
        providerphone: "555-5678",
    },
    {
        fullname: "Mike Johnson (PCP)",
        providername: "Dr. Mike Johnson",
        provideraddress: "789 Pine Rd",
        providercity: "Houston, TX 77001",
        providerphone: "555-9876",
    },
];

export default function DialogDemo() {
    const [showDialog, setShowDialog] = useState(false);
    const [selectedProvider, setSelectedProvider] = useState(null);
    const [design, setDesign] = useState("option1"); // choose which option

    const handleOpen = (opt) => {
        setDesign(opt);
        setShowDialog(true);
    };

    const handleClose = () => {
        setShowDialog(false);
        setSelectedProvider(null);
    };

    const handleConfirm = () => {
        alert(`Confirmed change to: ${selectedProvider?.providername}`);
        handleClose();
    };

    return (
        <div style={{ padding: 30 }}>
            <h3>Kendo Dialog PCP Change   Demo</h3>

            {/* Buttons to test each design */}
            <Button onClick={() => handleOpen("option1")} className="me-2">
                Open Option 1
            </Button>
            <Button onClick={() => handleOpen("option2")} className="me-2">
                Open Option 2
            </Button>
            <Button onClick={() => handleOpen("option3")}>
                Open Option 3
            </Button>

            {showDialog && (
                <Dialog
                    title={`Change PCP (${design.toUpperCase()})`}
                    onClose={handleClose}
                >
                    {/* Common Dropdown */}
                    <DropDownList
                        data={dummyProviders}
                        textField="providername"
                        dataItemKey="providername"
                        value={selectedProvider}
                        onChange={(e) => setSelectedProvider(e.value)}
                        style={{ width: "100%", marginBottom: "1rem" }}
                        placeholder="Choose a provider..."
                    />

                    {/* OPTION 1   Simple card */}
                    {design === "option1" && selectedProvider && (
                        <div className="p-3 border rounded bg-light">
                            <h6 className="fw-bold">{selectedProvider.fullname}</h6>
                            <p className="mb-1"><b>Provider:</b> {selectedProvider.providername}</p>
                            <p className="mb-1"><b>Address:</b> {selectedProvider.provideraddress}</p>
                            <p className="mb-1"><b>City:</b> {selectedProvider.providercity}</p>
                            <p className="mb-1"><b>Phone:</b> {selectedProvider.providerphone}</p>
                        </div>
                    )}

                    {/* OPTION 2   ListView */}
                    {design === "option2" && selectedProvider && (
                        <ListView
                            data={[selectedProvider]}
                            item={(props) => {
                                const d = props.dataItem;
                                return (
                                    <div className="p-3 mb-2 rounded border bg-light">
                                        <h6 className="fw-bold">{d.fullname}</h6>
                                        <p className="mb-1"><b>Provider:</b> {d.providername}</p>
                                        <p className="mb-1"><b>Address:</b> {d.provideraddress}</p>
                                        <p className="mb-1"><b>City:</b> {d.providercity}</p>
                                        <p className="mb-1"><b>Phone:</b> {d.providerphone}</p>
                                    </div>
                                );
                            }}
                        />
                    )}

                    {/* OPTION 3   Highlighted card */}
                    {design === "option3" && selectedProvider && (
                        <div className="card shadow-sm border-primary">
                            <div className="card-body">
                                <h6 className="fw-bold text-primary">{selectedProvider.fullname}</h6>
                                <p className="mb-1"><b>Provider:</b> {selectedProvider.providername}</p>
                                <p className="mb-1"><b>Address:</b> {selectedProvider.provideraddress}</p>
                                <p className="mb-1"><b>City:</b> {selectedProvider.providercity}</p>
                                <p className="mb-1"><b>Phone:</b> {selectedProvider.providerphone}</p>
                            </div>
                        </div>
                    )}

                    <DialogActionsBar>
                        <Button themeColor="secondary" onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button
                            themeColor="primary"
                            onClick={handleConfirm}
                            disabled={!selectedProvider}
                        >
                            Confirm Change
                        </Button>
                    </DialogActionsBar>
                </Dialog>
            )}
        </div>
    );
}
