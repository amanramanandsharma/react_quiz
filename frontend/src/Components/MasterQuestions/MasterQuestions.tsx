import React, { useState, useEffect } from 'react'
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
import { FaAngleLeft } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa";

import { levenshteinEditDistance } from 'levenshtein-edit-distance';

// Axios Import
import axiosInstance from "../../Core/Axios";

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


    const [index, setIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [correctAnswer, setCorrectAnswer] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [questionsData, setQuestionsData] = useState([]);

    useEffect(() => {
        getQuizQuestions(props.quizId);
    }, [])

    useEffect(() => {
        console.log(questionsData);
    }, [questionsData])

    const getQuizQuestions = (quizId) => {
        axiosInstance
            .post("/quiz/getQuizQuestions", { quiz_id: 'GZ-TBQZ2105231943342' })
            .then(function (response) {
                setQuestionsData([...response.data.data]);
                setLoading(false);
            })
            .catch(function (error) {
                alert("Profile not Public");
            });
    }



    const handleQuestionChange = (moveToNextSlide: boolean, completed: boolean = false) => {
        const previousIndex = index;
        let newIndex = moveToNextSlide === true ? index + 1 : index - 1;

        // Dont change Index if at Max Length
        if (newIndex == questionsData.length) {
            newIndex = index;
        }

        const time = minutes * 60 + seconds;

        setIndex(newIndex);

        if (completed) {
            const updateQData = questionsData;
            updateQData[previousIndex]['time'] += time - 2;
            updateQData[previousIndex]['is_completed'] = true;
            setQuestionsData([...updateQData]);
        }

        if (!questionsData[previousIndex]['is_completed']) {
            const updateQData = questionsData;
            updateQData[previousIndex]['time'] += time;
            setQuestionsData([...updateQData]);
        }

        reset();
    }

    const handleInputChange = (input: string) => {
        setInputValue(input);
        if (!correctAnswer) {
            if (levenshteinEditDistance(input, questionsData[index]['answer'], true) < 3) {
                setCorrectAnswer(true);
                setTimeout(() => {
                    setInputValue('');
                    handleQuestionChange(true, true);
                    setCorrectAnswer(false);
                }, 3000);
            }
        }
    }



    return (
        <>
            {
                !loading && (
                    <div>
                        <Row className="justify-content-md-center">
                            <Col xs={12} sm={12} md={6}>
                                <Card className='mt-2'>
                                    <Card.Img className='img-fluid img-thumbnail question-card ' variant="top" src={questionsData[index].image} />
                                    <Card.Body>
                                        <Row>
                                            <Col>
                                                <div>
                                                    <InputGroup size="sm">
                                                        <FormControl disabled={questionsData[index].is_completed} value={inputValue} onChange={event => handleInputChange(event.target.value)} aria-describedby="inputGroup-sizing-sm" />
                                                    </InputGroup>
                                                </div>
                                                {/* <span>{days}</span>:<span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span> */}
                                            </Col>
                                        </Row>
                                        <Row className='mt-2'>
                                            <Col>
                                                <Button variant="primary" disabled={index === 0} onClick={() => { handleQuestionChange(false) }} block><FaAngleLeft /></Button>
                                            </Col>
                                            <Col>
                                                <Button variant="danger" disabled={index === 0} onClick={() => { handleQuestionChange(false) }} block>Give up</Button>
                                            </Col>
                                            <Col>
                                                <Button variant="primary" disabled={index === questionsData.length - 1} onClick={() => { handleQuestionChange(true) }} block><FaAngleRight /></Button>
                                            </Col>
                                        </Row>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                        {
                            !questionsData[index].is_completed && correctAnswer && (
                                <Row className='mt-2 text-center justify-content-md-center'>
                                    <Col xs={12} sm={12} md={6}>
                                        <Alert variant='success'> Correct Answer : <strong>{questionsData[index]['answer']}</strong> </Alert>
                                    </Col>
                                </Row>
                            )
                        }
                        {
                            questionsData[index].is_completed && (
                                <Row className='mt-2 text-center justify-content-md-center'>
                                    <Col xs={12} sm={12} md={6}>
                                        <Alert variant='success'><strong>{questionsData[index]['answer']}</strong> | Time: <strong>{questionsData[index]['time']}</strong>s </Alert>
                                    </Col>
                                </Row>
                            )
                        }

                    </div>
                )
            }

        </>
    )
}


export default MasterQuestions
