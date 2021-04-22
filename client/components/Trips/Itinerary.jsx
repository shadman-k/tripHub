import React from 'react';
import Item from './Item.jsx'
import AddNewStop from './AddNewStop.jsx'

export default function Itinerary(props) {
  const { modalState, modalToggle, stops, submitNewStop } = props

  const myStops = stops.map((el, i) => {
    console.log('CHECK THIS NOW: ', el);
    return <Item name={el.stop_name} dest={el.destination} key={`Item${i}`}/>
  })
  console.log('STOPS: ', stops);
  return (
    <div>
      <div className="itinTitle">
        <h3>
          Itinerary
        </h3>
        <AddNewStop modalState={modalState} modalToggle={modalToggle} submitNewStop={submitNewStop}/>
      </div>
      <div className="items">
        { myStops }
      </div>
    </div>
  )
}