import ScoreTrackerTypes from "./score-tracker.types";

export const setScoreTrackerPlayerNames = (playerNames) => ({
    type: ScoreTrackerTypes.SET__SCORE_TRACKER_PLAYER_NAMES,
    payload: { playerNames }
});


export const setScoreTrackerPlayerScore = (player) => ({
    type: ScoreTrackerTypes.SET__SCORE_TRACKER_PLAYER_SCORE,
    payload: { player }
});

export const saveScoreTrackerCurrentGame = (playerNames , playerScores) => ({
    type: ScoreTrackerTypes.SAVE__SCORE_TRACKER_CURRENT_GAME,
    payload: {playerNames , playerScores}
})


export const resetScoreTrackerPlayerData = () => ({
    type: ScoreTrackerTypes.RESET__SCORE_TRACKER_PLAYER_DATA
})


export const resetScoreTrackerPlayerScores = () => ({
    type: ScoreTrackerTypes.RESET__SCORE_TRACKER_PLAYER_SCORES
})
