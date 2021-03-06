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
  const { events, setEvents, loading, setLoading, getEvents } = useUser()
  const [selected, setSelected] = useState('recent')
  const language = window.navigator.language
  useEffect(() => {
    getEvents(pet.petId)
    setLoading(false)
    // eslint-disable-next-line
  }, [])
  const emptyEvents = (
    <p>
      {language === 'en-US' || language === 'en'
        ? 'Start creating new event'
        : 'Comienza creando un evento'}
    </p>
  )
  const handleSelect = (selectEvent) => {
    setSelected(selectEvent)
  }
  const handleBack = () => {
    setEvents(null)
    history.push('/')
  }
  const handlePetDetails = () => {
    history.push('/pet-details', pet)
  }
  const handleCreateEvent = () => {
    history.push('/create-event', pet)
  }
  const generateKey = (pre) => {
    return `${pre}_${new Date().getTime()}`
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
        <h1 className='pet_name_title'>{pet.name}</h1>
      </div>
      <h1 className='events_title'>
        {language === 'en-US' || language === 'en' ? 'EVENTS' : 'EVENTOS'}
      </h1>
      <div className='events_options'>
        <div onClick={() => handleSelect('recent')}>
          <p
            className={
              selected === 'recent'
                ? 'events_options_selected'
                : 'events_options_not_selected'
            }
          >
            {language === 'en-US' || language === 'en' ? 'Recent' : 'Recientes'}
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
            {language === 'en-US' || language === 'en'
              ? 'Upcoming'
              : 'Pr??ximos'}
          </p>
        </div>
      </div>
      <div className='list_events_card'>
        {!events && loading ? <p>Loading events</p> : null}
        {events !== null && events.length === 0 && !loading
          ? emptyEvents
          : null}

        {events &&
          Object.values(events).map((event) => {
            if (selected === 'recent' && event.upcoming === false) {
              return (
                <EventCard
                  event={event}
                  pet={pet}
                  key={generateKey(event.description)}
                />
              )
            } else if (selected === 'upcoming' && event.upcoming === true) {
              return (
                <EventCard
                  event={event}
                  pet={pet}
                  key={generateKey(event.description)}
                />
              )
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
