 import * as React from "react";
 import { Page, Text, View, Document, StyleSheet, Image, Font } from '@react-pdf/renderer';
 import {amountInWords, numToWords} from "../../utils/validations";
 import {DataTableCell, Table, TableBody, TableCell, TableHeader} from "@david.kucsai/react-pdf-table";
import headerImage from "./../../assets/imageForHeader.jpg";

 Font.register({
     family: 'Oswald-Bold',
     src: 'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf'
 });

 Font.register({
     family: 'Times-Bold',
     src: 'https://db.onlinewebfonts.com/c/537f629478e262c7877746c3c9312928?family=Times-Bold'
 });




 // Font.register(src2, { fontFamily: 'Roboto-Bold' });


 // Create styles
 const styles = StyleSheet.create({
     page: {
         flexDirection: 'row',
         backgroundColor: 'white'
     },
     headerImage: {
         height: 160,
         objectFit: 'cover',
         width: '100%',
     },
     pageHeading: {
         fontSize: 24,
         marginTop: 20,
         marginBottom: 20,
         // fontWeight: 'bold',
         fontFamily: 'Times-Bold'
     },
     pageContent: {
         fontSize: 16,
     },
     tableContent: {
         marginTop: 10,
     },
     pageFooter: {
         flexDirection: 'row',
         fontSize: 14,
         position: 'absolute',
         bottom: 0,
         right: 0,
         justifyContent: 'flex-end',
     },
     section: {
         // margin: 80,
         marginTop: 0,
         marginLeft: 80,
         marginRight: 60,
         marginBottom: 80,
         padding: 10,
         flexGrow: 1
     },
     sectionWithImage: {
         margin: 0,
         padding: 0,
         flexGrow: 1
     }
 });

 const getAge = (dateString) => {
     const today = new Date();
     const birthDate = new Date(dateString);
     let age = today.getFullYear() - birthDate.getFullYear();
     const m = today.getMonth() - birthDate.getMonth();
     if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
         age--;
     }
     return age;
 }

 const capitalizeFirstLetter = (string) => {
     if (!string) return '';
     return string.charAt(0).toUpperCase() + string.slice(1);
 }

 const formatDateString = (dateString) => {
     const date = new Date(dateString);
     const year = date.getFullYear();
     const month = date.getMonth() + 1;
     const day = date.getDate();
     const updatedMonth = month < 10 ? `0${month}` : month;
     return `${day}-${updatedMonth}-${year}`;
 }

 const getFirstPageText = (admitForm) => {
     if (!admitForm) {
         return ''
     }
     const totalAmount = parseInt(admitForm.advancePaid) + parseInt(admitForm.amountRemaining);
     const amountInWordsString = capitalizeFirstLetter(numToWords(totalAmount));
     const age = getAge(admitForm.dateOfBirth);
     // const amountInWordsString = numToWords(admitForm.advancePaid);
     const text = `This is to certify that ${admitForm.patientName} aged ${age} Years, ${admitForm.sex} , C/O ${admitForm.careOf || ''}, residing in ${admitForm.address}.\n
     Bearing with ID No: - ${admitForm.admission_number} was admitted in SRI DEVI CHANDRA ENT HOSPITAL on ${formatDateString(admitForm.dateOfAdmission)} with\n
     Diagnosis ${admitForm.diagnosis}\n
     and the procedure done is ${admitForm.operatedFor} \n
     In SRI DEVI CHANDRA HOSPITAL, Mahabubnagar on ${formatDateString(admitForm.dateOfSurgery)} and ${admitForm.sex === 'Male' ? 'he' : 'she'} was discharged on ${formatDateString(admitForm.dateOfDischarge)}.\n
     This is to confirm that medical bills amount to ${totalAmount} Rs/- \n
     Amount in words: ${amountInWordsString} rupees only issued by the hospital are genuine and correct.\n`;
     return text;
 }

 const getSecondPageText = (admitForm) => {
     if (!admitForm) {
         return ''
     }
     const totalAmount = parseInt(admitForm.advancePaid) + parseInt(admitForm.amountRemaining);
     const amountInWordsString = capitalizeFirstLetter(numToWords(totalAmount));
     const age = getAge(admitForm.dateOfBirth);
     // const amountInWordsString = numToWords(admitForm.advancePaid);
     const text = `
        IN PATIENT NO : ${admitForm.admission_number}\n
        NAME OF THE PATIENT : ${admitForm.patientName}\n
        AGE: ${age}\n
        SEX: ${admitForm.sex}\n
        ADDRESS: ${admitForm.address}\n
        DIAGNOSIS : ${admitForm.diagnosis}\n
        DATE OF ADMISSION: ${formatDateString(admitForm.dateOfAdmission)}\n
        DATE OF SURGERY: ${formatDateString(admitForm.dateOfSurgery)}\n
        DATE OF DISCHARGE: ${formatDateString(admitForm.dateOfDischarge)}\n
        TOTAL AMOUNT : ${totalAmount}/-\n
        AMOUNT IN WORDS: ${amountInWordsString} rupees only
     `;
     return text;
 }

 const getThirdPageText = (admitForm, paymentDetailsForm) => {
     if (!admitForm || !paymentDetailsForm) {
         return ''
     }
     const age = getAge(admitForm.dateOfBirth);
     const totalAmount = parseInt(admitForm.advancePaid) + parseInt(admitForm.amountRemaining);
     const amountInWordsString = capitalizeFirstLetter(numToWords(totalAmount));
     const text = `
        IN PATIENT NO : ${admitForm.admission_number}\n
        NAME OF THE PATIENT : ${admitForm.patientName}\n
        AGE: ${age}\n
        SEX: ${admitForm.sex}\n
        ADDRESS: ${admitForm.address}\n
        DATE OF ADMISSION: ${formatDateString(admitForm.dateOfAdmission)}\n
        DATE OF SURGERY: ${formatDateString(admitForm.dateOfSurgery)}\n
        DATE OF DISCHARGE: ${formatDateString(admitForm.dateOfDischarge)}
     `;
     return text;
 }

 const getFourthPageText = (admitForm) => {
     if (!admitForm) {
         return ''
     }
     const age = getAge(admitForm.dateOfBirth);
     const amountInWordsString = capitalizeFirstLetter(numToWords(admitForm.advancePaid));
     const text = `
        IN PATIENT NO : ${admitForm.admission_number}\n
        NAME OF THE PATIENT : ${admitForm.patientName}\n
        AGE: ${age}\n
        SEX: ${admitForm.sex}\n
        ADDRESS: ${admitForm.address}\n
        DIAGNOSIS : ${admitForm.diagnosis}\n
        PROCEDURE: ${admitForm.operatedFor}\n
        DATE OF ADMISSION: ${formatDateString(admitForm.dateOfAdmission)}\n
        DATE OF SURGERY: ${formatDateString(admitForm.dateOfSurgery)}\n
        DATE OF DISCHARGE: ${formatDateString(admitForm.dateOfDischarge)}\n
        ADVANCE AMOUNT: ${admitForm.advancePaid}/-\n
        AMOUNT IN WORDS: ${amountInWordsString} rupees only
     `;
     return text;
 }

 const headerText = `GENUINENESS/ESSENTIALITY 
    CERTIFICATE
    `;

 const getFifthPageText = (admitForm) => {
     if (!admitForm) {
         return ''
     }
     const age = getAge(admitForm.dateOfBirth);
     const totalAmount = parseInt(admitForm.advancePaid) + parseInt(admitForm.amountRemaining);
     const amountInWordsString = capitalizeFirstLetter(numToWords(totalAmount));
     const text = `
        IN PATIENT NO : ${admitForm.admission_number}\n
        NAME OF THE PATIENT : ${admitForm.patientName}\n
        AGE: ${age}\n
        SEX: ${admitForm.sex}\n
        ADDRESS: ${admitForm.address}\n
        DIAGNOSIS : ${admitForm.diagnosis}\n
        PROCEDURE: ${admitForm.operatedFor}\n
        DATE OF ADMISSION: ${formatDateString(admitForm.dateOfAdmission)}\n
        DATE OF SURGERY: ${formatDateString(admitForm.dateOfSurgery)}\n
        DATE OF DISCHARGE: ${formatDateString(admitForm.dateOfDischarge)}\n
        TOTAL AMOUNT: ${totalAmount}/-\n
        AMOUNT IN WORDS: ${amountInWordsString} rupees only
     `;
     return text;
 }

 const paymentDetailsTableData = (paymentDetailsForm, totalAmount) => {
     const data = [
         {
             serial: 1,
             description: 'Room Rent',
             amount:  `${paymentDetailsForm.roomRent || 0}/-`
         },
         {
             serial: 2,
             description: 'Surgeon Fee',
             amount:  `${paymentDetailsForm.surgeonFee || 0}/-`
         },
         {
             serial: 3,
             description: 'OT Charges',
             amount:  `${paymentDetailsForm.otCharges || 0}/-`
         },
         {
             serial: 4,
             description: 'Anesthetist',
             amount:  `${paymentDetailsForm.anesthetist || 0}/-`
         },
         {
             serial: 5,
             description: 'Doctor Fee',
             amount:  `${paymentDetailsForm.doctorFee || 0}/-`
         },
         {
             serial: 6,
             description: 'OT Medicine/Disposables',
             amount:  `${paymentDetailsForm.otMedicine || 0}/-`
         },
         {
             serial: 7,
             description: 'Diagnostic Charges',
             amount:  `${paymentDetailsForm.diagnosticCharges || 0}/-`
         },
         {
             serial: 8,
             description: 'Others',
             amount:  `${paymentDetailsForm.other || 0}/-`
         },
         {
             serial: '',
             description: 'GRAND TOTAL',
             amount:  `${totalAmount || 0}/-`
         },
     ];
     return data;
 }

 // Create Document Component
 const MyDocument = (props) => {
     const { admitForm, paymentDetailsForm } = props;
     const totalAmount = parseInt(admitForm.advancePaid) + parseInt(admitForm.amountRemaining);
     const amountInWordsString = capitalizeFirstLetter(numToWords(totalAmount));
     const firstPageText = getFirstPageText(admitForm);
     return (
         <Document>
             <Page size="A4" style={styles.page}>
                 <View style={styles.sectionWithImage}>
                     <Image style={styles.headerImage} src={headerImage} />
                     <View style={styles.section}>
                         <Text style={styles.pageHeading}>{headerText}</Text>
                         <Text style={styles.pageContent}>{firstPageText}</Text>
                         <Text style={styles.pageFooter}>MEDICAL SUPERINTENDENT</Text>
                     </View>
                 </View>
             </Page>
             <Page size="A4" style={styles.page}>
                 <View style={styles.sectionWithImage}>
                     <Image style={styles.headerImage} src={headerImage} />
                     <View style={styles.section}>
                         <Text style={styles.pageHeading}>IP FINAL BILL PAYMENT</Text>
                         <Text style={styles.pageContent}>{getSecondPageText(admitForm)}</Text>
                         <Text style={styles.pageFooter}>MEDICAL SUPERINTENDENT</Text>
                     </View>
                 </View>
             </Page>
             <Page size="A4" style={styles.page}>
                 <View style={styles.sectionWithImage}>
                     <Image style={styles.headerImage} src={headerImage} />
                     <View style={styles.section}>
                         <Text style={styles.pageHeading}>EXPENDITURE CERTIFICATE</Text>
                         <Text style={styles.pageContent}>{getThirdPageText(admitForm, paymentDetailsForm)}</Text>
                         <Table
                             data={paymentDetailsTableData(paymentDetailsForm, totalAmount)}
                         >
                             <TableHeader>
                                 <TableCell weighting={0.2} style={{marginLeft: '10px'}}>
                                     S.NO
                                 </TableCell>
                                 <TableCell weighting={0.5} style={{marginLeft: '10px'}}>
                                     DESCRIPTION
                                 </TableCell>
                                 <TableCell weighting={0.3} style={{marginLeft: '10px'}}>
                                     AMOUNT
                                 </TableCell>
                             </TableHeader>
                             <TableBody>
                                 <DataTableCell style={{marginLeft: '10px'}} weighting={0.2} getContent={(r) => r.serial}/>
                                 <DataTableCell style={{marginLeft: '10px'}} weighting={0.5} getContent={(r) => r.description}/>
                                 <DataTableCell style={{marginLeft: '10px'}} weighting={0.3} getContent={(r) => r.amount}/>
                             </TableBody>
                         </Table>
                         <Text style={styles.tableContent}>
                             TOTAL IN WORDS: {amountInWordsString} rupees only
                         </Text>
                         <Text style={styles.pageFooter}>MEDICAL SUPERINTENDENT</Text>
                     </View>
                 </View>
             </Page>
             <Page size="A4" style={styles.page}>
                 <View style={styles.sectionWithImage}>
                     <Image style={styles.headerImage} src={headerImage} />
                     <View style={styles.section}>
                         <Text style={styles.pageHeading}>ADVANCE PAYMENT</Text>
                         <Text style={styles.pageContent}>{getFourthPageText(admitForm)}</Text>
                         <Text style={styles.pageFooter}>MEDICAL SUPERINTENDENT</Text>
                     </View>
                 </View>
             </Page>
             <Page size="A4" style={styles.page}>
                 <View style={styles.sectionWithImage}>
                     <Image style={styles.headerImage} src={headerImage} />
                     <View style={styles.section}>
                         <Text style={styles.pageHeading}>DISCHARGE SUMMARY</Text>
                         <Text style={styles.pageContent}>{getFifthPageText(admitForm)}</Text>
                         <Text style={styles.pageFooter}>MEDICAL SUPERINTENDENT</Text>
                     </View>
                 </View>
             </Page>
         </Document>
     );
 };

 export default MyDocument;
 // ReactPDF.render(<MyDocument />, `${__dirname}/example.pdf`);
