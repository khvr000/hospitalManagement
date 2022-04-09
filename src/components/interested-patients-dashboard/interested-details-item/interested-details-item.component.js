import * as React from "react";
import {Button} from "@material-ui/core";
import {getFormattedStringFromStringList} from "../../../utils/formatUtils";


import "./interested-details-item.component.scss";

type Props = {
    admittedFormItem: Object,
}

class InterestedDetailsItemComponent extends React.Component<Props> {

    handlePrintClick = () => {
        const { admittedFormItem, onPrintClick } = this.props;
        const { admission_number } = admittedFormItem;
        onPrintClick(admission_number);
    }

    formatDateString = (dateString) => {
        if (!dateString) {
            return '';
        }
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
                        {admittedFormItem.interest_number}
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
                    <div className="patient-date-added admitted-detail-item">
                        {this.formatDateString(admittedFormItem.dateAdded)}
                    </div>
                </div>
                {showAccordian? (
                    <div className="admitted-details-item-additional-content">
                        <div className="admitted-details-group-wrapper">
                            <div className="patient-dob admitted-detail-item">
                                <span>Date of Birth:</span> {this.formatDateString(admittedFormItem.dateOfBirth)}
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
                        </div>
                    </div>
                ) : null}
            </>
        );
    }
}

export default InterestedDetailsItemComponent;
