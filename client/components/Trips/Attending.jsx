import React from 'react'
import Attendee from './Attendee.jsx'
import Paper from '@material-ui/core/Paper';

export default function Attending() {
  let attendees = [];

  for(let i = 1; i < 10; i++) {
    attendees.push(<Attendee key={`attendee${i}`} name={i}/>)
  }

  return (
    <div>
      <h3>
        Attending
      </h3>
      <div className="attendeesList">
        { attendees }
      </div>
    </div>
  )
}