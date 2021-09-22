import { default as CorrectAnswers } from '.';
import { screen } from '@testing-library/react';

const initState = {
    questions: [
        { question: 'question 1', correct_answer: 'answer 1', incorrect_answers: ['answer 2', 'answer 3', 'answer 4'] },
        { question: 'question 2', correct_answer: 'answer 2', incorrect_answers: ['answer 1', 'answer 3', 'answer 4'] }
    ],
    submissions: [1, 2],
    gameSettings: {categoryName: 'test category', difficulty: 'test difficulty'}
}

describe('CorrectAnswers', () => {

    beforeEach(() => {
        renderWithReduxAndRouter(<CorrectAnswers />, { initState })
    });

    it('renders headings', () => {
        const headings = screen.getAllByRole('heading');
        expect(headings.length).toBe(5);
        expect(headings[1].textContent).toBe('Category: test category');
        expect(headings[2].textContent).toBe('Difficulty: Test difficulty')
    });
});
