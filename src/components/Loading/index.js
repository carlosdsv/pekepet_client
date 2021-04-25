import React from 'react'
import './styles.css'

const Loading = () => {
  const language = window.navigator.language

  return (
    <div className='loading_container'>
      {language === 'en-US' || language === 'en' ? 'LOADING...' : 'CARGANDO...'}
    </div>
  )
}

export default Loading
