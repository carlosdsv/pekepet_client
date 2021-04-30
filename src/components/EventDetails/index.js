import React from 'react'
import { useHistory } from 'react-router-dom'
import { backArrow, dog, pills, seringe } from '../../images'
import './styles.css'

const EventDetails = () => {
  let history = useHistory()
  const { event, pet } = history.location.state
  const language = window.navigator.language
  const iconSelector = (type) => {
    if (type === 'other') {
      return dog
    }
    if (type === 'deworm') {
      return pills
    }
    if (type === 'vaccine') {
      return seringe
    }
  }

  const handleBack = () => {
    history.goBack()
  }

  return (
    <div className='event_details_container'>
      <img
        onClick={handleBack}
        className='back_arrow'
        src={backArrow}
        alt='back arrow'
      />
      <div className='pet_select_card'>
        <img
          className='selected_pet_picture'
          src={pet.profilePicture}
          alt={pet.name}
        />
        <h1 className='pet_name_title'>{pet.name}</h1>
      </div>

      <h2 className='event_details_title '>
        {language === 'en-US' || language === 'en'
          ? 'EVENT DETAILS'
          : 'DETALLE DEL EVENTO'}
      </h2>

      {event.upcoming && (
        <p className='event_upcoming_text'>
          {language === 'en-US' || language === 'en' ? 'UPCOMMING' : 'PRÓXIMO'}
        </p>
      )}

      <div className='input_container'>
        <p className='input_title'>
          {language === 'en-US' || language === 'en' ? 'TYPE' : 'TIPO'}
        </p>
        <img
          className='event_icon'
          src={iconSelector(event.type)}
          alt={event.type}
        />
      </div>

      <div className='input_container'>
        <p className='input_title'>
          {language === 'en-US' || language === 'en'
            ? 'DESCRIPTION'
            : 'DESCRIPCIÓN'}
        </p>
        <p className='event_details_text'>{event.description}</p>
      </div>

      <div className='input_container'>
        <p className='input_title'>
          {language === 'en-US' || language === 'en' ? 'DATE' : 'FECHA'}
        </p>
        <p className='event_details_text'>{event.date}</p>
      </div>

      {event.notes && (
        <div className='input_container'>
          <p className='input_title'>
            {language === 'en-US' || language === 'en'
              ? 'ADITIONAL NOTES'
              : 'NOTAS ADICIONALES'}
          </p>
          <p className='event_details_text'>{event.notes}</p>
        </div>
      )}
    </div>
  )
}

export default EventDetails
