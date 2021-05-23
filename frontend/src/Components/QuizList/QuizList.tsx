import React, { useState, useEffect } from 'react'

// Axios Import
import axiosInstance from "../../Core/Axios";

import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'

function QuizList() {

    const [loading, setLoading] = useState(true);
    const [quizData, setQuizData] = useState([]);

    useEffect(() => {
        getQuizList();
    }, []);

    const getQuizList = () => {
        axiosInstance
            .get("/quiz/getQuizList")
            .then(function (response) {
                setQuizData([...response.data.data]);
                setLoading(false);
            })
            .catch(function (error) {
                alert("API Error - Quiz List");
            });
    }

    return (
        <>
            {
                !loading && (
                    <div>
                        <Card border="secondary">
                            <Card.Header className="text-center"><strong>Quizzes</strong></Card.Header>
                            <Card.Body>
                                <ListGroup variant="flush">
                                    {quizData.map((element, index) => (
                                        <ListGroup.Item key={index}>{element.title} | { element.update_date}</ListGroup.Item>
                                    ))}
                                </ListGroup>
                            </Card.Body>
                        </Card>
                    </div>
                )
            }

        </>
    )
}

export default QuizList
