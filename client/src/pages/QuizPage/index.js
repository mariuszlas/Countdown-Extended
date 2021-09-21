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

    function submitAnswer(e) {
        const submission = e.target.value;
        submission === c_answer ? dispatch({type: 'UPDATE_SCORE', payload: 1}) : console.log('oops, wrong answer');
        setKey(x => ++x);
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

        {answers.map((ans, index) => (
            <button onClick={submitAnswer} value={ans} key={index}>{cleanString(ans)}</button>
        ))}

        <h3>Score: {currentScore}</h3>
        </>
        )
    } else {
        return (
            <>
            {history.push('/game-results')}
            </>
        )
    }
}

export default QuizPage;
