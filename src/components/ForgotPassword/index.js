import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useAuth } from '../../context/AuthContext'

const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const { resetPassword } = useAuth()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const onSubmit = async (data) => {
    try {
      setMessage('')
      setError('')
      setLoading(true)
      await resetPassword(data.email)
      setMessage('Check your email for further instructions')
    } catch (err) {
      setError(err.message)
    }
    setLoading(false)
  }

  return (
    <div className='sign_container '>
      <p className='peke'>PEKE</p>
      <p className='sign_title'>Reset Password</p>
      {error && <span role='alert'>{error}</span>}
      {message && <span role='alert'>{message}</span>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='input_container'>
          <label className='input_title' htmlFor='email'>
            YOUR EMAIL
          </label>
          <input
            id='email'
            type='text'
            placeholder='Email'
            autoComplete='off'
            autoCapitalize='off'
            aria-invalid={errors.email ? 'true' : 'false'}
            {...register('email', {
              required: true,
              pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
            })}
          />
          {errors.email && errors.email.type === 'required' && (
            <span role='alert'>Email is required.</span>
          )}
          {errors.email && errors.email.type === 'pattern' && (
            <span role='alert'>Email is not valid.</span>
          )}
        </div>

        <div>
          <label htmlFor='signin'>
            <button
              disabled={loading}
              className='sign_button'
              id='signin'
              type='submit'
            >
              Reset Password
            </button>
          </label>
        </div>
      </form>
      <div className='redirect_sign'>
        <p className='redirect_sign_text'>Don't have an account?</p>

        <Link className='sign_link' to='/signup'>
          Register
        </Link>
      </div>
      <div className='redirect_sign'>
        <Link className='sign_link' to='/signin'>
          Log In
        </Link>
      </div>
    </div>
  )
}

export default ForgotPassword
