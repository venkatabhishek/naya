import React, { Component } from 'react';
import { getQuestions, recordSession } from '../../actions/session';
import {
  withRouter
} from 'react-router-dom'
import Question from './Question';

import './Onboard.css';

class Onboard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      raw: {},
      position: 0,
      questions: [],
      email: "",
      answers: []
    }

    this.goNext = this.goNext.bind(this)
    this.submit = this.submit.bind(this)
    this.record = this.record.bind(this);
  }

  // get questions from server
  componentDidMount() {
    let _this = this;
    getQuestions().then(raw => {
      console.log(raw.data);
      _this.setState({
        raw: raw.data
      }, () => {
        let type = Object.keys(raw.data);
        // add initial question: designer or maker or etc?
        let newQuestions = this.state.questions.concat({
          category: "Type",
          type: "Option",
          question: "What do you want to register as?",
          values: type,
          cb: (types, cb) => { // array of values

            let newQ = []
            types.forEach(t => {
              newQ = newQ.concat(raw.data[t])
            });

            _this.setState({
              questions: _this.state.questions.concat(newQ),
              answers: _this.state.answers.concat(new Array(newQ.length))
            }, () => {
              cb();
            })
          }
        })

        _this.setState({
          questions: newQuestions,
          answers: new Array(1)
        })

      })
    })
  }

  setUser(email) {
    this.setState({
      email
    }, () => {
      this.goNext(1);
    })
  }

  // set answer
  submit(answer, index, cb) {
    let { answers } = this.state;
    answers[index] = answer;
    this.setState({
      answers
    }, () => {
      cb((dir) => {
        this.goNext(dir);
      });
    })
  }

  // record entire session in database
  record() {
    let { questions, answers } = this.state;
    recordSession(this.props.user.id, questions, answers)
      .then(() => {
        this.props.history.push("/app")
      }).catch(err => {
        console.log(err)
      })
  }


  goNext(direction) {
    let { position, questions, answers } = this.state;

    let temp = (position) + direction;

    if (temp < questions.length && temp >= 0) {

      if(direction === -1 && position === 1){
        answers = [answers[0]]
        questions = [questions[0]]
      }

      this.setState({
        position: position + direction,
        answers,
        questions
      })
    }

  }

  render() {
    let { position, questions, answers } = this.state;

    return (
      <div>

        {questions.length !== 1 ? (<div className="progress">
          <div className="progress-content" style={{width: `${((position+1)/questions.length)*100}%`}}>
            </div>
        </div>) : null}


        <div className="header">

          <h2>Naya</h2>
          
          <h2></h2>

        </div>

        <div className="center h-v top">
          {questions.length !== 0 ?
            (<Question
              question={questions[position]}
              answer={answers[position]}
              goNext={this.goNext}
              position={position}
              total={questions.length}
              submit={this.submit}
              record={this.record} />) : null}
        </div>



      </div>
    )
  }
}

export default withRouter(Onboard);
