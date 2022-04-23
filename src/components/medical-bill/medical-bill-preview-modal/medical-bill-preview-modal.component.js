import React, {Component} from 'react';
import "./medical-bill-preview-modal.scss";
// import {Modal} from "@material-ui/core";
import Modal from '@mui/material/Modal';

import classNames from "classnames";
import MedicalBillPdfComponent from "../medical-bill-pdf/medical-bill-pdf.component";
import {PDFViewer} from "@react-pdf/renderer";
import ReactDocxComponent from "../../react-docx/reactDocx.component";

class MedicalBillPreviewModalComponent extends Component {
    render() {
        const { showModal , toggleModal } = this.props;
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
                            <MedicalBillPdfComponent
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

export default MedicalBillPreviewModalComponent;
