import React,{Component, Fragment} from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Button } from 'react-bootstrap';
import answers from '../../assets/img/answers.jpg';
const QuizInfo = () => (
    <Fragment>
        <Helmet>
            <title>Quiz Instructions - Quiz App</title></Helmet>
            <div className="instructions container">
                <h1>How to play the Game!!!</h1>
                <h2>Ensure you read this guide from start to finish :</h2>
                 <ul className="browser-default" id="main-list">
                    <li>
                        The game has duration of  30 seconds and and ends as soon as your time elapses.
                    </li>
                    <li>
                        Each game consist of 5 questions.
                    </li>
                    <li>
                        Every question contain 4 options.
                        <img src={answers} alt="Quiz app options"/>
                    </li>
                    <li>Select the option which best answer the question by clicking on option
                    
                    </li>
                    <li>Each game has 2 hints<span className="mdi mdi-lightbulb-on-outline mdi-24px lightbulb"></span> and 1 lifeline of 50-50 chances with icon <span className="mdi mdi-set-center mdi-24px lifeline-icon"></span></li>
                    <li>Selecting 50-50  <span className="mdi mdi-set-center mdi-24px lifeline-icon"></span>  will remove 2 wrong answers leaving two option with one correct answer option:
                    

                    </li>
                    <li>Selecting hint  <span className="mdi mdi-lightbulb-on-outline mdi-24px lightbulb"></span> will remove one wrong answer with leaving 3 options with one correct option and two wrong options:
                   

                    </li>
                    <li>Feel free to quit when ever you want and your score will be aggregate after that according to your questions attempted.</li>
                    <li>The timer starts as soon as you start the game.</li>
                    <li>So are you ready to play the game!</li>
                </ul>  
                <div>
                    <span className="left"><Link to="/"><Button variant="primary">No take me back</Button></Link></span>
                    <span className="right"><Link to="/play/quiz"><Button variant="primary">Yes I'm ready...</Button></Link></span>            
                </div>
            </div>
        
    </Fragment>
)

export default QuizInfo;