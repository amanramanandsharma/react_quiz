import React, { useState, useEffect } from 'react'
import './HighScores.scss';

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
import Table from 'react-bootstrap/Table';


function HighScores() {

    const [loading, setLoading] = useState(true);
    const [scoreData, setScoreData] = useState([]);


    useEffect(() => {
        getQuizList();
    }, []);

    const getQuizList = () => {
        axiosInstance
            .get("/home/getTopScorers")
            .then(function (response) {
                setScoreData([...response.data.data]);
                setLoading(false);
                console.log(response.data.data);
            })
            .catch(function (error) {
                setLoading(false);
                alert('API Error - High Scores Component - /home/getTopScorers');
                console.log(error);
            });
    }

    return (
        <>
            {
                !loading && (
                    <div>
                        <Card
                            bg='light'
                            text='dark'
                            className="mb-2"
                        >
                            <Card.Body className='text-center'>
                                <Card.Title>Top Scorer List</Card.Title>
                                <hr></hr>

                                <Table striped bordered hover>
                                    <tbody>
                                        {
                                            scoreData.map((element, index) => {
                                                return (
                                                    <tr key={element.identifier}>
                                                        <td># {element.rank}</td>
                                                        <td>
                                                            {element.name}
                                                            <span className='ml-4'>
                                                                <Image
                                                                    className="user-image pointer"
                                                                    src={element.image}
                                                                    roundedCircle
                                                                />
                                                            </span>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
                    </div>
                )
            }

        </>
    )
}

export default HighScores
