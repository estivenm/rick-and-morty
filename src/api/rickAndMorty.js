import { charactersMock } from '../mocks/rickAndMorty'

const getCharacters = async ({ isMock = false, page }) => {
  if (isMock) return getCharactersMock()
  try {
    const url = `https://rickandmortyapi.com/api/character?page=${page}`
    const response = await fetch(url)
    const { results } = await response.json()
    return results
  } catch (error) {
    console.log('🚀 ~ file: rickAndMorty.js ~ getCharacters ~ error:', error)
    throw new Error('Error in fetching character')
  }
}

const getCharactersMock = async () =>
  new Promise((resolve) => resolve(charactersMock))
export { getCharacters }
