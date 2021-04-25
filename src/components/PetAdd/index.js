import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useAuth } from '../../context/AuthContext'
import { useUser } from '../../context/UserContext'
import { backArrow } from '../../images'
import Loading from '../Loading'
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
  const [species, setSpecies] = useState('')
  let history = useHistory()
  const language = window.navigator.language
  const [date, setDate] = useState('')

  const handleBack = () => {
    history.goBack()
  }
  const handleInputDate = (e) => {
    setDate(e.target.value)
  }
  const handleSpeciesSelect = (e) => {
    setSpecies(e.target.value)
  }
  console.log(species)
  const onSubmit = async (data) => {
    try {
      setError('')
      setLoading(true)
      const req = {
        uid: currentUser.uid,
        name: data.name,
        species: species,
        breed: data.breed,
        birthDate: date,
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

  if (loading) return <Loading />

  return (
    <div className='pet_add_container'>
      <img
        onClick={handleBack}
        className='back_arrow'
        src={backArrow}
        alt={backArrow}
      />
      <img
        className='pet_details_picture'
        src='https://images.unsplash.com/photo-1570566998157-0df9e6f8d5f1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=675&q=80'
        alt='pet'
      />

      <h2 className='create_new_pet_title'>
        {language === 'en-US' || language === 'en'
          ? 'CREATE PET'
          : 'CREAR MASCOTA'}
      </h2>
      {error && <span role='alert'>{error}</span>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='input_container'>
          <label className='input_title' htmlFor='name'>
            {language === 'en-US' || language === 'en' ? 'NAME' : 'NOMBRE'}
          </label>
          <input
            id='name'
            type='text'
            placeholder={
              language === 'en-US' || language === 'en'
                ? 'pet name'
                : 'nombre de la mascota'
            }
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
            {language === 'en-US' || language === 'en' ? 'SPECIES' : 'ESPECIE'}
          </label>
          <select
            id='species'
            value={species}
            onChange={handleSpeciesSelect}
            required
          >
            <option value=''>
              {language === 'en-US' || language === 'en'
                ? '--select--'
                : '--seleccionar--'}
            </option>

            <option
              value={
                language === 'en-US' || language === 'en' ? 'dog' : 'perro'
              }
            >
              {language === 'en-US' || language === 'en' ? 'dog' : 'perro'}
            </option>
            <option
              value={language === 'en-US' || language === 'en' ? 'cat' : 'gato'}
            >
              {language === 'en-US' || language === 'en' ? 'cat' : 'gato'}
            </option>
            <option
              value={language === 'en-US' || language === 'en' ? 'fish' : 'pez'}
            >
              {language === 'en-US' || language === 'en' ? 'fish' : 'pez'}
            </option>
          </select>
        </div>

        <div className='input_container'>
          <label className='input_title' htmlFor='breed'>
            {language === 'en-US' || language === 'en' ? 'BREED' : 'RAZA'}
          </label>
          <input
            id='breed'
            type='text'
            placeholder={
              language === 'en-US' || language === 'en'
                ? 'pet breed'
                : 'raza de la mascota'
            }
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
            {language === 'en-US' || language === 'en'
              ? 'BIRTHDATE'
              : 'FECHA NACIMIENTO'}
          </label>
          <input
            onChange={handleInputDate}
            id='birthDate'
            type='date'
            required
            value={date}
          />
        </div>

        <div className='input_container'>
          <label className='input_title' htmlFor='notes'>
            {language === 'en-US' || language === 'en'
              ? 'ADITIONAL NOTES'
              : 'NOTAS ADICIONALES'}
          </label>
          <input
            id='notes'
            type='text'
            placeholder={
              language === 'en-US' || language === 'en'
                ? 'e.g. weight, alergies...'
                : 'ej. peso, alergias...'
            }
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
              {language === 'en-US' || language === 'en' ? 'SAVE' : 'GUARDAR'}
            </button>
          </label>
        </div>
      </form>
    </div>
  )
}

export default PetAdd
