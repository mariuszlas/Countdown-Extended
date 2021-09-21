import React from 'react';
import { useSelector } from 'react-redux';
import { cleanString } from '../../actions';

const CorrectAnswers = () => {
    const questions = useSelector(state => state.questions);

    return (
        <>
            <h1>Correct Answers For Your Quiz</h1>
            {questions.map(q => (
                <div key={q.question}>
                    <p>{cleanString(q.question)}</p>
                    <p>{cleanString(q.correct_answer)}</p>
                </div>
            ))}
        </>
    );
};

export default CorrectAnswers;
