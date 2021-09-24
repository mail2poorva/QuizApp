import React,{Fragment} from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import logo from '../assets/img/idea (2).png';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button,InputGroup,FormControl } from 'react-bootstrap';


toast.configure()
const notify = ()=>{ 
        toast.success('Your feedback is submited', {autoClose:5000})
}


const Home = () =>  (
    <Fragment>
        <Helmet><title>Quiz App - Home</title></Helmet>
        <div id="home">
          <section>
              <div>
              <img src={logo} alt="BigCo Inc. logo" className="logo"/>
              </div>
              <h1>Quiz App</h1>
              <div className="play-button-container">
                    <ul>
                        <li><Link  className="play-button" to="/play/instructions"><Button variant="success" size="lg" block className="play-button">Play</Button></Link></li>
                    </ul>
              </div>
             
              <InputGroup>
                    <InputGroup.Prepend>
                    <InputGroup.Text>Write your reviews<br/> after playing</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl as="textarea" aria-label="With textarea" className="form" />
              </InputGroup>

              <div className="play-button-container">
                    <ul>
                        <li><Link  className="play-button"><Button variant="info" className="submit" onClick={notify}>Submit</Button></Link></li>
                    </ul>
              </div>
          </section>
        </div>
        </Fragment>
    );


export default Home;