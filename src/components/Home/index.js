import React from 'react'
import { useHistory } from 'react-router-dom'
import { useUser } from '../../context/UserContext'
import PetList from '../PetList'
import { gearOption, plus } from '../../images'
import './styles.css'

const Home = () => {
  let history = useHistory()
  const { userName, pets } = useUser()

  const handleAdd = () => {
    history.push('/add')
  }
  const handleOptions = () => {
    history.push('/options')
  }

  return (
    <div className='container'>
      <div>
        <img
          onClick={handleOptions}
          className='menu'
          src={gearOption}
          alt='options'
        />
      </div>
      <p className='peke'>PEKE</p>
      <div className='welcome'>
        <div>
          <h1>WELCOME,</h1>
          <h1>{userName && userName.toLocaleUpperCase()}</h1>
        </div>
        <div className='new_button' onClick={handleAdd}>
          <img src={plus} alt='plus' />
        </div>
      </div>
      <div className='pet_list_container'>
        {pets && pets.length === 0 ? (
          <p>Start creating a new pet</p>
        ) : (
          pets.pets.map((pet, i) => <PetList key={i} pet={pet} />)
        )}
      </div>
    </div>
  )
}

export default Home
