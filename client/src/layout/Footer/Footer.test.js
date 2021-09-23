import { default as Footer } from '.';
import { screen } from '@testing-library/react';

describe('Footer', () => {

    it('renders footer', () => {
        renderWithReduxAndRouter(<Footer />);
        const footer = screen.getByRole('footer');
        expect(footer.textContent).toBe('Created by Mariusz, Gorazd, Tobi and Jasmin')
    })
})
