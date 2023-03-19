import charactersReducer, {
  addCharacters,
  updateCharacters,
  updateSearch,
  reset
} from '@redux/slice/character.slice'
import { charactersMock } from '@mocks/rickAndMorty'

describe('CharacterSlice', () => {
  const mockDataCharacters = charactersMock
  const prevState = { characterData: [] }
  const initialState = {
    characterData: [],
    search: { value: undefined },
    isSearching: false,
    info: { page: 0, maxPage: 42 },
    status: 'initial',
    error: null
  }
  const charactersDataMock = {
    characters: charactersMock,
    info: { page: 1, maxPage: 42 }
  }

  describe('Reducers', () => {
    test('should handle updateCharacters', () => {
      const action = {
        type: updateCharacters.type,
        payload: mockDataCharacters
      }
      const expectedState = {
        characterData: mockDataCharacters
      }
      const newState = charactersReducer(prevState, action)
      expect(newState).toEqual(expectedState)
    })

    test('should handle addCharacter', () => {
      const payload = {
        characterData: mockDataCharacters,
        info: { page: 1, maxPage: 2 }
      }
      const newState = charactersReducer(initialState, addCharacters(payload))
      expect(newState.characterData).toEqual(payload.characterData)
    })

    describe('reset', () => {
      test('should reset state to initial state', () => {
        const payload = charactersDataMock
        const state = charactersReducer(initialState, addCharacters(payload))
        const resetState = charactersReducer(state, reset())
        expect(resetState).toEqual(initialState)
      })
    })

    describe('updateSearch', () => {
      it('should update search and info correctly', () => {
        const payload = { search: { value: 'Rick' }, page: 2 }
        const state = charactersReducer(initialState, updateSearch(payload))
        expect(state.search).toEqual(payload.search)
        expect(state.info.page).toEqual(payload.page)
      })
    })
  })
})
