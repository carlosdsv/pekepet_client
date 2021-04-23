import React from 'react'
import { useHistory } from 'react-router-dom'
import { backArrow } from '../../images'

import './styles.css'

const PetAdd = () => {
  let history = useHistory()

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
      <div className='picture_container'>Select Picture</div>

      <h2 className='create_new_pet_title'>CREATE NEW PET</h2>
    </div>
  )
}

export default PetAdd
