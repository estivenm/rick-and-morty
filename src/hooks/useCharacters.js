import { useCallback, useState } from 'react'
import * as servicesCharacters from '../api/rickAndMorty'

const useCharacters = ({ pages = 1 }) => {
  const [characters, setCharacters] = useState([])
  const getCharacters = useCallback(async (page) => {
    const newCharacters = await servicesCharacters.getCharacters({ page })
    setCharacters(newCharacters)
    return newCharacters
  }, [])

  return { characters, getCharacters }
}

export { useCharacters }
