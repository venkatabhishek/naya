import React, { Component } from 'react';

import Number from './types/Number';
import Option from './types/Option/Option';
import Text from './types/Text';

class Question extends Component {

    constructor(props) {
        super(props);

        this.submit = this.submit.bind(this);
    }

    submit(value, dir) {
        let { submit, position, question, total } = this.props;

        submit(value, position, (cb) => {
            if (question.cb) {
                question.cb(value, () => {
                    cb(dir);
                });
            } else {
                // end of session - record
                if(dir === 1 && position === (total - 1)){
                    
                    this.props.record();
                }else{
                    cb(dir);
                }
            }
        });

    }

    renderSwitch(type) {
        let { question, answer, total, position } = this.props;
        let {submit} = this;

        let commonProps = {
            first: position === 0,
            last: position === (total - 1),
            question,
            answer,
            submit
        }

        switch (type) {
            case "Number":
                return (<Number {...commonProps} />);
            case "Option":
                return (<Option {...commonProps} />);
            case "Text":
                return (<Text {...commonProps}  />)
            default:
                return (<div>Only Number, Option, and Text are supported</div>)
        }
    }

    render() {
        let { question } = this.props;

        return (
            <>
                <h2 className="question">{question.question}</h2>
                {this.renderSwitch(question.type)}
            </>
        )
    }
}

export default Question;