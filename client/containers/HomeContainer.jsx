import React, { Component } from 'react';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import moment from 'moment';

import * as actions from '../actions/actions.js';

import TripCard from '../components/TripCard.jsx';
import NewTrip from '../components/NewTrip.jsx'

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

  render() {
    const myTrips = this.props.trips.map((el, i) => {
      return <TripCard name={el.name} dest={el.dest} start={el.start} end={el.end} key={`Trip${i}`}/>
    })

    const submitNewTrip = () => {
      const tripInfo = {
        name: document.getElementById('name-of-trip').value,
        dest: document.getElementById('destination').value,
        start: moment(document.getElementById('start-date').value).format('LL'),
        end: moment(document.getElementById('end-date').value).format('LL')
      } 
      this.props.addTrip(tripInfo);
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
