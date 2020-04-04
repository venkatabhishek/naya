import React, { Component } from 'react'
import { logoutUser } from '../../actions/user';
import { getSession } from '../../actions/session';

import './Home.css'

class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            onboard: []
        }
    }

    componentDidMount() {
        getSession(this.props.user.id)
            .then((res) => {
                this.setState({
                    onboard: res.data
                })
            })
    }


    render() {
        let { onboard } = this.state
        return (<div>
            <div className="nav">
                <h2 style={{marginBottom: "20px"}}>Naya</h2>
                <button className="btn-block" onClick={() => {
                    logoutUser();
                    window.location.href = "/login"
                }}>Logout</button>
            </div>

            <div className="onboard">
                <h1>Onboard Session</h1>
                {onboard.length === 0 ? "You have not completed a session" :
                    (onboard.map((q, index) => (
                        <div key={index}>
                            <h3 className="question-l">{q.question}</h3>
                            <h3 className="answer-l">
                            {q.answer ? (q.answer instanceof Array ? q.answer.join(", ") : q.answer) : ""}
                            </h3>
                        </div>
                    )))}
                <button className="btn-block" onClick={() => window.location.href = "/onboard"}>
                    {onboard.length === 0 ? "Complete" : "Redo"} onboard session</button>
            </div>

        </div>);
    }
}

export default Home;