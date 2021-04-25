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

  const language = window.navigator.language

  const onSubmit = async (data) => {
    try {
      setError('')
      setLoading(true)
      await signup(data.email, data.password)
      history.push('/user-name')
    } catch (err) {
      setError(err.message)
    }
    setLoading(false)
  }

  return (
    <div className='sign_container '>
      <p className='peke'>PEKE</p>
      {language === 'en-US' || language === 'en' ? (
        <p className='sign_title'>Sign Up</p>
      ) : (
        <p className='sign_title'>Regístrate</p>
      )}
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
            <span role='alert'>
              {language === 'en-US' || language === 'en'
                ? 'Email is required.'
                : 'Se requiere un email'}
            </span>
          )}
          {errors.email && errors.email.type === 'pattern' && (
            <span role='alert'>
              {language === 'en-US' || language === 'en'
                ? 'Email is not valid.'
                : 'Email no es válido'}
            </span>
          )}
        </div>

        <div className='input_container'>
          <label className='input_title' htmlFor='password'>
            <label className='input_title' htmlFor='email'>
              {language === 'en-US' || language === 'en'
                ? 'YOUR PASSWORD'
                : 'TU CLAVE'}
            </label>
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
            <span role='alert'>
              {language === 'en-US' || language === 'en'
                ? 'Password is required.'
                : 'Se requiere una clave'}
            </span>
          )}
          {errors.password && errors.password.type === 'minLength' && (
            <span role='alert'>
              {language === 'en-US' || language === 'en'
                ? 'Password must have at least 6 characters.'
                : 'La clave debe tener al menos 6 caracteres'}
            </span>
          )}
        </div>

        <div className='input_container'>
          <label className='input_title' htmlFor='confirm_password'>
            {language === 'en-US' || language === 'en'
              ? 'CONFIRM PASSWORD'
              : 'CONFIRMAR CLAVE'}
          </label>
          <input
            id='confirm_password'
            type='password'
            placeholder={
              language === 'en-US' || language === 'en'
                ? 'repeat password'
                : 'repetir clave'
            }
            autoComplete='off'
            autoCapitalize='off'
            aria-invalid={errors.confirm_password ? 'true' : 'false'}
            {...register('confirm_password', {
              validate: (value) => value === password.current,
            })}
          />
          {errors.confirm_password &&
            errors.confirm_password.type === 'validate' && (
              <span role='alert'>
                {language === 'en-US' || language === 'en'
                  ? 'The passwords do not match.'
                  : 'Las claves no son iguales'}
              </span>
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
              {language === 'en-US' || language === 'en'
                ? 'Sign Up'
                : 'Registrarse'}
            </button>
          </label>
        </div>
      </form>
      <div className='redirect_sign'>
        <p className='redirect_sign_text'>
          {language === 'en-US' || language === 'en'
            ? 'Already have an account?'
            : 'Ya tienes cuenta?'}
        </p>
        <Link className='sign_link' to='/signin'>
          {language === 'en-US' || language === 'en'
            ? 'Log in'
            : 'Iniciar sesion'}
        </Link>
      </div>
    </div>
  )
}

export default Signup
