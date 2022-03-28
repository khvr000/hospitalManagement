import * as React from "react";
import {Button} from "@material-ui/core";
import {Players} from "../../config/score-tracker.config";
import "./game-summary.component.scss";

type Props = {
    playerScores: Object,
    playerNames: Object,
    handleSaveGame: Function
}



const GameSummaryComponent = (props: Props) => {
    const { playerScores, playerNames, handleSaveGame } = props;

    const getCurrentWinner = () => {
        if (!playerScores[Players.FIRST_PLAYER] && !playerScores[Players.SECOND_PLAYER]) {
          return 'Game to be started';
        } else if (playerScores[Players.FIRST_PLAYER] === playerScores[Players.SECOND_PLAYER]) {
          return 'Tie';
        }  else if (playerScores[Players.FIRST_PLAYER] > playerScores[Players.SECOND_PLAYER]) {
          return playerNames[Players.FIRST_PLAYER];
        } else {
            return playerNames[Players.SECOND_PLAYER];
        }
    };

    const currentWinner = getCurrentWinner();
    const winDifference = Math.abs(playerScores[Players.FIRST_PLAYER] - playerScores[Players.SECOND_PLAYER]);
    return (
        <div className="game-summary-container">
            <div className="game-current-winner-wrapper">
                <div className="game-current-winner-title">
                    Current Winner:
                </div>
                <div className="game-current-winner-value">
                    {currentWinner}
                </div>
            </div>
            <div className="game-win-difference-wrapper">
                <div className="game-win-difference-title">
                    Win difference:
                </div>
                <div className="game-win-difference-value">
                    {winDifference}
                </div>
            </div>
            <div className="save-game-button-wrapper">
                <Button  variant="contained" className="save-game-button" color="primary" onClick={() => handleSaveGame()}>Save Game</Button>
            </div>
        </div>
    );
}

export default GameSummaryComponent;
