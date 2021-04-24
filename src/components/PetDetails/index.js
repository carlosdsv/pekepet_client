import React from 'react'
import { useHistory } from 'react-router-dom'
import { backArrow } from '../../images'
import './styles.css'

const PetDetails = () => {
  let history = useHistory()
  const pet = history.location.state

  const handleBack = () => {
    history.goBack()
  }

  return (
    <div className='pet_add_container'>
      <img
        onClick={handleBack}
        className='back_arrow'
        src={backArrow}
        alt={backArrow}
      />
      <img
        className='pet_details_picture'
        src={pet.profilePicture}
        alt={pet.name}
      />

      <h2 className='create_new_pet_title'>PET DETAILS</h2>
      <div className='input_container'>
        <p className='input_title' htmlFor='name'>
          NAME
        </p>
        <p className='pet_details_text'>{pet.name}</p>
      </div>

      <div className='input_container'>
        <p className='input_title' htmlFor='species'>
          SPECIES
        </p>
        <p className='pet_details_text'>{pet.species}</p>
      </div>

      <div className='input_container'>
        <p className='input_title' htmlFor='breed'>
          BREED
        </p>
        <p className='pet_details_text'>{pet.breed}</p>
      </div>

      <div className='input_container'>
        <p className='input_title' htmlFor='birthDate'>
          BIRTHDATE
        </p>
        <p className='pet_details_text'>{pet.birthDate}</p>
      </div>

      <div className='input_container'>
        <p className='input_title' htmlFor='notes'>
          ADITIONAL NOTES
        </p>
        <p className='pet_details_text'>{pet.notes}</p>
      </div>
    </div>
  )
}

export default PetDetails
