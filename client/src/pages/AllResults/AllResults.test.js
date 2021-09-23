import { default as AllResults } from '.';
import { screen } from '@testing-library/react';
import axios from 'axios';

jest.mock('axios');

describe('AllResults', () => {

    beforeEach(() => {
        const mockRes = { data: [
            { username: 'test user 1', score: 23 },
            { username: 'test user 2', score: 12 }
        ]};
        axios.get.mockResolvedValue(mockRes);
        renderWithReduxAndRouter(<AllResults />);
    });

    it('renders the results table', () => {
        const results = screen.getByRole('all-results');
        const rows = screen.getAllByRole('row');
        expect(results).toBeInTheDocument();
        expect(rows.length).toBe(3);
    });
});
