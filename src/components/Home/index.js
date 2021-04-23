import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useUser } from '../../context/UserContext'
import db from '../../mock-data'
import PetList from '../PetList'
import { gearOption, plus } from '../../images'
import './styles.css'

const Home = () => {
  let history = useHistory()
  const { userName, pets, getUser, loading } = useUser()
  const { currentUser } = useAuth()

  const handleAdd = () => {
    history.push('/add')
  }
  const handleOptions = () => {
    history.push('/options')
  }

  useEffect(() => {
    getUser(currentUser.uid)
  }, [currentUser.uid, getUser])

  if (loading) {
    return <div style={{ color: 'red' }}>LOADING</div>
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
        {/* {pets && pets.length === 0 ? (
          <p>Start creating a new pet</p>
        ) : (
          pets.map((pet, i) => <PetList key={i} pet={pet} />)
        )} */}
        {db && db.pets.map((pet, i) => <PetList key={i} pet={pet} />)}
      </div>
    </div>
  )
}

export default Home
