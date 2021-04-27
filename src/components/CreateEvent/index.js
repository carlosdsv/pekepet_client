import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import { useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useUser } from '../../context/UserContext'
import { backArrow, dog, pills, seringe } from '../../images'
import Loading from '../Loading'
import './styles.css'
const useStyles = makeStyles((theme) => ({
  formControl: {
    maxWidth: '6rem',
    color: theme.color,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  select: {
    '&:before': {
      borderColor: 'var(--secondary-text-color)',
    },
    '&:after': {
      borderColor: 'var(--white)',
    },
  },
  icon: {
    fill: 'var(--white)',
  },
}))

const CreateEvent = () => {
  const classes = useStyles()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  let history = useHistory()
  const pet = history.location.state
  const { createEvent } = useUser()
  const language = window.navigator.language
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [type, setType] = useState('')
  const [notes, setNotes] = useState('')
  const [date, setDate] = useState('')
  const [isCreatingevent, setIsCreatingevent] = useState(false)

  const handleBack = () => {
    history.goBack()
  }
  const handleInputDate = (e) => {
    setDate(e.target.value)
  }
  const handleTypeSelect = (e) => {
    setType(e.target.value)
  }
  const handleInputNotes = (e) => {
    setNotes(e.target.value)
  }
  const checkIsUpcoming = () => {
    return new Date() < new Date(date)
  }
  const onSubmit = async (data) => {
    setIsCreatingevent(true)
    setError('')
    setLoading(true)
    const petData = {
      petId: pet.petId,
      eventId: Date.now().toString(),
      upcoming: checkIsUpcoming(),
      type: type,
      description: data.description,
      date: date,
      notes: notes,
    }
    try {
      await createEvent(petData)
      setIsCreatingevent(false)
      history.push('/pet-select', pet)
    } catch (err) {
      setError(err.message)
    }
    setLoading(false)
  }

  if (loading) return <Loading />

  return (
    <div className='create_event_container'>
      <img
        onClick={handleBack}
        className='back_arrow'
        src={backArrow}
        alt={backArrow}
      />
      <div className='create_event_pet_card'>
        <img className='pet_event_picture' src={pet.profilePicture} alt='pet' />
        <h3>{pet.name}</h3>
      </div>

      <h2 className='create_new_event_title'>
        {language === 'en-US' || language === 'en'
          ? 'CREATE EVENT'
          : 'CREAR EVENTO'}
      </h2>
      {error && <span role='alert'>{error}</span>}

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='input_container'>
          <FormControl required className={classes.formControl}>
            <InputLabel
              style={{
                fontSize: '0.9rem',
                fontWeight: 'bolder',
                color: 'var(--secondary-text-color)',
                marginBottom: '0.5rem',
              }}
              id='demo-simple-select-outlined-label'
            >
              {language === 'en-US' || language === 'en' ? 'TYPE' : 'TIPO'}
            </InputLabel>
            <Select
              className={classes.select}
              labelId='demo-simple-select-outlined-label'
              id='demo-simple-select-outlined'
              value={type}
              onChange={handleTypeSelect}
              displayEmpty
              label='Age'
              inputProps={{
                classes: {
                  icon: classes.icon,
                },
              }}
            >
              <MenuItem value='vaccine'>
                <img src={seringe} alt='vaccine' />
              </MenuItem>
              <MenuItem value='deworm'>
                <img src={pills} alt='deworm' />
              </MenuItem>
              <MenuItem value='other'>
                <img src={dog} alt='other' />
              </MenuItem>
            </Select>
          </FormControl>
        </div>

        <div className='input_container'>
          <label className='input_title' htmlFor='description'>
            {language === 'en-US' || language === 'en'
              ? 'DESCRIPTION'
              : 'DESCRIPCIÓN'}
          </label>
          <input
            id='description'
            type='text'
            placeholder={
              language === 'en-US' || language === 'en'
                ? 'e.g. vaccine, stomach ache...'
                : 'ej. vacuna, dolor de estómago...'
            }
            autoComplete='off'
            autoCapitalize='off'
            aria-invalid={errors.description ? 'true' : 'false'}
            {...register('description', {
              required: true,
            })}
          />
          {errors.description && errors.description.type === 'required' && (
            <span role='alert'>
              {' '}
              {language === 'en-US' || language === 'en'
                ? 'Description is required.'
                : 'Se requiere una descripción.'}
            </span>
          )}
        </div>

        <div className='input_container'>
          <label className='input_title' htmlFor='date'>
            {language === 'en-US' || language === 'en' ? 'DATE' : 'FECHA'}
          </label>
          <input
            onChange={handleInputDate}
            id='date'
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
            autoComplete='off'
            autoCapitalize='off'
            value={notes}
            onChange={handleInputNotes}
          />
        </div>
        <div className='input_container'>
          {isCreatingevent && (
            <span role='alert'>
              {language === 'en-US' || language === 'en'
                ? 'Creating event...'
                : 'Creando evento...'}
            </span>
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

export default CreateEvent
