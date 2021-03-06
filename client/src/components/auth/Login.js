import React, { useState, useEffect } from 'react';
import {
    withRouter
} from 'react-router-dom'

const Login = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        if (props.isAuthenticated) {
            props.history.push("/app")
        }
    })

    let onSubmit = (event) => {
        event.preventDefault();
        props.login(email, password, () => {
            props.history.push("/app")
        });

    }

    let navigate = () => {
        props.history.push("/register")
      }

    return (
        <div className="row wrapper center">
            <div className="col">
                <form onSubmit={onSubmit} className="vform">
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            value={email}
                            name="email"
                            onChange={event => setEmail(event.target.value)}
                            placeholder="Email"
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={password}
                            onChange={event => setPassword(event.target.value)}
                            placeholder="password"
                        />
                    </div>
                    <button type="submit" className="btn-block">Get Started</button>
                    {props.authError ? <h4 style={{ color: "red" }}>{props.authError}</h4> : null}
                </form>
            </div>
            <div className="col">
                <h1>Login</h1>
                <h3>Don't have an account? <a onClick={navigate}>Register</a></h3>
            </div>


        </div>
    );
};

export default withRouter(Login);