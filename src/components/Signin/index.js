import React from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'

const Signin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const onSubmit = (data) => console.log(data)

  return (
    <div className='sign_container '>
      <p className='peke'>PEKE</p>
      <p className='sign_title'>Login</p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='input_container'>
          <label className='input_title' htmlFor='email'>
            YOUR EMAIL
          </label>
          <input
            id='email'
            type='text'
            placeholder='Email'
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
            <button className='sign_button' id='signin' type='submit'>
              Sign In
            </button>
          </label>
        </div>
      </form>
      <div className='redirect_sign'>
        Don't have an account?
        <Link className='sign_link' to='/signup'>
          Register
        </Link>
      </div>
    </div>
  )
}

export default Signin
