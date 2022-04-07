import AuthTypes from "./auth.types";
import {HttpCallStates} from "../../config/http.config";

const INITIAL_STATE = {
    checkAuthUserLoginCallStatus: HttpCallStates.UNTOUCHED,
    saveAuthUserLoginCallStatus: HttpCallStates.UNTOUCHED,
    saveAuthUserLogoutCallStatus: HttpCallStates.UNTOUCHED,
    saveAuthUserSignupCallStatus: HttpCallStates.UNTOUCHED,
    signUpData: {},
    admittedPatients: [],
    interestedPatients: [],
    paymentDetailsData: [],
    editModeForAdmitForm: false
}

const appAuthReducer  = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case AuthTypes.RUN__AUTH__USER_LOGOUT: {
            return state;
        }

        case AuthTypes.SET__AUTH__USER_SIGNUP: {
            const { data } = action.payload;
            return {
                ...state,
                signUpData: {...data}
            }
        }

        case AuthTypes.SET__AUTH__IS_USER_LOGGED_IN: {
            return {
                ...state,
                isUserLoggedIn: action.payload,
            };
        }

        case AuthTypes.SET__AUTH__USER_LOGOUT: {
            return {
                ...state,
                isUserLoggedIn: false,
                signUpData: null
            }
        }

        case AuthTypes.SET__ADMITTED_PATIENTS: {
            const { admittedPatients } = action.payload;
            // const { admission_number, ...rest } = admittedPatients;
            // const updatedAdmittedPatients = {
            //     ...rest,
            //     admissionNumber: admission_number
            // }
            //
            // console.log('updatedAdmittedPatients', updatedAdmittedPatients);

            return {
                ...state,
                admittedPatients
            }
        }

        case AuthTypes.SET_GET__PAYMENT_DETAILS_FOR_ADMISSION_NUMBER__CALL_STATUS: {
            const { status } = action.payload;

            return {
                ...state,
                setGetPaymentDetailsForAdmissionNumberCallStatus: status
            }
        }

        case AuthTypes.SET__PAYMENT_DETAILS_FOR_ADMISSION_NUMBER: {
            const { admissionNumber, paymentDetails } = action.payload;

            return {
                ...state,
                selectedAdmissionNumber: admissionNumber,
                paymentDetailsData: {
                    ...state.paymentDetailsData,
                    [admissionNumber]: {
                        ...paymentDetails
                    }
                }
            }
        }

        case AuthTypes.SAVE__AUTH__USER_LOGIN__STATUS:
        case AuthTypes.SAVE__AUTH__USER_LOGIN__LOADING:
        case AuthTypes.SAVE__AUTH__USER_LOGIN__SUCCESS:
        case AuthTypes.SAVE__AUTH__USER_LOGIN__ERROR: {
            return {
                ...state,
                saveAuthUserLoginCallStatus: action.payload,
            };
        }

        case AuthTypes.SAVE__AUTH__USER_LOGOUT__STATUS:
        case AuthTypes.SAVE__AUTH__USER_LOGOUT__LOADING:
        case AuthTypes.SAVE__AUTH__USER_LOGOUT__SUCCESS:
        case AuthTypes.SAVE__AUTH__USER_LOGOUT__ERROR: {
            return {
                ...state,
                saveAuthUserLogoutCallStatus: action.payload,
            };
        }

        case AuthTypes.SAVE__AUTH__USER_SIGNUP__STATUS:
        case AuthTypes.SAVE__AUTH__USER_SIGNUP__LOADING:
        case AuthTypes.SAVE__AUTH__USER_SIGNUP__SUCCESS:
        case AuthTypes.SAVE__AUTH__USER_SIGNUP__ERROR: {
            return {
                ...state,
                saveAuthUserSignupCallStatus: action.payload,
            };
        }

        case AuthTypes.SET__EDIT_MODE_FOR_ADMIT_FORM: {
            const { editModeForAdmitForm, admissionNumber } = action.payload;
            return {
                ...state,
                editModeForAdmitForm,
                admissionNumberForEditMode: admissionNumber
            }
        }

        // case AuthTypes.SAVE__ADMIT__FORM:
        //     const { } = action.payload;
        //     return {
        //         ...state,
        //     }

        case AuthTypes.SET__INTEREST_FILLED_PATIENTS: {
            const { interestedPatients } = action.payload;
            return {
                ...state,
                interestedPatients
            }
        }

        default: {
            return state;
        }
    }
}


export default appAuthReducer;
