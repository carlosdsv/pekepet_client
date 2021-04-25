import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useUser } from '../../context/UserContext'
import PetList from '../PetList'
import Loading from '../Loading'
import { gearOption, plus } from '../../images'
import './styles.css'

const Home = () => {
  let history = useHistory()
  const { userName, pets, getUser, loading, getPets } = useUser()
  const { currentUser } = useAuth()
  const language = window.navigator.language

  const handleAdd = () => {
    history.push('/add')
  }
  const handleOptions = () => {
    history.push('/options')
  }
  useEffect(() => {
    getUser(currentUser.uid)
    getPets(currentUser.uid)
  }, [])

  if (loading) {
    return <Loading />
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
          <h1>
            {language === 'en-US' || language === 'en' ? 'WELCOME,' : 'HOLA,'}
          </h1>
          <h1>{userName && userName.toLocaleUpperCase()}</h1>
        </div>
        <div className='new_button' onClick={handleAdd}>
          <img src={plus} alt='plus' />
        </div>
      </div>
      <div className='pet_list_container'>
        {pets && pets.length === 0 ? (
          <p>
            {language === 'en-US' || language === 'en'
              ? 'Start creating a new pet.'
              : 'Comienza creando una mascota.'}
          </p>
        ) : (
          pets.map((pet, i) => <PetList key={i} pet={pet} />)
        )}
      </div>
    </div>
  )
}

export default Home
