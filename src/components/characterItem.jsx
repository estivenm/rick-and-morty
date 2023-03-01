import React from 'react'
import '@/styles/CharacterItem.scss'

const CharacterItem = ({ character }) => {
  const {
    name,
    image,
    species,
    gender,
    status,
    location: { name: locationName }
  } = character
  return (
    <article className='character-container'>
      <header className='character-header'>
        <img src={image} alt={name} />
      </header>
      <div className='character-content'>
        <h5 className='character-content__title'>{name}</h5>
        <section className='character-content--data'>
          <span className={`status status-${status}`}></span>
          <span>{status}</span>
        </section>
        <section className='character-content--data'>
          <span className='title'>Specie:</span>
          <span>{species}</span>
        </section>
        <section className='character-content--data'>
          <span className='title'>Gender: </span>
          <span>{gender}</span>
        </section>
        <section className='character-content--data'>
          <span className='title'>Location: </span>
          <span>{locationName}</span>
        </section>
      </div>
    </article>
  )
}

export default CharacterItem
