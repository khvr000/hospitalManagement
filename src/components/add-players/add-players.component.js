import * as React from "react";
import {FormGroup, FormLabel, InputBase, withStyles, fade, Button} from '@material-ui/core';
import "./add-players.component.scss";

const BootstrapInput = withStyles((theme) => ({
    root: {
        'label + &': {
            marginTop: theme.spacing(2),
        },
    },
    input: {
        borderRadius: 4,
        position: 'relative',
        backgroundColor: theme.palette.common.white,
        border: '1px solid #ced4da',
        fontSize: 16,
        width: 'auto',
        padding: '10px 12px',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        // Use the system font instead of the default Roboto font.
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        '&:focus': {
            boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
            borderColor: theme.palette.primary.main,
        },
    },
}))(InputBase);

type Props = {

}

class AddPlayersComponent extends React.Component<Props> {

    state = {
        firstPlayer: '',
        secondPlayer: ''
    }

    handlePlayerOneChange = (e) => {
        e.persist();
        this.setState({firstPlayer: e.target.value});
    }

    handlePlayerTwoChange = (e) => {
        e.persist();
        this.setState({secondPlayer: e.target.value});
    }

    handleSubmitPlayers = () => {
        const { firstPlayer, secondPlayer } = this.state;
        console.log('saving players', firstPlayer, secondPlayer);
        this.props.setScoreTrackerPlayerNames({firstPlayer, secondPlayer});
    }


    render() {
        const { firstPlayer, secondPlayer } = this.state;
        return (
            <>
                <div className="add-players-container">
                    <div className="add-players-title">
                        Add Players
                    </div>
                    <FormGroup className="add-players-form-group">
                        <FormLabel>First Player Name</FormLabel>
                        <BootstrapInput value={firstPlayer} onChange={this.handlePlayerOneChange} />
                    </FormGroup>
                    <FormGroup className="add-players-form-group">
                        <FormLabel>Second Player Name</FormLabel>
                        <BootstrapInput data-testid="input-one" value={secondPlayer} onChange={this.handlePlayerTwoChange} />
                    </FormGroup>

                    <Button variant="contained" color="primary" onClick={this.handleSubmitPlayers}>
                        Continue
                    </Button>
                </div>
            </>
        )
    }
};

export default AddPlayersComponent;
