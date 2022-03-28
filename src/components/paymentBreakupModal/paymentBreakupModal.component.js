import * as React from "react";
import {Button, FormGroup, FormLabel, Modal, TextField} from "@material-ui/core";

import "./paymentBreakupModal.scss";
import classNames from "classnames";
import {PDFViewer} from "@react-pdf/renderer";
import ReactDocxComponent from "../react-docx/reactDocx.component";

const billDetailsForm = {
    roomRent: 'roomRent'
}

class PaymentBreakupModalComponent extends React.Component {

    calculateTotal = (paymentDetailsForm) => {
        return parseInt(paymentDetailsForm.roomRent || 0)
            + parseInt(paymentDetailsForm.surgeonFee || 0) + parseInt(paymentDetailsForm.otCharges || 0)
            + parseInt(paymentDetailsForm.anesthetist || 0) + parseInt(paymentDetailsForm.doctorFee || 0)
            + parseInt(paymentDetailsForm.otMedicine || 0) + parseInt(paymentDetailsForm.diagnosticCharges || 0)
            + parseInt(paymentDetailsForm.other || 0);
    }

    render() {

        const { toggleModal, showModal, paymentDetailsForm = {}, selectedAdmissionNumber, admittedPatientsArray, paymentDetailsFormSubmitted, handleBillDetailsFormChange, onSubmitPaymentDetailsForm, billDetailsFormErrors } = this.props;
        const selectedAdmissionData = admittedPatientsArray.find(item => item.admission_number === selectedAdmissionNumber);
        const admitFormTotalAmount = selectedAdmissionData ? parseInt(selectedAdmissionData.advancePaid) + parseInt(selectedAdmissionData.amountRemaining): 0;
        const dynamicTotalFromInput = this.calculateTotal(paymentDetailsForm);
        return (
            <>
                <Modal
                    className={classNames('', {'modal-wrapper-container': showModal})}
                    open={showModal}
                    onClose={toggleModal}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    {!paymentDetailsFormSubmitted? (
                        <div className="modal-container">
                            <div className="modal-title-container">
                                <div className="modal-title">
                                    <h2>Enter the payment breakup details</h2>
                                </div>
                                <div className="modal-close-wrapper">
                                    <Button type="flat" size="medium" onClick={toggleModal}>
                                        <i className="material-icons-outlined">close</i>Close
                                    </Button>
                                </div>
                            </div>

                            <div className="modal-content">
                                <FormGroup className="input-form-group">
                                    <FormLabel
                                        className="form-label-name"
                                    >
                                        Room Rent
                                    </FormLabel>
                                    <TextField
                                        variant="outlined"
                                        size="small"
                                        // placeholder="patient name"
                                        value={paymentDetailsForm.roomRent || 0}
                                        onChange={(e) => handleBillDetailsFormChange('roomRent', e)}
                                    />
                                    {billDetailsFormErrors?.roomRent && <div className="input-form-error-text">{billDetailsFormErrors.roomRent}</div>}
                                </FormGroup>
                                <FormGroup className="input-form-group">
                                    <FormLabel
                                        className="form-label-name"
                                    >
                                        Surgeon fee
                                    </FormLabel>
                                    <TextField
                                        variant="outlined"
                                        size="small"
                                        // placeholder="patient name"
                                        value={paymentDetailsForm.surgeonFee || 0}
                                        onChange={(e) => handleBillDetailsFormChange('surgeonFee', e)}
                                    />
                                    {billDetailsFormErrors?.surgeonFee && <div className="input-form-error-text">{billDetailsFormErrors.surgeonFee}</div>}
                                </FormGroup>
                                <FormGroup className="input-form-group">
                                    <FormLabel
                                        className="form-label-name"
                                    >
                                        OT charges
                                    </FormLabel>
                                    <TextField
                                        variant="outlined"
                                        size="small"
                                        // placeholder="patient name"
                                        value={paymentDetailsForm.otCharges || 0}
                                        onChange={(e) => handleBillDetailsFormChange('otCharges', e)}
                                    />
                                    {billDetailsFormErrors?.otCharges && <div className="input-form-error-text">{billDetailsFormErrors.otCharges}</div>}
                                </FormGroup>
                                <FormGroup className="input-form-group">
                                    <FormLabel
                                        className="form-label-name"
                                    >
                                        Anesthetist
                                    </FormLabel>
                                    <TextField
                                        variant="outlined"
                                        size="small"
                                        // placeholder="patient name"
                                        value={paymentDetailsForm.anesthetist || 0}
                                        onChange={(e) => handleBillDetailsFormChange('anesthetist', e)}
                                    />
                                    {billDetailsFormErrors?.anesthetist && <div className="input-form-error-text">{billDetailsFormErrors.anesthetist}</div>}
                                </FormGroup>
                                <FormGroup className="input-form-group">
                                    <FormLabel
                                        className="form-label-name"
                                    >
                                        Doctor fee
                                    </FormLabel>
                                    <TextField
                                        variant="outlined"
                                        size="small"
                                        // placeholder="patient name"
                                        value={paymentDetailsForm.doctorFee || 0}
                                        onChange={(e) => handleBillDetailsFormChange('doctorFee', e)}
                                    />
                                    {billDetailsFormErrors?.doctorFee && <div className="input-form-error-text">{billDetailsFormErrors.doctorFee}</div>}
                                </FormGroup>
                                <FormGroup className="input-form-group">
                                    <FormLabel
                                        className="form-label-name"
                                    >
                                        OT Medicine/Disposables
                                    </FormLabel>
                                    <TextField
                                        variant="outlined"
                                        size="small"
                                        // placeholder="patient name"
                                        value={paymentDetailsForm.otMedicine || 0}
                                        onChange={(e) => handleBillDetailsFormChange('otMedicine', e)}
                                    />
                                    {billDetailsFormErrors?.otMedicine && <div className="input-form-error-text">{billDetailsFormErrors.otMedicine}</div>}
                                </FormGroup>
                                <FormGroup className="input-form-group">
                                    <FormLabel
                                        className="form-label-name"
                                    >
                                        Diagnostic Charges
                                    </FormLabel>
                                    <TextField
                                        variant="outlined"
                                        size="small"
                                        // placeholder="patient name"
                                        value={paymentDetailsForm.diagnosticCharges || 0}
                                        onChange={(e) => handleBillDetailsFormChange('diagnosticCharges', e)}
                                    />
                                    {billDetailsFormErrors?.diagnosticCharges && <div className="input-form-error-text">{billDetailsFormErrors.diagnosticCharges}</div>}
                                </FormGroup>
                                <FormGroup className="input-form-group">
                                    <FormLabel
                                        className="form-label-name"
                                    >
                                        Other
                                    </FormLabel>
                                    <TextField
                                        variant="outlined"
                                        size="small"
                                        // placeholder="patient name"
                                        value={paymentDetailsForm.other|| 0}
                                        onChange={(e) => handleBillDetailsFormChange('other', e)}
                                    />
                                    {billDetailsFormErrors?.other && <div className="input-form-error-text">{billDetailsFormErrors.other}</div>}
                                </FormGroup>

                                <div className="bill-total-container">
                                    <div className="bill-from-admit-form">
                                        Grand Total: <span>{admitFormTotalAmount}</span>
                                    </div>
                                    <div className="dynamic-bill-from-input">
                                        Breakup Total: <span>{dynamicTotalFromInput || 0}</span>
                                    </div>
                                </div>
                                {admitFormTotalAmount !== dynamicTotalFromInput ? (
                                    <div className="payment-breakup-mismatch-content">
                                        Entered payment break up details did not match with grand total submitted in Admit Form
                                    </div>
                                ) : null}

                            </div>
                            <div className="admit-form-footer">
                                <Button
                                    // type="flatPrimary"
                                    variant="contained"
                                    size="small"
                                    onClick={onSubmitPaymentDetailsForm}
                                    disabled={admitFormTotalAmount !== dynamicTotalFromInput}
                                >
                                    Submit
                                </Button>

                            </div>
                        </div>

                    ) : (
                        <div className="modal-container">
                            <div className="pdf-viewer">
                                <PDFViewer className="pdf-viewer">
                                    <ReactDocxComponent
                                        admitForm={selectedAdmissionData}
                                        paymentDetailsForm={paymentDetailsForm}
                                    />
                                </PDFViewer>
                            </div>
                        </div>
                        )}

                </Modal>
            </>

        );
    }
}

export default PaymentBreakupModalComponent;
