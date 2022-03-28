import * as React from "react";
import {Button} from "@material-ui/core";

type Props = {
    player: string,
    playerNames: Object,
    playerScores: Object,
    handleAddWinClick: Function
}

const PlayerDataComponent = (props: Props) => {
    const { playerNames, player, playerScores, handleAddWinClick } = props;
    return (
        <div className="player-data-container">
            <div className="player-name-wrapper">
                <div className="player-name">
                    {playerNames[player]}
                </div>
                <Button  variant="contained" color="primary" onClick={() => handleAddWinClick(player)}>Add Win</Button>
            </div>
            <div className="player-score-wrapper">
                <div className="player-score-title">
                    Wins:
                </div>
                <div className="player-score-value" data-testid="player-score">
                    {playerScores?.[player]}
                </div>
            </div>
        </div>
    )
}

export default PlayerDataComponent;
