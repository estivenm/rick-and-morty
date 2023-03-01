import React, { useEffect, useRef } from 'react'
import CharacterItem from '@components/characterItem'
import '@styles/Characters.scss'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchCharactersAsync,
  updateCharacters
} from '../redux/slice/character.slice'
import useElementOnScreeen from '@hooks/useElementOnScreen'
import { useLocalStorage } from '@hooks/useLocalStorage'

const Characters = () => {
  const initialAmountItems = 20
  const maxPageCharacters = 42

  const dispatch = useDispatch()
  const visorRef = useRef(null)

  const [containerRef, isVisible] = useElementOnScreeen({ visorRef })
  const { data: characters } = useSelector((state) => state.characters)
  const { synchronizeLocalStorage } = useLocalStorage()

  useEffect(() => {
    if (isVisible) {
      const page = getPage(
        characters.length,
        initialAmountItems,
        maxPageCharacters
      )
      dispatch(fetchCharactersAsync(page))
    }
  }, [isVisible])

  // useEffect para sincronizar la información entre pestañas
  useEffect(() => {
    const config = { keyStorage: 'characters', typeEvent: 'storage' }
    synchronizeLocalStorage(config, handleStorageChange)
  }, [])

  function getPage(totalItems, totalItemPage, maxPage) {
    const currentPage = totalItems / totalItemPage
    return currentPage > maxPage ? currentPage : currentPage + 1
  }

  // Función para manejar cambios en el local storage
  const handleStorageChange = (event, key) => {
    if (event.key === key) {
      dispatch(updateCharacters(JSON.parse(event.newValue)))
    }
  }

  return (
    <div className='character-list'>
      <section className='characters'>
        {characters?.length > 1 &&
          characters.map((character) => (
            <CharacterItem
              key={`${character.id}-character-${character.name}`}
              character={character}
              onAddFavorite={() => addToFavorites(character)}
            />
          ))}
      </section>
      <section id='content-visor' ref={containerRef}>
        hola
      </section>
    </div>
  )
}

export default Characters
