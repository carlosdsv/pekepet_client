import React, { useState } from 'react'
import app from '../../firebase'
import { useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useAuth } from '../../context/AuthContext'
import { useUser } from '../../context/UserContext'
import { makeStyles } from '@material-ui/core/styles'
import { IconButton } from '@material-ui/core'
import PhotoCamera from '@material-ui/icons/PhotoCamera'
import { backArrow } from '../../images'
import Loading from '../Loading'
import './styles.css'

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: 'none',
  },
}))

const PetAdd = () => {
  const classes = useStyles()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const { currentUser } = useAuth()
  const { createPet } = useUser()
  const [loading, setLoading] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState('')
  const [species, setSpecies] = useState('')
  const [notes, setNotes] = useState('')
  const [fileURL, setFileURL] = useState('')
  let history = useHistory()
  const language = window.navigator.language
  const petId = Date.now().toString()

  const handleBack = () => {
    history.goBack()
  }

  const handleSpeciesSelect = (e) => {
    setSpecies(e.target.value)
  }

  const handleFile = async (e) => {
    setIsUploading(true)
    const bucketName = currentUser.uid
    const file = e.target.files[0]
    const storageRef = app.storage().ref()
    const petImagesRef = storageRef.child(`${bucketName}/${petId}`)
    await petImagesRef.put(file)
    petImagesRef.getDownloadURL().then((url) => setFileURL(url))
    setIsUploading(false)
  }

  const handleNotes = (e) => {
    setNotes(e.target.value)
  }

  const onSubmit = async (data) => {
    if (!fileURL) {
      language === 'en-US' || language === 'en'
        ? setError('Pet picture required')
        : setError('Se requiere foto de la mascota')
      return null
    }
    try {
      setError('')
      setLoading(true)
      const petData = {
        uid: currentUser.uid,
        petId: petId,
        name: data.name,
        species: species,
        breed: data.breed,
        birthDate: data.birthDate,
        notes: notes,
        profilePicture: fileURL,
      }
      await createPet(petData)
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
      {!fileURL ? (
        <div className='create_pet_picture'>
          <input
            required
            accept='image/*'
            className={classes.input}
            id='file'
            type='file'
            onChange={handleFile}
          />
          <label htmlFor='file'>
            <IconButton
              color='primary'
              aria-label='upload picture'
              component='span'
            >
              <PhotoCamera />
            </IconButton>
          </label>
        </div>
      ) : (
        <div
          className='create_pet_picture'
          style={{
            backgroundImage: `url(${fileURL})`,
            backgroundPosition: 'center',
            objectFit: 'cover',
            backgroundSize: 'cover',
          }}
        >
          <input
            required
            accept='image/*'
            className={classes.input}
            id='file'
            type='file'
            onChange={handleFile}
          />
          <label htmlFor='file'>
            <IconButton
              color='transparent'
              aria-label='upload picture'
              component='span'
            >
              <PhotoCamera />
            </IconButton>
          </label>
        </div>
      )}
      {isUploading && (
        <span className='uploading_picture' role='alert'>
          {language === 'en-US' || language === 'en'
            ? 'UPLOADING PICTURE'
            : 'CARGANDO IMAGEN'}
        </span>
      )}
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
            id='birthDate'
            type='date'
            aria-invalid={errors.birthDate ? 'true' : 'false'}
            {...register('birthDate', {
              required: true,
              validate: {
                validDate: (value) => new Date() > new Date(value),
              },
            })}
          />
          {errors.birthDate && errors.birthDate.type === 'required' && (
            <span role='alert'>
              {language === 'en-US' || language === 'en'
                ? 'Birth date is required.'
                : 'Se requiere fecha de nacimiento'}
            </span>
          )}
          {errors.birthDate && errors.birthDate.type === 'validDate' && (
            <span role='alert'>
              {language === 'en-US' || language === 'en'
                ? 'Future date not valid.'
                : 'Fecha futura no es válida'}
            </span>
          )}
        </div>

        <div className='input_container'>
          <label className='input_title' htmlFor='notes'>
            {language === 'en-US' || language === 'en'
              ? 'ADITIONAL NOTES'
              : 'NOTAS ADICIONALES'}
          </label>
          <input
            onChange={handleNotes}
            id='notes'
            type='text'
            placeholder={
              language === 'en-US' || language === 'en'
                ? 'e.g. weight, alergies...'
                : 'ej. peso, alergias...'
            }
            autoComplete='off'
            autoCapitalize='off'
            value={notes}
          />
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
