import * as React from "react";
import styled, { ThemeProvider } from 'styled-components';
import {
    FormControlLabel,
    FormGroup,
    FormLabel,
    Radio,
    RadioGroup,
    TextField,
    Link,
    IconButton
} from "@material-ui/core";

import Button from '@mui/material/Button';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';

import "./admit-form.component.scss";


const OPERATED_FOR_DROPDOWN_ITEMS = [
    'Septoplasty with endoscopic sinus surgery',
    'Septoplasty',
    'Septoplasty endoscopic sinus surgery with debrider assisted',
    'Tympanoplasty under general anaesthesia',
    'Tympanoplasty under local anaesthesia',
    'Modified radical mastoidectomy',
    'Curettage under general anaesthesia',
    'Tonsillectomy by dissection method under general anaesthesia',
    'Adino Tonsillectomy under general anaesthesia',
    'Adino Tonsillectomy under general anaesthesia with coagulation assisted','Micro laryngeal surgery'
];

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

class AdmitFormComponent extends React.Component<Props> {

    constructor(props) {
        super(props);
        this.fileInputElementRef = React.createRef();
    }

    handleAgreeTermsClick = () => {

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
                    {editModeForAdmitForm ? 'Edit Admit Form' : 'Admit Form'}
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
                                Admission Number *
                            </FormLabel>
                            <TextField
                                variant="outlined"
                                size="small"
                                value={admitForm.admission_number}
                                onChange={(e) => handleAdmitFormChange('admission_number', e)}
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
                                Date of Birth *
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
                        <FormGroup className="input-form-group">
                            <FormLabel
                                className="form-label-name"
                            >
                                Aadhaar
                            </FormLabel>
                            <div
                                className="dat-file-upload-content"
                            >
                                <input
                                    type="file"
                                    className="dat-file-upload-input"
                                    ref={this.fileInputElementRef}
                                    onChange={(e) => this.handleFileInputChange('aadhaar', e)}
                                />
                                {admitForm.aadhaar?.map((file,index) => (
                                    <div className="image-preview-container">
                                        <span>{file.name}</span>
                                        <IconButton
                                            className="upload-image-preview-file-item-delete"
                                            size="small"
                                            type="flat"
                                            onClick={(e) => this.handleImageFileDelete('aadhaar', index)}
                                        >
                                            <i className="material-icons-outlined">close</i>
                                        </IconButton>
                                    </div>
                                ))}
                                {/*{admitForm.aadhaar? (*/}
                                {/*    <div className="image-preview-container">*/}
                                {/*        <span>{admitForm.aadhaar.name}</span>*/}
                                {/*        <IconButton*/}
                                {/*            className="upload-image-preview-file-item-delete"*/}
                                {/*            size="small"*/}
                                {/*            type="flat"*/}
                                {/*            onClick={(e) => this.handleImageFileDelete('aadhaar', e)}*/}
                                {/*        >*/}
                                {/*            <i className="material-icons-outlined">close</i>*/}
                                {/*        </IconButton>*/}
                                {/*    </div>*/}
                                {/*) : (*/}
                                {/*    <input*/}
                                {/*        type="file"*/}
                                {/*        className="dat-file-upload-input"*/}
                                {/*        ref={this.fileInputElementRef}*/}
                                {/*        onChange={(e) => this.handleFileInputChange('aadhaar', e)}*/}
                                {/*    />*/}
                                {/*)}*/}
                            </div>
                        </FormGroup>
                        <FormGroup className="input-form-group">
                            <FormLabel
                                className="form-label-name"
                            >
                                Date of admission *
                            </FormLabel>
                            <TextField
                                variant="outlined"
                                size="small"
                                type="date"
                                // placeholder="patient name"
                                defaultValue={dateOfToday}
                                // InputProps={{inputProps: {min: dateOfToday, max: nextMonthDate} }}
                                // inputProps={{min: dateOfToday, max: nextMonthDate}}
                                onChange={(e) => handleAdmitFormChange('dateOfAdmission', e)}
                                value={admitForm.dateOfAdmission}
                            />
                            {admitFormErrors?.dateOfAdmission && <div className="input-form-error-text">{admitFormErrors.dateOfAdmission}</div>}
                        </FormGroup>
                    </div>


                    <div className="admit-form-group-wrapper">
                        <FormGroup className="input-form-group">
                            <FormLabel
                                className="form-label-name"
                            >
                                Date of surgery *
                            </FormLabel>
                            <TextField
                                variant="outlined"
                                size="small"
                                type="date"
                                defaultValue={dateOfToday}
                                // inputProps={{min: dateOfToday, max: nextMonthDate}}
                                // placeholder="patient name"
                                onChange={(e) => handleAdmitFormChange('dateOfSurgery', e)}
                                value={admitForm.dateOfSurgery}
                            />
                            {admitFormErrors?.dateOfSurgery && <div className="input-form-error-text">{admitFormErrors.dateOfSurgery}</div>}
                        </FormGroup>
                        <FormGroup className="input-form-group">
                            <FormLabel
                                className="form-label-name"
                            >
                                Date of discharge *
                            </FormLabel>
                            <TextField
                                variant="outlined"
                                size="small"
                                type="date"
                                defaultValue={dateOfToday}
                                // inputProps={{min: dateOfToday, max: nextMonthDate}}
                                // placeholder="patient name"
                                onChange={(e) => handleAdmitFormChange('dateOfDischarge', e)}
                                value={admitForm.dateOfDischarge}
                            />
                            {admitFormErrors?.dateOfDischarge && <div className="input-form-error-text">{admitFormErrors.dateOfDischarge}</div>}
                        </FormGroup>
                    </div>


                    <div className="admit-form-group-wrapper">
                        <FormGroup className="input-form-group">
                        <FormControl sx={{ width: 300 }}>
                            <InputLabel id="demo-multiple-checkbox-label">Operated for *</InputLabel>
                            <Select
                                labelId="demo-multiple-checkbox-label"
                                id="demo-multiple-checkbox"
                                multiple
                                value={admitForm.operatedFor}
                                onChange={(e) => handleAdmitFormChange('operatedFor', e)}
                                // onChange={this.handleOperatedForDropdownChange}
                                input={<OutlinedInput label="operatedFor" />}
                                // renderValue={''}
                                renderValue={(selected) => selected.join(', ')}
                                MenuProps={MenuProps}
                            >
                                {OPERATED_FOR_DROPDOWN_ITEMS.map((name) => (
                                    <MenuItem key={name} value={name}>
                                        <Checkbox checked={admitForm.operatedFor.indexOf(name) > -1} />
                                        <ListItemText primary={name} />
                                    </MenuItem>
                                ))}
                            </Select>
                            {admitFormErrors?.operatedFor && <div className="input-form-error-text">{admitFormErrors.operatedFor}</div>}
                        </FormControl>
                        </FormGroup>
                        <FormGroup className="input-form-group">
                            {/*<FormLabel*/}
                            {/*    className="form-label-name"*/}
                            {/*>*/}
                            {/*    Diagnosis **/}
                            {/*</FormLabel>*/}
                            {/*<TextField*/}
                            {/*    variant="outlined"*/}
                            {/*    size="small"*/}
                            {/*    // placeholder="patient name"*/}
                            {/*    value={admitForm.diagnosis}*/}
                            {/*    onChange={(e) => handleAdmitFormChange('diagnosis', e)}*/}
                            {/*/>*/}
                            <FormControl sx={{ width: 300 }}>
                                <InputLabel id="demo-multiple-checkbox-label">Diagnosis *</InputLabel>
                                <Select
                                    labelId="demo-multiple-checkbox-label"
                                    id="demo-multiple-checkbox"
                                    multiple
                                    value={admitForm.diagnosis}
                                    onChange={(e) => handleAdmitFormChange('diagnosis', e)}
                                    // onChange={this.handleOperatedForDropdownChange}
                                    input={<OutlinedInput label="Diagnosis" />}
                                    // renderValue={''}
                                    renderValue={(selected) => selected.join(', ')}
                                    MenuProps={MenuProps}
                                >
                                    {DIAGNOSIS_FOR_DROPDOWN_ITEMS.map((name) => (
                                        <MenuItem key={name} value={name}>
                                            <Checkbox checked={admitForm.diagnosis.indexOf(name) > -1} />
                                            <ListItemText primary={name} />
                                        </MenuItem>
                                    ))}
                                </Select>
                                {admitFormErrors?.operatedFor && <div className="input-form-error-text">{admitFormErrors.operatedFor}</div>}
                            </FormControl>
                            {admitFormErrors?.diagnosis && <div className="input-form-error-text">{admitFormErrors.diagnosis}</div>}
                        </FormGroup>
                    </div>

                    <div className="admit-form-group-wrapper">
                        <FormGroup className="input-form-group">
                            <FormLabel
                                className="form-label-name"
                            >
                                Advance paid *
                            </FormLabel>
                            <TextField
                                variant="outlined"
                                size="small"
                                // placeholder="patient name"
                                value={admitForm.advancePaid}
                                onChange={(e) => handleAdmitFormChange('advancePaid', e)}
                            />
                            {admitFormErrors?.advancePaid && <div className="input-form-error-text">{admitFormErrors.advancePaid}</div>}
                        </FormGroup>
                        <FormGroup className="input-form-group">
                            <FormLabel
                                className="form-label-name"
                            >
                                Amount remaining *
                            </FormLabel>
                            <TextField
                                variant="outlined"
                                size="small"
                                // placeholder="patient name"
                                value={admitForm.amountRemaining}
                                onChange={(e) => handleAdmitFormChange('amountRemaining', e)}
                            />
                            {admitFormErrors?.amountRemaining && <div className="input-form-error-text">{admitFormErrors.amountRemaining}</div>}
                        </FormGroup>
                    </div>

                    <div className="admit-form-group-wrapper">
                        <FormGroup className="input-form-group">
                            <FormLabel
                                className="form-label-name"
                            >
                                Upload documents
                            </FormLabel>
                            <div
                                className="dat-file-upload-content"
                            >
                                <input
                                    type="file"
                                    className="dat-file-upload-input"
                                    ref={this.fileInputElementRef}
                                    onChange={(e) => this.handleFileInputChange('uploadDocuments', e)}
                                />
                                {admitForm.uploadDocuments?.map((file,index) => (
                                    <div className="image-preview-container">
                                        <span>{file.name}</span>
                                        <IconButton
                                            className="upload-image-preview-file-item-delete"
                                            size="small"
                                            type="flat"
                                            onClick={(e) => this.handleImageFileDelete('uploadDocuments', index)}
                                        >
                                            <i className="material-icons-outlined">close</i>
                                        </IconButton>
                                    </div>
                                ))}
                                {/*{admitForm.uploadDocuments? (*/}
                                {/*    <div className="image-preview-container">*/}
                                {/*        <span>{admitForm.uploadDocuments.name}</span>*/}
                                {/*        <IconButton*/}
                                {/*            className="upload-image-preview-file-item-delete"*/}
                                {/*            size="small"*/}
                                {/*            type="flat"*/}
                                {/*            onClick={(e) => this.handleImageFileDelete('uploadDocuments', e)}*/}
                                {/*        >*/}
                                {/*            <i className="material-icons-outlined">close</i>*/}
                                {/*        </IconButton>*/}
                                {/*    </div>*/}
                                {/*) : (*/}
                                {/*    <input*/}
                                {/*        type="file"*/}
                                {/*        className="dat-file-upload-input"*/}
                                {/*        ref={this.fileInputElementRef}*/}
                                {/*        onChange={(e) => this.handleFileInputChange('uploadDocuments', e)}*/}
                                {/*    />*/}
                                {/*)}*/}
                            </div>
                            {/*<TextField*/}
                            {/*    variant="outlined"*/}
                            {/*    size="small"*/}
                            {/*    // placeholder="patient name"*/}
                            {/*    value={admitForm.uploadDocuments}*/}
                            {/*    onChange={(e) => handleAdmitFormChange('uploadDocuments', e)}*/}
                            {/*/>*/}
                        </FormGroup>
                        <FormGroup className="input-form-group">
                            <FormLabel
                                className="form-label-name"
                            >
                                Comments
                            </FormLabel>
                            <TextField
                                variant="outlined"
                                size="small"
                                // placeholder="patient name"
                                value={admitForm.comments}
                                onChange={(e) => handleAdmitFormChange('comments', e)}
                            />
                            {admitFormErrors?.comments && <div>{admitFormErrors.comments}</div>}
                        </FormGroup>
                    </div>

                    <div className="admit-form-group-wrapper">
                        <FormGroup className="input-form-group">
                            <FormLabel
                                className="form-label-name"
                            >
                                Signature
                            </FormLabel>
                            <div
                                className="dat-file-upload-content"
                            >
                                {admitForm.signature? (
                                    <div className="image-preview-container">
                                        <span>{admitForm.signature}</span>
                                        <IconButton
                                            className="upload-image-preview-file-item-delete"
                                            size="small"
                                            type="flat"
                                            onClick={(e) => this.handleImageFileDelete('signature', e)}
                                        >
                                            <i className="material-icons-outlined">close</i>
                                        </IconButton>
                                    </div>
                                ) : (
                                    <input
                                        type="file"
                                        className="dat-file-upload-input"
                                        ref={this.fileInputElementRef}
                                        onChange={(e) => this.handleFileInputChange('signature', e)}
                                    />
                                )}
                            </div>
                        </FormGroup>
                    </div>

                    <div className="admit-form-agree-check">
                        <FormGroup>
                            <FormControlLabel control={<Checkbox checked={admitForm.agreeTerms} onChange={(e) => handleAdmitFormChange('agreeTerms', e)} />} label="I agree that all information provided is correct" />
                        </FormGroup>
                    </div>


                </div>


            </div>

            <div className="admit-form-footer">
                <Button
                    variant="contained"
                    size="small"
                    onClick={onSubmitAdminForm}
                    disabled={!admitForm.agreeTerms}
                >
                    { editModeForAdmitForm ? 'Save Changes' : 'Submit'}
                </Button>

            </div>

        </>;
    }
}

export default AdmitFormComponent;
