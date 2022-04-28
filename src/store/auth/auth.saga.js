import {
    setAdmittedPatients,
    setAuthIsUserLoggedIn,
    setAuthSaveUserLoginCallStatus,
    setAuthSaveUserLogoutCallStatus,
    setAuthSaveUserSignupCallStatus,
    setAuthUserSignup,
    setGetInvoiceDetailsStatus,
    setGetPaymentDetailsForAdmissionNumberCallStatus,
    setInterestFilledPatients, setInvoiceDetails,
    setPaymentDetailsForAdmissionNumber
} from "./auth.actions";
import {put, select} from 'redux-saga/effects';
import {HttpCallStates} from "../../config/http.config";
import axios from "../../utils/axios";
import rawAxios from "axios";
import {getJwtTokenFromStorage, saveLoginDataToStorage} from "../../utils/storage";
import {Link} from "react-router-dom";
import {getNewAdmissionNumber} from "../../utils/validations";


export const getAuthState = (state) => state.auth;


export function* saveAuthUserLoginSaga(action) {
    const { payload } = action;
    const { data } = payload;
    yield put(setAuthSaveUserLoginCallStatus(HttpCallStates.LOADING));
    try {

        const apiEndpoint = 'https://jsonplaceholder.typicode.com/todos/1';
        const response = yield axios.get(apiEndpoint);
        const authState = yield select(getAuthState);
        const { signUpData } = authState;

        if (data.email === signUpData.email && data.password === signUpData.password) {
            saveLoginDataToStorage({jwt_token: '12121212131313'});
            axios.defaults.headers.common.Authorization = `Bearer ${getJwtTokenFromStorage()}`;
            yield put(setAuthIsUserLoggedIn(true))
            yield put(setAuthSaveUserLoginCallStatus(HttpCallStates.SUCCESS));
        } else {
            alert('please enter valid credentials')
            throw new Error('Invalid Login details');
        }


    } catch (e) {
        yield put(setAuthSaveUserLoginCallStatus(HttpCallStates.ERROR));
    }
}


export function* saveAuthUserSignupSaga(action) {
    const { payload } = action;
    const { data } = payload;
    yield put(setAuthSaveUserSignupCallStatus(HttpCallStates.LOADING));
    try {
        const response = yield axios.get(`https://jsonplaceholder.typicode.com/todos/1`);
        yield put(setAuthUserSignup(data));
        yield put(setAuthSaveUserSignupCallStatus(HttpCallStates.SUCCESS));
        alert('sign up success')
        // this.props.history.push('/login')

    } catch (e) {
        let error400Title = 'Signup - Error 400';
        let error400Content = <div>You need to enter both email and password</div>;
        if (e && e.response && e.response.status === 400) {
            if (e.response.data === 'User already signed up') {
                error400Title = 'Signup Error';
                error400Content = (
                    <div>
                        You already have an account with us.
                        <br />
                        <br />
                        <Link to="/login">Click here</Link> to login.
                    </div>
                );
            } else if (e.response.data) {
                error400Content = <div>{e.response.data}</div>;
            }
        }
        yield put(setAuthSaveUserSignupCallStatus(HttpCallStates.ERROR));
    }
}


export function* saveAuthUserLogoutSaga(action) {
    const { payload } = action;
    const { data } = payload;
    yield put(setAuthSaveUserLogoutCallStatus(HttpCallStates.LOADING));
    try {
        // const apiEndpoint = '/api/v2/logout';

        // const response = yield axios.get(apiEndpoint, data);
        // if (response && response.data) {
        //
        // }
        yield put(setAuthIsUserLoggedIn(false))

        yield put(setAuthSaveUserLogoutCallStatus(HttpCallStates.SUCCESS));
    } catch (e) {
        yield put(setAuthSaveUserLogoutCallStatus(HttpCallStates.ERROR));
    }
}

export function* saveAdmitFormSaga(action) {
    const { admitForm: admitFormFromState } = action.payload;
    const authState = yield select(getAuthState);

    try {
        const url = 'https://zvbd8j7btc.execute-api.ap-south-1.amazonaws.com/stage01/admitform';
        // const existingPatientsObject = authState.admittedPatients;
        // const existingPatientsCount = Object.keys(existingPatientsObject).length;
        // const admissionNumber = getNewAdmissionNumber(existingPatientsCount);
        // const { admissionNumber , ...rest} = admitFormFromState
        // const admitForm = {
        //     ...rest,
        //     admission_number: admissionNumber
        // }

        const apiEndpoint = 'https://demomanagement-a4e9b-default-rtdb.firebaseio.com/admitForm.json';
        const response = yield rawAxios.post(url, admitFormFromState);
        alert('admin record saved successfully');
        // // set response

    } catch (e) {

    }
}


export function* getAdmitFormSaga(action) {
    // const { admitForm } = action.payload;

    try {
        const url = 'https://zvbd8j7btc.execute-api.ap-south-1.amazonaws.com/stage01/admitform';

        const apiEndpoint = 'https://demomanagement-a4e9b-default-rtdb.firebaseio.com/admitForm.json';
        const response = yield rawAxios.get(url);
        yield put(setAdmittedPatients(response.data.body.Items));


    } catch (e) {

    }

}

export function* savePaymentDetailsSaga(action) {
    const { paymentDetailsData, admissionNumber } = action.payload;
    // const authState = yield select(getAuthState);
    const data = {
        ...paymentDetailsData,
        admission_number: admissionNumber
    }

    try {
        const url = 'https://zvbd8j7btc.execute-api.ap-south-1.amazonaws.com/stage01/paymentdetails';

        const response = yield rawAxios.post(url, data);
        // alert('admin record saved successfully');
        // // set response

    } catch (e) {

    }
}


export function* getPaymentDetailsSaga(action) {
    // const { admitForm } = action.payload;
    const { admissionNumber } = action.payload;
    try {
        yield put(setGetPaymentDetailsForAdmissionNumberCallStatus(HttpCallStates.LOADING));
        const url = `https://zvbd8j7btc.execute-api.ap-south-1.amazonaws.com/stage01/paymentdetails?admission_number=${admissionNumber}`;

        const apiEndpoint = 'https://demomanagement-a4e9b-default-rtdb.firebaseio.com/admitForm.json';
        const response = yield rawAxios.get(url);
        yield put(setPaymentDetailsForAdmissionNumber(admissionNumber, response.data.body.Item));
        yield put(setGetPaymentDetailsForAdmissionNumberCallStatus(HttpCallStates.SUCCESS));
    } catch (e) {
        yield put(setGetPaymentDetailsForAdmissionNumberCallStatus(HttpCallStates.ERROR));
    }
}


export function* saveInterestFormSaga(action) {
    const { interestForm: admitFormFromState } = action.payload;
    const authState = yield select(getAuthState);
    const dateAdded = new Date().getTime();

    try {
        const url = 'https://zvbd8j7btc.execute-api.ap-south-1.amazonaws.com/stage01/interestform';

        const response = yield rawAxios.post(url, { ...admitFormFromState, dateAdded});
        alert('interest record saved successfully');

    } catch (e) {

    }
}


export function* getInterestFilledPatientsSaga(action) {

    try {
        const url = 'https://zvbd8j7btc.execute-api.ap-south-1.amazonaws.com/stage01/interestform';
        const response = yield rawAxios.get(url);
        yield put(setInterestFilledPatients(response.data.body.Items));


    } catch (e) {

    }

}


export function* getInvoiceDetailsSaga(action) {
    // const { admitForm } = action.payload;
    const { admissionNumber } = action.payload;
    try {
        yield put(setGetInvoiceDetailsStatus(HttpCallStates.LOADING));
        const url = `https://zvbd8j7btc.execute-api.ap-south-1.amazonaws.com/stage01/invoicedetails`;

        const response = yield rawAxios.get(url);
        const latestInvoiceNumber = +response.data.body.invoice_number + 1;
        yield put(setInvoiceDetails(latestInvoiceNumber));
        yield put(setGetInvoiceDetailsStatus(HttpCallStates.SUCCESS));
    } catch (e) {
        yield put(setGetPaymentDetailsForAdmissionNumberCallStatus(HttpCallStates.ERROR));
    }
}

export function* saveInvoiceDetailsSaga(action) {
    const { invoiceDetails } = action.payload;

    const data = {
        ...invoiceDetails
    }

    try {
        const url = 'https://zvbd8j7btc.execute-api.ap-south-1.amazonaws.com/stage01/invoicedetails';

        const response = yield rawAxios.post(url, data);
        // alert('admin record saved successfully');
        // // set response

    } catch (e) {

    }
}
