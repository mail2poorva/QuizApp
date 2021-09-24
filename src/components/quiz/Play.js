import React,{ Component, Fragment } from 'react';
import { Helmet } from 'react-helmet';
import { Button } from 'react-bootstrap';
import questions from '../questions.json';
import isEmpty from '../../is-empty';
import classnames from 'classnames';
import M from 'materialize-css';



// Constructor Class*********************
class Play extends Component{
    constructor(props){
        super(props);
        this.state={
            questions,
            currentQues: {},
            nextQues: {},
            previousQues: {},
            answer: '',
            numberofQuestions: 0,
            numberofAnsweredQues: 0,
            currentQuesIndex: 0,
            score: 0,
            correctAns: 0,
            wrongAns: 0,
            hints: 2,
            fiftyFifty: 1,
            usedfiftyFifty: false,
            nextBtnDisabled : true,
            previousBtnDisabled : true,
            previousRandomNumber: [],
            time: {}
        
        };
        this.interval = null
    }

    // to run the display function
    componentDidMount (){
        const {questions,currentQues,nextQues,previousQues}=this.state;
        this.displayQuestions(questions,currentQues,nextQues,previousQues);
        this.startTimer();
    }


    componentWillUnmount() {
        clearInterval(this.interval);
    }

    // to  display the questions on screen
    displayQuestions = (questions=this.state.questions,currentQues,nextQues,previousQues) =>{
        let { currentQuesIndex } = this.state;
        if (!isEmpty(this.state.questions))
        {
            questions = this.state.questions;
            currentQues = questions[currentQuesIndex];
            nextQues = questions[currentQuesIndex+1];
            previousQues = questions[currentQuesIndex-1];
            const answer = currentQues.answer;
            this.setState({
                currentQues,
                nextQues,
                previousQues,
                numberofQuestions: questions.length,
                answer,
                previousRandomNumber : []
            }, () =>{
                this.showOptions();
                this.handleDisablebtn();
            });
        }
    };


    // Hadling next button functionality
    handleNextBtnClick = () =>{

        if(this.state.nextQues !== undefined)
        {
            this.setState(prevState =>({
                currentQuesIndex : prevState.currentQuesIndex + 1
            }),() => {
                this.displayQuestions(this.state.questions,this.state.currentQues,this.state.nextQues,this.state.previousQues);
            });
        }
    }
    
    
    // Handling previous button functionality
    handlePreviousBtnClick = () => {

        if(this.state.previousQues !== undefined)
        {
            this.setState(prevState =>({
                currentQuesIndex : prevState.currentQuesIndex - 1
            }),() => {
                this.displayQuestions(this.state.questions,this.state.currentQues,this.state.nextQues,this.state.previousQues);
            });
        }
    }


    //Handling the quit button functionality
    handleQuitBtnClick = () =>{
        if (window.confirm("You wanna quit this quiz ??"))
       {
           this.props.history.push('/');
       }
    }


    // Handle all button functionalities
    handleBtnClick = (e) => {
        switch(e.target.id)
        {
            case 'next':
                this.handleNextBtnClick();
                break;
            
            case 'previous':
                this.handlePreviousBtnClick();
                 break;
            
             case 'quit':
                this.handleQuitBtnClick();
                 break;

            default:
                break;
        }
        
       
       

            // this.handleNextBtnClick();
        
    }


    // button click function to check the correct answer
    handleOptionClick = (e) =>{
        if (e.target.innerHTML.toLowerCase() === this.state.answer.toLowerCase())
           {
               this.correctAnswer();
           }
           else {
               this.wrongAnswer();
           }
    }

    // checking correct option function
    correctAnswer = () => {
        M.toast({
            html: 'Correct option!!',
            classes: 'toast-valid',
            displayLength: 1500

        });

        this.setState(prevstate => ({
            score: prevstate.score + 1,
            correctAns: prevstate.correctAns+1,
            currentQuesIndex: prevstate.currentQuesIndex+1,
            numberofAnsweredQues: prevstate.numberofAnsweredQues+1

        }),() => {
            if (this.state.nextQues === undefined)
            {
                this.endGame();
            }
            else {
                this.displayQuestions(this.state.questions,this.state.currentQues,this.state.nextQues,this.state.previousQues);

            }
               });
    }





    // checking wrong option function
    wrongAnswer = () => {
        navigator.vibrate(1000);
        M.toast({
            html: 'Wrong Answer!!',
            classes: 'toast-invalid',
            displayLength: 1500

        });
        this.setState(prevstate => ({
            wrongAns : prevstate.wrongAns+1,
            currentQuesIndex: prevstate.currentQuesIndex + 1,
            numberofAnsweredQues: prevstate.numberofAnsweredQues+1

        }),() => {
            if (this.state.nextQues === undefined)
            {
                this.endGame();
            }
            else {
                this.displayQuestions(this.state.questions,this.state.currentQues,this.state.nextQues,this.state.previousQues);

            }
        });
    }


    // Working function of Hints 

    showOptions = () =>{
        const options = Array.from(document.querySelectorAll('.option'));

        options.forEach(option => {
            option.style.visibility = 'visible';
                });

                this.setState({
                    usedfiftyFifty: false
                });
    }

    handleHints = () => {
        if (this.state.hints > 0)
        {
            const option = Array.from(document.querySelectorAll('.option'));
            let indexOfAnswer;
    
            option.forEach((option,index) => {
                if (option.innerHTML.toLowerCase() === this.state.answer.toLowerCase())
                {
                    indexOfAnswer = index;
                    console.log(indexOfAnswer);
                }
            });
    
            while(true)
            {
                const randomNumber = Math.round(Math.random() * 3);
                if (randomNumber !== indexOfAnswer && ! this.state.previousRandomNumber.includes(randomNumber))
                {
                    option.forEach((option,index) =>{
                        if (index === randomNumber)
                        {
                            option.style.visibility = 'hidden';
                       
                        this.setState((prevState) =>({
                            
                            hints: prevState.hints - 1,
                            previousRandomNumber: prevState.previousRandomNumber.concat(randomNumber)
                        }));
                    }
    
                    });
                    break;
                }
                if (this.state.previousRandomNumber.length >= 3)
                break;
            }
        }

    }


    handleFiftyFifty = () =>{
        if (this.state.fiftyFifty > 0 && this.state.usedfiftyFifty === false)
        {
            const options = document.querySelectorAll('.option');
            const randomNumbers = [];
            let indexOfAnswer;

            options.forEach((option,index) =>{
                if (option.innerHTML.toLowerCase() ===this.state.answer.toLowerCase()){
                    indexOfAnswer = index;
                }
            });
            let count = 0;
            do{
                const randomNumber = Math.round(Math.random() * 3);
                if (randomNumber !== indexOfAnswer)
                {
                    if (randomNumbers.length < 2 && !randomNumbers.includes(randomNumber) && ! randomNumbers.includes(indexOfAnswer))
                    {
                        randomNumbers.push(randomNumber);
                        count++;
                    }
                    else {
                        while(true)
                        {
                            const newrandomNumber = Math.round(Math.random() * 3);
                            if (! randomNumbers.includes(newrandomNumber) && ! randomNumbers.includes(indexOfAnswer))
                            {
                                randomNumbers.push(newrandomNumber);
                                count++;
                                break;
                            }
                        }
                    }
                } 
            }
            while(count < 2){
                options.forEach((option,index) =>{
                    if (randomNumbers.includes(index)){
                        option.style.visibility = 'hidden';
                    }
                });
                this.setState(prevState => ({
                    fiftyFifty: prevState.fiftyFifty - 1,
                    usedfiftyFifty: true
                }));
            }
        }
    }

    //302000
    startTimer = () => {
        const countDownTime = Date.now() + 32000;
        this.interval = setInterval(() => {
            const now = new Date();
            const distance = countDownTime - now;

            const min = Math.floor((distance % (1000 * 60 * 60)/(1000 * 60)));
            const sec = Math.floor((distance % (1000*60)) / 1000);

            if (distance < 0)
            {
                clearInterval(this.interval);
                this.setState({
                    time:{
                        min: 0,
                        sec: 0
                    }
                }, () => {
                    this.endGame();
                });
            }
            else {
                this.setState({
                    time:{
                        min,
                        sec,
                        distance
                    }
                });
            }
        }, 1000);

    }


    handleDisablebtn = () =>{
        if (this.state.previousQues === undefined || this.state.currentQuesIndex === 0)
        {
            this.setState({
               previousBtnDisabled: true 
            });
            
        }
        else {
            this.setState({
                previousBtnDisabled: false
            });
          
        }
        if (this.state.nextQues === undefined || this.state.currentQuesIndex + 1 === this.state.numberofQuestions)
        {
            this.setState({
               nextBtnDisabled: true 
            });
        }
        else {
            this.setState({
                nextBtnDisabled: false
            });
        }
    }


    endGame = () => {
        alert('Quiz has ended');

        const {state} = this;

        const playerStats = {
            score : state.score,
            numberofQuestions: state.numberofQuestions,
            numberofAnsweredQues : state.numberofAnsweredQues,
            correctAns: state.correctAns,
            wrongAns : state.wrongAns,
            usedfiftyFifty: 1 - state.fiftyFifty,
            usedhints : 2 - state.hints
        }

        console.log(playerStats);

        setTimeout(() => {
            this.props.history.push('/play/QuizSummary', playerStats);
        },1000);
    }



    // Main code with HTML
    render() {
        const { currentQues,currentQuesIndex,hints,numberofQuestions,fiftyFifty,time } = this.state;
        
        return (
           <Fragment>
               <Helmet><title>Quiz Page</title></Helmet>
                <div className="main-body">
                <div className="questions">
               <h2>Quiz Buzz</h2>
                {/* Lifeline Container */}
                   <div className="lifeline-container">
                       
                        <p>
                        <span className="mdi mdi-set-center mdi-24px lifeline-icon" onClick={this.handleFiftyFifty}></span><span className="lifeline">{fiftyFifty}</span>
                        </p>
                        <p>
                        <span className="mdi mdi-lightbulb-on-outline mdi-24px lightbulb lifeline-icon" onClick={this.handleHints}></span>
                        <span className="lifeline">{hints}</span>
                        </p>
                   </div>
                   <div className="timer-container">
                       <p>
                           <span className="left">{currentQuesIndex + 1} of {numberofQuestions}</span>
                           <span className="right">
                               
                               <span className="mdi mdi-clock-outline mdi-24px"></span>
                               <span className="number">{time.min}:{time.sec}</span>
                            </span>
                       </p>
                   </div>
                    <h5>{ currentQues.question}</h5>
                    <div className="options-container">
                        <p onClick={this.handleOptionClick} className="option">{currentQues.optionA}</p>
                        <p onClick={this.handleOptionClick} className="option">{currentQues.optionB}</p>
                    </div>
                    <div className="options-container">
                        <p onClick={this.handleOptionClick} className="option">{currentQues.optionC}</p>
                        <p onClick={this.handleOptionClick} className="option">{currentQues.optionD}</p>
                    </div>
                    <div className="button-container">
                        {/* previous */}
                        <Button
                        className={classnames('',{'disable': this.state.previousBtnDisabled})} 
                        variant="primary" id="previous" onClick={this.handleBtnClick}>
                            <span className="mdi mdi-arrow-left"></span>
                            Previous
                        </Button>

                        {/* next */}
                       <Button
                       className={classnames('', {'disable': this.state.nextBtnDisabled})} variant="success" id="next" onClick={this.handleBtnClick} >Next <span className="mdi mdi-arrow-right"></span></Button>


                        {/* quit */}
                        <Button variant="danger"  id="quit" onClick={this.handleBtnClick} >Quit <span className="mdi mdi-close"></span></Button>
                    </div>
                    
               </div>

                </div>
         </Fragment>
       );

    }
}

export default Play;