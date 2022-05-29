import React, {Component} from 'react';
import "./diagnostic-report-preview-modal.component.scss";
// import {Modal} from "@material-ui/core";
import Modal from '@mui/material/Modal';

import classNames from "classnames";
import {PDFViewer} from "@react-pdf/renderer";
import DiagnosticReportPdfComponent from "../diagnostic-report-pdf/diagnostic-report-pdf.component";

class DiagnosticReportPreviewModalComponent extends Component {
    render() {
        const { showModal , toggleModal, diagnosticReportForm } = this.props;
        return (
            <>
                <Modal
                    className={classNames('', {'modal-wrapper-container': showModal})}
                    open={showModal}
                    onClose={toggleModal}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <div className="modal-container">
                        <PDFViewer className="pdf-viewer">
                            <DiagnosticReportPdfComponent
                                diagnosticReportForm={diagnosticReportForm}
                                // admitForm={selectedAdmissionData}
                                // paymentDetailsForm={paymentDetailsForm}
                            />
                        </PDFViewer>
                    </div>
                </Modal>
            </>
        );
    }
}

export default DiagnosticReportPreviewModalComponent;
