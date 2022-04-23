import React, {Component} from 'react';
import "./medical-bill-pdf.scss";
import {Document, Image, Page, StyleSheet, Text, View} from "@react-pdf/renderer";
import headerImage from "../../../assets/imageForHeader.jpg";


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



class MedicalBillPdfComponent extends Component {
    render() {
        return (
                <Document>
                    <Page size="A4" style={styles.page}>
                        <View style={styles.sectionWithImage}>
                            <Image style={styles.headerImage} src={headerImage} />
                            <View style={styles.section}>
                                {/*<Text style={styles.pageContent}>{firstPageText}</Text>*/}
                                <Text style={styles.pageFooter}>MEDICAL SUPERINTENDENT</Text>
                            </View>
                        </View>
                    </Page>
                </Document>
        );
    }
}

export default MedicalBillPdfComponent;
