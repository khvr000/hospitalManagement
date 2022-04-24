import React, {Component} from 'react';
import "./medical-bill-medicine-details.scss";
import MedicalBillMedicineDetailsItemComponent
    from "../medical-bill-medicine-details-item/medical-bill-medicine-details-item.component";
import Button from "@mui/material/Button";

const MedicineDetailsHeaderItems = Object.freeze({
    TABLET_NAME: 'tabletName',
    QUANTITY: 'quantity',
    RATE: 'rate',
    TOTAL: 'total',
    getName(type) {
        if (type === this.TABLET_NAME) {
            return 'Tablet Name'
        }
        if (type === this.QUANTITY) {
            return 'Quantity'
        }
        if (type === this.RATE) {
            return "Rate"
        }
        if (type === this.TOTAL) {
            return 'Total'
        }
    }
});

class MedicalBillMedicineDetailsComponent extends Component {

    render() {
        const { medicineDetails, onAddNewMedicineItemClick, onDeleteMedicineItemClick, onMedicalBillFormChange } = this.props;

        return (
            <div>
                <div className="mb-medicine-details-header-wrapper">
                    <div className="tablet-name">Particulars</div>
                    <div className="quantity">Quantity</div>
                    <div className="price">Unit Price</div>
                    <div className="total">Amount</div>
                    <div className="delete">Delete</div>
                </div>

                <div className="mb-medicine-details-content-wrapper">
                    {medicineDetails && medicineDetails.map((medicineItem, i) => (
                        <MedicalBillMedicineDetailsItemComponent
                            medicineItem={medicineItem}
                            onDeleteMedicineItemClick={() => onDeleteMedicineItemClick(i)}
                            onMedicalBillFormChange={(...args) => onMedicalBillFormChange(...args, i)}
                        />
                    ))}
                    <div className="mb-medicine-details-add-wrapper">
                        <Button variant="outlined" onClick={onAddNewMedicineItemClick} size="medium">
                            Add new <i className="material-icons-outlined">add</i>
                        </Button>
                    </div>
                </div>

            </div>
        );
    }
}

export default MedicalBillMedicineDetailsComponent;
