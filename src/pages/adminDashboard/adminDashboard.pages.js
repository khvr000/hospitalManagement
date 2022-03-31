import * as React from "react";
import { Helmet } from 'react-helmet';
import {connect} from "react-redux";
import {
    getAdmittedPatients,
    getPaymentDetailsForAdmissionNumber,
    savePaymentDetailsForAdmissionNumber, setEditModeForAdmitForm
} from "../../store/auth/auth.actions";
import AdminDashboardComponent from "../../components/admin-dashboard/admin-dashboard.component";
import {getAmountValidation, getDatasetNameValidation} from "../../utils/validations";
import {HttpCallStates} from "../../config/http.config";
import {withRouter} from "react-router-dom";


const paymentDetailsFormFreezeObject = Object.freeze( {
    roomRent: 0,
    surgeonFee: 0,
    otCharges: 0,
    anesthetist: 0,
    doctorFee: 0,
    otMedicine: 0,
    diagnosticCharges: 0,
    other: 0
});

class AdminDashboardPages extends React.Component<Props> {

    state = {
        paymentDetailsForm: {
            roomRent: 0,
            surgeonFee: 0,
            otCharges: 0,
            anesthetist: 0,
            doctorFee: 0,
            otMedicine: 0,
            diagnosticCharges: 0,
            other: 0
        },
        paymentDetailsFormSubmitted: false,
        selectedAdmissionNumber: null,
    }

    componentDidMount() {
        this.props.getAdmittedPatients();
    }

    componentDidUpdate(prevProps) {
        const { selectedAdmissionNumber } = this.state;
        if (this.props.setGetPaymentDetailsForAdmissionNumberCallStatus === HttpCallStates.SUCCESS && prevProps.setGetPaymentDetailsForAdmissionNumberCallStatus === HttpCallStates.LOADING) {
            this.setState({
                paymentDetailsForm: this.props.paymentDetailsData[selectedAdmissionNumber]
            });
        }
    }

    getBillDetailsFormValidation = (property, value) => {
        if (property) {
            const { error } = getAmountValidation(value);
            return error;
        }

        const { paymentDetailsForm } = this.state;

        return {
            isValid: true,
            error: ''
        }
        // this.setState()
        // return {
        //     isValid: false,
        //     error: {
        //         [type]: er
        //     }
        // }
    }

    handleBillDetailsFormChange = (type, e) => {
        const value = e.target.value;
        let errorMessageUpdates = {};

        errorMessageUpdates = {
            [type]: this.getBillDetailsFormValidation(type, value),
        };

        this.setState(prevState => {
            return {
                paymentDetailsForm: {
                    ...prevState.paymentDetailsForm,
                    [type]: value
                },
                billDetailsFormErrors: {
                    ...prevState.billDetailsFormErrors,
                    ...errorMessageUpdates,
                },
            }
        });
    }

    handleSetSelectedAdmissionNumber = (admissionNumber) => {
        this.setState({
            selectedAdmissionNumber: admissionNumber
        });
    }

    handleSetPaymentDetailsFormSubmittedStatus = (status) => {
        this.setState({
            paymentDetailsFormSubmitted: status
        })
    }

    handleSubmitPaymentDetailsForm = (selectedAdmissionNumber) => {
        const { paymentDetailsForm } = this.state;
        const { isValid, error: datasetErrors } = this.getBillDetailsFormValidation();

        if (!isValid) {
            return;
        }

        this.setState({
            paymentDetailsFormSubmitted: true,
            // paymentDetailsForm: paymentDetailsFormFreezeObject
        });
        this.props.savePaymentDetailsForAdmissionNumber(paymentDetailsForm, selectedAdmissionNumber);
    }

    onEditAdmitFormClick = (admissionNumber) => {
        this.props.setEditModeForAdmitForm(true, admissionNumber);
        this.props.history.push({
            pathname: '/admitForm'
        });
    }

    handleClearPaymentDetailsForm = () => {
        this.setState({
            paymentDetailsForm: paymentDetailsFormFreezeObject
        });
    }

    render() {
        const { admittedPatients } = this.props;
        const { paymentDetailsForm, billDetailsFormErrors, paymentDetailsFormSubmitted, selectedAdmissionNumber } = this.state;
        const admittedPatientsArray = Object.values(admittedPatients);
        return (
            <>
                <Helmet defer={false}>
                    <title>Hospital Management</title>
                    <meta
                        name="description"
                        content="AI Annotation tool for 3D and 2D bounding boxes, polygons, points, lanes. Supports instance and semantic segmentation."
                    />
                </Helmet>


                <div className="admin-dashboard-main-container">
                    <AdminDashboardComponent
                        selectedAdmissionNumber={selectedAdmissionNumber}
                        admittedPatientsArray={admittedPatientsArray}
                        handleBillDetailsFormChange={this.handleBillDetailsFormChange}
                        paymentDetailsForm={paymentDetailsForm}
                        billDetailsFormErrors={billDetailsFormErrors}
                        onSubmitPaymentDetailsForm={this.handleSubmitPaymentDetailsForm}
                        paymentDetailsFormSubmitted={paymentDetailsFormSubmitted}
                        getPaymentDetailsForAdmissionNumber={this.props.getPaymentDetailsForAdmissionNumber}
                        handleSetSelectedAdmissionNumber={this.handleSetSelectedAdmissionNumber}
                        handleSetPaymentDetailsFormSubmittedStatus={this.handleSetPaymentDetailsFormSubmittedStatus}
                        onEditAdmitFormClick={this.onEditAdmitFormClick}
                        onClearPaymentDetailsForm={this.handleClearPaymentDetailsForm}
                    />
                </div>

                {/*<div className="dashboard-container">*/}

                {/*</div>*/}

                {/*<div className="list-container">*/}
                {/*    {admittedPatientsArray.map(admittedPatientDataItem => (*/}
                {/*        <div>*/}
                {/*            {admittedPatientDataItem.patientName}*/}
                {/*        </div>*/}
                {/*    ))}*/}

                {/*</div>*/}
            </>
        )

    }
}

// export default AdminDashboardPages;
const mapStateToProps = state => {
    return {
        // selectedAdmissionNumber: state.auth.selectedAdmissionNumber,
        paymentDetailsData: state.auth.paymentDetailsData,
        admittedPatients: state.auth.admittedPatients,
        setGetPaymentDetailsForAdmissionNumberCallStatus: state.auth.setGetPaymentDetailsForAdmissionNumberCallStatus
    }
};

const mapDispatchToProps = dispatch => ({
    getAdmittedPatients: (...args) => dispatch(getAdmittedPatients(...args)),
    setEditModeForAdmitForm: (...args) => dispatch(setEditModeForAdmitForm(...args)),
    getPaymentDetailsForAdmissionNumber: (...args) => dispatch(getPaymentDetailsForAdmissionNumber(...args)),
    savePaymentDetailsForAdmissionNumber: (...args) => dispatch(savePaymentDetailsForAdmissionNumber(...args)),
});


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AdminDashboardPages));
