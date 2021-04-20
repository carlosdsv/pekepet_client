import React from 'react'
import { useHistory } from 'react-router-dom'
import './styles.css'
import db from '../../mock-data.js'
import PetList from '../PetList'

const Home = () => {
  let history = useHistory()
  const handleAdd = () => {
    history.push('/add')
  }
  return (
    <div className='container'>
      <p className='peke'>PEKE</p>
      <div className='welcome'>
        <div>
          <p className='welcome_text'>WELCOME,</p>
          <p className='welcome_text'>{db.name.toLocaleUpperCase()}</p>
        </div>
        <div className='new_button' onClick={handleAdd}>
          <p>ADD</p>
        </div>
      </div>
      <div className='pet_list_container'>
        {db && db.pets.map((pet) => <PetList pet={pet} />)}
      </div>
    </div>
  )
}

export default Home
