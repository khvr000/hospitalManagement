import AuthTypes from "./auth.types";
import {HttpCallStates} from "../../config/http.config";
import {getInvoiceDetailsSaga} from "./auth.saga";

export const setAuthLoginRequiredModal = showModal => ({
    type: AuthTypes.TOGGLE__AUTH__LOGIN_REQUIRED_MODAL,
    payload: showModal,
});

export const checkAuthUserLogin = () => ({
    type: AuthTypes.CHECK__AUTH__USER_LOGIN,
});


export const saveAuthUserLogin = (data, isSSO) => ({
    type: AuthTypes.SAVE__AUTH__USER_LOGIN,
    payload: { data, isSSO },
});

export const saveAuthUserSignup = data => ({
    type: AuthTypes.SAVE__AUTH__USER_SIGNUP,
    payload: { data },
});

export const setAuthUserSignup = data => ({
    type: AuthTypes.SET__AUTH__USER_SIGNUP,
    payload: { data },
});

export const setAuthIsUserLoggedIn = isUserLoggedIn => ({
    type: AuthTypes.SET__AUTH__IS_USER_LOGGED_IN,
    payload: isUserLoggedIn,
});

export const saveAuthUserLogout = (data) => ({
    type: AuthTypes.SAVE__AUTH__USER_LOGOUT,
    payload: { data },
});

export const setAuthUserLogout = () => ({
    type: AuthTypes.SET__AUTH__USER_LOGOUT,
    payload: {}
})

export const setAuthSaveUserLoginCallStatus = (status = HttpCallStates.UNTOUCHED) => {
    if (status === HttpCallStates.LOADING) {
        return {
            type: AuthTypes.SAVE__AUTH__USER_LOGIN__LOADING,
            payload: status,
        };
    }

    if (status === HttpCallStates.SUCCESS) {
        return {
            type: AuthTypes.SAVE__AUTH__USER_LOGIN__SUCCESS,
            payload: status,
        };
    }

    if (status === HttpCallStates.ERROR) {
        return {
            type: AuthTypes.SAVE__AUTH__USER_LOGIN__ERROR,
            payload: status,
        };
    }

    return {
        type: AuthTypes.SAVE__AUTH__USER_LOGIN__STATUS,
        payload: status,
    };
};

export const setAuthSaveUserSignupCallStatus = (status = HttpCallStates.UNTOUCHED) => {
    if (status === HttpCallStates.LOADING) {
        return {
            type: AuthTypes.SAVE__AUTH__USER_SIGNUP__LOADING,
            payload: status,
        };
    }

    if (status === HttpCallStates.SUCCESS) {
        return {
            type: AuthTypes.SAVE__AUTH__USER_SIGNUP__SUCCESS,
            payload: status,
        };
    }

    if (status === HttpCallStates.ERROR) {
        return {
            type: AuthTypes.SAVE__AUTH__USER_SIGNUP__ERROR,
            payload: status,
        };
    }

    return {
        type: AuthTypes.SAVE__AUTH__USER_SIGNUP__STATUS,
        payload: status,
    };
};


export const setAuthSaveUserLogoutCallStatus = (status = HttpCallStates.UNTOUCHED) => {
    if (status === HttpCallStates.LOADING) {
        return {
            type: AuthTypes.SAVE__AUTH__USER_LOGOUT__LOADING,
            payload: status,
        };
    }

    if (status === HttpCallStates.SUCCESS) {
        return {
            type: AuthTypes.SAVE__AUTH__USER_LOGOUT__SUCCESS,
            payload: status,
        };
    }

    if (status === HttpCallStates.ERROR) {
        return {
            type: AuthTypes.SAVE__AUTH__USER_LOGOUT__ERROR,
            payload: status,
        };
    }

    return {
        type: AuthTypes.SAVE__AUTH__USER_LOGOUT__STATUS,
        payload: status,
    };
};

export const saveAdmitForm = (admitForm) => {
    return {
        type: AuthTypes.SAVE__ADMIT__FORM,
        payload: {admitForm},
    };
}


export const getAdmittedPatients = () => {
    return {
        type: AuthTypes.GET__ADMIT__FORM,
        payload: { },
    };
}

export const setAdmittedPatients = (admittedPatients) => {
    return {
        type: AuthTypes.SET__ADMITTED_PATIENTS,
        payload: { admittedPatients },
    };
}


export const savePaymentDetailsForAdmissionNumber = (paymentDetailsData, admissionNumber) => {
    return {
        type: AuthTypes.SAVE__PAYMENT_DETAILS_FOR_ADMISSION_NUMBER,
        payload: { paymentDetailsData, admissionNumber }
    };
};

export const getPaymentDetailsForAdmissionNumber = (admissionNumber) => {
    return {
        type: AuthTypes.GET__PAYMENT_DETAILS_FOR_ADMISSION_NUMBER,
        payload: { admissionNumber }
    };
}

export const setPaymentDetailsForAdmissionNumber = (admissionNumber, paymentDetails) => {
    return {
        type: AuthTypes.SET__PAYMENT_DETAILS_FOR_ADMISSION_NUMBER,
        payload: { admissionNumber, paymentDetails },
    };
}

export const setGetPaymentDetailsForAdmissionNumberCallStatus = (status) => {
    return {
        type: AuthTypes.SET_GET__PAYMENT_DETAILS_FOR_ADMISSION_NUMBER__CALL_STATUS,
        payload: { status }
    };
}

export const setEditModeForAdmitForm = (editModeForAdmitForm, admissionNumber) => {
    return {
        type: AuthTypes.SET__EDIT_MODE_FOR_ADMIT_FORM,
        payload: { editModeForAdmitForm, admissionNumber  }
    };
}

// SET__ADMITTED_PATIENTS
// SAVE__ADMIT__FORM

export const saveInterestForm = (interestForm) => {
    return {
        type: AuthTypes.SAVE__INTEREST__FORM,
        payload: { interestForm },
    };
}

export const getInterestFilledPatients = () => {
    return {
        type: AuthTypes.GET__INTEREST__FORM,
        payload: { },
    };
}

export const setInterestFilledPatients = (interestedPatients) => {
    return {
        type: AuthTypes.SET__INTEREST_FILLED_PATIENTS,
        payload: { interestedPatients },
    };
}



export const saveInvoiceDetails = (invoiceDetails) => {
    return {
        type: AuthTypes.SAVE__INVOICE__DETAILS,
        payload: { invoiceDetails }
    };
}

export const getInvoiceDetails = () => {
    return {
        type: AuthTypes.GET__INVOICE__DETAILS,
        payload: { }
    };
}

export const setGetInvoiceDetailsStatus = (status) => {
    return {
        type: AuthTypes.GET__INVOICE__DETAILS__STATUS,
        payload: { status }
    };
}

export const setInvoiceDetails = (invoiceNumber) => {
    return {
        type: AuthTypes.SET__INVOICE__DETAILS,
        payload: { invoiceNumber }
    };
}

export const saveDiagnosticReportNumberDetails = () => {
    return {
        type: AuthTypes.SAVE__DIAGNOSTIC_REPORT_NUMBER__DETAILS,
        payload: { }
    }
};

export const getDiagnosticReportNumberDetails = () => {
    return {
        type: AuthTypes.GET__DIAGNOSTIC_REPORT_NUMBER__DETAILS,
        payload: { }
    }
};

export const setGetDiagnosticReportNumberDetailsStatus = (status) => {
    return {
        type: AuthTypes.GET__DIAGNOSTIC_REPORT_NUMBER__DETAILS__STATUS,
        payload: { status }
    };
}

export const setDiagnosticReportNumberDetails = (diagnosticReportNumber) => {
    return {
        type: AuthTypes.SET__DIAGNOSTIC_REPORT_NUMBER__DETAILS,
        payload: { diagnosticReportNumber }
    };
}
