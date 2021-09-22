import { default as QuizPage } from '.';
import { screen } from '@testing-library/react';

const initState = {
    questions: [
        { question: 'question 1', correct_answer: 'answer 1', incorrect_answers: ['answer 2', 'answer 3', 'answer 4'] },
        { question: 'question 2', correct_answer: 'answer 2', incorrect_answers: ['answer 1', 'answer 3', 'answer 4'] }
    ],
    players: [{ totalScore: 6 }],
    gameSettings: { categoryName: 'test category', difficulty: 'TesT DifFicUltY' }
}

// describe('QuizPage', () => {
//
//     it('renders quiz page', () => {
//         renderWithReduxAndRouter(<QuizPage />, { initState });
//     });
// });
