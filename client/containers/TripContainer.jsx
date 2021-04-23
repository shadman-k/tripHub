import React, { Component } from 'react';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import Itinerary from '../components/Trips/Itinerary.jsx'
import Attending from '../components/Trips/Attending.jsx'
import * as actions from '../actions/actions.js';


const mapStateToProps = (state) => ({
  currTrip: state.trips.currTrip,
  modalState: state.stops.open,
  stops: state.trips.stops,
  userId: state.auth.userId,
  members: state.members.members,
  trip_ID: state.trips.currTrip,

});

const mapDispatchToProps = {
  modalToggle: (open) => actions.setNewStop(open),
  addStop: (stopInfo) => actions.addStop(stopInfo),
  addMembers: (members) => actions.addMembers(members)

};

export class tripContainer extends Component {
  componentDidMount() {
    fetch("/stops/getStops", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ tripID: this.props.currTrip })
    })
      .then(response => response.json())
      .then(stops => {
        for (let i = 0; i < stops.rows.length; i++) {
          this.props.addStop(stops.rows[i]);
        }
      })
      .catch(error => console.log('error', error));

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
    const submitNewStop = () => {
      this.props.modalToggle(!this.props.modalState);
      fetch('/stops', {
        method: 'POST',
        headers: { 'Content-Type' : 'application/json' },
        body: JSON.stringify({
          stop_name: document.getElementById('name-of-stop').value,
          destination: document.getElementById('stop-destination').value,
          groupID: 1,
          createdBy: this.props.userId,
          tripID:this.props.currTrip
        })
      })
      .then((data) => data.json())
      .then((stop) => {
        console.log('RETURNED STOP: ', stop.rows[0]);
        this.props.addStop(stop.rows[0]);
      })
    }

    console.log(this.props.currTrip);
    console.log('modal state: ', this.props.modalState);
    return (
      <div className="tripContents">
        <div className="itineraryContainer">
          <Itinerary stops={this.props.stops} modalState={this.props.modalState} modalToggle={this.props.modalToggle} submitNewStop={submitNewStop}/>
        </div>
        <div className="attendingContainer">
          <Attending members={this.props.members}/>
        </div>
      </div>
    )
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(tripContainer);
