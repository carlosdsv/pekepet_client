import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { backArrow, plus } from '../../images'
import db from '../../mock-data'
import EventCard from '../EventCard'
import './styles.css'

const PetSelect = () => {
  let history = useHistory()
  const { name, profilePicture } = history.location.state
  const [selected, setSelected] = useState('recent')

  const handleSelect = (selectEvent) => {
    setSelected(selectEvent)
  }
  const handleBack = () => {
    history.goBack()
  }

  return (
    <div className='pet_select_container'>
      <img
        onClick={handleBack}
        className='back_arrow'
        src={backArrow}
        alt={backArrow}
      />
      <div className='pet_select_card'>
        <img className='selected_pet_picture' src={profilePicture} alt={name} />
        <h1 className='welcome_text'>{name}</h1>
      </div>
      <h1 className='events_title'>EVENTS</h1>
      <div className='events_options'>
        <div onClick={() => handleSelect('recent')}>
          <p
            className={
              selected === 'recent'
                ? 'events_options_selected'
                : 'events_options_not_selected'
            }
          >
            Recent
          </p>
        </div>
        <div onClick={() => handleSelect('upcomming')}>
          <p
            className={
              selected === 'upcomming'
                ? 'events_options_selected'
                : 'events_options_not_selected'
            }
          >
            Upcomming
          </p>
        </div>
      </div>
      {db &&
        db.events[name][selected].map((event) => {
          return <EventCard event={event} />
        })}
      <img className='add_event' src={plus} alt='add event' />
    </div>
  )
}

export default PetSelect
