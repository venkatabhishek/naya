import React, { useState } from 'react';
import {
  withRouter
} from 'react-router-dom'

const Register = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')

  let onSubmit = (event) => {
    event.preventDefault();
    props.register(email, password, () => {
      props.history.push("/onboard")
    });

  }

  let navigate = () => {
    props.history.push("/login")
  }

  return (
    <div className="row wrapper center">
      <div className="col">
        <h1>Register</h1>
        <h3>Already have an account? <a onClick={navigate}>Login</a></h3>
      </div>
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

    </div>
  );
};

export default withRouter(Register);