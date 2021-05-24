import React, { useState, useEffect } from 'react';
import './MasterQuestions.scss';

import { useStopwatch } from 'react-timer-hook';

// Component Imports
import EachQuestion from '../EachQuestion/EachQuestion';
import  QuizSummary from '../QuizSummary/QuizSummary';

function MasterQuestions(props: any) {

    const {
        seconds,
        minutes,
        hours,
        days,
        isRunning,
        start,
        pause,
        reset,
    } = useStopwatch({ autoStart: true });


    const [loading, setLoading] = useState(false);
    const [finishedQuiz, setFinishedQuiz] = useState(false);
    const [finishedQuizData, setFinishedQuizData] = useState(null);
    const [finishedQuiTime, setFinishedQuizTime] = useState(0);


    useEffect(() => {
       
    }, []);

    const setQuizSummaryData = (data) => {
        setFinishedQuizData([...data]);
        setFinishedQuiz(true);
        setFinishedQuizTime(minutes*60 + seconds);
    }


    return (
        <>
            {
                !loading && !finishedQuiz && (
                <div>
                    <EachQuestion finishQuiz={setQuizSummaryData} quizId={props.quizId}></EachQuestion>
                </div>
                                    
                )
            }

            {
                finishedQuiz && (
                     <QuizSummary quizId={props.quizId} finalTime={finishedQuiTime} data={finishedQuizData}></QuizSummary>                    
                )
            }
        </>
    )
}


export default MasterQuestions
