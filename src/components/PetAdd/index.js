import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useAuth } from '../../context/AuthContext'
import { useUser } from '../../context/UserContext'
import { backArrow } from '../../images'
import './styles.css'

const PetAdd = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const { currentUser } = useAuth()
  const { createPet } = useUser()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  let history = useHistory()

  const handleBack = () => {
    history.goBack()
  }

  const onSubmit = async (data) => {
    try {
      setError('')
      setLoading(true)
      const req = {
        uid: currentUser.uid,
        name: data.name,
        species: data.species,
        breed: data.breed,
        birthDate: data.birthDate,
        notes: data.notes,
        profilePicture:
          'https://images.unsplash.com/photo-1570566998157-0df9e6f8d5f1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=675&q=80',
      }
      await createPet(req)
      history.push('/')
    } catch (err) {
      setError(err.message)
    }
    setLoading(false)
  }

  return (
    <div className='pet_add_container'>
      <img
        onClick={handleBack}
        className='back_arrow'
        src={backArrow}
        alt={backArrow}
      />
      <div className='picture_container'>Select Picture</div>

      <h2 className='create_new_pet_title'>CREATE NEW PET</h2>
      {error && <span role='alert'>{error}</span>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='input_container'>
          <label className='input_title' htmlFor='name'>
            NAME
          </label>
          <input
            id='name'
            type='text'
            placeholder='Pet Name'
            autoComplete='off'
            autoCapitalize='off'
            aria-invalid={errors.name ? 'true' : 'false'}
            {...register('name', {
              required: true,
            })}
          />
          {errors.name && errors.name.type === 'required' && (
            <span role='alert'>Pet name is required.</span>
          )}
        </div>

        <div className='input_container'>
          <label className='input_title' htmlFor='species'>
            SPECIES
          </label>
          <input
            id='species'
            type='text'
            placeholder='Pet Species'
            autoComplete='off'
            autoCapitalize='off'
            aria-invalid={errors.species ? 'true' : 'false'}
            {...register('species', {
              required: true,
            })}
          />
          {errors.species && errors.species.type === 'required' && (
            <span role='alert'>Pet species is required.</span>
          )}
        </div>

        <div className='input_container'>
          <label className='input_title' htmlFor='breed'>
            BREED
          </label>
          <input
            id='breed'
            type='text'
            placeholder='Pet Breed'
            autoComplete='off'
            autoCapitalize='off'
            aria-invalid={errors.breed ? 'true' : 'false'}
            {...register('breed', {
              required: true,
            })}
          />
          {errors.breed && errors.breed.type === 'required' && (
            <span role='alert'>Pet breed is required.</span>
          )}
        </div>

        <div className='input_container'>
          <label className='input_title' htmlFor='birthDate'>
            BIRTHDATE
          </label>
          <input
            id='birthDate'
            type='text'
            placeholder='Pet Birthdate'
            autoComplete='off'
            autoCapitalize='off'
            aria-invalid={errors.birthDate ? 'true' : 'false'}
            {...register('birthDate', {
              required: true,
            })}
          />
          {errors.birthDate && errors.birthDate.type === 'required' && (
            <span role='alert'>Pet birthDate is required.</span>
          )}
        </div>

        <div className='input_container'>
          <label className='input_title' htmlFor='notes'>
            ADITIONAL NOTES
          </label>
          <input
            id='notes'
            type='text'
            placeholder='e.g. weight, alergies...'
            autoComplete='off'
            autoCapitalize='off'
            aria-invalid={errors.notes ? 'true' : 'false'}
            {...register('notes', {
              required: true,
            })}
          />
          {errors.notes && errors.notes.type === 'required' && (
            <span role='alert'>Pet notes is required.</span>
          )}
        </div>

        <div>
          <label htmlFor='save'>
            <button
              disabled={loading}
              className='sign_button'
              id='save'
              type='submit'
            >
              SAVE
            </button>
          </label>
        </div>
      </form>
    </div>
  )
}

export default PetAdd
