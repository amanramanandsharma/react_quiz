import React, { useState, useEffect } from 'react'
import './UserProfile.scss';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { EffectCube, Pagination, Autoplay } from 'swiper/core';
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

// install Swiper modules
SwiperCore.use([EffectCube, Pagination, Autoplay]);

function UserProfile() {
    const [loading, setLoading] = useState(true);
    const [userInformation, setUserInformation] = useState({});
    const [statsData, setStatsData] = useState([
        {
            id: 1,
            title: 'Quizzes Completed',
            value: '10%'
        },
        {
            id: 2,
            title: 'Correct Answers',
            value: '52%'
        },
        {
            id: 3,
            title: 'Average Quiz Time',
            value: '35s'
        },
        {
            id: 4,
            title: 'Average Answer Time',
            value: '3s'
        },

    ]);

    useEffect(() => {
        getUserInformation();
    }, []);

    const getUserInformation = () => {
        axiosInstance
            .get("/user-profile/getUserInformation")
            .then(function (response) {
                setUserInformation(response.data.data);
                setLoading(false);
            })
            .catch(function (error) {
                setLoading(false);
                alert('API Error - User Profile Component - /user-profile/getUserInformation');
                console.log(error);
            });
    }

    return (
        <>
            {
                !loading && (
                    <div className='mt-2 mb-3'>
                        <Row>
                            <Col>
                                <Card>
                                    <Card.Body>
                                        <Row className='text-center'>
                                            <Col className='div-right-border' xs={6}>
                                                <Row>
                                                    <Col>
                                                        <h1># {userInformation['rank'] } </h1>
                                                        <div>
                                                            <span className='text-muted'><strong>Rank</strong></span>
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </Col>
                                            <Col xs={6}>
                                                <Row>
                                                    <Col>
                                                        <Image
                                                            className="user-image pointer"
                                                            src={userInformation['image'] } />
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col>
                                                        <strong>{userInformation['name'] }</strong>
                                                        <hr></hr>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col>
                                                        Joined
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col>
                                                        <strong>{userInformation['joined_on'] }</strong>
                                                    </Col>
                                                </Row>
                                            </Col>
                                        </Row>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                        <Row className='mt-2'>
                            <Col>
                                <Card>
                                    <Card.Body>
                                        <Row className='text-center'>
                                            <Col>
                                                <Row>
                                                    <Col>
                                                        <strong>Quiz Statistics</strong>
                                                        <hr></hr>
                                                    </Col>
                                                </Row>
                                                <Swiper
                                                    spaceBetween={50}
                                                    slidesPerView={1}
                                                    // onSlideChange={() => console.log('slide change')}
                                                    onSwiper={(swiper) => console.log(swiper)}
                                                    loop={false}
                                                    effect={'cube'} grabCursor={true}
                                                    autoplay={{
                                                        "delay": 2500,
                                                        "disableOnInteraction": true
                                                    }}
                                                    className="mySwiper">
                                                    {
                                                        userInformation['quiz_stats'].map((element, index) => {
                                                            return (
                                                                <SwiperSlide key={element.id}>
                                                                    <Row className='fixed-height-div'>
                                                                        <Col>
                                                                            <h1>{element.value}</h1>
                                                                            <span className='text-muted'><strong>{element.title}</strong></span>
                                                                        </Col>
                                                                    </Row>
                                                                </SwiperSlide>
                                                            );
                                                        })
                                                    }
                                                </Swiper>

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

export default UserProfile
