import * as React from "react";

import "./interested-patients-dashboard.component.scss";
import {sortItems} from "../../utils/validations";
import {TextField} from "@material-ui/core";
import InterestedDetailsItemComponent from "./interested-details-item/interested-details-item.component";

type Props = {
    admittedPatientsArray: Array,
}

const AdmittedDataHeaderTitles = {
    admissionNumber: 'Admission Number',
    patientName: 'Patient Name',
    dateOfBirth: 'Date of Birth',
    sex: 'Sex',
    mobile: 'Mobile',
    alternateMobile: 'Alternate Mobile',
    careOf: 'Care Of',
    dateOfAdmission: 'Date Of Admission',
    dateOfSurgery: 'Date Of Surgery',
    dateOfDischarge: 'Date Of Discharge',
    advancePaid: 'Advance Paid',
    amountRemaining: 'Amount Remaining',
    totalAmount: 'Total Amount'
}

class InterestedPatientsDashboardComponent extends React.Component<Props> {

    state = {
        searchQuery: '',
        sortBy: 'admission_number',
        sortDirection: 'ascending',
        showModal: false,
        // selectedAdmissionNumber: null
    }

    toggleModal = () => {
        if (this.state.showModal) {
            this.props.handleSetPaymentDetailsFormSubmittedStatus(false);
        }

        this.setState(prevState => ({
            ...prevState,
            showModal: !prevState.showModal,
        }));

    }

    handleSortClick = (type) => {
        const { sortDirection, sortBy } = this.state;
        let newSortDirection;
        if (type === sortBy) {
            newSortDirection = sortDirection === 'ascending' ? 'descending' : 'ascending';
        } else {
            newSortDirection = 'ascending';
        }
        this.setState({
            sortBy: type,
            sortDirection: newSortDirection,
            selectedIndex: null
        });
    }

    handleSearchQuery = (e) => {

        const { admittedPatientsArray } = this.props;
        const searchText = e.target.value;
        this.setState({
            searchQuery: searchText.toLowerCase()
        });

    }

    getFilteredPatientsArray = () => {
        const { searchQuery, sortBy, sortDirection } = this.state;
        const {admittedPatientsArray } = this.props;
        const filteredPatientsArray = [];
        let sortedPatientsArray = [];
        admittedPatientsArray.forEach(patientAdmitItem => {
            if (patientAdmitItem.patientName.toLowerCase().includes(searchQuery) ||
                patientAdmitItem.interest_number.toLowerCase().includes(searchQuery) ||
                patientAdmitItem.mobile.toLowerCase().includes(searchQuery) ||
                patientAdmitItem.sex.toLowerCase().includes(searchQuery) ||
                patientAdmitItem.alternateMobile?.toLowerCase().includes(searchQuery)
            ) {
                filteredPatientsArray.push(patientAdmitItem);
            }
        });
        sortedPatientsArray = sortItems(filteredPatientsArray, sortDirection, sortBy);
        // admittedPatientsArray
        return sortedPatientsArray;
    }

    handleClick = (i) => {
        const updatedSelectedIndex = this.state.selectedIndex === i ? null : i;
        this.setState({
            selectedIndex: updatedSelectedIndex
        });
    }



    render() {

        const {admittedPatientsArray, paymentDetailsForm, onClearPaymentDetailsForm, selectedAdmissionNumber, handleBillDetailsFormChange, paymentDetailsFormSubmitted, billDetailsFormErrors, onSubmitPaymentDetailsForm, billDetailsForm, onEditAdmitFormClick } = this.props;
        const { sortDirection, sortBy, selectedIndex, showModal } = this.state;

        const filteredPatientsArray = this.getFilteredPatientsArray();


        return (
            <div className="admin-dashboard-container">
                <div className="dashboard-container-header">
                    <h1 className="dashboard-container-title">
                        Interested Patients
                    </h1>
                </div>
                <div className="dashboard-container-content">

                    <div className="dashboard-filter-container">
                        <TextField
                            className="dashboard-search-input"
                            onChange={this.handleSearchQuery}
                            variant="outlined"
                            size="small"
                            placeholder="search "
                        />
                    </div>

                    <div className="list-container">
                        <div className="admitted-details-item-header-content">
                            <div
                                className="admission-number admitted-detail-item"
                                onClick={() => this.handleSortClick('admission_number')}
                            >
                                {AdmittedDataHeaderTitles.admissionNumber}
                                {sortBy === 'admission_number' ? (
                                    <i className="material-icons-outlined dat-reports-dataset-team-sort">
                                        {sortDirection === 'descending' ? 'arrow_downward' : 'arrow_upward'}
                                    </i>
                                ) : null}
                            </div>
                            <div
                                className="patient-name admitted-detail-item"
                                onClick={() => this.handleSortClick('patientName')}
                            >
                                {AdmittedDataHeaderTitles.patientName}
                                {sortBy === 'patientName' ? (
                                    <i className="material-icons-outlined dat-reports-dataset-team-sort">
                                        {sortDirection === 'descending' ? 'arrow_downward' : 'arrow_upward'}
                                    </i>
                                ) : null}
                            </div>
                            <div
                                className="patient-sex admitted-detail-item"
                                onClick={() => this.handleSortClick('sex')}
                            >
                                {AdmittedDataHeaderTitles.sex}
                                {sortBy === 'sex' ? (
                                    <i className="material-icons-outlined dat-reports-dataset-team-sort">
                                        {sortDirection === 'descending' ? 'arrow_downward' : 'arrow_upward'}
                                    </i>
                                ) : null}
                            </div>
                            <div
                                className="patient-mobile admitted-detail-item"
                                onClick={() => this.handleSortClick('mobile')}
                            >
                                {AdmittedDataHeaderTitles.mobile}
                                {sortBy === 'mobile' ? (
                                    <i className="material-icons-outlined dat-reports-dataset-team-sort">
                                        {sortDirection === 'descending' ? 'arrow_downward' : 'arrow_upward'}
                                    </i>
                                ) : null}
                            </div>
                            <div
                                className="patient-alternateMobile admitted-detail-item"
                                // onClick={() => this.handleSortClick('alternateMobile')}
                            >
                                {AdmittedDataHeaderTitles.alternateMobile}
                            </div>
                            <div
                                className="patient-careOf admitted-detail-item"
                                // onClick={() => this.handleSortClick('careOf')}
                            >
                                {AdmittedDataHeaderTitles.careOf}
                            </div>
                        </div>

                        {filteredPatientsArray.map((admittedPatientDataItem, i) => (
                            <InterestedDetailsItemComponent
                                showAccordian={selectedIndex === i}
                                handleClick={() => this.handleClick(i)}
                                key={admittedPatientDataItem.patientName}
                                admittedFormItem={admittedPatientDataItem}
                                onEditAdmitFormClick={onEditAdmitFormClick}
                            />
                        ))}
                    </div>
                </div>

            </div>
        );
    }
}

export default InterestedPatientsDashboardComponent;
