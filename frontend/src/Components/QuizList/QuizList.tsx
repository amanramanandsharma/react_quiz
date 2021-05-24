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
                        <Card
                            bg='info'
                            text='white'
                            className="mb-2"
                        >
                            <Card.Body>
                                <Card.Title>Quizzes List</Card.Title>
                                <hr></hr>
                                {quizData.map((element, index) => (
                                        <div key={index}><span>{element.title} | { element.update_date}</span><br></br></div>
                                    ))}
                            </Card.Body>
                        </Card>
                    </div>
                )
            }

        </>
    )
}

export default QuizList
