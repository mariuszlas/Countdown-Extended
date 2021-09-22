import { default as JoinRoom } from '.';
import { screen } from '@testing-library/react';

describe('JoinRoom', () => {

    it('renders game instructions', () => {
        renderWithReduxAndRouter(<JoinRoom />);
        const instructions = screen.getByRole('game-instructions');
        expect(instructions.textContent).toBe('To join your friends waiting room, enter your username and the room number!');
    });

    it('renders user input fields', async () => {
        renderWithReduxAndRouter(<JoinRoom />);
        const usernameInput = screen.getAllByRole('textbox');
        const submitBtn = screen.getByRole('button');
        const form = screen.getByRole('game-setup')

        expect(form).toBeInTheDocument();
        expect(usernameInput.length).toBe(2);
        expect(submitBtn).toBeInTheDocument();
    })
})
