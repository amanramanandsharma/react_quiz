import React, { useState, useEffect } from 'react'
import './MasterQuestions.scss';

import { useStopwatch } from 'react-timer-hook';

// Bootstrap Imports
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'

// Swiper Imports
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Controller } from 'swiper';
import 'swiper/swiper.scss';

SwiperCore.use([Controller]);

function MasterQuestions(props: any) {

    const {
        seconds,
        minutes,
        hours,
        days,
        isRunning,
        start,
        pause,
        reset,
    } = useStopwatch({ autoStart: true });


    const [index, setIndex] = useState(0);
    const [firstSwiper, setFirstSwiper] = useState<any>();
    const [questionsData, setQuestionsData] = useState([
        {
            url: 'https://www.filmcompanion.in/wp-content/uploads/2020/03/film-comapnion-hera-pheri-inline-image-1.jpg',
            text: 'Question #1',
            code: 1,
            time: 0,
            isCompleted: false

        },
        {
            url: 'https://cdn.bollywoodmdb.com/movies/largethumb/2020/coolie-no-1/coolie-no-1-37.jpg',
            text: 'Question #2',
            code: 2,
            time: 0,
            isCompleted: false
        },
        {
            url: 'https://cdn.bollywoodmdb.com/movies/largethumb/2020/sooryavanshi/sooryavanshi-7.jpg',
            text: 'Question #3',
            code: 3,
            time: 0,
            isCompleted: false
        }
    ]);

    useEffect(() => {
        console.log('Passed Quiz Id ' + props.quizId);
    }, [])



    const handleSlideChange = (previousIndex: any, currentIndex: any = null, moveSlider: boolean = false, moveNext: boolean = false) => {

        setIndex(currentIndex);
        const time = minutes * 60 + seconds;
        const updateQData = questionsData;
        updateQData[previousIndex]['time'] = updateQData[previousIndex]['time'] + time;
        setQuestionsData([...updateQData]);
        reset();

        if (moveSlider) {
            if (moveNext) firstSwiper.slideNext();
            else firstSwiper.slidePrev();

        }
    }


    return (
        <>
            <Row>
                <Col xs={12} sm={12} md={6}>
                    <Swiper
                        spaceBetween={50}
                        slidesPerView={1}
                        onSwiper={(swiper) => setFirstSwiper(swiper)}
                        controller={{ control: firstSwiper }}
                        onSlideChange={(event) => handleSlideChange(event.previousIndex, event.activeIndex)}
                    >
                        {questionsData.map((questions, index) => {
                            return (
                                <SwiperSlide key={questions.code} className='mt-2'>
                                    <Card>
                                        <Card.Img className='img-fluid img-thumbnail question-card ' variant="top" src={questions.url} />
                                        <Card.Body>
                                            <Row>
                                                <Col>
                                                    <div>
                                                        <InputGroup size="lg">
                                                            <FormControl aria-label="Large" aria-describedby="inputGroup-sizing-sm" />
                                                        </InputGroup>
                                                    </div>
                                                    {/* <span>{days}</span>:<span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span> */}
                                                </Col>
                                            </Row>
                                            <Row className='mt-2'>
                                                <Col>
                                                    <Button variant="secondary" onClick={() => { handleSlideChange(index, index - 1, true, false) }} block>Previous</Button>
                                                </Col>
                                                <Col>
                                                    <Button variant="primary" onClick={() => { handleSlideChange(index, index + 1, true, true) }} block>Next</Button>
                                                </Col>
                                            </Row>
                                        </Card.Body>
                                    </Card>
                                </SwiperSlide>
                            );
                        })}

                    </Swiper>
                </Col>
            </Row>

        </>
    )
}


export default MasterQuestions
