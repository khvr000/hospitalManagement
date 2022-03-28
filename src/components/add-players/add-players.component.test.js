import {render, screen, waitFor, fireEvent} from '@testing-library/react';
import AddPlayersComponent from "./add-players.component";


describe('', () => {

    test('renders player input labels ', () => {

        //Arrange
        render(<AddPlayersComponent />)

        //Assert
        const playerNameTitle = screen.getByText('Second Player Name');
        expect(playerNameTitle).toBeInTheDocument();
    })


    test('renders  players added via input', () => {

        //Arrange
        render(<AddPlayersComponent />)
        const input = screen.getByTestId('input-one').querySelector('input');

        //Action
        fireEvent.change(input, {target: {value: 'Tony'}})

        //Assert
        expect(input.value).toBe('Tony');
    })

})

