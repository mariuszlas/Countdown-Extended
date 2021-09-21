import React from 'react';
import { useSelector } from 'react-redux';

const CorrectAnswers = () => {
    const questions = useSelector(state => state.questions);

    return (
        <>
            <h1>Correct Answers For Your Quiz</h1>
            {questions.map(q => (
                <div key={q.question}>
                    <p>{q.question}</p>
                    <p>{q.correct_answer}</p>
                </div>
            ))}
        </>
    );
};

export default CorrectAnswers;
