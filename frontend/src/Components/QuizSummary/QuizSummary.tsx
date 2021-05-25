import React, { useState, useEffect } from 'react';
import './QuizSummary.scss';


// Bootstrap Imports
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Image from "react-bootstrap/Image";
import Alert from 'react-bootstrap/Alert';

// Icons Import
import { FaCheckSquare } from 'react-icons/fa';
import { FaExclamationTriangle } from 'react-icons/fa';

// Axios Import
import axiosInstance from '../../Core/Axios';

function QuizSummary(props: any) {

    const [totalTime, setTotalTime] = useState(0);
    const [scoreSubmit, setScoreSubmit] = useState(false);

    useEffect(() => {
        const totalTimeTaken = props.data.reduce((acc, element) => acc + element.time, 0);
        setTotalTime(totalTimeTaken);
        submitScore();
    }, []);

    const submitScore = () => {

        axiosInstance
        .post('/quiz/submitScore', { quiz_id: props.quizId, data: props.data })
        .then(function (response) {
            setScoreSubmit(true);
        })
        .catch(function (error) {
            console.log('API Error - Submit Score');
        });
    }

    return (

        <div>
            {
            scoreSubmit && (
                    <Row className='justify-content-md-center mt-3 text-center'>
                        <Col xs={12} sm={12} md={6}>
                            <Alert variant='success'><strong>Score Submitted :) </strong></Alert>
                        </Col>
                    </Row>
                )
            }
            <Row className='justify-content-md-center mt-3'>
                <Col xs={12} sm={12} md={6}>
                    <Card
                        bg='light'
                        text='dark'
                        className="mb-2"
                    >
                        <Card.Body>
                            <Card.Title>Quiz Summary <span className='text-span'><strong>{totalTime}</strong>s</span></Card.Title>
                            <hr></hr>
                            {props.data.map((element, index) => (
                                <Row key={index} className='mt-3'>
                                    <Col>
                                        
                                            <Image
                                                className="image-span pointer img-thumbnail"
                                                src={element["image"]}
                                            />
                                            <span className='ml-2'>
                                            { element.answer }
                                            </span>
                                            <span className='ml-2'>
                                             { element.is_completed ? <FaCheckSquare /> : <FaExclamationTriangle /> } 
                                            </span>
                                    </Col>
                                </Row>
                            ))}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div >
    )
}

export default QuizSummary
