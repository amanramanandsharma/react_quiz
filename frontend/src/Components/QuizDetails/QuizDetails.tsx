import React, { useState, useEffect } from 'react';
import './QuizDetails.scss';


// Router Dom Imports
import { useHistory, useParams } from "react-router-dom";

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


function QuizDetails() {

    let { id } = useParams();
    let history = useHistory();

    const [loading, setLoading] = useState(true);
    const [questionData,setQuestionData] = useState([]);
    const [statsData,setStatsData] = useState({});

    useEffect(() => {
        getQuizAnsweredDetails();
    }, []);

    const getQuizAnsweredDetails = () => {

        axiosInstance
            .post('/quiz/getQuizAnsweredDetails', { quiz_id: id })
            .then(function (response) {
                console.log(response.data);
                setQuestionData(response.data.data);
                setStatsData(response.data.stats);
                setLoading(false);
            })
            .catch(function (error) {
                alert('API Error - Quiz Details Component - /quiz/getQuizAnsweredDetails');
                setLoading(false);
                console.log(error);
            });
    }

    return (
        <>
            {
                !loading && (
                    <div>
                        <Row className='justify-content-md-center mt-3'>
                            <Col xs={12} sm={12} md={6}>
                                <Card
                                    bg='light'
                                    text='dark'
                                    className="mb-2"
                                >
                                    <Card.Body>
                                        <Card.Title>{statsData['name']}<span className='text-span'>Time: <strong>{statsData['time']}</strong>s</span></Card.Title>
                                        <hr></hr>
                                        <Row className='justify-content-md-center mt-3 text-center'>
                                            <Col xs={12} sm={12} md={6}>
                                                <Alert variant='success'><strong>Completed On: <strong>{statsData['completed_at']}</strong></strong></Alert>
                                            </Col>
                                        </Row>
                                        {questionData.map((element, index) => (
                                            <Row key={index} className='mt-3'>
                                                <Col>

                                                    <Image
                                                        className="image-span pointer img-thumbnail"
                                                        src={element["image"]}
                                                    />
                                                    <span className='ml-2'>
                                                        {element.answer}
                                                    </span>
                                                    <span className='ml-2'>
                                                        {element.is_completed ? <FaCheckSquare /> : <FaExclamationTriangle />}
                                                    </span>
                                                </Col>
                                            </Row>
                                        ))}
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </div>
                )
            }
        </>
    )
}

export default QuizDetails
