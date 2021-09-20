import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { cleanString } from "../../actions";

export const QuizPage = () => {

    const questionsArr = useSelector(state => state.questions);
    
    const [n, setN] = useState(0);

    const dispatch = useDispatch();

    const question = questionsArr[Math.min(n, 9)];
    const c_answer = question.correct_answer;

    function submitAnswer(e) {
        const submission = e.target.value;
        submission === c_answer ? dispatch({type: 'UPDATE_SCORE', payload: 1}) : console.log('oops, wrong answer');
        setN(x => ++x);
    }

    if (n <= 9) {

        return (
        <>
        
        <h1>{cleanString(question.question)}</h1>
    return (
    <>

    <h1>{questions[questionNum].question}</h1>

        <button onClick={submitAnswer} value={c_answer}>{c_answer}</button>
        <button onClick={submitAnswer} value={question.incorrect_answers[2]}>{question.incorrect_answers[2]}</button>

        {/* <ul>
            <li>{questions[0].correct_answer}</li>
            <li>{questions[0].incorrect_answers[0]}</li>
            <li>{questions[0].incorrect_answers[1]}</li>
            <li>{questions[0].incorrect_answers[2]}</li>
        </ul> */}

        </>
        )
    } else {
        return <h2>Fin</h2>
    }
}

export default QuizPage;
