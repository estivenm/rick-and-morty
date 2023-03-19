import { charactersMock } from '@mocks/rickAndMorty'
import { getCharacters } from './rickAndMorty'

describe('GetCharacters', () => {
  beforeAll(() => {
    global.fetch = jest.fn()
  })

  afterEach(() => {
    fetch.mockClear()
  })

  const baseUrl = 'https://rickandmortyapi.com/api/character?'
  test('should return characters from API', async () => {
    //Arrange
    const filters = 'name=rick'
    const url = `${baseUrl}${filters}`
    const mockPage = 1
    const request = { isMock: false, filters: filters }
    const mockDataResponse = { info: { pages: 34 }, results: charactersMock }
    const response = { ok: true, json: async () => mockDataResponse }
    fetch.mockResolvedValue(response)

    // Active
    const { characters, info } = await getCharacters(request)

    //Assert
    expect(characters).toEqual(mockDataResponse.results)
    expect(info.page).toEqual(mockPage)
    expect(info.maxPage).toEqual(mockDataResponse.info.pages)
    expect(fetch).toHaveBeenCalledWith(url)
  })

  test('should throw an error when API call fails', async () => {
    //Arrange
    const mockFilters = 'status=dead'
    const url = `${baseUrl}${mockFilters}`
    const request = { isMock: false, filters: mockFilters }
    const mockDataResponse = { error: 'There is nothing here' }
    const response = { ok: false, json: async () => mockDataResponse }
    const errorMsg = 'Error in fetching character'
    //Active
    fetch.mockRejectedValueOnce(response)
    //Assert
    expect(getCharacters(request)).rejects.toThrow(errorMsg)
    expect(fetch).toHaveBeenCalledWith(url)
  })
})
