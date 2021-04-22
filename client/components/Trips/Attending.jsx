import React, { Component } from 'react'
import { connect } from 'react-redux'
import Attendee from './Attendee.jsx'
import { Paper, TextField, Button } from '@material-ui/core';
import * as actions from '../../actions/actions';

const mapStateToProps = (state) => ({
  trip_ID: state.trips.currTrip,
  members: state.members.members
})

const mapDispatchToProps = {
  addMembers: (members) => actions.addMembers(members)
}

export class Attending extends Component {

  componentDidMount() {
    fetch('/trips/getAttendees', {
      method: 'POST',
      headers: { 'Content-Type' : 'application/json' },
      body: JSON.stringify({ tripInfo: this.props.trip_ID })
    })
    .then((data) => data.json())
    .then((attendees) => {
      console.log('all attendees: ', attendees[0].members)
      this.props.addMembers(attendees[0].members);
  })
    .catch((error) => console.log('Error with fetching attendees: ', error))
  }

  render() {

    console.log('members: ', this.props.members);
    const attendeesArr = this.props.members.map((member, i) => {
      console.log('member: ', member);
      return <Attendee key={`member${i}`} name={member}/>
    })

    // const addMember = () => {
    //   const email = document.getElementById('new-attendee').value;
    //   console.log(email);
    //   fetch('/trips/addAttendee', {
    //     method: 'POST',
    //     headers: { 'Content-Type' : 'application/json' },
    //     body: JSON.stringify({ attendeeEmail: email, trip_ID: this.props.trip_ID })
    //   })
    //   .then((data) => data.json())
    //   .then((attendees) => {
    //     // console.log('trip attendees: ', attendees)
    //     attendees.forEach((attendee, i) => {
    //       attendeesArr.push(<Attendee key={`attendee${i}`} name={attendee}/>)
    //     })
    //   })
    //   .catch((error) => console.log('Error with adding attendee: ', error))
    // };

    return (
      <div>
        <h3>Attending</h3>
        <div className="attendeesList">
          { attendeesArr }
        </div>
        <div>
          <TextField
            id='new-attendee'
            label='Invite by email'
            variant='outlined'
          />
          <Button variant='contained' color='primary'>Invite</Button>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Attending)
