import { default as AllResults } from '.';
import { screen } from '@testing-library/react';
import axios from 'axios';

jest.mock('axios');

describe('AllResults', () => {

    it('renders', () => {
        const mockRes = { data: [
            { username: 'test user 1', score: 23 },
            { username: 'test user 2', score: 12 }
        ]};
        axios.get.mockResolvedValue(mockRes)
        renderWithReduxAndRouter(<AllResults />);

        const results = screen.getByRole('all-results');
        expect(results).toBeInTheDocument();
    });
});
