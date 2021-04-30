import React, { createContext, useContext, useState } from 'react'
import apiServer from '../api/apiServer'

const UserContext = createContext()

export function useUser() {
  return useContext(UserContext)
}

export function UserProvider({ children }) {
  const [userName, setUserName] = useState('')
  const [pets, setPets] = useState([])
  const [events, setEvents] = useState(null)
  const [loading, setLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  const createEvent = async (eventData) => {
    try {
      await apiServer.post('/create-event', eventData)
    } catch (error) {
      setErrorMessage(error.message)
    }
  }

  const createUser = async (name, uid) => {
    try {
      await apiServer.post('/create-user', { uid, name })
      setUserName({ name })
    } catch (error) {
      setErrorMessage(error.message)
    }
  }

  const createPet = async (petData) => {
    try {
      await apiServer.post('/create-pet', petData)
    } catch (error) {
      setErrorMessage(error.message)
    }
  }

  const getEvents = async (petId) => {
    try {
      const response = await apiServer.post('/get-events', { petId })
      setEvents(response.data)
    } catch (error) {
      setErrorMessage(error.message)
    }
    setLoading(false)
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
    events,
    setEvents,
    userName,
    setUserName,
    pets,
    setPets,
    errorMessage,
    loading,
    setLoading,
    createEvent,
    createPet,
    createUser,
    getEvents,
    getPets,
    getUser,
  }

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}
