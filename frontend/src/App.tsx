import React, { useState } from 'react'
import './App.scss';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Jumbotron from 'react-bootstrap/Jumbotron'
import Button from 'react-bootstrap/Button'

import Header from './Layouts/Header/Header';
import Footer from './Layouts/Footer/Footer';

import MasterQuestions from './Components/MasterQuestions/MasterQuestions';
import QuizList from './Components/QuizList/QuizList';
import HighScores from './Components/HighScores/HighScores';

function App() {

  const [quizId, setQuizId] = useState(0);
  const [startQuiz, setStartQuiz] = useState(false);

  return (
    <div className="App">
      <Header />
      <Container>
        {
          !startQuiz && (
            <div>
              <Row className= 'mt-2'>
                <Col>
                  <Jumbotron>
                    <h1>Quiz</h1>
                    <p>
                      <Button variant="primary" onClick={() => { setStartQuiz(true) }} block>Start !!</Button>
                    </p>
                  </Jumbotron>
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
