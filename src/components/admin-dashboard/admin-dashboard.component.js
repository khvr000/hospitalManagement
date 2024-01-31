import * as React from "react";
import AdmittedDetailsItemComponent from "./admitted-details-item/admitted-details-item.component";

import "./admin-dashboard.component.scss";
import {sortItems} from "../../utils/validations";
import {TextField} from "@material-ui/core";
import ReactDocxComponent from "../react-docx/reactDocx.component";
import { PDFViewer } from '@react-pdf/renderer';
import PaymentBreakupModalComponent from "../paymentBreakupModal/paymentBreakupModal.component";

type Props = {
    admittedPatientsArray: Array,
    handleBillDetailsFormChange: Function
}

const AdmittedDataHeaderTitles = {
    admissionNumber: 'Admission Number',
    patientName: 'Patient Name',
    dateOfBirth: 'Date of Birth',
    sex: 'Sex',
    mobile: 'Mobile',
    alternateMobile: 'Alternate Mobile',
    careOf: 'Care of',
    dateOfAdmission: 'Date of Admission',
    dateOfSurgery: 'Date of Surgery',
    dateOfDischarge: 'Date of Discharge',
    advancePaid: 'Advance Paid',
    amountRemaining: 'Amount Remaining',
    totalAmount: 'Total Amount'
}

class AdminDashboardComponent extends React.Component<Props> {

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
                patientAdmitItem.admission_number.toLowerCase().includes(searchQuery) ||
                patientAdmitItem.mobile.toLowerCase().includes(searchQuery) ||
                patientAdmitItem.sex.toLowerCase().includes(searchQuery) ||
                patientAdmitItem.alternateMobile?.toLowerCase().includes(searchQuery) ||
                // patientAdmitItem.operatedFor?.toLowerCase().includes(searchQuery) ||
                // patientAdmitItem.diagnosis?.toLowerCase().includes(searchQuery) ||
                patientAdmitItem.advancePaid?.toLowerCase().includes(searchQuery) ||
                patientAdmitItem.amountRemaining?.toLowerCase().includes(searchQuery)
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

    handlePrintClick = (admissionNumber) => {
        this.toggleModal();
        this.props.handleSetSelectedAdmissionNumber(admissionNumber);
        this.props.getPaymentDetailsForAdmissionNumber(admissionNumber);
    }



    render() {

        const {admittedPatientsArray, paymentDetailsForm, onClearPaymentDetailsForm, selectedAdmissionNumber, handleBillDetailsFormChange, paymentDetailsFormSubmitted, billDetailsFormErrors, onSubmitPaymentDetailsForm, billDetailsForm, onEditAdmitFormClick } = this.props;
        const { sortDirection, sortBy, selectedIndex, showModal } = this.state;

        const filteredPatientsArray = this.getFilteredPatientsArray();


        return (
            <div className="admin-dashboard-container">
                <div className="dashboard-container-header">
                    <h1 className="dashboard-container-title">
                        Dashboard
                    </h1>
                </div>
                <div className="dashboard-container-content">

                    <div className="dashboard-filter-container">
                        <TextField
                            className="dashboard-search-input"
                            onChange={this.handleSearchQuery}
                            variant="outlined"
                            size="small"
                            placeholder="Search "
                        />
                        {/*<input  onChange={this.handleSearchQuery}/>*/}
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
                            {/*<div*/}
                            {/*    className="patient-dob admitted-detail-item"*/}
                            {/*    onClick={() => this.handleSortClick('dateOfBirth')}*/}
                            {/*>*/}
                            {/*    {AdmittedDataHeaderTitles.dateOfBirth}*/}
                            {/*    {sortBy === 'dateOfBirth' ? (*/}
                            {/*        <i className="material-icons-outlined dat-reports-dataset-team-sort">*/}
                            {/*            {sortDirection === 'descending' ? 'arrow_downward' : 'arrow_upward'}*/}
                            {/*        </i>*/}
                            {/*    ) : null}*/}
                            {/*</div>*/}
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
                            <div className="patient-date-of-admission admitted-detail-item"
                                 onClick={() => this.handleSortClick('dateOfAdmission')}
                            >
                                {AdmittedDataHeaderTitles.dateOfAdmission}
                                {sortBy === 'dateOfAdmission' ? (
                                    <i className="material-icons-outlined dat-reports-dataset-team-sort">
                                        {sortDirection === 'descending' ? 'arrow_downward' : 'arrow_upward'}
                                    </i>
                                ) : null}
                            </div>
                            {/*<div className="patient-date-of-surgery admitted-detail-item"*/}
                            {/*     onClick={() => this.handleSortClick('dateOfSurgery')}*/}
                            {/*>*/}
                            {/*    {AdmittedDataHeaderTitles.dateOfSurgery}*/}
                            {/*    {sortBy === 'dateOfSurgery' ? (*/}
                            {/*        <i className="material-icons-outlined dat-reports-dataset-team-sort">*/}
                            {/*            {sortDirection === 'descending' ? 'arrow_downward' : 'arrow_upward'}*/}
                            {/*        </i>*/}
                            {/*    ) : null}*/}
                            {/*</div>*/}
                            <div className="patient-date-of-surgery admitted-detail-item"
                                 onClick={() => this.handleSortClick('dateOfDischarge')}
                            >
                                {AdmittedDataHeaderTitles.dateOfDischarge}
                                {sortBy === 'dateOfDischarge' ? (
                                    <i className="material-icons-outlined dat-reports-dataset-team-sort">
                                        {sortDirection === 'descending' ? 'arrow_downward' : 'arrow_upward'}
                                    </i>
                                ) : null}
                            </div>
                            {/*<div className="patient-advance-paid admitted-detail-item"*/}
                            {/*     onClick={() => this.handleSortClick('advancePaid')}*/}
                            {/*>*/}
                            {/*    {AdmittedDataHeaderTitles.advancePaid}*/}
                            {/*    {sortBy === 'advancePaid' ? (*/}
                            {/*        <i className="material-icons-outlined dat-reports-dataset-team-sort">*/}
                            {/*            {sortDirection === 'descending' ? 'arrow_downward' : 'arrow_upward'}*/}
                            {/*        </i>*/}
                            {/*    ) : null}*/}
                            {/*</div>*/}
                            <div className="patient-amount-remaining admitted-detail-item"
                                 onClick={() => this.handleSortClick('amountRemaining')}
                            >
                                {AdmittedDataHeaderTitles.totalAmount}
                                {sortBy === 'totalAmount' ? (
                                    <i className="material-icons-outlined dat-reports-dataset-team-sort">
                                        {sortDirection === 'descending' ? 'arrow_downward' : 'arrow_upward'}
                                    </i>
                                ) : null}
                            </div>
                        </div>

                        {filteredPatientsArray.map((admittedPatientDataItem, i) => (
                            <AdmittedDetailsItemComponent
                                showAccordian={selectedIndex === i}
                                handleClick={() => this.handleClick(i)}
                                key={admittedPatientDataItem.patientName}
                                admittedFormItem={admittedPatientDataItem}
                                onPrintClick={this.handlePrintClick}
                                onEditAdmitFormClick={onEditAdmitFormClick}
                            />
                        ))}
                    </div>
                </div>
                <div className="">
                    <PaymentBreakupModalComponent
                        toggleModal={this.toggleModal}
                        showModal={showModal}
                        onSubmitPaymentDetailsForm={() => onSubmitPaymentDetailsForm(selectedAdmissionNumber)}
                        handleBillDetailsFormChange={handleBillDetailsFormChange}
                        billDetailsFormErrors={billDetailsFormErrors}
                        paymentDetailsFormSubmitted={paymentDetailsFormSubmitted}
                        admittedPatientsArray={admittedPatientsArray}
                        selectedAdmissionNumber={selectedAdmissionNumber}
                        paymentDetailsForm={paymentDetailsForm}
                        onClearPaymentDetailsForm={onClearPaymentDetailsForm}
                        // billDetailsForm={billDetailsForm}
                    />
                </div>
                {/*{admittedPatientsArray[0] ? (*/}
                {/*    <div className="pdf-viewer">*/}
                {/*        <PDFViewer className="pdf-viewer">*/}
                {/*            <ReactDocxComponent*/}
                {/*                admitForm={admittedPatientsArray[0]}*/}
                {/*            />*/}
                {/*        </PDFViewer>*/}
                {/*    </div>*/}
                {/*) : null}*/}

            </div>
        );
    }
}

export default AdminDashboardComponent;
