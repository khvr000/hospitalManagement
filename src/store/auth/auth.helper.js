const parseAdmissionNumber = (admissionNumber) => {
    if(!admissionNumber) return;
    const splitArray = admissionNumber.split('/');
    if(splitArray.length !== 2) {
        console.error('invalid admission number in the application', admissionNumber, 'please contact admin');
    }
    return {admissionIdOfYear: +splitArray[0], admissionYear: +splitArray[1]};
}

const sortAdmissionNumbersFunction = (item1, item2) => {
    const {admissionIdOfYear : admissionIdOfYearItem1, admissionYear: admissionYearItem1} = parseAdmissionNumber(item1.admission_number);
    const {admissionIdOfYear : admissionIdOfYearItem2, admissionYear: admissionYearItem2} = parseAdmissionNumber(item2.admission_number);
    if(admissionYearItem1 < admissionYearItem2) {
        return 1;
    } else if (admissionYearItem1 > admissionYearItem2) {
        return -1;
    } else {
        if(admissionIdOfYearItem1 < admissionIdOfYearItem2) {
            return 1;
        } else if(admissionIdOfYearItem1 > admissionIdOfYearItem2) {
            return -1;
        } else {
            return 0;
        }
    }
}

export const sortAdmittedPatients = ( admittedPatients ) => {
    return [...admittedPatients].sort(sortAdmissionNumbersFunction);
}