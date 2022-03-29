import * as React from "react";
import {Helmet} from "react-helmet";

import "./admit-form.page.scss";
import AdmitFormComponent from "../../components/admit-form/admit-form.component";
import {
    resetScoreTrackerPlayerData, resetScoreTrackerPlayerScores,
    saveScoreTrackerCurrentGame,
    setScoreTrackerPlayerNames,
    setScoreTrackerPlayerScore
} from "../../store/score-tracker/score-tracker.actions";
import {getAdmittedPatients, saveAdmitForm, setEditModeForAdmitForm} from "../../store/auth/auth.actions";
import {connect} from "react-redux";
import {
    getAddressValidation,
    getAlternateMobileValidation, getAmountValidation, getArrayValidation,
    getDatasetNameValidation, getDateValidation,
    getMobileValidation, getTextValidation
} from "../../utils/validations";

const adminStateFreezeObject = Object.freeze({
    patientName: '',
    dateOfBirth: '',
    sex: 'Male',
    careOf: '',
    mobile: '',
    alternateMobile: '',
    address: '',
    pinCode: '',
    aadhaar: [],
    dateOfAdmission: '',
    dateOfSurgery: '',
    dateOfDischarge: '',
    operatedFor: [],
    diagnosis: [],
    advancePaid: '',
    amountRemaining: '',
    uploadDocuments: [],
    comments: '',
    agreeTerms: false
});

class AdmitFormPage extends React.Component<Props> {

    state = {
        admitForm: {
            patientName: '',
            dateOfBirth: '',
            sex: 'Male',
            careOf: '',
            mobile: '',
            alternateMobile: '',
            address: '',
            pinCode: '',
            aadhaar: [],
            dateOfAdmission: '',
            dateOfSurgery: '',
            dateOfDischarge: '',
            operatedFor: [],
            diagnosis: [],
            advancePaid: '',
            amountRemaining: '',
            uploadDocuments: [],
            comments: '',
            agreeTerms: false
        },
        admitFormErrors: {

        }
    }


    componentDidMount() {
        this.props.getAdmittedPatients();
    }

    componentDidUpdate(prevProps) {
        const { editModeForAdmitForm, admissionNumberForEditMode, admittedPatients } = this.props;
        if (editModeForAdmitForm && admissionNumberForEditMode) {
            const admitFormDetailsToEdit = admittedPatients.find(patient => patient.admission_number === admissionNumberForEditMode);
            this.props.setEditModeForAdmitForm(true, null);
            this.setState({
                admitForm: admitFormDetailsToEdit
            });
        }
    }


    resetAdmitForm = () => {
        this.setState({
            admitForm: adminStateFreezeObject
        });
    }


    getAdmitFormValidation = (property, value) => {
        if (property === 'patientName') {
            const { error } = getDatasetNameValidation(value);
            return error;
        }

        if (property === 'admission_number') {
            const { error } = getAddressValidation(value);
            return error;
        }

        if (property === 'mobile') {
            const { error } = getMobileValidation(value);
            return error;
        }

        if (property === 'alternateMobile') {
            const { error } = getAlternateMobileValidation(value);
            return error;
        }

        if (property === 'address') {
            const { error } = getAddressValidation(value);
            return error;
        }

        if (property === 'pinCode') {
            const { error } = getDatasetNameValidation(value);
            return error;
        }

        if (property === 'operatedFor') {
            const { error } = getArrayValidation(value);
            return error;
        }

        if (property === 'diagnosis') {
            const { error } = getArrayValidation(value);
            return error;
        }

        if (property === 'advancePaid') {
            const { error } = getAmountValidation(value);
            return error;
        }

        if (property === 'amountRemaining') {
            const { error } = getAmountValidation(value);
            return error;
        }

        if (property === 'comments' || property === 'careOf') {
            const { error } = getTextValidation(value);
            return error;
        }

        if (property === 'dateOfBirth' || property === 'dateOfAdmission' || property === 'dateOfSurgery' || property === 'dateOfDischarge') {
            const { error } = getDateValidation(value);
            return error;
        }
        if (property === 'aadhaar' || property === 'uploadDocuments') {
            return '';
        }

        const  { admitForm } = this.state;
        const patientName = getDatasetNameValidation(this.state.admitForm.patientName);
        const admissionNumber = getAddressValidation(this.state.admitForm.admission_number);
        const mobile = getMobileValidation(this.state.admitForm.mobile);
        const dateOfBirth = getDateValidation(this.state.admitForm.dateOfBirth);
        const careOf = getTextValidation(this.state.admitForm.careOf);
        const dateOfAdmission = getDateValidation(this.state.admitForm.dateOfAdmission);
        const dateOfSurgery = getDateValidation(this.state.admitForm.dateOfSurgery);
        const dateOfDischarge = getDateValidation(this.state.admitForm.dateOfDischarge);
        const address = getAddressValidation(admitForm.address);
        const operatedFor = getArrayValidation(admitForm.operatedFor);
        const diagnosis = getArrayValidation(admitForm.diagnosis);
        const advancePaid = getAmountValidation(admitForm.advancePaid);
        const amountRemaining = getAmountValidation(admitForm.amountRemaining);


        this.setState((prevState) => {
            return {
                admitFormErrors: {
                    ...prevState.admitFormErrors,
                    patientName: patientName.error,
                    admissionNumber: admissionNumber.error,
                    mobile: mobile.error,
                    dateOfBirth: dateOfBirth.error,
                    address: address.error,
                    careOf: careOf.error,
                    operatedFor: operatedFor.error,
                    diagnosis: diagnosis.error,
                    advancePaid: advancePaid.error,
                    amountRemaining: amountRemaining.error,
                    dateOfAdmission: dateOfAdmission.error,
                    dateOfSurgery: dateOfSurgery.error,
                    dateOfDischarge: dateOfDischarge.error,
                },
            };
        });

        return {
            isValid: patientName.isValid && admissionNumber.isValid && mobile.isValid && dateOfBirth.isValid && address.isValid && careOf.isValid && operatedFor.isValid && diagnosis.isValid &&
            advancePaid.isValid && amountRemaining.isValid && dateOfAdmission.isValid && dateOfSurgery.isValid && dateOfDischarge.isValid,
            error: {
                patientName: patientName.error,
                admissionNumber: admissionNumber.error,
                mobile: mobile.error,
                dateOfBirth: dateOfBirth.error,
                address: address.error,
                careOf: careOf.error,
                operatedFor: operatedFor.error,
                diagnosis: diagnosis.error,
                advancePaid: advancePaid.error,
                amountRemaining: amountRemaining.error,
                dateOfAdmission: dateOfAdmission.error,
                dateOfSurgery: dateOfSurgery.error,
                dateOfDischarge: dateOfDischarge.error,
            },
        };
    }

    handleImageFileDelete = (type, index) => {
        const { admitForm } = this.state;
        const selectedFieldFilesArray = [...admitForm[type]];
        selectedFieldFilesArray.splice(index, 1);
        this.setState(prevState => ({
            ...prevState,
            admitForm: {
                ...prevState.admitForm,
                [type]: selectedFieldFilesArray
            }
        }));
    };

    handleAdmitFormChange = (type, e) => {
        let value;
        let errorMessageUpdates = {};

        // if (type === 'operatedFor') {
        //     console.log('operatedFor ', e);
        //     value = [...this.state.admitForm.operatedFor, e]
        // }

        if (type === 'aadhaar' || type === 'uploadDocuments') {
            // push new file to array
            console.log('files received', e);
            value = [ ...this.state.admitForm[type], ...e.target.value];
        }
        // else if (type === 'operatedFor') {
        //     const newValue = e.target.value;
        //     const prevOperatedForArray = [...this.state.admitForm.operatedFor];
        //     const newValueIndex = prevOperatedForArray.indexOf(newValue);
        //     if (newValueIndex > -1) {
        //         prevOperatedForArray.splice(newValueIndex, 1);
        //         value = prevOperatedForArray;
        //     } else {
        //         value = [ ...this.state.admitForm.operatedFor, newValue];
        //     }
        // }
        else if (type === 'agreeTerms') {
            value = e.target.checked;
        } else {
            value = e.target.value;
        }

        errorMessageUpdates = {
            [type]: this.getAdmitFormValidation(type, value),
        };

        // if (type === 'comments') {
        //     errorMessageUpdates = {
        //         [type]: this.getAdmitFormValidation(type, value),
        //     };
        // }

        this.setState(prevState => {
            return {
                admitForm: {
                    ...prevState.admitForm,
                    [type]: value
                },
                admitFormErrors: {
                    ...prevState.admitFormErrors,
                    ...errorMessageUpdates,
                },
            }
        });
    }

    handleSubmitAdmitForm = () => {
        const { admitForm } = this.state;
        const { saveAdmitForm } = this.props;

        const { isValid, error: datasetErrors } = this.getAdmitFormValidation();
        console.log(datasetErrors);
        if (!isValid) {
            return;
        }

        saveAdmitForm(admitForm);
        this.resetAdmitForm();
    }

    render() {
        const { } = this.props;
        const { admitForm, admitFormErrors } = this.state;
        return (
            <>
                <Helmet defer={false}>
                    <title>Hospital Management</title>
                    <meta
                        name="description"
                        content="AI Annotation tool for 3D and 2D bounding boxes, polygons, points, lanes. Supports instance and semantic segmentation."
                    />
                </Helmet>
                <div className="admit-form-page-content">
                    <AdmitFormComponent
                        admitForm={admitForm}
                        admitFormErrors={admitFormErrors}
                        handleAdmitFormChange={this.handleAdmitFormChange}
                        onSubmitAdminForm={this.handleSubmitAdmitForm}
                        handleImageFileDelete={this.handleImageFileDelete}
                    />
                </div>

            </>
        )

    }
}

// export default AdmitFormPage;
const mapStateToProps = state => {
    return {
        admittedPatients: state.auth.admittedPatients,
        editModeForAdmitForm: state.auth.editModeForAdmitForm,
        admissionNumberForEditMode: state.auth.admissionNumberForEditMode
    }
};

const mapDispatchToProps = dispatch => ({
    saveAdmitForm: (...args) => dispatch(saveAdmitForm(...args)),
    getAdmittedPatients: (...args) => dispatch(getAdmittedPatients(...args)),
    setEditModeForAdmitForm: (...args) => dispatch(setEditModeForAdmitForm(...args)),
});


export default connect(mapStateToProps, mapDispatchToProps)(AdmitFormPage);
