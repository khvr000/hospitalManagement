import { saveCurrentPingPongGameToStorage } from "../../utils/storage";

export function saveScoreTrackerCurrentGameSaga(action) {
    const { playerNames, playerScores } = action.payload;
    try {
        saveCurrentPingPongGameToStorage({playerNames, playerScores});
    } catch (e) {

    }
}
