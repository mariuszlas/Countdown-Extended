import { default as Header } from '.';
import { screen } from '@testing-library/react';

describe('Header', () => {

    it('renders header', () => {
        renderWithReduxAndRouter(<Header />);
        const img = screen.getByRole('img');
        expect(img).toBeInTheDocument();
    });
})
