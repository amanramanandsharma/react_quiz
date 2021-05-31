import React, { useState, useEffect } from 'react';
import './App.scss';

// Bootstrap Imports
import Container from 'react-bootstrap/Container';


import Header from './Layouts/Header/Header';
import Home from './Components/Home/Home';
import UserProfile from './Components/UserProfile/UserProfile';
import QuizDetails from './Components/QuizDetails/QuizDetails';

// Router DOM Imports
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

function App() {

  return (
    <div className="App">
      <Router>
        <Header></Header>
        <Container fluid>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path='/user-profile' component={UserProfile} />
            <Route path='/quiz-summary/:id' component={QuizDetails} />
          </Switch>
        </Container>
      </Router>

      {/* <Footer /> */}
    </div>
  );
}

export default App;
