import React, { Component } from 'react'
import { connect } from 'react-redux';
import * as actions from './actions/actions.js';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import NavBar from './components/Navbar.jsx';
import HomeContainer from './containers/HomeContainer.jsx';
import TripContainer from './containers/TripContainer.jsx';
import LoginContainer from './containers/LoginContainer.jsx';

import './styles/combined.scss';

const mapStatetoProps = (state) => ({
  user: state.auth.user
});

const mapDispatchToProps = (dispatch) => ({
  auth: (isAuthed) => dispatch(actions.authenticate(isAuthed))
});

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='main-container'>
        <div className='content-wrap'>
          <Router>
            <div className='nav-bar-wrap'>
              <NavBar/>
            </div>
            <Switch>
              <Route path='/home'>
                <HomeContainer />
              </Route>
              <Route path='/'>
                <LoginContainer />
              </Route>
            </Switch>
          </Router>
        </div>
      </div>
    )
  }
}

export default connect(mapStatetoProps, mapDispatchToProps)(App);