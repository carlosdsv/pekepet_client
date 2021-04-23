import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useAuth } from '../../context/AuthContext'

import { useUser } from '../../context/UserContext'
import './styles.css'

const UserName = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const { currentUser } = useAuth()

  const { createUser, setUserName } = useUser()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  const onSubmit = async (data) => {
    try {
      setError('')
      setLoading(true)
      await createUser(data.name, currentUser.uid)
      setUserName(data.name)
      history.push('/')
    } catch (err) {
      setError(err.message)
    }
    setLoading(false)
  }

  return (
    <div className='sign_container '>
      <p className='peke'>PEKE</p>
      <p className='sign_title'>Name</p>
      {error && <span role='alert'>{error}</span>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='input_container'>
          <label className='input_title' htmlFor='name'>
            YOUR NAME
          </label>
          <input
            id='name'
            type='text'
            placeholder='First Name or Nickname'
            autoComplete='off'
            autoCapitalize='off'
            aria-invalid={errors.name ? 'true' : 'false'}
            {...register('name', {
              required: true,
            })}
          />
          {errors.name && errors.email.type === 'required' && (
            <span role='alert'>How should we call</span>
          )}
        </div>

        <div>
          <label htmlFor='continue'>
            <button
              disabled={loading}
              className='sign_button'
              id='continue'
              type='submit'
            >
              Continue
            </button>
          </label>
        </div>
      </form>
    </div>
  )
}

export default UserName
