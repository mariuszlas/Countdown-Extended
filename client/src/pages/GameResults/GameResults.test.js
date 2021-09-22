import { default as GameResults } from '.';
import { screen } from '@testing-library/react';
import axios from 'axios';

jest.mock('axios');

const initState = {
    socket: { on: jest.fn(), emit: jest.fn() },
    players: [
        { username: 'testPlayer1', host: true, totalScore: 6 },
        { username: 'testPlayer2', host: false, totalScore: 14 }
    ],
    currentPlayer: 'testPlayer1',
    roomNumber: 432434342,
    results: [6, 14],
    gameSettings: {categoryName: 'test category', difficulty: 'test difficulty'}
}

describe('GameResults', () => {

    beforeEach(() => {
        renderWithReduxAndRouter(<GameResults />, { initState });
    })

    it('renders headings', () => {
        const headings = screen.getAllByRole('heading');
        expect(headings.length).toBe(5);
        expect(headings[0].textContent).toBe('Congratulations testPlayer1');
        expect(headings[1].textContent).toBe('Your score is 6');
        expect(headings[2].textContent).toBe('Category: test category');
        expect(headings[3].textContent).toBe('Difficulty: Test difficulty');
    });

    it('renders users scores', () => {
        const results = screen.getByRole('results');
        console.log(results);
        expect(results.children.length).toBe(2);
    });

    it('renders links', () => {
        const links = screen.getAllByRole('link');
        expect(links.length).toBe(3);
    });
})
