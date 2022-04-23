import React, {Component} from 'react';
import {FormControlLabel, FormGroup, FormLabel, Radio, RadioGroup, TextField} from "@material-ui/core";

import "./medicalBill.page.scss";
import MedicalBillMedicineDetailsComponent
    from "../../components/medical-bill/medical-bill-medicine-details/medical-bill-medicine-details.component";
import {Button} from "@mui/material";
import MedicalBillPreviewModalComponent
    from "../../components/medical-bill/medical-bill-preview-modal/medical-bill-preview-modal.component";
import {PDFViewer} from "@react-pdf/renderer";
import MedicalBillPdfComponent from "../../components/medical-bill/medical-bill-pdf/medical-bill-pdf.component";

class MedicalBillPage extends Component {

    state = {
        medicalBillForm : {
            patientName: '',
            age: '',
            sex: '',
            medicineDetails: [
                {tabletName: '', quantity: null, rate: null}
            ]
        },
        showPdfPreview: false
    }

    handleAddNewMedicineItemClick = () => {
        const {medicalBillForm} = this.state;
        const existingMedicineDetails = medicalBillForm.medicineDetails.slice();
        existingMedicineDetails.push({
            tabletName: '', quantity: null, rate: null
        });
        this.setState(prevState => ({
            medicalBillForm: {
                ...prevState.medicalBillForm,
                medicineDetails: existingMedicineDetails
            }
        }));
    };

    handleDeleteMedicineItemClick = (index) => {
        const { medicalBillForm } = this.state;
        const existingMedicineDetails = medicalBillForm.medicineDetails.slice();
        existingMedicineDetails.splice(index, 1);
        this.setState(prevState=> ({
            medicalBillForm: {
                ...prevState.medicalBillForm,
                medicineDetails: existingMedicineDetails
            }
        }));
    }

    handleMedicalBillFormChange = (type, e, index) => {
        const { medicalBillForm } = this.state;
        const existingMedicineDetails = medicalBillForm.medicineDetails.slice();
        const selectedItem = existingMedicineDetails[index];
        selectedItem[type] = e.target.value;
        this.setState(prevState=> ({
            medicalBillForm: {
                ...prevState.medicalBillForm,
                medicineDetails: existingMedicineDetails
            }
        }));
    }

    handleGenerateMedicalBillClick = () => {
        this.setState({
            showPdfPreview: true
        })
    }

    toggleModal = () => {
        this.setState(prevState => ({
            ...prevState,
            showPdfPreview: !prevState.showPdfPreview
        }));
    }

    render() {

        const { medicalBillForm, showPdfPreview } = this.state;

        return (
            <div className="medical-bill-container">
                <h1 className="page-title">Medical Bill</h1>
                <div className="medical-bill-content">
                    <div className="medical-bill-patient-details-wrapper">
                        <div className="mb-form-group-wrapper">
                            <FormGroup className="input-form-group">
                                <FormLabel
                                    className="form-label-name"
                                >
                                    Patient Name *
                                </FormLabel>
                                <TextField
                                    variant="outlined"
                                    size="small"
                                    value={medicalBillForm.patientName}
                                    onChange={(e) => this.handleMedicalBillFormChange('patientName', e)}
                                    // placeholder="patient name"
                                />
                                {/*{admitFormErrors?.patientName && <div className="input-form-error-text">{admitFormErrors.patientName}</div>}*/}
                            </FormGroup>
                            <FormGroup className="input-form-group">
                                <FormLabel
                                    className="form-label-name"
                                >
                                    Date of Birth
                                </FormLabel>
                                <TextField
                                    variant="outlined"
                                    size="small"
                                    type="date"
                                    // defaultValue={dateOfToday}
                                    // inputProps={{ min: dateOfToday, max: "2020-05-31" }}
                                    // placeholder="patient name"
                                    value={medicalBillForm.dateOfBirth}
                                    onChange={(e) => this.handleMedicalBillFormChange('dateOfBirth', e)}
                                />
                                {/*{admitFormErrors?.dateOfBirth && <div className="input-form-error-text">{admitFormErrors.dateOfBirth}</div>}*/}
                            </FormGroup>
                        </div>

                        <div className="mb-form-group-wrapper">
                            <FormGroup className="radio-form-group">
                                <FormLabel
                                    className="form-label-name"
                                >
                                    Sex *
                                </FormLabel>
                                <RadioGroup
                                    className="form-sex-input"
                                    value={medicalBillForm.sex}
                                    onChange={(e) => this.handleMedicalBillFormChange('sex', e)}
                                >
                                    <FormControlLabel control={<Radio/>} value="Male" label="Male"/>
                                    <FormControlLabel control={<Radio/>} value="Female" label="Female"/>
                                    <FormControlLabel control={<Radio/>} value="Other" label="Other"/>
                                </RadioGroup>
                            </FormGroup>
                        </div>


                    </div>
                    <MedicalBillMedicineDetailsComponent
                        medicineDetails={medicalBillForm.medicineDetails}
                        onMedicalBillFormChange={this.handleMedicalBillFormChange}
                        onAddNewMedicineItemClick={this.handleAddNewMedicineItemClick}
                        onDeleteMedicineItemClick={this.handleDeleteMedicineItemClick}
                    />
                </div>
                <div className="medical-bill-footer">
                    <Button variant="outlined" type="flatPrimary" onClick={this.handleGenerateMedicalBillClick}>Generate Medical Bill</Button>
                </div>

                {/*<PDFViewer className="pdf-viewer">*/}
                {/*    <MedicalBillPdfComponent*/}
                {/*        // admitForm={selectedAdmissionData}*/}
                {/*        // paymentDetailsForm={paymentDetailsForm}*/}
                {/*    />*/}
                {/*</PDFViewer>*/}

                <MedicalBillPreviewModalComponent
                    showModal={showPdfPreview}
                    toggleModal={this.toggleModal}
                />
            </div>
        );
    }
}

export default MedicalBillPage;
