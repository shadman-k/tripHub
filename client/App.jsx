import React, { Component } from 'react'
import { connect } from 'react-redux';
import * as actions from './actions/actions.js';

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
      <div>
        <p>tripHub</p>
        <p>{this.props.user}</p>
        <button onClick={() => this.props.auth(true)}>click me</button>
      </div>
    )
  }
}

export default connect(mapStatetoProps, mapDispatchToProps)(App);