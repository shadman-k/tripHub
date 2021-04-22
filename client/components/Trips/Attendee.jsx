import React from 'react';

export default function Attendee(props) {
  console.log('attendee: ', props.name)

  return (
    <div className="attendee">
      <img src="https://moonvillageassociation.org/wp-content/uploads/2018/06/default-profile-picture1.jpg" className="profile-pic" />
      {props.name}
    </div>
  )
}