import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { cleanString } from "../../actions";

export const QuizPage = () => {

    const questionsArr = useSelector(state => state.questions);
    
    const [n, setN] = useState(0);

    const dispatch = useDispatch();

    const question = questionsArr[Math.min(n, 9)];

    const c_answer = question.correct_answer;
    const i_answers = question.incorrect_answers.slice(0, 3); // shouldn't need the .slice but first question is being weird

    function submitAnswer(e) {
        const submission = e.target.value;
        submission === c_answer ? dispatch({type: 'UPDATE_SCORE', payload: 1}) : console.log('oops, wrong answer');
        setN(x => ++x);
    }

    function randQuestionDist() {
        const randIdx = Math.floor(4 * Math.random());
        let arr = i_answers;

        arr.splice(randIdx, 0, c_answer);

        return arr
    }

    const answers = randQuestionDist();

    if (n <= 9) {

        return (
        <>
        
        <h1>{cleanString(question.question)}</h1>

        {answers.map((ans, index) => (
            <button onClick={submitAnswer} value={ans} key={index}>{cleanString(ans)}</button>
        ))}

        </>
        )
    } else {
        return <h2>Fin</h2>
    }
}

export default QuizPage;
