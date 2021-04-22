import React, { Component } from 'react';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import Itinerary from '../components/Trips/Itinerary.jsx'
import Attending from '../components/Trips/Attending.jsx'


const mapStateToProps = (state) => ({

});

const mapDispatchToProps = {

};

export class tripContainer extends Component {
  render() {
    return (
      <div className="tripContents">
        <div className="itineraryContainer">
          <Itinerary />
        </div>
        <div className="attendingContainer">
          <Attending />
        </div>
      </div>
    )
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(tripContainer);
