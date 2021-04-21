import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

import TripCard from '../components/Home/TripCard.jsx';

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = {

};

export class homeContainer extends Component {
  render() {
    let trips = [];
    for(let i = 0; i < 29; i++){
      trips.push(<TripCard />);
    }
    return (
      <div className='home-container'>
        <h2 style={{display: 'flex', justifyContent: 'center', marginBottom: '5px'}}>Trips</h2>
        <Paper className='all-trips-paper'>
          <div className='trip-grid'>
            {trips}
          </div>
        </Paper>
      </div>
    )
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(homeContainer);
