import { takeEvery } from 'redux-saga/effects';
import AuthTypes from "./auth/auth.types";
import ScoreTrackerTypes from "./score-tracker/score-tracker.types";

import {
    getAdmitFormSaga,
    getPaymentDetailsSaga,
    saveAdmitFormSaga,
    saveAuthUserLoginSaga,
    saveAuthUserLogoutSaga,
    saveAuthUserSignupSaga,
    savePaymentDetailsSaga
} from "./auth/auth.saga";
import {saveScoreTrackerCurrentGameSaga} from "./score-tracker/score-tracker.saga";


export function* watchAuthRequests() {
    // yield takeEvery(AuthTypes.CHECK__AUTH__USER_LOGIN, checkAuthUserLoginSaga);
    yield takeEvery(AuthTypes.SAVE__AUTH__USER_LOGIN, saveAuthUserLoginSaga);
    yield takeEvery(AuthTypes.SAVE__AUTH__USER_LOGOUT, saveAuthUserLogoutSaga);
    yield takeEvery(AuthTypes.SAVE__AUTH__USER_SIGNUP, saveAuthUserSignupSaga);
    yield takeEvery(AuthTypes.SAVE__ADMIT__FORM, saveAdmitFormSaga);
    yield takeEvery(AuthTypes.SAVE__PAYMENT_DETAILS_FOR_ADMISSION_NUMBER, savePaymentDetailsSaga);
    yield takeEvery(AuthTypes.GET__ADMIT__FORM, getAdmitFormSaga);
    yield takeEvery(AuthTypes.GET__PAYMENT_DETAILS_FOR_ADMISSION_NUMBER, getPaymentDetailsSaga);
}

export function* watchPingPongTrackerRequests() {
    yield takeEvery(ScoreTrackerTypes.SAVE__SCORE_TRACKER_CURRENT_GAME, saveScoreTrackerCurrentGameSaga);
}
