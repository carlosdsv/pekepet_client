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

  const capitalizeText = (text) => {
    if (typeof text !== 'string') return ''
    return text.charAt(0).toUpperCase() + text.slice(1)
  }

  return (
    <div className='event_container'>
      <div className='event_container_left'>
        <img
          className='event_container_image'
          src={styleSelector(event.type, 'icon')}
          alt={event.type}
        />
        <p className='event_container_description'>
          {capitalizeText(event.description)}
        </p>
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
