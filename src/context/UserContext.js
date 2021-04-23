import React, { createContext, useContext, useState } from 'react'
import apiServer from '../api/apiServer'

const UserContext = createContext()

export function useUser() {
  return useContext(UserContext)
}

export function UserProvider({ children }) {
  const [userName, setUserName] = useState()
  const [pets, setPets] = useState([])
  const [errorMessage, setErrorMessage] = useState('')

  const createUser = async (name, uid) => {
    try {
      const response = await apiServer.post('/create-user', { uid, name })
      setUserName({ name })
      console.log(response)
    } catch (error) {
      setErrorMessage(error.message)
    }
  }

  const value = {
    userName,
    setUserName,
    errorMessage,
    createUser,
    pets,
    setPets,
  }

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}
