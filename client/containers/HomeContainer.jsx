import React, { Component } from 'react';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import moment from 'moment';

import * as actions from '../actions/actions.js';

import TripCard from '../components/Home/TripCard.jsx';
import NewTrip from '../components/Home/NewTrip.jsx'

const mapStateToProps = (state) => ({
  modalState: state.newTrip.open,
  trips: state.trips.trips,
  userId: state.auth.userId
});

const mapDispatchToProps = {
  modalToggle: (open) => actions.newTrip(open),
  addTrip: (tripInfo) => actions.addTrip(tripInfo),
  getUserId: (userId) => actions.getUserId(userId)
};

export class homeContainer extends Component {
  
  componentDidMount() {
    fetch('/getId')
    .then((data) => data.json())
    .then((userInfo) => {
      this.props.getUserId(userInfo.google_id);
      fetch('/trips/getTrips', {
        method: 'POST',
        headers: { 'Content-Type' : 'application/json' },
        body: JSON.stringify({
          googleId: this.props.userId
        })
      })
      .then((data) => data.json())
      .then((trips) => {
        for (let i = 0; i < trips.length; i++) {
          this.props.addTrip(trips[i]);
        }
      }) 
    })
  }

  render() {
    const myTrips = this.props.trips.map((el, i) => {
      const dateStart = moment(el.datestart).format('LL');
      const dateEnd = moment(el.dateend).format('LL');
      return <TripCard name={el.trip_name} dest={el.destination} start={dateStart} end={dateEnd} tripId={el.trip_id} key={`Trip${i}`}/>
    })

    const submitNewTrip = () => {
      const tripInfo = {
        name: document.getElementById('name-of-trip').value,
        destination: document.getElementById('destination').value,
        groupID: 1,
        dateStart: moment(document.getElementById('start-date').value).format('LL'),
        dateEnd: moment(document.getElementById('end-date').value).format('LL'),
        createdBy: this.props.userId
      }
      this.props.modalToggle(!this.props.modalState);
      fetch('/trips', {
        method: 'POST',
        headers: { 'Content-Type' : 'application/json' },
        body: JSON.stringify({
          tripInfo: tripInfo
        })
      })
      .then((data) => data.json())
      .then((trip) => {
        console.log('new trip: ', trip)
      })
    };

    return (
      <div className='home-container'>
        <h2 style={{display: 'flex', justifyContent: 'center', marginBottom: '5px'}}>Trips</h2>
        <Paper className='all-trips-paper'>
          <div className='trip-grid'>
            {myTrips}
            <NewTrip modalState={this.props.modalState} modalToggle={this.props.modalToggle} submitNewTrip={submitNewTrip}/>
          </div>
        </Paper>
      </div>
    )
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(homeContainer);
