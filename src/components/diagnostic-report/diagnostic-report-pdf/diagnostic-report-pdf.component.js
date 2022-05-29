import React, { Fragment } from 'react';
import {Document, Image, Page, StyleSheet, Text, View} from "@react-pdf/renderer";
import headerImage from "../../../assets/imageForHeader.jpg";
import { TableHeader } from "@david.kucsai/react-pdf-table";
import {formatDateString, getAge} from "../../../utils/dateUtils";
import {numToWords} from "../../../utils/validations";

import "./diagnostic-report-pdf.scss";
import {capitalizeFirstLetter} from "../../../utils/formatUtils";

const TABLE_ROWS_COUNT = 11;

const borderColor = '#E0C5C2'
const TableHeaderStyles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderBottomColor: '#E0C5C2',
        backgroundColor: '#E08D84',
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
        width: '65%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
    },
    qty: {
        width: '27.5%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
    },
    // rate: {
    //     width: '27.5%',
    //     borderRightColor: borderColor,
    //     borderRightWidth: 1,
    // },
});

const TableRowStyles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        borderBottomColor: '#E0C5C2',
        borderBottomWidth: 1,
        alignItems: 'center',
        height: 24,
        fontStyle: 'bold',
        fontSize: 14,
    },
    serial: {
        textAlign: 'center',
        width: '7.5%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
    },
    description: {
        width: '65%',
        textAlign: 'left',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        paddingLeft: 8,
    },
    qty: {
        width: '27.5%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        textAlign: 'right',
        paddingRight: 8,
    },
    // rate: {
    //     width: '27.5%',
    //     borderRightColor: borderColor,
    //     borderRightWidth: 1,
    //     textAlign: 'right',
    //     paddingRight: 8,
    // },
});

const TableEmptyRowStyles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        borderBottomColor: '#E0C5C2',
        borderBottomWidth: 1,
        alignItems: 'center',
        height: 24,
        fontStyle: 'bold',
        color: 'white'
    },
    serial: {
        width: '7.5%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
    },
    description: {
        width: '65%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
    },
    qty: {
        width: '27.5%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
    },
    // rate: {
    //     width: '27.5%',
    //     borderRightColor: borderColor,
    //     borderRightWidth: 1,
    // }

});

const TableFooterStyles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        borderBottomColor: '#E0C5C2',
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
        borderColor: '#E0C5C2',
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
        // marginTop: 20,
        marginBottom: 20,
        // fontWeight: 'bold',
        fontFamily: 'Times-Bold',
        // textAlign: 'center',
        marginLeft: 'auto',
        marginRight: 'auto',
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        // width: '165px'
    },
    pageContent: {
        fontSize: 14,
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        // justifyContent: 'space-between',
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
        right: 0,
        justifyContent: 'flex-end',
        fontFamily: 'Times-Bold',
    },
    section: {
        // margin: 80,
        marginTop: 0,
        marginLeft: 80,
        marginRight: 60,
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



const DiagnosticReportPdfComponent = (props) => {
    const { diagnosticReportForm } = props;

    const medicineDetailsTableData = (diagnosticReportForm) => {
        const { diagnosticReportDetails } = diagnosticReportForm;
        const data = [];
        diagnosticReportDetails.forEach((medicineDetailItem, index) => {
            data.push({
                serial: index + 1,
                testName: medicineDetailItem.testName,
                value: medicineDetailItem.value,
                comments: medicineDetailItem.comments,
            })
        });
        return data;
    };


    const TableHeader = () => (
        <View style={TableHeaderStyles.container}>
            <Text style={TableHeaderStyles.serial}>#</Text>
            <Text style={TableHeaderStyles.description}>Test Name</Text>
            <Text style={TableHeaderStyles.qty}>Value</Text>
            {/*<Text style={TableHeaderStyles.rate}>Comments</Text>*/}
        </View>
    );

    const InvoiceTableRow = ({items}) => {
        const rows = items.map( item =>
            <View style={TableRowStyles.row} key={item.serial.toString()}>
                <Text style={TableRowStyles.serial}>{item.serial}</Text>
                <Text style={TableRowStyles.description}>{item.testName}</Text>
                <Text style={TableRowStyles.qty}>{item.value}</Text>
                {/*<Text style={TableRowStyles.rate}>{item.comments}</Text>*/}
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
                {/*<Text style={TableEmptyRowStyles.rate}>-</Text>*/}
            </View>
        )
        return (<Fragment>{rows}</Fragment> )
    };

    // const InvoiceTableFooter = ({items}) => {
    //     const total = items.map(item => item.quantity * item.price)
    //         .reduce((accumulator, currentValue) => accumulator + currentValue , 0)
    //     return(
    //         <View style={TableFooterStyles.row}>
    //             <Text style={TableFooterStyles.description}>TOTAL</Text>
    //         </View>
    //     )
    // };



    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.sectionWithImage}>
                    <Image style={styles.headerImage} src={headerImage} />
                    <View style={styles.section}>
                        <Text style={styles.pageHeading}>Diagnostic Report</Text>
                        <view style={styles.formGroupWrapper}>
                            <View style={styles.formGroup}>
                                <View style={styles.pageContent}>
                                    <Text style={styles.topLeft}>Report Number</Text>
                                    <Text>:</Text>
                                    <Text style={styles.topRight}>{diagnosticReportForm.reportNumber}</Text>
                                </View>
                                <View style={styles.pageContent}>
                                    <Text style={styles.topLeft}>Name</Text>
                                    <Text>:</Text>
                                    <Text style={styles.topRight}>{diagnosticReportForm.patientName}</Text>
                                </View>
                                <View style={styles.pageContent}>
                                    <Text style={styles.topLeft}>Sex</Text>
                                    <Text>:</Text>
                                    <Text style={styles.topRight}>{diagnosticReportForm.sex}</Text>
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
                                    <Text style={styles.topRight}>{diagnosticReportForm.mobile}</Text>
                                </View>
                                <View style={styles.pageContent}>
                                    <Text style={styles.topLeft}>Age</Text>
                                    <Text>:</Text>
                                    <Text style={styles.topRight}>{diagnosticReportForm.dateOfBirth}</Text>
                                </View>
                            </View>
                        </view>

                        <view style={TableStyles.tableContainer}>
                            {/*<Text style={styles.tableHeader}>Medicine Details</Text>*/}

                            <TableHeader />
                            <InvoiceTableRow items={medicineDetailsTableData(diagnosticReportForm)} />
                            <InvoiceTableBlankSpace rowsCount={TABLE_ROWS_COUNT - medicineDetailsTableData(diagnosticReportForm).length} />
                        </view>
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

export default DiagnosticReportPdfComponent;
