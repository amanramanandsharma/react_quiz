import React, { useState, useEffect } from 'react';
import './QuizSummary.scss';


// Bootstrap Imports
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Image from "react-bootstrap/Image";
import Alert from 'react-bootstrap/Alert';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

// Icons Import
import { FaHome } from 'react-icons/fa';

// Axios Import
import axiosInstance from '../../Core/Axios';

// Router Imports
import { Link } from "react-router-dom";

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
                alert('API Error - Quiz Summary Component - /quiz/submitScore');
                console.log(error);
            });
    }

    return (

        <div>
            {
                scoreSubmit && (
                    <div>
                        <Row className='justify-content-md-center mt-3 text-center'>
                            <Col xs={12} sm={12} md={6}>
                                <Link to='/'><Button variant="info" block> <FaHome /> <span className='icon-text'>Home</span></Button></Link>
                            </Col>
                        </Row>
                        <Row className='justify-content-md-center mt-2 text-center'>
                            <Col xs={12} sm={12} md={6}>
                                <Alert variant='success'><strong>Score Submitted :) </strong></Alert>
                            </Col>
                        </Row>
                    </div>

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
                            <Row>
                                <Col>
                                    <Table bordered hover>
                                        <tbody>
                                            {props.data.map((element, index) => (
                                                <tr className={element.is_completed ? 'table-success' : 'table-danger '} key={index}>
                                                    <td>{element.answer}</td>
                                                    <td><strong>{element.time}s</strong></td>
                                                    <td>
                                                        {element.name}
                                                        <span className='ml-4'>
                                                            <Image
                                                                className="user-image pointer"
                                                                src={element["image"]}

                                                            />
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div >
    )
}

export default QuizSummary
