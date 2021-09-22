import { default as JoinRoom } from '.';
import { screen } from '@testing-library/react';

describe('JoinRoom', () => {

    it('renders game instructions', () => {
        renderWithReduxAndRouter(<JoinRoom />);
        const instructions = screen.getByRole('game-instructions');
        expect(instructions.textContent).toBe('To join the waiting room, enter the room number and your username');
    });

})
