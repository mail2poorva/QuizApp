import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Home from './components/Home';
import QuizInfo from './components/quiz/quizInfo';
import Play from './components/quiz/Play';
import QuizSummary from './components/QuizSummary';


function App() {
  return (
   <Router>
     <Route path="/" exact component={Home}></Route>
     <Route path="/play/instructions" exact component={QuizInfo}></Route>
     <Route path="/play/Quiz" exact component={Play}></Route>
     <Route path="/play/QuizSummary" exact component={QuizSummary}></Route>
   </Router>
  );
}

export default App;
