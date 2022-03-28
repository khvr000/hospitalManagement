import {HttpCallStates} from "../../config/http.config";
import ScoreTrackerTypes from "./score-tracker.types";
import {Players} from "../../config/score-tracker.config";

const INITIAL_STATE = {
    // getHomeComponentInfoCallStatus: HttpCallStates.UNTOUCHED,
    playerData: {},
    playerNames: {},
    playerScores: {
        [Players.FIRST_PLAYER]: 0,
        [Players.SECOND_PLAYER]: 0,
    }
}

const ScoreTrackerReducer = (state=INITIAL_STATE, action) => {
    switch (action.type) {
        case ScoreTrackerTypes.SET__SCORE_TRACKER_PLAYER_NAMES: {
            return {
                ...state,
                playerNames: action.payload.playerNames
            }
        }

        case ScoreTrackerTypes.SET__SCORE_TRACKER_PLAYER_SCORE: {
            const { player } = action.payload;
            return {
                ...state,
                playerScores: {
                    ...state.playerScores,
                    [player]: ++state.playerScores[player]
                }
            }
        }

        case ScoreTrackerTypes.RESET__SCORE_TRACKER_PLAYER_DATA: {
           return {
               playerNames: {},
               playerScores: {
                   [Players.FIRST_PLAYER]: 0,
                   [Players.SECOND_PLAYER]: 0,
               }
           }
        }

        case ScoreTrackerTypes.RESET__SCORE_TRACKER_PLAYER_SCORES: {
            return {
                ...state,
                playerScores: {
                    [Players.FIRST_PLAYER]: 0,
                    [Players.SECOND_PLAYER]: 0,
                }
            }
        }


        default: {
            return state;
        }
    }
}

export default ScoreTrackerReducer;
