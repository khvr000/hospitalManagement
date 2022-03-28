import * as React from "react";
import {Players} from "../../config/score-tracker.config";

import "./track-score.component.scss";
import PlayerDataComponent from "./player-data/player-data.component";
import GameSummaryComponent from "../game-summary/game-summary.component";
import styled from "styled-components";



export const DefaultHorizontalSectionSeparator = styled.div`
  width: 100%;
  height: 1px;
  margin: 1.6rem 0;
  border-radius: 1px;
  background-color: #454a54;
`;


type Props = {
    playerNames: Object,
    playerScores: Object,
    setScoreTrackerPlayerScore: Function,
    saveScoreTrackerCurrentGame: Function
}

class TrackScoreComponent extends React.Component<Props> {

    handleAddWinClick = (player) => {
        this.props.setScoreTrackerPlayerScore(player)
    };

    handleSaveGame = () => {
        const { playerNames, playerScores } = this.props;
        this.props.saveScoreTrackerCurrentGame(playerNames, playerScores);
        this.props.resetScoreTrackerPlayerScores();
    }

    render() {
        const { playerNames, playerScores } = this.props;

        return(
            <>
                <div className="score-tracker-title">
                    Score Board
                </div>
                <div className="score-tracker-container">
                    {Object.values(Players).map(player => (
                        <PlayerDataComponent
                            key={player}
                            handleAddWinClick={this.handleAddWinClick}
                            player={player}
                            playerNames={playerNames}
                            playerScores={playerScores}
                        />
                    ))}
                </div>
                <DefaultHorizontalSectionSeparator />
                <GameSummaryComponent
                    playerScores={playerScores}
                    playerNames={playerNames}
                    handleSaveGame={this.handleSaveGame}
                />
            </>
        )
    }
}


export default TrackScoreComponent;
