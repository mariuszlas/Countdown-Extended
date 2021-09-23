import { default as JoinRoom } from '.';
import { screen } from '@testing-library/react';

describe('JoinRoom', () => {
    it('renders game instructions', () => {
        renderWithReduxAndRouter(<JoinRoom />);
        const instructions = screen.getByRole('game-instructions');
        expect(instructions.textContent).toBe(
            'To join your friends waiting room, enter your username and the room number!'
        );
    });

    it('renders user input fields and join button', () => {
        renderWithReduxAndRouter(<JoinRoom />);
        const form = screen.getByRole('game-setup');
        const userInputs = screen.getAllByRole('textbox');
        const submitBtn = screen.getByRole('button');

        expect(form).toBeInTheDocument();
        expect(userInputs.length).toBe(2);
        expect(submitBtn).toBeInTheDocument();
    });

    it('allows user to join a room with the right information', () => {
        renderWithReduxAndRouter(<JoinRoom />, { roomNumber: 10});
        const nameInput = screen.getAllByRole('textbox')[0];
        const roomInput = screen.getAllByRole('textbox')[1];

        userEvent.type(nameInput, 'user10');
        userEvent.type(roomInput, '10{enter}');
        expect(nameInput.value).toBe('user10')
        expect(roomInput.value).toBe('10')
    });
});
