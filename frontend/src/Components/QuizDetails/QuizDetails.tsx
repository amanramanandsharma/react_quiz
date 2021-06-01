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
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

// Icons Import
import { FaCheckSquare } from 'react-icons/fa';
import { FaHome } from 'react-icons/fa';

// Axios Import
import axiosInstance from '../../Core/Axios';

// Router Imports
import { Link } from "react-router-dom";


function QuizDetails() {

    let { id } = useParams();
    let history = useHistory();

    const [loading, setLoading] = useState(true);
    const [questionData, setQuestionData] = useState([]);
    const [statsData, setStatsData] = useState({});

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
                                <Row className='justify-content-md-center mt-2 mb-3 text-center'>
                                    <Col xs={12} sm={12} md={6}>
                                        <Link to='/'><Button variant="info" block> <FaHome /> <span className='icon-text'>Home</span></Button></Link>
                                    </Col>
                                </Row>
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
                                        <Row>
                                            <Col>
                                                <Table striped bordered hover>
                                                    <tbody>
                                                        {questionData.map((element, index) => (
                                                            <tr key={element.id}>
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
                    </div>
                )
            }
        </>
    )
}

export default QuizDetails
