import React, { useState, useEffect } from 'react'
import './QuizList.scss';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { EffectCube,Pagination, Autoplay } from 'swiper/core';
import "swiper/swiper.min.css";
import "swiper/components/effect-cube/effect-cube.min.css"
import "swiper/components/pagination/pagination.min.css"
import "swiper/components/effect-flip/effect-flip.min.css"

// Axios Import
import axiosInstance from "../../Core/Axios";

// Bootstrap Imports
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card'
import Image from "react-bootstrap/Image";
import Button from 'react-bootstrap/Button'

// Icons Imports
import { FaStar } from "react-icons/fa";

// Router Imports
import { Link } from "react-router-dom";

// install Swiper modules
SwiperCore.use([EffectCube,Pagination, Autoplay]);


function QuizList(props) {

    const [loading, setLoading] = useState(true);
    const [quizData, setQuizData] = useState([]);

    useEffect(() => {
        getQuizList();
    }, []);

    const getQuizList = () => {
        axiosInstance
            .get("/home/getQuizList")
            .then(function (response) {
                setQuizData([...response.data.data]);
                setLoading(false);
            })
            .catch(function (error) {
                setLoading(false);
                alert('API Error - Quiz List Component - /quiz/getQuizList');
                console.log(error);
            });
    }

    const startQuiz = (quizId : string) => {
        props.startQuiz(quizId);
    }

    return (
        <>
            {
                !loading && (
                    <div className='mt-2 mb-3'>
                        <Swiper
                            spaceBetween={50}
                            slidesPerView={1}
                            // onSlideChange={() => console.log('slide change')}
                            onSwiper={(swiper) => console.log(swiper)}
                            loop={false}
                            effect={'cube'} grabCursor={true} cubeEffect={{
                                "shadow": true,
                                "slideShadows": true,
                                "shadowOffset": 20,
                                "shadowScale": 0.94
                              }}
                              autoplay={{
                                "delay": 2500,
                                "disableOnInteraction": true
                              }} 
                              className="mySwiper">
                            {
                                quizData.map((element, index) => {
                                    return (
                                        <SwiperSlide key={element.identifier}>
                                            <Card border="dark">
                                                <Card.Body>
                                                    <Card.Title>{element.title}</Card.Title>
                                                    <Row>
                                                        <Col>
                                                            <Row>
                                                                <Col>
                                                                <span>Top Talent</span><br></br>
                                                                    <strong>{element.name}</strong> <br></br>
                                                                        <div className='mt-2'>
                                                                            <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" className="bi bi-trophy-fill" viewBox="0 0 16 16">
                                                                                <path d="M2.5.5A.5.5 0 0 1 3 0h10a.5.5 0 0 1 .5.5c0 .538-.012 1.05-.034 1.536a3 3 0 1 1-1.133 5.89c-.79 1.865-1.878 2.777-2.833 3.011v2.173l1.425.356c.194.048.377.135.537.255L13.3 15.1a.5.5 0 0 1-.3.9H3a.5.5 0 0 1-.3-.9l1.838-1.379c.16-.12.343-.207.537-.255L6.5 13.11v-2.173c-.955-.234-2.043-1.146-2.833-3.012a3 3 0 1 1-1.132-5.89A33.076 33.076 0 0 1 2.5.5zm.099 2.54a2 2 0 0 0 .72 3.935c-.333-1.05-.588-2.346-.72-3.935zm10.083 3.935a2 2 0 0 0 .72-3.935c-.133 1.59-.388 2.885-.72 3.935z" />
                                                                            </svg> <span className='ml-2'><strong> {element.best_time}s</strong></span>
                                                                        </div>
                                                                </Col>
                                                            </Row>
                                                        </Col>
                                                        <Col>
                                                            <Image
                                                                className="pointer rounded"
                                                                src={element.image}
                                                            />
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col>

                                                        </Col>
                                                    </Row>
                                                </Card.Body>
                                                <Card.Footer>
                                                    {
                                                        !element.is_completed ? (
                                                            <Button variant="primary" onClick={() => { startQuiz(element.identifier) }} block>Start</Button>
                                                        ) : null
                                                    }
                                                    {
                                                        element.is_completed  ?  (
                                                            <Link to={ '/quiz-summary/'+ element.identifier} ><Button variant="success" block>See Details</Button></Link>
                                                        ) : null
                                                    }
                                                </Card.Footer>
                                            </Card>
                                        </SwiperSlide>
                                    );
                                })
                            }
                        </Swiper>
                    </div>
                )
            }

        </>
    )
}

export default QuizList
