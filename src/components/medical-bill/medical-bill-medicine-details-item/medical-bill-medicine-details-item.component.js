import React, {Component} from 'react';
import "./medical-bill-medicine-details-item.scss";
import {FormGroup, FormLabel, TextField} from "@material-ui/core";
import Button from "@mui/material/Button";

class MedicalBillMedicineDetailsItemComponent extends Component {
    render() {

        const { medicineItem, onDeleteMedicineItemClick, onMedicalBillFormChange } = this.props;

        return (
            <div className="mb-medicine-details-item-container">
                    <TextField
                        variant="outlined"
                        size="small"
                        value={medicineItem.quantity}
                        onChange={(e) => onMedicalBillFormChange('quantity', e)}
                        className="quantity"
                    />
                    <TextField
                        variant="outlined"
                        size="small"
                        value={medicineItem.tabletName}
                        onChange={(e) => onMedicalBillFormChange('tabletName', e)}
                        className="tablet-name"
                    />
                    <TextField
                        variant="outlined"
                        size="small"
                        value={medicineItem.batchNo}
                        onChange={(e) => onMedicalBillFormChange('batchNo', e)}
                        className="batchNo"
                    />
                    <TextField
                        variant="outlined"
                        size="small"
                        value={medicineItem.mfdBy}
                        onChange={(e) => onMedicalBillFormChange('mfdBy', e)}
                        className="mfdBy"
                    />
                    <TextField
                        variant="outlined"
                        size="small"
                        value={medicineItem.dateOfExp}
                        onChange={(e) => onMedicalBillFormChange('dateOfExp', e)}
                        className="dateOfExp"
                    />
                    <TextField
                        variant="outlined"
                        size="small"
                        value={medicineItem.price}
                        onChange={(e) => onMedicalBillFormChange('price', e)}
                        className="price"
                    />
                    <div className="total">{medicineItem.quantity * medicineItem.price}</div>

                    <Button variant="outlined" size="medium" onClick={onDeleteMedicineItemClick}>
                        <i className="material-icons-outlined">delete</i>
                    </Button>
            </div>
        );
    }
}

export default MedicalBillMedicineDetailsItemComponent;
