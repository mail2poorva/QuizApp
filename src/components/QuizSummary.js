import React , { Component, Fragment } from 'react';
import { Button } from 'react-bootstrap';

import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

class QuizSummary extends Component {

    constructor (props) {
        super(props);
        this.state = {
            score : 0,
            numberofQuestions : 0,
            numberofAnsweredQues : 0,
            correctAnswers : 0,
            wrongAnswers : 0,
            usedHints : 0,
            usedFiftyfifty : 0
        };
    }


    componentDidMount () {
        const { state } = this.props.location;
        console.log(state);
        this.setState({
            score : (state.score / state.numberofAnsweredQues) * 100,
            numberofQuestions : state.numberofQuestions,
            numberofAnsweredQues : state.numberofAnsweredQues,
            correctAnswers : state.correctAns,
            wrongAnswers : state.wrongAns,
            usedHints : state.usedhints,
            usedFiftyfifty : state.usedfiftyFifty
            
        });
        
    }



    render (){
        const {state, score } = this.props.location;
        let stats,remark;

        if (score <= 1)
        {
            remark = 'You need more practice!';
        }
        else if (score <= 3 && score >1)
        { 
            remark = 'You can do better!';
        }
        else if (score == 5)
        {
            remark = 'You did great!';
        }
        if (state !== undefined)
        {
            stats = (
                <Fragment>
                    <div>
                        <span className="mdi mdi-check-circle-outline success-icon"></span>
                    </div>
                    <div className="container">
                        <h1 className="remark">Congratulations!Quiz Attempted.</h1>
                        <h2 className="score-percent">Your score : {this.state.score.toFixed(0)}&#37;</h2>
                        <h5 className="stat">
                            Total number of questions :
                            <span className="right">{this.state.numberofQuestions}</span>
                        </h5>
                        <br/>
                        <h5 className="stat">
                            Number of attempted questions : 
                            <span className="right">{this.state.numberofAnsweredQues}</span>
                        </h5>
                        <br/>
                        <h5 className="stat">
                            Number of Correct questions : 
                            <span className="right">{this.state.correctAnswers}</span>
                        </h5>
                        <br/>
                        <h5 className="stat">
                            Number of Wrong questions : 
                            <span className="right">{this.state.wrongAnswers}</span>
                        </h5>
                        <br/>
                        <h5 className="stat">
                            Hints Used : 
                            <span className="right">{this.state.usedHints}</span>
                        </h5>
                        <br/>
                        <h5 className="stat">
                            50-50 Used :  
                            <span className="right">{this.state.usedFiftyfifty}</span>
                        </h5>
                        <br/>
                    </div>
                    <section>
                    <ul className="btn-ul">
                        <li>
                            <Link to = "/"><Button variant="info" className="backBtn">Back to Home</Button></Link>
                        </li>
                        <li>
                            <Link to = "/play/quiz"><Button variant="info" className="quizBtn">Play again</Button></Link>
                        </li>
                    </ul>
                    </section>
            </Fragment>
            );
        }
        else if (state === undefined){
            stats = (
                <Fragment>
                <h1 className="no-stats">No Statistics Available</h1>
                <section>
                    <ul className="btn-ul">
                        <li>
                            <Link to = "/"><Button variant="info">Back to Home</Button></Link>
                        </li>
                        <li>
                            <Link to = "/play/quiz"><Button variant="info">Take a quiz</Button></Link>
                        </li>
                    </ul>
                </section>
                </Fragment>
            );
        }

        return (
            <Fragment>
                <Helmet><title>Quiz App - Final Score</title></Helmet>
                <div className="stats-body">
                {stats}
                </div>
            </Fragment>
        )
    }
}

export default QuizSummary;