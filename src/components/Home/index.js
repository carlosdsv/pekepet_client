import React from 'react'
import { useHistory } from 'react-router-dom'
import './styles.css'
import db from '../../mock-data.js'
import PetList from '../PetList'
import { menu, plus } from '../../images'

const Home = () => {
  let history = useHistory()
  const handleAdd = () => {
    history.push('/add')
  }

  return (
    <div className='container'>
      <div className='menu'>
        <img src={menu} alt='menu' />
      </div>
      <p className='peke'>PEKE</p>
      <div className='welcome'>
        <div>
          <h1>WELCOME,</h1>
          <h1>{db.name.toLocaleUpperCase()}</h1>
        </div>
        <div className='new_button' onClick={handleAdd}>
          <img src={plus} alt='plus' />
        </div>
      </div>
      <div className='pet_list_container'>
        {db && db.pets.map((pet, i) => <PetList key={i} pet={pet} />)}
      </div>
    </div>
  )
}

export default Home
