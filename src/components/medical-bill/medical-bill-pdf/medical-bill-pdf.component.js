import React, { Fragment } from 'react';
import {Document, Image, Page, StyleSheet, Text, View} from "@react-pdf/renderer";
import headerImage from "../../../assets/imageForHeader.jpg";
import { TableHeader } from "@david.kucsai/react-pdf-table";
import {formatDateString, getAge} from "../../../utils/dateUtils";
import {numToWords} from "../../../utils/validations";

import "./medical-bill-pdf.scss";

const TABLE_ROWS_COUNT = 11;

const borderColor = '#E07164'
const TableHeaderStyles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderBottomColor: '#E07164',
        backgroundColor: '#E07164',
        borderBottomWidth: 1,
        alignItems: 'center',
        height: 24,
        textAlign: 'center',
        fontStyle: 'bold',
        flexGrow: 1,
        fontSize: 16,
    },
    serial: {
        width: '12.5%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
    },
    description: {
        width: '31.25%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
    },
    qty: {
        width: '18.75%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
    },
    rate: {
        width: '18.75%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
    },
    amount: {
        width: '18.75%',
    },
});

const TableRowStyles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        borderBottomColor: '#E07164',
        borderBottomWidth: 1,
        alignItems: 'center',
        height: 24,
        fontStyle: 'bold',
        fontSize: 14,
    },
    serial: {
        textAlign: 'center',
        width: '12.5%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
    },
    description: {
        width: '31.25%',
        textAlign: 'left',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        paddingLeft: 8,
    },
    qty: {
        width: '18.75%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        textAlign: 'right',
        paddingRight: 8,
    },
    rate: {
        width: '18.75%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        textAlign: 'right',
        paddingRight: 8,
    },
    amount: {
        width: '18.75%',
        textAlign: 'right',
        paddingRight: 8,
    },
});

const TableEmptyRowStyles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        borderBottomColor: '#E07164',
        borderBottomWidth: 1,
        alignItems: 'center',
        height: 24,
        fontStyle: 'bold',
        color: 'white'
    },
    serial: {
        width: '12.5%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
    },
    description: {
        width: '31.25%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
    },
    qty: {
        width: '18.75%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
    },
    rate: {
        width: '18.75%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
    },
    amount: {
        width: '18.75%',
    },

});

const TableFooterStyles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        borderBottomColor: '#E07164',
        borderBottomWidth: 1,
        alignItems: 'center',
        height: 24,
        fontSize: 14,
        fontStyle: 'bold',
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
        fontFamily: 'Times-Bold',
        textAlign: 'center'
    },
    pageContent: {
        fontSize: 16,
    },
    tableContent: {
        marginTop: 10,
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
            })
        });
        return data;
    };


    const getGrandTotal = (medicineDetails) => {
        return Math.floor(medicineDetails.reduce((s,x) => s + (x.quantity*x.price), 0));
    }

    const amountInWordsString = numToWords(getGrandTotal(medicalBillForm.medicineDetails));

    const TableHeader = () => (
        <View style={TableHeaderStyles.container}>
            <Text style={TableHeaderStyles.serial}>#</Text>
            <Text style={TableHeaderStyles.description}>Particulars</Text>
            <Text style={TableHeaderStyles.qty}>Qty</Text>
            <Text style={TableHeaderStyles.rate}>Rate</Text>
            <Text style={TableHeaderStyles.amount}>Amount</Text>
        </View>
    );

    const InvoiceTableRow = ({items}) => {
        const rows = items.map( item =>
            <View style={TableRowStyles.row} key={item.serial.toString()}>
                <Text style={TableRowStyles.serial}>{item.serial}</Text>
                <Text style={TableRowStyles.description}>{item.tabletName}</Text>
                <Text style={TableRowStyles.qty}>{item.quantity}</Text>
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
                <Text style={TableEmptyRowStyles.serial}>-</Text>
                <Text style={TableEmptyRowStyles.description}>-</Text>
                <Text style={TableEmptyRowStyles.qty}>-</Text>
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
                <Text style={TableFooterStyles.total}>Rs { Math.floor(total)}</Text>
            </View>
        )
    };



    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.sectionWithImage}>
                    <Image style={styles.headerImage} src={headerImage} />
                    <View style={styles.section}>
                        <Text style={styles.pageHeading}>Medical Invoice</Text>
                        <view style={styles.formGroupWrapper}>
                            <View style={styles.formGroup}>
                                <Text style={styles.pageContent}>Name: {medicalBillForm.patientName}</Text>
                                <Text style={styles.pageContent}>Sex: {medicalBillForm.sex}</Text>
                            </View>
                            <View style={styles.formGroup}>
                                <Text style={styles.pageContent}>Age: {medicalBillForm.dateOfBirth}</Text>
                                <Text style={styles.pageContent}>Date: {formatDateString(new Date())}</Text>
                            </View>
                        </view>

                        <view style={styles.tableContent}>
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
                            Total in Words: {amountInWordsString} rupees only
                        </Text>
                        <Text style={styles.pageFooter}>SIGNATURE</Text>
                    </View>
                </View>
            </Page>
        </Document>
    );
}

export default MedicalBillPdfComponent;
