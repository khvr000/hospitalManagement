import React, {Component} from 'react';
import {FormControlLabel, FormGroup, FormLabel, Radio, RadioGroup, TextField} from "@material-ui/core";

import "./diagnostic-report-details.page.scss";
import {Button} from "@mui/material";
import { getDiagnosticReportNumberDetails,  saveDiagnosticReportNumberDetails} from "../../store/auth/auth.actions";
import {connect} from "react-redux";
import {HttpCallStates} from "../../config/http.config";
import DiagnosticReportDetailsComponent
    from "../../components/diagnostic-report/diagnostic-report-details/diagnostic-report-details.component";
import DiagnosticReportPreviewModalComponent
    from "../../components/diagnostic-report/diagnostic-report-preview-modal/diagnostic-report-preview-modal.component";


const MedicalBillStateFreezeObject = Object.freeze({
    diagnosticReportForm : {
        patientName: '',
        dateOfBirth: '',
        sex: '',
        mobile: undefined,
        reportNumber: undefined,
        diagnosticReportDetails: [
            {tabletName: '', quantity: null, price: null}
        ]
    },
    showPdfPreview: false
});

class DiagnosticReportPage extends Component {

    state = {
        diagnosticReportForm : {
            patientName: '',
            dateOfBirth: '',
            sex: '',
            mobile: undefined,
            reportNumber: undefined,
            diagnosticReportDetails: [
                {tabletName: '', quantity: null, price: null}
            ]
        },
        showPdfPreview: false
    }

    componentDidMount() {
        this.props.getDiagnosticReportNumberDetails();
    }

    componentDidUpdate(prevProps, prevState) {
        // getDiagnosticReportNumberDetailsCallStatus
        const { diagnosticReportNumber, getDiagnosticReportNumberDetailsCallStatus } = this.props;
        if (prevProps.getDiagnosticReportNumberDetailsCallStatus === HttpCallStates.LOADING && getDiagnosticReportNumberDetailsCallStatus === HttpCallStates.SUCCESS) {
            this.setState(prevState => ({
                ...prevState,
                diagnosticReportForm: {
                    ...prevState.diagnosticReportForm,
                    reportNumber: diagnosticReportNumber
                }
            }));
        }
    }

    handleAddNewMedicineItemClick = () => {
        const {diagnosticReportForm} = this.state;
        const existingMedicineDetails = diagnosticReportForm.diagnosticReportDetails.slice();
        existingMedicineDetails.push({
            tabletName: '', quantity: null, price: null
        });
        this.setState(prevState => ({
            diagnosticReportForm: {
                ...prevState.diagnosticReportForm,
                diagnosticReportDetails: existingMedicineDetails
            }
        }));
    };

    handleDeleteMedicineItemClick = (index) => {
        const { diagnosticReportForm } = this.state;
        const existingMedicineDetails = diagnosticReportForm.diagnosticReportDetails.slice();
        existingMedicineDetails.splice(index, 1);
        this.setState(prevState=> ({
            diagnosticReportForm: {
                ...prevState.diagnosticReportForm,
                diagnosticReportDetails: existingMedicineDetails
            }
        }));
    }

    handleDiagnosticReportFormChange = (type, e, index) => {
        const { diagnosticReportForm } = this.state;
        const existingMedicineDetails = diagnosticReportForm.diagnosticReportDetails.slice();
        const selectedItem = existingMedicineDetails[index];

        if (!(['patientName', 'dateOfBirth', 'sex', 'mobile', 'reportNumber'].includes(type))) {
            selectedItem[type] = e.target.value;
        }
        this.setState(prevState=> {
            if (['patientName', 'dateOfBirth', 'sex', 'mobile', 'reportNumber'].includes(type)) {
                return {
                    diagnosticReportForm: {
                        ...prevState.diagnosticReportForm,
                        [type]: e.target.value
                    }
                }
            }
            return {
                diagnosticReportForm: {
                    ...prevState.diagnosticReportForm,
                    diagnosticReportDetails: existingMedicineDetails
                }
            }
        });
    }

    resetDiagnosticReportForm = () => {
        this.setState({
            ...MedicalBillStateFreezeObject
        })
    }

    handleGenerateMedicalBillClick = () => {
        this.setState({
            showPdfPreview: true
        })

        const { diagnosticReportForm } = this.state;
        const invoiceDetailsToSend = {
            ...diagnosticReportForm,
            report_number: diagnosticReportForm.reportNumber + ''
        };

        this.props.saveDiagnosticReportNumberDetails(invoiceDetailsToSend);

        // this.resetDiagnosticReportForm();
    }

    toggleModal = () => {
        this.setState(prevState => ({
            ...prevState,
            showPdfPreview: !prevState.showPdfPreview
        }));
    }

    render() {

        const { diagnosticReportForm, showPdfPreview } = this.state;

        return (
            <div className="medical-bill-container">
                <h1 className="page-title">Diagnostic Report</h1>
                <div className="medical-bill-reset-button">
                    <Button variant="outlined" type="flatPrimary" onClick={this.resetDiagnosticReportForm}>Reset</Button>
                </div>
                <div className="medical-bill-content">
                    <div className="medical-bill-patient-details-wrapper">
                        <div className="mb-form-group-wrapper">
                            <FormGroup className="input-form-group">
                                <FormLabel
                                    className="form-label-name"
                                >
                                    Report Number
                                </FormLabel>
                                <TextField
                                    variant="outlined"
                                    size="small"
                                    value={diagnosticReportForm.reportNumber}
                                    onChange={(e) => this.handleDiagnosticReportFormChange('reportNumber', e)}
                                />
                            </FormGroup>
                            <FormGroup className="input-form-group">
                                <FormLabel
                                    className="form-label-name"
                                >
                                    Mobile
                                </FormLabel>
                                <TextField
                                    variant="outlined"
                                    size="small"
                                    // placeholder="patient name"
                                    value={diagnosticReportForm.mobile}
                                    onChange={(e) => this.handleDiagnosticReportFormChange('mobile', e)}
                                />
                                {/*{diagnosticReportForm?.mobile && <div className="input-form-error-text">{diagnosticReportForm.mobile}</div>}*/}
                            </FormGroup>
                        </div>
                        <div className="mb-form-group-wrapper">
                            <FormGroup className="input-form-group">
                                <FormLabel
                                    className="form-label-name"
                                >
                                    Patient Name
                                </FormLabel>
                                <TextField
                                    variant="outlined"
                                    size="small"
                                    value={diagnosticReportForm.patientName}
                                    onChange={(e) => this.handleDiagnosticReportFormChange('patientName', e)}
                                    // placeholder="patient name"
                                />
                                {/*{admitFormErrors?.patientName && <div className="input-form-error-text">{admitFormErrors.patientName}</div>}*/}
                            </FormGroup>
                            <FormGroup className="input-form-group">
                                <FormLabel
                                    className="form-label-name"
                                >
                                    Age
                                </FormLabel>
                                <TextField
                                    variant="outlined"
                                    size="small"
                                    // type="date"
                                    // defaultValue={dateOfToday}
                                    // inputProps={{ min: dateOfToday, max: "2020-05-31" }}
                                    // placeholder="patient name"
                                    value={diagnosticReportForm.dateOfBirth}
                                    onChange={(e) => this.handleDiagnosticReportFormChange('dateOfBirth', e)}
                                />
                                {/*{admitFormErrors?.dateOfBirth && <div className="input-form-error-text">{admitFormErrors.dateOfBirth}</div>}*/}
                            </FormGroup>
                        </div>

                        <div className="mb-form-group-wrapper">
                            <FormGroup className="radio-form-group">
                                <FormLabel
                                    className="form-label-name"
                                >
                                    Sex
                                </FormLabel>
                                <RadioGroup
                                    className="form-sex-input"
                                    value={diagnosticReportForm.sex}
                                    onChange={(e) => this.handleDiagnosticReportFormChange('sex', e)}
                                >
                                    <FormControlLabel control={<Radio/>} value="Male" label="Male"/>
                                    <FormControlLabel control={<Radio/>} value="Female" label="Female"/>
                                    <FormControlLabel control={<Radio/>} value="Other" label="Other"/>
                                </RadioGroup>
                            </FormGroup>

                        </div>


                    </div>
                    <DiagnosticReportDetailsComponent
                        diagnosticReportDetails={diagnosticReportForm.diagnosticReportDetails}
                        onDiagnosticReportFormChange={this.handleDiagnosticReportFormChange}
                        onAddNewMedicineItemClick={this.handleAddNewMedicineItemClick}
                        onDeleteMedicineItemClick={this.handleDeleteMedicineItemClick}
                    />
                </div>
                <div className="medical-bill-footer">
                    <Button variant="outlined" type="flatPrimary" onClick={this.handleGenerateMedicalBillClick}>Generate Diagnostic Report</Button>
                </div>

                {/*<PDFViewer className="pdf-viewer">*/}
                {/*    <MedicalBillPdfComponent*/}
                {/*        // admitForm={selectedAdmissionData}*/}
                {/*        // paymentDetailsForm={paymentDetailsForm}*/}
                {/*    />*/}
                {/*</PDFViewer>*/}

                <DiagnosticReportPreviewModalComponent
                    showModal={showPdfPreview}
                    toggleModal={this.toggleModal}
                    diagnosticReportForm={diagnosticReportForm}
                />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        diagnosticReportNumber: state.auth.diagnosticReportNumber,
        getDiagnosticReportNumberDetailsCallStatus: state.auth.getDiagnosticReportNumberDetailsCallStatus
    }
};

const mapDispatchToProps = dispatch => ({
    saveDiagnosticReportNumberDetails: (...args) => dispatch(saveDiagnosticReportNumberDetails(...args)),
    getDiagnosticReportNumberDetails: (...args) => dispatch(getDiagnosticReportNumberDetails(...args))
});


export default connect(mapStateToProps, mapDispatchToProps)(DiagnosticReportPage);
