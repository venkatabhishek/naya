import React, { Component } from 'react';

import { logoutUser, loginUser, registerUser } from './actions/user';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Home from './components/Home/Home';
import Onboard from './components/onboard/Onboard';

import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
var jwtDecode = require('jwt-decode');




const PrivateRoute = ({ component: Component, isAuthenticated, user, ...rest }) => (
  <Route {...rest} render={(props) => (
    isAuthenticated === true
      ? <Component {...props} user={user} />
      : <Redirect to='/login' />
  )} />
)


class App extends Component {

  constructor(props) {
    super(props);
    
    let init = {
      isAuthenticated: false,
      user: null, 
      authError: null
    }

    // Check for token to keep user logged in
    if (localStorage.jwtToken) {
      // Set auth token header auth
      const token = localStorage.jwtToken;
      // Decode token and get user info and exp
      const decoded = jwtDecode(token);
      // Set user and isAuthenticated
      init.isAuthenticated = true;
      init.user = decoded;
      // Check for expired token
      const currentTime = Date.now() / 1000; // to get in milliseconds
      if (decoded.exp < currentTime) {
        // Logout user
        logoutUser();

        // Redirect to login
        window.location.href = "/login";
      }
    }

    this.state = init;

    this.login = this.login.bind(this);
    this.register = this.register.bind(this);
  }

  login(email, password, cb) {
    loginUser({
      email,
      password
    }).then(user => {
      this.setState({
        isAuthenticated: true,
        user
      }, () => {
        cb();
      })
    }).catch(err => {
      this.setState({
        authError: err.error
      })
    })
  }

  register(email, password, cb) {
    registerUser({
      email,
      password
    }).then(user => {
      this.setState({
        isAuthenticated: true,
        user
      }, () => {
        cb();
      })
    }).catch(err => {
      this.setState({
        authError: err.error
      })
    })
  }

  render() {
    let { isAuthenticated, authError, user } = this.state;

    return (<Router>
      <Switch>
        <PrivateRoute path="/app" component={Home} isAuthenticated={isAuthenticated} user={user} />
        <PrivateRoute path="/onboard" component={Onboard} isAuthenticated={isAuthenticated} user={user}  />
        <Route path="/login" render={(props) => <Login {...props} login={this.login} authError={authError} isAuthenticated={isAuthenticated}/>}  />
        <Route path="/" render={(props) => <Register {...props} register={this.register} authError={authError} />} />
      </Switch>
    </Router>)
  }
}

export default App;
