import React, { useState, useEffect } from 'react'
import './App.scss';

// Bootstrap Imports
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Alert from 'react-bootstrap/Alert'

import Header from './Layouts/Header/Header';
import Footer from './Layouts/Footer/Footer';

import MasterQuestions from './Components/MasterQuestions/MasterQuestions';
import QuizList from './Components/QuizList/QuizList';
import HighScores from './Components/HighScores/HighScores';


// Axios Import
import axiosInstance from './Core/Axios';

function App() {

  const [latestQuiz, setlatestQuiz] = useState(null);
  const [selectedQuizId, setSelectedQuizId] = useState(0);
  const [startQuiz, setStartQuiz] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    getLatestQuiz();
  }, []);

  const getLatestQuiz = () => {
    axiosInstance
      .get('/quiz/getLatestQuiz')
      .then(function (response) {
        setlatestQuiz(response.data.data)
        setSelectedQuizId(response.data.data.identifier);
        setLoading(false);
      })
      .catch(function (error) {
        setError(true);
        alert('API Error - App Component - /quiz/getLatestQuiz');
        console.log(error);
      });
  }

  const setQuizIdAndStart = (quizId) => {
    setSelectedQuizId(quizId);
    setStartQuiz(true)
  }

  return (
    <div className="App">
      <Header />
      <Container fluid>
      {
        error && (
          <div className='mt-1'>
            <Alert variant='danger'>Please Login To Continue</Alert>
          </div>
        )
      }
        {
          !startQuiz && (
            <div>
              <Row className='mt-2'>
                <Col>
                  <Card
                    bg='secondary'
                    text='white'
                    className="mb-2"
                  >
                    <Card.Body>
                      <Card.Title>Weekly Quiz</Card.Title>
                      {
                          !loading && (
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
                                    <Button variant="light" onClick={() => { setStartQuiz(true) }}>Start !!</Button>
                                  </span>
                                </Col>
                              </Row>
                            </div>
                        )
                      }
                        
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
              <Row>
                <Col xs={12} sm={12} md={6}><QuizList startQuiz={setQuizIdAndStart}></QuizList></Col>
                <Col xs={12} sm={12} md={6}><HighScores /></Col>
              </Row>
            </div>
          )
        }

        {
          startQuiz && (
            <div>
              <Row>
                <Col>
                  <MasterQuestions quizId={selectedQuizId} />
                </Col>
              </Row>
            </div>
          )
        }
      </Container>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
