import * as React from "react";
import {Button} from "@material-ui/core";
import {getFormattedStringFromStringList} from "../../../utils/formatUtils";

import "./admitted-details-item.component.scss";

type Props = {
    admittedFormItem: Object,
    onPrintClick: Function
}

class AdmittedDetailsItemComponent extends React.Component<Props> {

    handlePrintClick = () => {
        const { admittedFormItem, onPrintClick } = this.props;
        const { admission_number } = admittedFormItem;
        onPrintClick(admission_number);
    }

    formatDateString = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const updatedMonth = month < 10 ? `0${month}` : month;
        return `${day}-${updatedMonth}-${year}`;
    }

    render() {
        const { admittedFormItem , showAccordian, handleClick, onEditAdmitFormClick} = this.props;
        return (
            <>
                <div className="admitted-details-item-content" onClick={handleClick}>
                    <div className="edit-form">
                        <Button size="small" onClick={() => onEditAdmitFormClick(admittedFormItem.admission_number)}>
                            <i className="material-icons-outlined">edit</i>
                        </Button>
                    </div>
                    <div className="admission-number admitted-detail-item">
                        {admittedFormItem.admission_number}
                    </div>
                    <div className="patient-name admitted-detail-item">
                        {admittedFormItem.patientName}
                    </div>
                    <div className="patient-sex admitted-detail-item">
                        {admittedFormItem.sex}
                    </div>
                    <div className="patient-mobile admitted-detail-item">
                        {admittedFormItem.mobile}
                    </div>
                    <div className="patient-alternateMobile admitted-detail-item">
                        {admittedFormItem.alternateMobile}
                    </div>
                    <div className="patient-careOf admitted-detail-item">
                        {admittedFormItem.careOf}
                    </div>
                    <div className="patient-date-of-admission admitted-detail-item">
                        {this.formatDateString(admittedFormItem.dateOfAdmission)}
                    </div>
                    <div className="patient-date-of-discharge admitted-detail-item">
                        {this.formatDateString(admittedFormItem.dateOfDischarge)}
                    </div>
                    <div className="patient-amount-remaining admitted-detail-item">
                        {parseInt(admittedFormItem.amountRemaining) + parseInt(admittedFormItem.advancePaid)}
                    </div>
                    <div className="print-button">
                        <Button
                            type="flatPrimary"
                            variant="contained"
                            size="small "
                            onClick={this.handlePrintClick}
                        >
                            Print
                        </Button>
                    </div>
                </div>
                {showAccordian? (
                    <div className="admitted-details-item-additional-content">
                        <div className="admitted-details-group-wrapper">
                            <div className="patient-dob admitted-detail-item">
                                <span>Date of Birth:</span> {this.formatDateString(admittedFormItem.dateOfBirth)}
                            </div>
                            <div className="patient-date-of-surgery admitted-detail-item">
                                <span>Date of Surgery:</span> {this.formatDateString(admittedFormItem.dateOfSurgery)}
                            </div>
                        </div>
                        <div className="admitted-details-group-wrapper">
                            <div className="patient-operated-for admitted-detail-item">
                                <span>Operated For: </span>{getFormattedStringFromStringList(admittedFormItem.operatedFor)}
                            </div>
                            <div className="patient-diagnosis admitted-detail-item">
                                <span>Diagnosis: </span>{getFormattedStringFromStringList(admittedFormItem.diagnosis)}
                            </div>
                        </div>
                        <div className="admitted-details-group-wrapper">
                            <div className="patient-address admitted-detail-item">
                                <span>Address: </span>{admittedFormItem.address}
                            </div>
                            <div className="patient-pinCode admitted-detail-item">
                                <span>PinCode: </span>{admittedFormItem.pinCode}
                            </div>
                        </div>
                        <div className="admitted-details-group-wrapper">
                            <div className="patient-comments admitted-detail-item">
                                <span>Comments: </span>{admittedFormItem.comments}
                            </div>
                            <div className="patient-advance-paid admitted-detail-item">
                                <span>Advance Paid: </span>{admittedFormItem.advancePaid}
                            </div>
                        </div>
                    </div>
                ) : null}
            </>
        );
    }
}

export default AdmittedDetailsItemComponent;
