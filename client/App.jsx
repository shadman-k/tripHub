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
import TripContainer from './containers/tripContainer.jsx';

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
      <Router>
        <NavBar/>
        <p>tripHub</p>
        <p>{this.props.user}</p>
        <button onClick={() => this.props.auth(true)}>click me</button>

        <Switch>
          <Route path='/home'>
            Home Page
          </Route>
        </Switch>
      </Router>
    )
  }
}

export default connect(mapStatetoProps, mapDispatchToProps)(App);