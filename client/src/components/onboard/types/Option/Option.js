import React, { Component } from 'react';

import './Option.css'

class Option extends Component {

    constructor(props) {
        super(props);

        let values = props.question.values;

        let checked = (new Array(values.length)).fill(false);

        if(props.answer){
            values.forEach((val, index) => {
                if(props.answer.includes(val)){
                    checked[index] = true;
                }
            })
        }

        this.state = {
            checked
        }

        this.submit = this.submit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange = key => e => {
        console.log("click");
        let {checked} = this.state;
        checked[key] = !checked[key];
        this.setState({
            checked
        })
    }

    submit(dir){
        let {checked} = this.state;
        let { submit, question } = this.props;
        const vals = checked.reduce(
            (out, bool, index) => bool ? out.concat(question.values[index]) : out, 
            []
          )

        submit(vals, dir);

    }

    render() {
        let { question } = this.props;
        let { checked } = this.state;

        return (
            <>
                <div className="options">
                {question.values.map((v, index) => {
                    let selected = checked[index] ? 'selected' : ''
                    return (<div key={index} className={`option ${selected}`} onClick={this.handleChange(index)}>
                        <h2>{v}</h2>
                    </div>)
                })}
                </div>
                <div className="footer">
                {!this.props.first ? (<button className="btn-block" onClick={() => this.submit(-1)}>Back</button>) : null}
                <button className="btn-block" onClick={() => this.submit(1)}>{this.props.last ? "Submit" : "Next"}</button>
                </div>
            </>
        )
    }
}

export default Option;