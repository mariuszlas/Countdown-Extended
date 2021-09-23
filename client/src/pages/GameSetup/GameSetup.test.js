import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import GameSetup from '.';
import axios from 'axios';

jest.mock('axios');

describe('GameSetup', () => {
    const mockResponse = {
        data: {
            trivia_categories: [
                { id: 9, name: 'General Knowledge' },
                { id: 10, name: 'Entertainment: Books' }
            ]
        }
    };

    beforeEach(() => jest.resetAllMocks());

    it('should display game instructions', () => {
        renderWithReduxAndRouter(<GameSetup />);
        const heading = screen.getByRole('heading', { name: /game instructions/i });
        const instructions = screen.getAllByRole('game-instructions');
        expect(heading).toBeInTheDocument();
        expect(instructions).toHaveLength(5);
    });

    it('should register the right information and options', async () => {
        axios.get.mockResolvedValue(mockResponse);
        renderWithReduxAndRouter(<GameSetup />);
        expect(axios.get).toHaveBeenCalledWith(expect.stringMatching(/api_category/));

        const generalCategory = await screen.findByRole('option', { name: 'General Knowledge' });

        const usernameInput = screen.getByRole('textbox');
        const category = screen.getAllByRole('combobox')[0];
        const difficulty = screen.getAllByRole('combobox')[1];

        userEvent.type(usernameInput, 'testUser');
        userEvent.selectOptions(category, '9');
        userEvent.selectOptions(difficulty, 'easy');

        const easyOption = screen.getByRole('option', { name: 'Easy' });

        expect(usernameInput.value).toBe('testUser');
        expect(generalCategory.selected).toBe(true);
        expect(easyOption.selected).toBe(true);
    });
});
