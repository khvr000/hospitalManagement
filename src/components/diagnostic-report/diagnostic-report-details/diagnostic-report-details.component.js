import React, {Component} from 'react';
import "./diagnostic-report-details.component.scss";
import Button from "@mui/material/Button";
import DiagnosticReportDetailsItemComponent
    from "../diagnostic-report-details-item/diagnostic-report-details-item.component";


class DiagnosticReportDetailsComponent extends Component {

    render() {
        const { diagnosticReportDetails, onAddNewMedicineItemClick, onDeleteMedicineItemClick, onDiagnosticReportFormChange } = this.props;

        return (
            <div>
                <div className="mb-medicine-details-header-wrapper">
                    <div className="tablet-name">Test</div>
                    <div className="quantity">Value</div>
                    {/*<div className="price">Comments</div>*/}
                    <div className="delete">Delete</div>
                </div>

                <div className="mb-medicine-details-content-wrapper">
                    {diagnosticReportDetails && diagnosticReportDetails.map((reportDetailItem, i) => (
                        <DiagnosticReportDetailsItemComponent
                            reportDetailItem={reportDetailItem}
                            onDeleteMedicineItemClick={() => onDeleteMedicineItemClick(i)}
                            onDiagnosticReportFormChange={(...args) => onDiagnosticReportFormChange(...args, i)}
                        />
                    ))}
                    <div className="mb-medicine-details-add-wrapper">
                        <Button variant="outlined" onClick={onAddNewMedicineItemClick} size="medium">
                            Add new <i className="material-icons-outlined">add</i>
                        </Button>
                    </div>
                </div>


            </div>
        );
    }
}

export default DiagnosticReportDetailsComponent;
