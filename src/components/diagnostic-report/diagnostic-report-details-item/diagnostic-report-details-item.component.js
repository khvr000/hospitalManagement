import React, {Component} from 'react';
import "./diagnostic-report-details.component.scss";
import {TextField} from "@material-ui/core";
import Button from "@mui/material/Button";

class DiagnosticReportDetailsItemComponent extends Component {
    render() {

        const { reportDetailItem, onDeleteMedicineItemClick, onDiagnosticReportFormChange } = this.props;

        return (
            <div className="mb-medicine-details-item-container">
                <TextField
                    variant="outlined"
                    size="small"
                    value={reportDetailItem.testName}
                    onChange={(e) => onDiagnosticReportFormChange('testName', e)}
                    className="tablet-name"
                />
                <TextField
                    variant="outlined"
                    size="small"
                    value={reportDetailItem.value}
                    onChange={(e) => onDiagnosticReportFormChange('value', e)}
                    className="quantity"
                />
                {/*<TextField*/}
                {/*    variant="outlined"*/}
                {/*    size="small"*/}
                {/*    value={reportDetailItem.comments}*/}
                {/*    onChange={(e) => onDiagnosticReportFormChange('comments', e)}*/}
                {/*    className="price"*/}
                {/*/>*/}

                <Button variant="outlined" size="medium" onClick={onDeleteMedicineItemClick}>
                    <i className="material-icons-outlined">delete</i>
                </Button>
            </div>
        );
    }
}

export default DiagnosticReportDetailsItemComponent;
