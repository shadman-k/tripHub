import React from 'react';

export default function Attendee(props) {
  return (
    <div className="attendee">
      <img src="https://moonvillageassociation.org/wp-content/uploads/2018/06/default-profile-picture1.jpg" className="profile-pic" />
      Person {props.name}
    </div>
  )
}