import React, { useCallback, useEffect, useRef } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import CharacterItem from '@components/characterItem'
import useElementOnScreeen from '@hooks/useElementOnScreen'
import { getLocalStorage, useLocalStorage } from '@hooks/useLocalStorage'
import {
  addCharacters,
  updateCharacters,
  fetchCharactersAsync
} from '@redux/slice/character.slice'
import '@styles/Characters.scss'

const Characters = () => {
  const dispatch = useDispatch()
  const { synchronizeLocalStorage } = useLocalStorage()

  const visorRef = useRef(null)
  const [containerRef, isVisible] = useElementOnScreeen({ visorRef })
  const { characterData, search, info } = useSelector(
    (state) => state.characters,
    shallowEqual
  )

  useEffect(() => {
    const { page, maxPage } = info
    const newPage = page + 1
    const isLimitPage = newPage > maxPage
    const filter = `page=${newPage}`
    const newFilter = search.value ? `${filter}&${search.value}` : filter
    const shouldLoadInitialData = isVisible && !characterData.length

    // Check if characters data is not in the store
    if (shouldLoadInitialData) {
      handleInitialLoad(newFilter)
      return
    }
    if (isVisible && !isLimitPage) {
      dispatch(fetchCharactersAsync(newFilter))
    }
  }, [isVisible])

  // useEffect para sincronizar la información entre pestañas
  useEffect(() => {
    const config = { keyStorage: 'characters', typeEvent: 'storage' }
    synchronizeLocalStorage(config, handleLocalStorageChange)
  }, [])

  // Cargar informacion de localStorage o disparar accion
  const handleInitialLoad = useCallback((filter) => {
    const dataStorage = getLocalStorage('characters')
    if (!dataStorage) {
      dispatch(fetchCharactersAsync(filter))
      return
    }
    const totalItemPage = 20
    const maxPage = 42
    const page = Math.ceil(dataStorage.length / totalItemPage)
    const info = { page, maxPage }
    dispatch(addCharacters({ characterData: dataStorage, info }))
  }, [])

  // Función para manejar cambios en el local storage
  const handleLocalStorageChange = (event, key) => {
    if (event.key === key && event.newValue) {
      dispatch(updateCharacters(JSON.parse(event.newValue)))
    }
  }

  return (
    <div className='character-list'>
      <section className='characters'>
        {characterData?.length > 0 &&
          characterData.map((character) => (
            <CharacterItem
              key={`${character.id}-character-${character.name}`}
              character={character}
              onAddFavorite={() => addToFavorites(character)}
            />
          ))}
      </section>
      <section id='content-visor' ref={containerRef}></section>
    </div>
  )
}

export default Characters
