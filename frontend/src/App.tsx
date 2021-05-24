import React, { useState } from 'react'
import './App.scss';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Jumbotron from 'react-bootstrap/Jumbotron'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'

import Header from './Layouts/Header/Header';
import Footer from './Layouts/Footer/Footer';

import MasterQuestions from './Components/MasterQuestions/MasterQuestions';
import QuizList from './Components/QuizList/QuizList';
import HighScores from './Components/HighScores/HighScores';

function App() {

  const [quizId, setQuizId] = useState('GZ-TBQZ2105242021591');
  const [startQuiz, setStartQuiz] = useState(false);

  return (
    <div className="App">
      <Header />
      <Container>
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
                      <Card.Text>
                      John Doe | 12th March 2021
                      <span className='btn-right'>
                        <Button variant="light" onClick={() => { setStartQuiz(true) }}>Start !!</Button>
                      </span>
                      </Card.Text>
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

        {
          startQuiz && (
            <div>
              <Row>
                <Col>
                  <MasterQuestions quizId={quizId} />
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
