

import { combineReducers } from 'redux';
import authReducer from './auth/auth.reducer';
import scoreTracker from "./score-tracker/score-tracker.reducer";
import AuthTypes from './auth/auth.types';


const rootReducer = combineReducers({
    auth: authReducer,
    scoreTracker: scoreTracker
});

const filteredRootReducer = (state, action) => {
    if (action.type === AuthTypes.RUN__AUTH__USER_LOGOUT) {
        state = undefined;
    }

    console.log(state);


    return rootReducer(state, action);
};

export default filteredRootReducer;
