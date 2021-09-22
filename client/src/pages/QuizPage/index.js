import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from 'react-router'
import { CountdownCircleTimer } from 'react-countdown-circle-timer'

import { cleanString } from "../../actions";

export const QuizPage = () => {

    const questionsArr = useSelector(state => state.questions);
    const difficulty = useSelector(state => state.gameSettings.difficulty.toLowerCase());
    const currentScore = useSelector(state => state.players[0].totalScore);

    const [key, setKey] = useState(0);
    const [n, setN] = useState(0);

    const dispatch = useDispatch();
    const history = useHistory();

    const question = questionsArr[Math.min(n, 9)];

    const c_answer = question.correct_answer;
    const i_answers = question.incorrect_answers.slice(0, 3); // shouldn't need the .slice but questions are being weird

    function calcDuration() {
        switch (difficulty) {
            case 'easy':
                return 45
            case 'medium':
                return 30
            case 'hard':
                return 15
            default:
                console.error('Difficulty is missing');
        }
    }

    function calcScoreIncrement() {
        switch (difficulty) {
            case 'easy':
                return 1
            case 'medium':
                return 2
            case 'hard':
                return 3
            default:
                console.error('Difficulty is missing');
        }
    }

    function resetScore() {
        dispatch({ type: 'RESET_SCORE', payload: 0})
    }

    function submitAnswer(e) {
        const submission = e.target.value;
        submission === c_answer ? dispatch({type: 'UPDATE_SCORE', payload: calcScoreIncrement()}) : console.log('oops, wrong answer');
        setKey(x => ++x);
        setN(x => ++x);
    }

    function randQuestionDist() {
        let arr = i_answers;

        arr.splice(0, 0, c_answer);

        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor((i+1) * Math.random());
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }

        return arr
    }

    const randAnswers = randQuestionDist();


    if (n <= 9) {

        n === 0 ? resetScore() : null;

        return (
        <>
        
        <h1>{`Question ${n+1}:`}</h1>
        <h2>{cleanString(question.question)}</h2>

        <div style={{display: 'flex', justifyContent: 'center', paddingBottom: '1vh'}}>
        <CountdownCircleTimer
            onComplete={() => {
                setKey(x => ++x);
                setN(x => ++x);
            }}
            key={key}
            isPlaying
            duration={calcDuration()}
            colors={[
            ['#004777', 0.33],
            ['#F7B801', 0.33],
            ['#A30000', 0.33],
            ]}
        >
            {({ remainingTime }) => remainingTime}
        </CountdownCircleTimer>
        </div>

        {randAnswers.map((ans, index) => (
            <button onClick={submitAnswer} value={ans} key={index}>{cleanString(ans)}</button>
        ))}

        <h3>Score: {currentScore}</h3>
        </>
        )
    } else {
        return (
            <>
            {history.replace('/game-results')}
            </>
        )
    }
}

export default QuizPage;
