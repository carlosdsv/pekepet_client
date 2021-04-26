import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useUser } from '../../context/UserContext'
import { backArrow, plus } from '../../images'
import EventCard from '../EventCard'
import Loading from '../Loading'

import './styles.css'

const PetSelect = () => {
  let history = useHistory()
  const pet = history.location.state
  const { events, loading, setLoading, getEvents } = useUser()
  const [selected, setSelected] = useState('recent')

  useEffect(() => {
    setLoading(true)
    getEvents(pet.petId)
    setLoading(false)
  }, [])

  const handleSelect = (selectEvent) => {
    setSelected(selectEvent)
  }
  const handleBack = () => {
    history.push('/')
  }
  const handlePetDetails = () => {
    history.push('/pet-details', pet)
  }
  const handleCreateEvent = () => {
    history.push('/create-event', pet)
  }
  if (loading) {
    return <Loading />
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
        <div onClick={() => handleSelect('upcoming')}>
          <p
            className={
              selected === 'upcoming'
                ? 'events_options_selected'
                : 'events_options_not_selected'
            }
          >
            Upcoming
          </p>
        </div>
      </div>
      <div className='list_events_card'>
        {events &&
          Object.values(events).map((event) => {
            if (selected === 'recent' && event.upcoming === false) {
              return <EventCard event={event} />
            } else if (selected === 'upcoming' && event.upcoming === true) {
              return <EventCard event={event} />
            }
            return null
          })}
      </div>
      <img
        onClick={handleCreateEvent}
        className='add_event'
        src={plus}
        alt='add event'
      />
    </div>
  )
}

export default PetSelect
