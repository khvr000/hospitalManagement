import {sortAdmittedPatients} from "../store/auth/auth.helper";

export const isDatasetNameValid = (datasetName) => {
    return /^[a-zA-Z0-9_.\- ]*$/.test(datasetName);
};

export const isAddressValid = (address) => {
    return /^[a-zA-Z0-9/,_.\n\- ]*$/.test(address);
};

export const isTextValid = (text) => {
    return /^[a-zA-Z0-9_./\- ]*$/.test(text);
}

export const isMobileNumberValid = (number) => {
    return /^[0-9_\- ]*$/.test(number);
};

export const isDateValid = (date) => {
    const dateSplitArray = date.split("-");
    return dateSplitArray.length === 3;
};

export const getDatasetNameValidation = (name) => {
    const MAX_LENGTH = 100;
    let errorMessage = '';
    if (!name || !name.trim()) {
        errorMessage = 'Enter patient name';
    } else if (!isDatasetNameValid(name)) {
        errorMessage = 'Use alphanumeric characters only. Special characters are not allowed. (eg., MilkyWay, Deepen337)';
    } else if (name.length > MAX_LENGTH) {
        errorMessage = `Dataset name has to be less than ${MAX_LENGTH} characters`;
    }

    return {
        error: errorMessage,
        isValid: !errorMessage,
    };
};

export const getMobileValidation = (number) => {
    const MAX_LENGTH = 10;
    let errorMessage = '';
    if (!number || !number.trim()) {
        errorMessage = 'Enter mobile number';
    } else if (!isMobileNumberValid(number)) {
        errorMessage = 'Use numeric characters only. Other characters are not allowed.';
    } else if (number.length > MAX_LENGTH) {
        errorMessage = `Mobile Number should not be more than ${MAX_LENGTH}`;
    }
    return {
        error: errorMessage,
        isValid: !errorMessage,
    };
};

export const getAlternateMobileValidation = (number) => {
    const MAX_LENGTH = 10;
    let errorMessage = '';
    if (!isMobileNumberValid(number)) {
        errorMessage = 'Use numeric characters only. Other characters are not allowed.';
    } else if (number.length > MAX_LENGTH) {
        errorMessage = `Mobile Number should be less than ${MAX_LENGTH}`;
    }

    return {
        error: errorMessage,
        isValid: !errorMessage,
    };
}

export const getAddressValidation = (address) => {
    const MAX_LENGTH = 200;
    let errorMessage = '';
    if (!address || !address.trim()) {
        errorMessage = 'Enter address';
    } else if (!isAddressValid(address)) {
        errorMessage = 'Use alphanumeric characters, / only. Special characters are not allowed.';
    } else if (address.length > MAX_LENGTH) {
        errorMessage = `Dataset name has to be less than ${MAX_LENGTH} characters`;
    }

    return {
        error: errorMessage,
        isValid: !errorMessage,
    };
}

export const getArrayValidation = (value) => {
    let errorMessage = '';
    if (!value || !Array.isArray(value)) {
        errorMessage = 'Not an array'
    }
    return {
        error: errorMessage,
        isValid: !errorMessage,
    };
}

export const getTextValidation = (text) => {
    const MAX_LENGTH = 150;
    let errorMessage = '';
    if (!text || !text.trim()) {
        errorMessage = 'Enter details';
    } else if (!isTextValid(text)) {
        errorMessage = 'Use alphanumeric characters, . / only. Special characters are not allowed.';
    } else if (text.length > MAX_LENGTH) {
        errorMessage = `Text has to be less than ${MAX_LENGTH} characters`;
    }

    return {
        error: errorMessage,
        isValid: !errorMessage,
    };
}

export const getDateValidation = (date) => {
    let errorMessage = '';
    if (!date || !date.trim()) {
        errorMessage = 'Enter date';
    } else if (!isDateValid(date)) {
        errorMessage = 'Please enter valid date';
    }
    return {
        error: errorMessage,
        isValid: !errorMessage
    }
}

export const getNonMandatoryDateValidation = (date) => {
    let errorMessage = '';
     if (date && !isDateValid(date)) {
        errorMessage = 'Please enter valid date';
    }
    return {
        error: errorMessage,
        isValid: !errorMessage
    }
}


export const getAmountValidation = (amount) => {
    const MAX_LENGTH = 8;
    let errorMessage = '';
    if (!amount || !amount.trim()) {
        errorMessage = 'Enter amount';
    } else if (!isMobileNumberValid(amount)) {
        errorMessage = 'Use numeric characters only. Other characters are not allowed.';
    } else if (amount.length > MAX_LENGTH) {
        errorMessage = `Amount has to be less than ${MAX_LENGTH} characters`;
    }

    return {
        error: errorMessage,
        isValid: !errorMessage,
    };
}

export const nonMandatoryAmountValidation = (amount) => {
    const MAX_LENGTH = 8;
    let errorMessage = '';
    if (!isMobileNumberValid(amount)) {
        errorMessage = 'Use numeric characters only. Other characters are not allowed.';
    } else if (amount.length > MAX_LENGTH) {
        errorMessage = `Amount has to be less than ${MAX_LENGTH} characters`;
    }

    return {
        error: errorMessage,
        isValid: !errorMessage,
    };
}


export const sortItems = (items, order='ascending', key, subKey) => {
    if (!items) return [];

    if(key === 'admission_number') {
        return sortAdmittedPatients(items);
    }

    if (subKey) {
        let sortAlphaNum = (a, b) => a?.[key]?.[subKey]?.toString().localeCompare(b?.[key]?.[subKey], 'en', { numeric: true });
        if(order === 'descending'){
            sortAlphaNum = (a, b) => b?.[key]?.[subKey]?.toString().localeCompare(a?.[key]?.[subKey], 'en', { numeric: true });
        }

        items.sort(sortAlphaNum);
    } else if(key){
        let sortAlphaNum = (a, b) => a?.[key]?.toString().localeCompare(b?.[key], 'en', { numeric: true });
        if(order === 'descending'){
            sortAlphaNum = (a, b) => b?.[key]?.toString().localeCompare(a?.[key], 'en', { numeric: true });
        }
        items.sort(sortAlphaNum);
    } else {
        let sortAlphaNum = (a, b) => a.localeCompare(b, 'en', { numeric: true });
        if(order === 'descending'){
            sortAlphaNum =  (a, b) => b.localeCompare(a, 'en', { numeric: true });;
        }
        items.sort(sortAlphaNum);
    }

    return items;
};


export const getNewAdmissionNumber = (count) => {
    const year = new Date().getFullYear().toString().substr(2,2);
    return `${count + 1}/${year}`;
};

export const amountInWords =  (num) => {
    const a = ['','one ','two ','three ','four ', 'five ','six ','seven ','eight ','nine ','ten ','eleven ','twelve ','thirteen ','fourteen ','fifteen ','sixteen ','seventeen ','eighteen ','nineteen '];
    const b = ['', '', 'twenty','thirty','forty','fifty', 'sixty','seventy','eighty','ninety'];
    if ((num = num.toString()).length > 9) return 'overflow';
    const n = ('000000000' + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
    if (!n) return; var str = '';
    str += (n[1] !== 0) ? (a[Number(n[1])] || b[n[1][0]] + ' ' + a[n[1][1]]) + 'crore ' : '';
    str += (n[2] !== 0) ? (a[Number(n[2])] || b[n[2][0]] + ' ' + a[n[2][1]]) + 'lakh ' : '';
    str += (n[3] !== 0) ? (a[Number(n[3])] || b[n[3][0]] + ' ' + a[n[3][1]]) + 'thousand ' : '';
    str += (n[4] !== 0) ? (a[Number(n[4])] || b[n[4][0]] + ' ' + a[n[4][1]]) + 'hundred ' : '';
    str += (n[5] !== 0) ? ((str !== '') ? 'and ' : '') + (a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]]) + 'only ' : '';
    return str;
}

const arr = x => Array.from(x);
const num = x => Number(x) || 0;
const str = x => String(x);
const isEmpty = xs => xs.length === 0;
const take = n => xs => xs.slice(0,n);
const drop = n => xs => xs.slice(n);
const reverse = xs => xs.slice(0).reverse();
const comp = f => g => x => f (g (x));
const not = x => !x;
const chunk = n => xs =>
    isEmpty(xs) ? [] : [take(n)(xs), ...chunk (n) (drop (n) (xs))];

export const numToWords = n => {
    let a = [
        '', 'one', 'two', 'three', 'four',
        'five', 'six', 'seven', 'eight', 'nine',
        'ten', 'eleven', 'twelve', 'thirteen', 'fourteen',
        'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'
    ];
    let b = [
        '', '', 'twenty', 'thirty', 'forty',
        'fifty', 'sixty', 'seventy', 'eighty', 'ninety'
    ];
    let g = [
        '', 'thousand', 'million', 'billion', 'trillion', 'quadrillion',
        'quintillion', 'sextillion', 'septillion', 'octillion', 'nonillion'
    ];
    // this part is really nasty still
    // it might edit this again later to show how Monoids could fix this up
    let makeGroup = ([ones,tens,huns]) => {
        return [
            num(huns) === 0 ? '' : a[huns] + ' hundred ',
            num(ones) === 0 ? b[tens] : (b[tens] && b[tens] + '-') || '',
            a[tens+ones] || a[ones]
        ].join('');
    };
    // "thousands" constructor; no real good names for this, i guess
    let thousand = (group,i) => group === '' ? group : `${group} ${g[i]}`;
    // execute !
    if (typeof n === 'number') return numToWords(String(n));
    if (n === '0')             return 'zero ';
    return comp (chunk(3)) (reverse) (arr(n))
        .map(makeGroup)
        .map(thousand)
        .filter(comp(not)(isEmpty))
        .reverse()
        .join(' ');
};
