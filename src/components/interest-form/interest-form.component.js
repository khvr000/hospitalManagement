import * as React from "react";
import {
    FormControlLabel,
    FormGroup,
    FormLabel,
    Radio,
    RadioGroup,
    TextField
} from "@material-ui/core";

import Chip from "@mui/material/Chip";
import Autocomplete from "@mui/material/Autocomplete";
import Button from '@mui/material/Button';

import "./interest-form.scss";

const DIAGNOSIS_FOR_DROPDOWN_ITEMS = [
    'Deviated nasal septum with septal spur',
    'Deviated nasal septum with hypertrophied inferior turbinates',
    'Deviated nasal septum with rhino sinusitis',
    'Deviated nasal septum with fungal sinusitis',
    'Deviated nasal septum with bilateral ethmoid sinusitis',
    'C.S.O.M in right ear',
    'C.S.O.M in left ear',
    'C.S.O.M cholesteatoma in right ear',
    'C.S.O.M cholesteatoma in left ear',
    'Keratosis obturans',
    'Tonsillitis',
    'Chronic adino Tonsillitis',
    'Chronic laryngitis with vocal polyp'
];


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 8.5 + ITEM_PADDING_TOP,
            width: 750,
        },
    },
};

const FormInputError = (props: Props) => {
    const { children, className } = props;
    return (
        <React.Fragment>
            <div className="fvc-form-input-error-container">{children}</div>
        </React.Fragment>
    );
};

class InterestFormComponent extends React.Component<Props> {

    constructor(props) {
        super(props);
        this.fileInputElementRef = React.createRef();
    }


    handleFileInputChange = (type, e) => {
        e.persist();
        e.stopPropagation();
        if (this.props.handleAdmitFormChange) {
            const files = [...e.target.files];
            this.props.handleAdmitFormChange(type, files);
            // this.props.handleAdmitFormChange('aadhaar', {fileLocalUrl: URL.createObjectURL(files[0]), file: files[0]});
            // e.target.value = '';
        }
    }

    handleImageFileDelete = (type, index) => {
        this.props.handleImageFileDelete(type, index);
        // this.fileInputElementRef.target.value = '';
    }

    getFormattedDateString = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const formattedMonth = month < 10 ? `0${month}` : month;
        const dateOfMonth = date.getDate();
        return `${year}-${formattedMonth}-${dateOfMonth}`;
    }

    handleOperatedForDropdownChange = () => {

    }



    render() {
        const {admitForm, handleAdmitFormChange, onSubmitAdminForm, admitFormErrors, editModeForAdmitForm, onEditModeClose } = this.props;
        const dateOfToday2= new Date();
        const timeFormatOptions = { hour: 'numeric', minute: 'numeric' };
        // const dateOfToday = dateOfToday2.toLocaleString('en-US', timeFormatOptions);
        const dateOfToday = this.getFormattedDateString(dateOfToday2);
        // const nextMonthDate = "2022-04-20";
        // const
        const nextMonthDateRaw  = new Date(dateOfToday2.getFullYear(), dateOfToday2.getMonth() + 1, dateOfToday2.getDate());
        const nextMonthDate = this.getFormattedDateString(nextMonthDateRaw);

        // console.log(dateOfToday, nextMonthDate);

        return <>
            <div className="admit-form-container">

                <h1 className="admit-form-title">
                    {editModeForAdmitForm ? 'Edit Interest Form' : 'Interest Form'}
                </h1>
                {editModeForAdmitForm ? (
                    <div className="edit-close-wrapper">
                        <Button variant="outlined" size="medium" onClick={onEditModeClose}>
                            <i className="material-icons-outlined">close</i>Cancel
                        </Button>
                    </div>
                ) : null}


                <div className="admit-form-content">
                    <div className="admit-form-group-wrapper">
                        <FormGroup className="input-form-group">
                            <FormLabel
                                className="form-label-name"
                            >
                                Interest Number *
                            </FormLabel>
                            <TextField
                                variant="outlined"
                                size="small"
                                value={admitForm.interest_number}
                                onChange={(e) => handleAdmitFormChange('interest_number', e)}
                                // placeholder="patient name"
                            />
                            {admitFormErrors?.admissionNumber && <div className="input-form-error-text">{admitFormErrors.admissionNumber}</div>}
                        </FormGroup>
                    </div>


                    <div className="admit-form-group-wrapper">
                        <FormGroup className="input-form-group">
                            <FormLabel
                                className="form-label-name"
                            >
                                Patient Name *
                            </FormLabel>
                            <TextField
                                variant="outlined"
                                size="small"
                                value={admitForm.patientName}
                                onChange={(e) => handleAdmitFormChange('patientName', e)}
                                // placeholder="patient name"
                            />
                            {admitFormErrors?.patientName && <div className="input-form-error-text">{admitFormErrors.patientName}</div>}
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
                                value={admitForm.dateOfBirth}
                                onChange={(e) => handleAdmitFormChange('dateOfBirth', e)}
                            />
                            {admitFormErrors?.dateOfBirth && <div className="input-form-error-text">{admitFormErrors.dateOfBirth}</div>}
                        </FormGroup>
                    </div>

                    <div className="admit-form-group-wrapper">
                        <FormGroup className="radio-form-group">
                            <FormLabel
                                className="form-label-name"
                            >
                                Sex *
                            </FormLabel>
                            <RadioGroup
                                className="form-sex-input"
                                value={admitForm.sex}
                                onChange={(e) => handleAdmitFormChange('sex', e)}
                            >
                                <FormControlLabel control={<Radio/>} value="Male" label="Male"/>
                                <FormControlLabel control={<Radio/>} value="Female" label="Female"/>
                                <FormControlLabel control={<Radio/>} value="Other" label="Other"/>
                            </RadioGroup>
                        </FormGroup>
                        <FormGroup className="input-form-group">
                            <FormLabel
                                className="form-label-name"
                            >
                                Mobile *
                            </FormLabel>
                            <TextField
                                variant="outlined"
                                size="small"
                                // placeholder="patient name"
                                value={admitForm.mobile}
                                onChange={(e) => handleAdmitFormChange('mobile', e)}
                            />
                            {admitFormErrors?.mobile && <div className="input-form-error-text">{admitFormErrors.mobile}</div>}
                        </FormGroup>
                    </div>

                    <div className="admit-form-group-wrapper">
                        <FormGroup className="input-form-group">
                            <FormLabel
                                className="form-label-name"
                            >
                                Alternate Mobile
                            </FormLabel>
                            <TextField
                                variant="outlined"
                                size="small"
                                // placeholder="patient name"
                                value={admitForm.alternateMobile}
                                onChange={(e) => handleAdmitFormChange('alternateMobile', e)}
                            />
                            {admitFormErrors?.alternateMobile && <div className="input-form-error-text">{admitFormErrors.alternateMobile}</div>}
                        </FormGroup>
                        <FormGroup className="input-form-group">
                            <FormLabel
                                className="form-label-name"
                            >
                                C/O *
                            </FormLabel>
                            <TextField
                                variant="outlined"
                                size="small"
                                // placeholder="patient name"
                                value={admitForm.careOf}
                                onChange={(e) => handleAdmitFormChange('careOf', e)}
                            />
                            {admitFormErrors?.careOf && <div className="input-form-error-text">{admitFormErrors.careOf}</div>}
                        </FormGroup>
                    </div>

                    <div className="admit-form-group-wrapper">
                        <FormGroup className="input-form-group">
                            <FormLabel
                                className="form-label-name"
                            >
                                Address *
                            </FormLabel>
                            <div className="address-container">
                                <TextField
                                    className="address"
                                    multiline
                                    variant="outlined"
                                    size="large"
                                    // placeholder="patient name"
                                    value={admitForm.address}
                                    onChange={(e) => handleAdmitFormChange('address', e)}

                                />
                                {admitFormErrors?.address && <div className="input-form-error-text">{admitFormErrors.address}</div>}
                            </div>
                        </FormGroup>
                        <FormGroup className="input-form-group">
                            <FormLabel
                                className="form-label-name"
                            >
                                Pincode
                            </FormLabel>
                            <TextField
                                variant="outlined"
                                size="small"
                                // placeholder="patient name"
                                value={admitForm.pinCode}
                                onChange={(e) => handleAdmitFormChange('pinCode', e)}
                            />
                            {admitFormErrors?.pinCode && <div className="input-form-error-text">{admitFormErrors.pinCode}</div>}
                        </FormGroup>
                    </div>

                    <div className="admit-form-group-wrapper">
                        <FormGroup className="input-form-group dropdown">
                            <Autocomplete
                                multiple
                                id="tags-filled"
                                options={DIAGNOSIS_FOR_DROPDOWN_ITEMS.map((option) => option)}
                                value={admitForm.diagnosis}
                                freeSolo
                                onChange={(e, value) => {
                                    handleAdmitFormChange('diagnosis', value);
                                }}
                                renderTags={(value, getTagProps) =>
                                    value.map((option, index) => (
                                        <Chip
                                            variant="outlined"
                                            label={option}
                                            {...getTagProps({ index })}
                                        />
                                    ))
                                }
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        variant="filled"
                                        label="Diagnosis"
                                        placeholder="Other"
                                        onChange={(e) => {
                                            console.log(e.target.value);
                                        }}
                                    />
                                )}
                            />
                            {admitFormErrors?.diagnosis && <div className="input-form-error-text">{admitFormErrors.diagnosis}</div>}
                        </FormGroup>
                    </div>

                    <div className="admit-form-group-wrapper">
                        <FormGroup className="input-form-group">
                            <FormLabel
                                className="form-label-name"
                            >
                                Comments
                            </FormLabel>
                            <div className="address-container">
                                <TextField
                                    className="address"
                                    variant="outlined"
                                    multiline
                                    size="large"
                                    // placeholder="patient name"
                                    value={admitForm.comments}
                                    onChange={(e) => handleAdmitFormChange('comments', e)}
                                />
                            </div>

                            {admitFormErrors?.comments && <div>{admitFormErrors.comments}</div>}
                        </FormGroup>
                    </div>


                </div>


            </div>

            <div className="admit-form-footer">
                <Button
                    variant="contained"
                    size="small"
                    onClick={onSubmitAdminForm}
                >
                    { editModeForAdmitForm ? 'Save Changes' : 'Submit'}
                </Button>

            </div>

        </>;
    }
}

export default InterestFormComponent;
