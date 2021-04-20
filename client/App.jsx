import React, { Component } from 'react'
// import { Link } from 'react-router-dom'

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <p>tripHub</p>
        <div className="btncontainer btncontainer-fb">
          {/* <Link to='/auth/facebook' className='btn-facebook'> */}
          <a href="/auth/facebook" className="btn-fb">
            Sign in with Facebook
          </a>
          {/* </Link> */}
        </div>
      </div>
    )
  }
}
