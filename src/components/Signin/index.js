import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useAuth } from '../../context/AuthContext'

const Signin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const { signin } = useAuth()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const history = useHistory()
  const language = window.navigator.language

  const onSubmit = async (data) => {
    try {
      setError('')
      setLoading(true)
      await signin(data.email, data.password)
      history.push('/')
    } catch (err) {
      setError(err.message)
    }
    setLoading(false)
  }

  return (
    <div className='sign_container '>
      <p className='peke'>PEKE</p>
      <p className='sign_title'>
        {language === 'en-US' || language === 'en' ? 'Login' : 'Iniciar Sesión'}
      </p>
      {error && <span role='alert'>{error}</span>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='input_container'>
          <label className='input_title' htmlFor='email'>
            {language === 'en-US' || language === 'en'
              ? 'YOUR EMAIL'
              : 'TU EMAIL'}
          </label>
          <input
            id='email'
            type='text'
            placeholder='email'
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
            {language === 'en-US' || language === 'en'
              ? 'YOUR PASSWORD'
              : 'TU CLAVE'}
          </label>
          <input
            id='password'
            type='password'
            placeholder={
              language === 'en-US' || language === 'en' ? 'password' : 'clave'
            }
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

        <div>
          <label htmlFor='signin'>
            <button
              disabled={loading}
              className='sign_button'
              id='signin'
              type='submit'
            >
              {language === 'en-US' || language === 'en'
                ? 'Sign In'
                : 'Iniciar Sesión'}
            </button>
          </label>
        </div>
      </form>
      <div className='redirect_sign'>
        <p className='redirect_sign_text'>
          {language === 'en-US' || language === 'en'
            ? "Don't have an account?"
            : 'No tienes cuenta?'}
        </p>

        <Link className='sign_link' to='/signup'>
          {language === 'en-US' || language === 'en'
            ? 'Register'
            : 'Regístrate'}
        </Link>
      </div>
      <div className='redirect_sign'>
        <Link className='sign_link' to='/forgot-password'>
          {language === 'en-US' || language === 'en'
            ? 'Forgot your password?'
            : 'Olvidaste tu clave?'}
        </Link>
      </div>
    </div>
  )
}

export default Signin
