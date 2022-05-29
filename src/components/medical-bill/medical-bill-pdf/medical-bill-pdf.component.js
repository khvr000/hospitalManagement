import React, { Fragment } from 'react';
import {Document, Image, Page, StyleSheet, Text, View} from "@react-pdf/renderer";
import headerImage from "../../../assets/imageForHeader.jpg";
import pharmacyHeaderImage from "../../../assets/medical-bill.jpg";
import { TableHeader } from "@david.kucsai/react-pdf-table";
import {formatDateString, getAge} from "../../../utils/dateUtils";
import {numToWords} from "../../../utils/validations";

import "./medical-bill-pdf.scss";
import {capitalizeFirstLetter} from "../../../utils/formatUtils";

const TABLE_ROWS_COUNT = 11;

// #9fb3db
const borderColor = '#cad5eb';
const backgroundColor = '#375692';
const addressHeadingColor = '#38495B';

const TableHeaderStyles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderBottomColor: borderColor,
        backgroundColor: borderColor,
        borderBottomWidth: 1,
        alignItems: 'center',
        height: 24,
        textAlign: 'center',
        // fontStyle: 'bold',
        flexGrow: 1,
        fontSize: 14,
        fontFamily: 'Times-Bold',
    },
    serial: {
        width: '7.5%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
    },
    description: {
        width: '37.5%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
    },
    qty: {
        width: '7.5%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
    },
    rate: {
        width: '10%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
    },
    batchNo: {
        width: '12.5%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
    },
    amount: {
        width: '10%',
    },
});

const TableRowStyles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        borderBottomColor: borderColor,
        borderBottomWidth: 1,
        alignItems: 'stretch',
        height: 24,
        fontStyle: 'bold',
        fontSize: 14,
    },
    serial: {
        textAlign: 'center',
        width: '7.5%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    description: {
        width: '37.5%',
        textAlign: 'left',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        paddingLeft: 8,
        height: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    final: {
        height: '100%',
        verticalAlign: 'center',
        alignSelf: 'center',
        alignContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    qty: {
        width: '7.5%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        textAlign: 'right',
        paddingRight: 8,
        alignSelf: 'stretch',
        flexDirection: 'column',
        justifyContent: 'center'
    },
    batchNo: {
        width: '12.5%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        textAlign: 'right',
        paddingRight: 8,
    },
    rate: {
        width: '10%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        textAlign: 'right',
        paddingRight: 8,
    },
    amount: {
        width: '10%',
        textAlign: 'right',
        paddingRight: 8,
    },
});

const TableEmptyRowStyles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        borderBottomColor: borderColor,
        borderBottomWidth: 1,
        alignItems: 'center',
        height: 24,
        fontStyle: 'bold',
        color: 'white',
    },
    serial: {
        width: '7.5%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        height: '100%'
    },
    description: {
        width: '37.5%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        height: '100%'
    },
    qty: {
        width: '7.5%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        height: '100%'
    },
    batchNo: {
        width: '12.5%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        height: '100%'
    },
    rate: {
        width: '10%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        height: '100%'
    },
    amount: {
        width: '10%',
    },

});

const TableFooterStyles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        borderBottomColor: borderColor,
        borderBottomWidth: 1,
        alignItems: 'center',
        height: 24,
        fontSize: 14,
        fontFamily: 'Times-Bold',
    },
    description: {
        width: '82.25%',
        textAlign: 'right',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        paddingRight: 8,
    },
    total: {
        width: '18.75%',
        textAlign: 'right',
        paddingRight: 8,
    },
});

const TableStyles = StyleSheet.create({
    tableContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 24,
        borderWidth: 1,
        borderColor: borderColor,
    },
});

const styles = StyleSheet.create({
    page: {
        flexDirection: 'row',
        backgroundColor: 'white'
    },
    headerImage: {
        height: 65,
        objectFit: 'cover',
        width: '100%',
    },
    headerText: {
        fontSize: 16,
        fontFamily: 'Times-Bold',
        marginLeft: 'auto',
        marginRight: 'auto',
        color: addressHeadingColor,
    },
    headerPhoneNumberText: {
        fontSize: 16,
        fontFamily: 'Times-Bold',
        marginLeft: 'auto',
        marginRight: 41,
        color: addressHeadingColor,
    },
    pageHeading: {
        fontSize: 24,
        // marginTop: 20,
        marginBottom: 20,
        // fontWeight: 'bold',
        fontFamily: 'Times-Bold',
        // textAlign: 'center',
        marginLeft: 'auto',
        marginRight: 'auto',
        color: '#375692',
        borderBottomColor: '#375692',
        borderBottomWidth: 1,
        // width: '165px'
    },
    pageContent: {
        fontSize: 14,
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
    },
    topLeft: {
        width: '50%',
    },
    topRight: {
        width: '45%',
        marginLeft: '5%',
    },
    tableContent: {
        marginTop: 10,
        fontSize: 14,
        marginBottom: 10,
    },
    tableHeader: {
        fontFamily: 'Times-Bold',
        fontSize: 16,
        marginTop: 30,
        marginBottom: 10,
        textAlign: 'center'
    },
    pageFooter: {
        flexDirection: 'row',
        fontSize: 14,
        position: 'absolute',
        bottom: 0,
        right: 5,
        justifyContent: 'flex-end',
        fontFamily: 'Times-Bold',
    },
    sellingTermsContent: {
        marginTop: 10,
        fontSize: 14,
        position: 'absolute',
        bottom: 0,
        left: 7,
    },
    section: {
        // margin: 80,
        marginTop: 0,
        marginLeft: 15,
        marginRight: 5,
        marginBottom: 80,
        padding: 10,
        flexGrow: 1,
        fontSize: 14,
    },
    sectionWithImage: {
        margin: 0,
        padding: 0,
        flexGrow: 1
    },
    formGroupWrapper: {
        flexDirection: 'row',
    },
    formGroup: {
        width: '50%',
    }
});



const MedicalBillPdfComponent = (props) => {
    const { medicalBillForm } = props;

    const medicineDetailsTableData = (medicalBillForm) => {
        const { medicineDetails } = medicalBillForm;
        const data = [];
        medicineDetails.forEach((medicineDetailItem, index) => {
            data.push({
                serial: index + 1,
                tabletName: medicineDetailItem.tabletName,
                quantity: medicineDetailItem.quantity,
                price: medicineDetailItem.price,
                total: medicineDetailItem.quantity * medicineDetailItem.price,
                dateOfExp: medicineDetailItem.dateOfExp,
                batchNo: medicineDetailItem.batchNo,
                mfdBy: medicineDetailItem.mfdBy,
            })
        });
        return data;
    };


    const getGrandTotal = (medicineDetails) => {
        return Math.floor(medicineDetails.reduce((s,x) => s + (x.quantity*x.price), 0));
    }

    const amountInWordsString = capitalizeFirstLetter(numToWords(getGrandTotal(medicalBillForm.medicineDetails)));

    const TableHeader = () => (
        <View style={TableHeaderStyles.container}>
            {/*<Text style={TableHeaderStyles.serial}>#</Text>*/}
            <Text style={TableHeaderStyles.qty}>Qty</Text>
            <Text style={TableHeaderStyles.description}>Particulars</Text>
            <Text style={TableHeaderStyles.batchNo}>Batch No</Text>
            <Text style={TableHeaderStyles.rate}>Mfd. by</Text>
            <Text style={TableHeaderStyles.batchNo}>Dt. of Exp.</Text>
            <Text style={TableHeaderStyles.rate}>Rate</Text>
            <Text style={TableHeaderStyles.amount}>Amount</Text>
        </View>
    );

    const InvoiceTableRow = ({items}) => {
        const rows = items.map( item =>
            <View style={TableRowStyles.row} key={item.serial.toString()}>
                {/*<Text style={TableRowStyles.serial}>{item.serial}</Text>*/}
                <Text style={TableRowStyles.qty}>{item.quantity}</Text>
                <View style={TableRowStyles.description}>
                    <Text style={TableRowStyles.final}>{item.tabletName}</Text>
                </View>
                <Text style={TableRowStyles.batchNo}>{item.batchNo}</Text>
                <Text style={TableRowStyles.rate}>{item.mfdBy}</Text>
                <Text style={TableRowStyles.batchNo}>{item.dateOfExp}</Text>
                <Text style={TableRowStyles.rate}>{item.price}</Text>
                <Text style={TableRowStyles.amount}>{(item.total)}</Text>
            </View>
        )
        return (<Fragment>{rows}</Fragment> )
    };

    const InvoiceTableBlankSpace = ({rowsCount}) => {
        const blankRows = Array(rowsCount).fill(0)
        const rows = blankRows.map( (x, i) =>
            <View style={TableEmptyRowStyles.row} key={`BR${i}`}>
                {/*<Text style={TableEmptyRowStyles.serial}>-</Text>*/}
                <Text style={TableEmptyRowStyles.qty}>-</Text>
                <Text style={TableEmptyRowStyles.description}>-</Text>
                <Text style={TableEmptyRowStyles.batchNo}>-</Text>
                <Text style={TableEmptyRowStyles.rate}>-</Text>
                <Text style={TableEmptyRowStyles.batchNo}>-</Text>
                <Text style={TableEmptyRowStyles.rate}>-</Text>
                <Text style={TableEmptyRowStyles.amount}>-</Text>
            </View>
        )
        return (<Fragment>{rows}</Fragment> )
    };

    const InvoiceTableFooter = ({items}) => {
        const total = items.map(item => item.quantity * item.price)
            .reduce((accumulator, currentValue) => accumulator + currentValue , 0)
        return(
            <View style={TableFooterStyles.row}>
                <Text style={TableFooterStyles.description}>TOTAL</Text>
                <Text style={TableFooterStyles.total}> { Math.floor(total)}</Text>
            </View>
        )
    };



    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.sectionWithImage}>
                    <Image style={styles.headerImage} src={pharmacyHeaderImage} />
                    <Text style={styles.headerText}>Beside Samskruti Shopping Mall, New Town, MAHABUBNAGAR-5009001.</Text>
                    <Text style={styles.headerPhoneNumberText}>Ph No. 9848506111</Text>
                    <View style={styles.section}>
                        <Text style={styles.pageHeading}>Medical Billing Invoice</Text>
                        <view style={styles.formGroupWrapper}>
                            <View style={styles.formGroup}>
                                <View style={styles.pageContent}>
                                    <Text style={styles.topLeft}>Invoice</Text>
                                    <Text>:</Text>
                                    <Text style={styles.topRight}>{medicalBillForm.invoice}</Text>
                                </View>
                                <View style={styles.pageContent}>
                                    <Text style={styles.topLeft}>Name</Text>
                                    <Text>:</Text>
                                    <Text style={styles.topRight}>{medicalBillForm.patientName}</Text>
                                </View>
                                <View style={styles.pageContent}>
                                    <Text style={styles.topLeft}>Sex</Text>
                                    <Text>:</Text>
                                    <Text style={styles.topRight}>{medicalBillForm.sex}</Text>
                                </View>
                            </View>
                            <View style={styles.formGroup}>
                                <View style={styles.pageContent}>
                                    <Text style={styles.topLeft}>Date</Text>
                                    <Text>:</Text>
                                    <Text style={styles.topRight}>{formatDateString(new Date())}</Text>
                                </View>
                                <View style={styles.pageContent}>
                                    <Text style={styles.topLeft}>Mobile</Text>
                                    <Text>:</Text>
                                    <Text style={styles.topRight}>{medicalBillForm.mobile}</Text>
                                </View>
                                <View style={styles.pageContent}>
                                    <Text style={styles.topLeft}>Age</Text>
                                    <Text>:</Text>
                                    <Text style={styles.topRight}>{medicalBillForm.dateOfBirth}</Text>
                                </View>
                            </View>
                        </view>

                        <view style={TableStyles.tableContainer}>
                            {/*<Text style={styles.tableHeader}>Medicine Details</Text>*/}

                            <TableHeader />
                            <InvoiceTableRow items={medicineDetailsTableData(medicalBillForm)} />
                            <InvoiceTableBlankSpace rowsCount={TABLE_ROWS_COUNT - medicineDetailsTableData(medicalBillForm).length} />
                            <InvoiceTableFooter items={medicineDetailsTableData(medicalBillForm)} />
                            {/*<Table*/}
                            {/*    data={medicineDetailsTableData(medicalBillForm)}*/}
                            {/*>*/}
                            {/*    <TableBody>*/}
                            {/*        <DataTableCell style={{marginLeft: '10px'}} weighting={0.2} getContent={(r) => r.serial}/>*/}
                            {/*        <DataTableCell style={{marginLeft: '10px'}} weighting={0.5} getContent={(r) => r.tabletName}/>*/}
                            {/*        <DataTableCell style={{marginLeft: '10px'}} weighting={0.3} getContent={(r) => r.quantity}/>*/}
                            {/*        <DataTableCell style={{marginLeft: '10px'}} weighting={0.3} getContent={(r) => r.price}/>*/}
                            {/*        <DataTableCell style={{marginLeft: '10px'}} weighting={0.3} getContent={(r) => r.total}/>*/}
                            {/*    </TableBody>*/}
                            {/*</Table>*/}
                        </view>
                        <Text style={styles.tableContent}>
                            In words: {amountInWordsString}rupees only
                        </Text>
                        <Text style={styles.sellingTermsContent}>
                            *Goods once sold will not be taken back
                        </Text>
                        <Text>
                            Notes:
                        </Text>
                        <Text style={styles.pageFooter}>SIGNATURE</Text>
                    </View>
                </View>
            </Page>
        </Document>
    );
}

export default MedicalBillPdfComponent;
