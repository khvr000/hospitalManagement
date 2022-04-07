import * as React from "react";
import {Helmet} from "react-helmet";

import "./interest-form.scss";
import {
    getInterestFilledPatients,
    saveInterestForm,
    setEditModeForAdmitForm
} from "../../store/auth/auth.actions";
import {connect} from "react-redux";
import {
    getAddressValidation,
    getAlternateMobileValidation, getAmountValidation, getArrayValidation,
    getDatasetNameValidation, getDateValidation,
    getMobileValidation, getTextValidation
} from "../../utils/validations";
import InterestFormComponent from "../../components/interest-form/interest-form.component";

const adminStateFreezeObject = Object.freeze({
    interest_number: '',
    patientName: '',
    dateOfBirth: '',
    sex: 'Male',
    careOf: '',
    mobile: '',
    alternateMobile: '',
    address: '',
    pinCode: '',
    diagnosis: [],
    comments: '',
});

class InterestFormPage extends React.Component<Props> {

    state = {
        admitForm: {
            interest_number: '',
            patientName: '',
            dateOfBirth: '',
            sex: 'Male',
            careOf: '',
            mobile: '',
            alternateMobile: '',
            address: '',
            pinCode: '',
            diagnosis: [],
            comments: '',
        },
        admitFormErrors: {

        }
    }


    componentDidMount() {
        this.props.getInterestFilledPatients();
        const { editModeForAdmitForm, admissionNumberForEditMode, admittedPatients } = this.props;
        if (editModeForAdmitForm && admissionNumberForEditMode) {
            const admitFormDetailsToEdit = admittedPatients.find(patient => patient.interest_number === admissionNumberForEditMode);
            // this.props.setEditModeForAdmitForm(true, null);
            this.setState({
                admitForm: admitFormDetailsToEdit
            });
        }
    }

    componentDidUpdate(prevProps) {
        // const { editModeForAdmitForm, admissionNumberForEditMode, admittedPatients } = this.props;
        // if (editModeForAdmitForm && admissionNumberForEditMode) {
        //     const admitFormDetailsToEdit = admittedPatients.find(patient => patient.interest_number === admissionNumberForEditMode);
        //     this.props.setEditModeForAdmitForm(true, null);
        //     this.setState({
        //         admitForm: admitFormDetailsToEdit
        //     });
        // }
    }




    resetAdmitForm = () => {
        this.setState({
            admitForm: adminStateFreezeObject
        });
    }

    handleEditModeClose = () => {
        this.props.setEditModeForAdmitForm(true, null);
        this.resetAdmitForm();
    }


    getAdmitFormValidation = (property, value) => {
        if (property === 'patientName') {
            const { error } = getDatasetNameValidation(value);
            return error;
        }

        if (property === 'sex') {
            const { error } = getTextValidation(value);
            return error;
        }

        if (property === 'interest_number') {
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

        if (property === 'diagnosis') {
            const { error } = getArrayValidation(value);
            return error;
        }


        if (property === 'comments' || property === 'careOf') {
            const { error } = getTextValidation(value);
            return error;
        }

        if (property === 'dateOfBirth') {
            const { error } = getDateValidation(value);
            return error;
        }

        const  { admitForm } = this.state;
        const patientName = getDatasetNameValidation(this.state.admitForm.patientName);
        const admissionNumber = getAddressValidation(this.state.admitForm.interest_number);
        const mobile = getMobileValidation(this.state.admitForm.mobile);
        const dateOfBirth = getDateValidation(this.state.admitForm.dateOfBirth);
        const careOf = getTextValidation(this.state.admitForm.careOf);
        const address = getAddressValidation(admitForm.address);
        const diagnosis = getArrayValidation(admitForm.diagnosis);

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
                    diagnosis: diagnosis.error,
                },
            };
        });

        return {
            isValid: patientName.isValid && admissionNumber.isValid && mobile.isValid && dateOfBirth.isValid && address.isValid && careOf.isValid && diagnosis.isValid,
            error: {
                patientName: patientName.error,
                admissionNumber: admissionNumber.error,
                mobile: mobile.error,
                dateOfBirth: dateOfBirth.error,
                address: address.error,
                careOf: careOf.error,
                diagnosis: diagnosis.error,
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
        } else if (type === 'operatedFor' || type === 'diagnosis') {
            value = e;
        }
        else if (type === 'agreeTerms') {
            value = e.target.checked;
        } else {
            value = e.target.value;
        }

        errorMessageUpdates = {
            [type]: this.getAdmitFormValidation(type, value),
        };

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
        const { saveInterestForm } = this.props;

        const { isValid, error: datasetErrors } = this.getAdmitFormValidation();
        console.log(datasetErrors);
        if (!isValid) {
            return;
        }

        saveInterestForm(admitForm);
        this.resetAdmitForm();
    }

    render() {
        const { editModeForAdmitForm } = this.props;
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
                    <InterestFormComponent
                        admitForm={admitForm}
                        admitFormErrors={admitFormErrors}
                        editModeForAdmitForm={editModeForAdmitForm}
                        onEditModeClose={this.handleEditModeClose}
                        handleAdmitFormChange={this.handleAdmitFormChange}
                        onSubmitAdminForm={this.handleSubmitAdmitForm}
                        handleImageFileDelete={this.handleImageFileDelete}
                    />
                </div>

            </>
        )

    }
}

// export default InterestFormPage;
const mapStateToProps = state => {
    return {
        admittedPatients: state.auth.admittedPatients,
        editModeForAdmitForm: state.auth.editModeForAdmitForm,
        admissionNumberForEditMode: state.auth.admissionNumberForEditMode
    }
};

const mapDispatchToProps = dispatch => ({
    saveInterestForm: (...args) => dispatch(saveInterestForm(...args)),
    getInterestFilledPatients: (...args) => dispatch(getInterestFilledPatients(...args)),
    setEditModeForAdmitForm: (...args) => dispatch(setEditModeForAdmitForm(...args)),
});


export default connect(mapStateToProps, mapDispatchToProps)(InterestFormPage);
