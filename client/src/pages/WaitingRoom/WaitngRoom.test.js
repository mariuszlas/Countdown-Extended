import { default as WaitingRoom } from '.';
import { screen } from '@testing-library/react';

const getInitState = (host, error) => (
     {
        gameSettings: {category: 10, difficulty: 'test difficulty'},
        socket: { on: jest.fn(), emit: jest.fn() },
        players: [
            { username: 'testPlayer1', host: host, totalScore: 6 }
        ],
        currentPlayer: 'testPlayer1',
        roomNumber: 432434342,
        gameSettings: {categoryName: 'test category', difficulty: 'test difficulty'},
        error: error
    }
)

describe('WaitingRoom', () => {

    it('renders the heading and start button', () => {
        const initState = getInitState(true, null)
        renderWithReduxAndRouter(<WaitingRoom />, { initState })

        const heading = screen.getByText('Waiting Room');
        const button = screen.getByRole('button');
        expect(heading).toBeInTheDocument();
        expect(button).toBeInTheDocument();
    });

    it('renders error message if error is not null', () => {
        const initState = getInitState(true, 'test error message');
        renderWithReduxAndRouter(<WaitingRoom />, { initState })
        const alert = screen.getByRole('alert');
        expect(alert.textContent).toBe('test error message');
    });

    it('renders instructions if the player is not a host', () => {
        const initState = getInitState(false, null);
        renderWithReduxAndRouter(<WaitingRoom />, { initState })
        const roomMsg = screen.getByRole('guest-instructions');
        expect(roomMsg).toBeInTheDocument();
    })
});
