import { default as Header } from '.';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'

const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
    useHistory: () => ({
        push: mockHistoryPush
    }),
}))

describe('Header', () => {

    it('renders header', () => {
        renderWithReduxAndRouter(<Header />);
        const img = screen.getByRole('img');
        
        expect(img).toBeInTheDocument();

        userEvent.click(img);

        expect(mockHistoryPush).toHaveBeenCalledWith('/');
    });
})
