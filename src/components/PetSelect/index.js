import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { backArrow, plus } from '../../images'
import db from '../../mock-data'
import EventCard from '../EventCard'
import './styles.css'

const PetSelect = () => {
  let history = useHistory()
  const pet = history.location.state
  const [selected, setSelected] = useState('recent')

  const handleSelect = (selectEvent) => {
    setSelected(selectEvent)
  }
  const handleBack = () => {
    history.push('/')
  }
  const handlePetDetails = () => {
    history.push('/petdetails', pet)
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
        <img
          className='selected_pet_picture'
          src={pet.profilePicture}
          alt={pet.name}
          onClick={handlePetDetails}
        />
        <h1 className='welcome_text'>{pet.name}</h1>
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
      <div className='list_events_card'>
        {db.events[pet.name] &&
          db.events[pet.name][selected].map((event) => {
            return <EventCard event={event} />
          })}
      </div>
      <img className='add_event' src={plus} alt='add event' />
    </div>
  )
}

export default PetSelect
