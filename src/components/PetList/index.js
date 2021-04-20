import React from 'react'
import { useHistory } from 'react-router-dom'
import './styles.css'

const PetList = ({ pet }) => {
  let history = useHistory()

  const handleSelect = () => {
    history.push('/petselect')
  }
  return (
    <div className='pet_list_card' onClick={handleSelect}>
      <img className='pet_picture' src={pet.profilePicture} alt={pet.name} />
      <div className='pet_card'>
        <p className='pet_card_name'>{pet.name}</p>
        <p className='pet_card_birthDate'>{pet.birthDate}</p>
      </div>
    </div>
  )
}

export default PetList
