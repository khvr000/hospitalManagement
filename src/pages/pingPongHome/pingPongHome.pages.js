import * as React from "react";
import {Helmet} from "react-helmet";
import {connect} from "react-redux";
import AddPlayersComponent from "../../components/add-players/add-players.component";
import {
    resetScoreTrackerPlayerData, resetScoreTrackerPlayerScores,
    saveScoreTrackerCurrentGame,
    setScoreTrackerPlayerNames,
    setScoreTrackerPlayerScore
} from "../../store/score-tracker/score-tracker.actions";
import TrackScoreComponent from "../../components/track-score/track-score.component";

import "./pingPongHome.scss";
import {Button} from "@material-ui/core";
import {saveAuthUserLogout} from "../../store/auth/auth.actions";


type Props = {
    setScoreTrackerPlayerNames: Function,
    resetScoreTrackerPlayerScores: Function,
    resetScoreTrackerPlayerData: Function
};

class PingPongHomePage extends React.Component<Props> {


    handleLogout = () => {
        // sessionStorage.clear();
        localStorage.clear();
        if (this.props.saveAuthUserLogout) {
            this.props.saveAuthUserLogout()
        }
        this.props.history.push('/');
    }

    isPlayerNamesAvailable = () => {
        const { playerNames } = this.props;
        return playerNames && Object.keys(playerNames).length;
    }

    handleResetScores = () => {
        this.props.resetScoreTrackerPlayerScores();
    }

    handleResetGame = () => {
        this.props.resetScoreTrackerPlayerData();
    }


    render() {
        const {setScoreTrackerPlayerNames, playerNames, playerScores, setScoreTrackerPlayerScore, saveScoreTrackerCurrentGame, resetScoreTrackerPlayerScores} = this.props;
        const isPlayerNamesAvailable = this.isPlayerNamesAvailable();
        return (
            <>
                <Helmet defer={false}>
                    <title>Ping pong - Tracker</title>
                    <meta
                        name="description"
                        content="Score Tracking system for Ping pong."
                    />
                </Helmet>
                <div className="dat-ping-pong-home-page">
                    <div className="menu-wrapper">
                        <div className="menu-left" />
                        <div className="menu-right">
                            {isPlayerNamesAvailable ? (
                                <>
                                    <Button
                                        color="default"
                                        type={"button"}
                                        onClick={() => this.handleResetGame()}
                                    >Reset game</Button>
                                    <Button
                                        color="default"
                                        type={"button"}
                                        onClick={() => this.handleResetScores()}
                                    >Reset score</Button>
                                </>
                            ) : null}
                            <Button
                                color="secondary"
                                type={"button"}
                                onClick={() => this.handleLogout()}
                            >Logout</Button>
                        </div>
                     </div>
                    <div className="ping-pong-content-wrapper">
                        {isPlayerNamesAvailable ? (
                            <TrackScoreComponent
                                playerNames={playerNames}
                                playerScores={playerScores}
                                setScoreTrackerPlayerScore={setScoreTrackerPlayerScore}
                                saveScoreTrackerCurrentGame={saveScoreTrackerCurrentGame}
                                resetScoreTrackerPlayerScores={resetScoreTrackerPlayerScores}
                            />
                        ) : (
                            <AddPlayersComponent setScoreTrackerPlayerNames={setScoreTrackerPlayerNames}/>
                        )}
                    </div>
                </div>
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        playerNames: state.scoreTracker.playerNames,
        playerScores: state.scoreTracker.playerScores
    }
};

const mapDispatchToProps = dispatch => ({
    setScoreTrackerPlayerNames: (...args) => dispatch(setScoreTrackerPlayerNames(...args)),
    setScoreTrackerPlayerScore: (...args) => dispatch(setScoreTrackerPlayerScore(...args)),
    saveScoreTrackerCurrentGame: (...args) => dispatch(saveScoreTrackerCurrentGame(...args)),
    resetScoreTrackerPlayerData: (...args) => dispatch(resetScoreTrackerPlayerData(...args)),
    saveAuthUserLogout: (...args) => dispatch(saveAuthUserLogout(...args)),
    resetScoreTrackerPlayerScores: () => dispatch(resetScoreTrackerPlayerScores())
});


export default connect(mapStateToProps, mapDispatchToProps)(PingPongHomePage);
