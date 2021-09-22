import React from 'react';
import { useSelector } from 'react-redux';
import { cleanString, firstCharUpperCase } from '../../redux/actions.js';

const CorrectAnswers = () => {
    const questions = useSelector(state => state.questions);
    const categoryName = useSelector(state => state.gameSettings.categoryName)
    const difficulty = useSelector(state => state.gameSettings.difficulty);
    const submissions = useSelector(state => state.submissions);

    const Difficulty = firstCharUpperCase(difficulty);

    return (
        <>
            <h1>Correct Answers For Your Quiz</h1>
            <h4>Category: {categoryName}</h4>
            <h4>Difficulty: {Difficulty}</h4>
            {questions.map(q => (
                <div key={q.question}>
                    <br/>
                    <h3>{cleanString(q.question)}</h3>
                    <p style={{display: 'inline', paddingRight: '1vw', color: 'green'}}>Correct: {cleanString(q.correct_answer)}</p>
                    <p style={{display: 'inline', paddingRight: '1vw', color: 'red'}}>Incorrect: {cleanString(q.incorrect_answers.join(', '))}</p>
                    <p style={{display: 'inline'}}>Submission: {submissions[questions.indexOf(q)]}</p>
                </div>
            ))}
        </>
    );
};

export default CorrectAnswers;
