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
    const [correctAnswer, setCorrectAnswer] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [questionsData, setQuestionsData] = useState([
        {
            url: 'https://www.filmcompanion.in/wp-content/uploads/2020/03/film-comapnion-hera-pheri-inline-image-1.jpg',
            text: 'Question #1',
            code: 1,
            time: 0,
            isCompleted: false,
            answer: 'Hera Pheri'

        },
        {
            url: 'https://cdn.bollywoodmdb.com/movies/largethumb/2020/coolie-no-1/coolie-no-1-37.jpg',
            text: 'Question #2',
            code: 2,
            time: 0,
            isCompleted: false,
            answer: 'Judwa 2'
        },
        {
            url: 'https://cdn.bollywoodmdb.com/movies/largethumb/2020/sooryavanshi/sooryavanshi-7.jpg',
            text: 'Question #3',
            code: 3,
            time: 0,
            isCompleted: false,
            answer: 'Sooryavansi'
        }
    ]);

    useEffect(() => {
        console.log('Passed Quiz Id ' + props.quizId);
    }, [])

    useEffect(() => {
        console.log(questionsData);
    }, [questionsData])



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
            updateQData[previousIndex]['isCompleted'] = true;
            setQuestionsData([...updateQData]);
        }

        if (!questionsData[previousIndex]['isCompleted']) {
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
            <Row>
                <Col xs={12} sm={12} md={6}>
                    <Card className='mt-2'>
                        <Card.Img className='img-fluid img-thumbnail question-card ' variant="top" src={questionsData[index].url} />
                        <Card.Body>
                            <Row>
                                <Col>
                                    <div>
                                        <InputGroup size="sm">
                                            <FormControl disabled={ questionsData[index].isCompleted } value={inputValue} onChange={event => handleInputChange(event.target.value)} aria-describedby="inputGroup-sizing-sm" />
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
                !questionsData[index].isCompleted && correctAnswer && (
                    <Row className='mt-2'>
                        <Col>
                            <Alert variant='success'> Correct Answer : <strong>{ questionsData[index]['answer'] }</strong> </Alert>
                        </Col>
                    </Row>
                )
            }
            {
                questionsData[index].isCompleted && (
                    <Row className='mt-2 text-center'>
                        <Col>
                            <Alert variant='success'><strong>{ questionsData[index]['answer'] }</strong> | Time: <strong>{ questionsData[index]['time'] }</strong>s </Alert>
                        </Col>
                    </Row>
                )
            }
        </>
    )
}


export default MasterQuestions
