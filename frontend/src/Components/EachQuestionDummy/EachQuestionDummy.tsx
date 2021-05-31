import React, { useState, useEffect } from 'react';
import './EachQuestionDummy.scss';

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

function EachQuestionDummy(props) {
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
    const [finished, setFinished] = useState(false);
    const [disableAllBtns, setDisableAllBtns] = useState(false);

    useEffect(() => {
        getQuizQuestions(props.quizId);
    }, []);

    // Check If the User has completed his Quiz
    useEffect(() => {
        if (questionsData.length && !questionsData.some(e => e.is_completed === false)) {
            setDisableAllBtns(true);
            setFinished(true);
            // props.finishQuiz(questionsData);
        }
    }, [questionsData]);

    const getQuizQuestions = (quizId) => {
        setQuestionsData([
            {
              "identifier": "GZ-TBQQ2105251553291",
              "answer": "Hera Pheri",
              "image": "https://www.filmcompanion.in/wp-content/uploads/2020/03/film-comapnion-hera-pheri-inline-image-1.jpg",
              "is_completed": false,
              "time": 0,
              "title": "Q1"
            },
            {
              "identifier": "GZ-TBQQ2105251553292",
              "answer": "Judwa 2",
              "image": "https://cdn.bollywoodmdb.com/movies/largethumb/2020/coolie-no-1/coolie-no-1-37.jpg",
              "is_completed": false,
              "time": 0,
              "title": "Q2"
            },
            {
              "identifier": "GZ-TBQQ2105251553293",
              "answer": "Sooryavanshi",
              "image": "https://cdn.bollywoodmdb.com/movies/largethumb/2020/sooryavanshi/sooryavanshi-7.jpg",
              "is_completed": false,
              "time": 0,
              "title": "Q3"
            }
          ]);
        setLoading(false);
    }



    const handleQuestionChange = (moveToNextSlide: boolean, completed: boolean = false) => {
        setCorrectAnswer(false);
        const previousIndex = index;
        let newIndex = moveToNextSlide === true ? index + 1 : index - 1;

        // Dont change Index if at Max Length
        if (newIndex == questionsData.length) {
            newIndex = index;
        }

        let time = minutes * 60 + seconds;
            time = time === 0 ? 1 : time;

        setIndex(newIndex);

        if (completed) {
            const updateQData = questionsData;
            time = time - 2 <= 0 ? 1 : time
            updateQData[previousIndex]['time'] += time;
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
                setDisableAllBtns(true);
                setTimeout(() => {
                    setDisableAllBtns(false);
                    setInputValue('');
                    handleQuestionChange(true, true);
                    setCorrectAnswer(false);
                }, 3000);
            }
        }
    }

    const finishQuiz = (type: boolean) => {
        // props.finishQuiz(questionsData);
    }



    return (
        <>
            {
                !loading && (
                    <div>
                        <Row className='justify-content-md-center mt-3'>
                            <Col xs={12} sm={12} md={6}>
                                <Card>
                                    <Card.Img className='img-thumbnail question-card' variant='top' src={questionsData[index].image} />
                                    <Card.Body>
                                        <Row>
                                            <Col>
                                                <div>
                                                    <InputGroup size='sm'>
                                                        <FormControl disabled={questionsData[index].is_completed } value={inputValue} onChange={event => handleInputChange(event.target.value)} aria-describedby='inputGroup-sizing-sm' />
                                                    </InputGroup>
                                                </div>
                                                {/* <span>{days}</span>:<span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span> */}
                                            </Col>
                                        </Row>
                                        <Row className='mt-2'>
                                            <Col>
                                                <Button variant='primary' disabled={index === 0 || disableAllBtns} onClick={() => { handleQuestionChange(false) }} block><FaAngleLeft /></Button>
                                            </Col>
                                            {
                                                index === questionsData.length - 1 ? (
                                                    <Col>
                                                        <Button variant='danger' disabled={index === 0 || disableAllBtns } onClick={() => { finishQuiz(false) }} block>Give up</Button>
                                                    </Col>
                                                ) : null
                                            }
                                           
                                            <Col>
                                                <Button variant='primary' disabled={index === questionsData.length - 1 || disableAllBtns} onClick={() => { handleQuestionChange(true) }} block><FaAngleRight /></Button>
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


export default EachQuestionDummy
