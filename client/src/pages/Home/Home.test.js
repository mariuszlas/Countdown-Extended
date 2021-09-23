import { screen } from '@testing-library/react';
import Home from '.';

describe('Home tests', () => {
    beforeEach(() => {
        renderWithReduxAndRouter(<Home />);
    });

    it('renders the button to start a new game', () => {
        const startButton = screen.getByRole('link', { name: /Start/ });
        userEvent.click(startButton);
        expect(startButton.textContent).toContain('Start a New Game');
    });

    it('renders the button to join an existing game', () => {
        const startGameButton = screen.getByRole('link', { name: /Join/ });
        userEvent.click(startGameButton);
        expect(startGameButton.textContent).toContain('Join a Game');
    });

    it('renders the button to check all the existing scores', () => {
        const startGameButton = screen.getByRole('link', { name: /Check/ });
        userEvent.click(startGameButton);
        expect(startGameButton.textContent).toContain('Check the Leaderboards');
    });
});
