import React, { useState, useEffect } from 'react';
import './MasterQuestions.scss';

import { useStopwatch } from 'react-timer-hook';

// Bootstrap Imports
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

// Icons Import
import { FaAngleLeft } from 'react-icons/fa';
import { FaAngleRight } from 'react-icons/fa';

import { levenshteinEditDistance } from 'levenshtein-edit-distance';

// Axios Import
import axiosInstance from '../../Core/Axios';

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
                     <QuizSummary finalTime={finishedQuiTime} data={finishedQuizData}></QuizSummary>                    
                )
            }
        </>
    )
}


export default MasterQuestions
