import * as React from "react";
import {
    Card,
    CardHeader,
    CardBody,
    CardTitle,
} from "@progress/kendo-react-layout";
import { Grid, GridColumn } from "@progress/kendo-react-grid";

const PlanDetail = () => {
    const costShareData = [
        {
            service: "Primary Care Physician",
            cost: "$50 copay/office visit (Deductible does not apply)",
        },
        {
            service: "Specialist",
            cost: "$100 copay/office visit (Deductible does not apply)",
        },
    ];
    return (
        <div className="p-4">
            {/* KPIs */}
            <div className="k-d-flex k-justify-content-between k-flex-wrap mb-4">
                {[
                    { label: "Ind. Deductible", value: "$7500" },
                    { label: "Ind. OOP Max", value: "$9200" },
                    { label: "Fam. Deductible", value: "$15000" },
                    { label: "Fam. OOP Max", value: "$18400" },
                ].map((item, i) => (
                    <Card key={i} style={{ width: "23%", backgroundColor: "skyblue" }} className="text-center" >
                        <CardBody>
                            <div className="k-text-muted">{item.label}</div>
                            <div className="k-font-bold k-text-primary fs-3">{item.value}</div>
                        </CardBody>
                    </Card>
                ))}
            </div>

            {/* Cost Share */}
            <Card className="mb-3">
                <CardHeader><CardTitle>Cost Share</CardTitle></CardHeader>
                <CardBody>
                    <Grid data={costShareData}>
                        <GridColumn field="service" title="Service" />
                        <GridColumn field="cost" title="Cost Share" />
                    </Grid>
                </CardBody>
            </Card>

            {/* Notes */}
            <div className="k-text-muted fst-italic">
                medicalrxlastdet
            </div>
        </div>

    );
};

export default PlanDetail;
