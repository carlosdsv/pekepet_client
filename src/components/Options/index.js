import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { backArrow } from '../../images'
import './styles.css'

const Options = () => {
  const { logout } = useAuth()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  const handleLogout = async (data) => {
    try {
      setError('')
      setLoading(true)
      await logout()
      history.push('/')
    } catch (err) {
      setError(err.message)
    }
    setLoading(false)
  }
  const handleBack = () => {
    history.goBack()
  }

  return (
    <div className='options_container '>
      <img
        onClick={handleBack}
        className='back_arrow'
        src={backArrow}
        alt={backArrow}
      />
      {error && <span role='alert'>{error}</span>}
      <button
        onClick={handleLogout}
        disabled={loading}
        className='signout_button'
        type='submit'
      >
        Sign Out
      </button>
    </div>
  )
}

export default Options
