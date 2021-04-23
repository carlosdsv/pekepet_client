import React, { useRef, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useAuth } from '../../context/AuthContext'
import './styles.css'

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm()
  const password = useRef({})
  password.current = watch('password', '')
  const { signup } = useAuth()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  const onSubmit = async (data) => {
    try {
      setError('')
      setLoading(true)
      await signup(data.email, data.password)
      history.push('/')
    } catch (err) {
      setError(err.message)
    }
    setLoading(false)
  }

  return (
    <div className='sign_container '>
      <p className='peke'>PEKE</p>
      <p className='sign_title'>Sign Up</p>
      {error && <span role='alert'>{error}</span>}
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

        <div className='input_container'>
          <label className='input_title' htmlFor='password'>
            YOUR PASSWORD
          </label>
          <input
            id='password'
            type='password'
            placeholder='Password'
            autoComplete='off'
            autoCapitalize='off'
            aria-invalid={errors.password ? 'true' : 'false'}
            {...register('password', {
              required: true,
              minLength: 6,
            })}
          />
          {errors.password && errors.password.type === 'required' && (
            <span role='alert'>Password is required.</span>
          )}
          {errors.password && errors.password.type === 'minLength' && (
            <span role='alert'>Password must have at least 6 characters.</span>
          )}
        </div>

        <div className='input_container'>
          <label className='input_title' htmlFor='confirm_password'>
            CONFIRM PASSWORD
          </label>
          <input
            id='confirm_password'
            type='password'
            placeholder='Repeat Password'
            autoComplete='off'
            autoCapitalize='off'
            aria-invalid={errors.confirm_password ? 'true' : 'false'}
            {...register('confirm_password', {
              validate: (value) => value === password.current,
            })}
          />
          {errors.confirm_password &&
            errors.confirm_password.type === 'validate' && (
              <span role='alert'>The passwords do not match</span>
            )}
        </div>

        <div>
          <label htmlFor='signup'>
            <button
              disabled={loading}
              className='sign_button'
              id='signup'
              type='submit'
            >
              Sign Up
            </button>
          </label>
        </div>
      </form>
      <div className='redirect_sign'>
        Already have an account?
        <Link className='sign_link' to='/signin'>
          Login
        </Link>
      </div>
    </div>
  )
}

export default Signup
