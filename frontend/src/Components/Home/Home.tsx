import React, { useState, useEffect } from 'react';

// Bootstrap Imports
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Alert from 'react-bootstrap/Alert'
import Spinner from 'react-bootstrap/Spinner'

import QuizList from '../../Components/QuizList/QuizList';
import HighScores from '../../Components/HighScores/HighScores';
import GoogleOauth from '../../Authentication/GoogleOauth';

// Router Imports
import { Link } from "react-router-dom";

// Axios Import
import axiosInstance from '../../Core/Axios';

function Home() {

    const [latestQuiz, setlatestQuiz] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        getLatestQuiz();
    }, []);

    const getLatestQuiz = () => {
        axiosInstance
            .get('/home/getLatestQuiz')
            .then(function (response) {
                setlatestQuiz(response.data.data)
                setLoading(false);
            })
            .catch(function (error) {
                setError(true);
                console.log('API Error - App Component - /quiz/getLatestQuiz');
                console.log(error);
            });
    }

    return (
        <div>
            {
                error && (
                    <div className='mt-2'>
                        <Card
                            bg='light'
                            text='dark'
                            className="mb-2 text-center"
                        >
                            <Card.Body>
                                <div>
                                    <Row>
                                        <Col>
                                            <h1>GeekZiuq</h1>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <strong><small>Bollywood Quiz Site</small></strong>
                                        </Col>
                                    </Row>
                                </div>
                            </Card.Body>
                        </Card>

                        <Card
                            bg='light'
                            text='dark'
                            className="mb-2"
                        >
                            <Card.Body>
                                <div>
                                    <Row>
                                        <Col>
                                            1. Login
                                                </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            2. Select Quiz
                                                </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            3. Name the movie from the images
                                                </Col>
                                    </Row>
                                    <Row className='mt-3'>
                                        <Col>
                                            <GoogleOauth></GoogleOauth>
                                        </Col>
                                    </Row>
                                </div>
                            </Card.Body>
                        </Card>

                    </div>
                )
            }
            {
                !loading && (
                    <div>
                        <div className='mt-2 text-center'>
                            <Link to="/user-profile"><Button variant="info" block>Statistics Page</Button></Link>
                        </div>
                        <Row className='mt-2'>
                            <Col>
                                <Card
                                    bg='secondary'
                                    text='white'
                                    className="mb-2"
                                >
                                    <Card.Body>
                                        <Card.Title>Weekly Quiz</Card.Title>
                                        <div>
                                            <Row>
                                                <Col>
                                                    {latestQuiz.title} | {latestQuiz.update_date}
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col>
                                                    Curated by - {latestQuiz.name}
                                                    <span className='btn-right'>
                                                        <Link to={'/quiz/' + latestQuiz.identifier} ><Button variant="light" block>Start</Button></Link>
                                                    </span>
                                                </Col>
                                            </Row>
                                        </div>

                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12} sm={12} md={6}><QuizList /></Col>
                            <Col xs={12} sm={12} md={6}><HighScores /></Col>
                        </Row>
                    </div>
                )
            }
        </div>
    )
}

export default Home
