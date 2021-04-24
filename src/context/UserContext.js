import React, { createContext, useContext, useState } from 'react'
import apiServer from '../api/apiServer'

const UserContext = createContext()

export function useUser() {
  return useContext(UserContext)
}

export function UserProvider({ children }) {
  const [userName, setUserName] = useState('')
  const [pets, setPets] = useState([])
  const [loading, setLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  const createUser = async (name, uid) => {
    try {
      await apiServer.post('/create-user', { uid, name })
      setUserName({ name })
    } catch (error) {
      setErrorMessage(error.message)
    }
  }

  const createPet = async (req) => {
    const { uid, name, species, breed, birthDate, notes, profilePicture } = req
    try {
      const response = await apiServer.post('/create-pet', {
        uid,
        name,
        species,
        breed,
        birthDate,
        notes,
        profilePicture,
      })
      setPets(response.data.pets)
    } catch (error) {
      setErrorMessage(error.message)
    }
  }

  const getUser = async (uid) => {
    try {
      const response = await apiServer.post('/get-user', { uid })
      setUserName(response.data.name)
    } catch (error) {
      setErrorMessage(error.message)
    }
  }

  const getPets = async (uid) => {
    try {
      const response = await apiServer.post('/get-pets', { uid })
      setPets(response.data)
    } catch (error) {
      setErrorMessage(error.message)
    }
    setLoading(false)
  }

  const value = {
    userName,
    setUserName,
    pets,
    setPets,
    errorMessage,
    loading,
    createPet,
    createUser,
    getPets,
    getUser,
  }

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}
