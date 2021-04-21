import React from 'react'
import { useHistory } from 'react-router-dom'
import { backArrow } from '../../images'

import './styles.css'

const PetSelect = (props) => {
  let history = useHistory()
  const {
    name,
    species,
    breed,
    birthDate,
    notes,
    profilePicture,
  } = history.location.state
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
      <h3 className='events_title'>EVENTS</h3>
      <p>{species}</p>
      <p>{birthDate}</p>
      <p>{breed}</p>
      <p>{notes}</p>
    </div>
  )
}

export default PetSelect
