import { charactersMock } from '../mocks/rickAndMorty'

const getCharacters = async ({ isMock = false, filters }) => {
  if (isMock) return getCharactersMock()
  try {
    const url = `https://rickandmortyapi.com/api/character?${filters}`
    const response = await fetch(url)
    const data = await response.json()
    const page = getParamUrl(url, 'page')
    return builderResponseCharacter(data, page)
    // return results
  } catch (error) {
    console.log('🚀 ~ file: rickAndMorty.js ~ getCharacters ~ error:', error)
    throw new Error('Error in fetching character')
  }
}

const builderResponseCharacter = (response, page) => {
  const { info, results } = response
  return {
    characters: results,
    info: {
      page: page ? parseInt(page) : 1,
      maxPage: info.pages
    }
  }
}

function getParamUrl(url, param) {
  if (!url) return undefined
  const newUrl = new URL(url)
  const params = new URLSearchParams(newUrl.search)
  return params.get(param)
}

const getCharactersMock = async () =>
  new Promise((resolve) => resolve(charactersMock))
export { getCharacters }
