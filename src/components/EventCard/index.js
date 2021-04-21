import React from 'react'
import './styles.css'
import { dog, pills, seringe } from '../../images'

const EventCard = ({ event }) => {
  const styleSelector = (type, selector) => {
    if (type === 'other') {
      if (selector === 'icon') {
        return dog
      }
      if (selector === 'color') {
        return '--pink'
      }
    }
    if (type === 'deworm') {
      if (selector === 'icon') {
        return pills
      }
      if (selector === 'color') {
        return '--green'
      }
    }
    if (type === 'vaccine') {
      if (selector === 'icon') {
        return seringe
      }
      if (selector === 'color') {
        return '--orange'
      }
    }
  }

  return (
    <div className='event_container'>
      <div className='event_container_left'>
        <img
          className='event_container_image'
          src={styleSelector(event.type, 'icon')}
          alt={event.type}
        />
        <p className='event_container_description'>{event.description}</p>
      </div>
      <p
        className='event_container_date'
        style={{ color: `var(${styleSelector(event.type, 'color')})` }}
      >
        {event.date}
      </p>
    </div>
  )
}

export default EventCard
