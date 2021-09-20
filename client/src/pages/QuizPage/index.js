import React from "react";
import { useSelector } from "react-redux";

export const QuizPage = () => {

    const questions = useSelector(state => state.questions);
    const questionNum = useSelector(state => state.questionNum);

    console.log('the questions are this:', questions);

    function sendAnswer() {
        console.log('asdfkjhrighrewpiaughwapioeufhwioejp');
    }

    return (
    <>

    <h1>{questions[questionNum].question}</h1>

    <button>{questions[questionNum].correct_answer}</button>

    {/* <ul>
        <li>{questions[0].correct_answer}</li>
        <li>{questions[0].incorrect_answers[0]}</li>
        <li>{questions[0].incorrect_answers[1]}</li>
        <li>{questions[0].incorrect_answers[2]}</li>
    </ul> */}

    </>
    )
}

export default QuizPage;
