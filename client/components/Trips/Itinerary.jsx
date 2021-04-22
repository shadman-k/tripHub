import React from 'react';
import Item from './Item.jsx'

export default function Itinerary() {
  let items = [];

  for(let i = 1; i < 10; i++) {
    items.push(<Item key={`item${i}`} item={i}/>)
  }

  return (
    <div>
      <h3>
        Itinerary
      </h3>
      <div className="items">
        { items }
      </div>
    </div>
  )
}