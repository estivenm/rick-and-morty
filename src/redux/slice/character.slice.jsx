import { createLocalStorage, getLocalStorage } from '@hooks/useLocalStorage'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import * as servicesCharacters from '@services/rickAndMorty'

const keyStorages = { characters: 'characters' }
const initialState = {
  characterData: [],
  search: { value: undefined },
  isSearching: false,
  info: { page: 0, maxPage: 42 },
  status: 'initial',
  error: null
}

const charactersSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    updateCharacters: (state, action) => {
      state.characterData = action.payload
    },
    addCharacters: (state, action) => {
      const { info, characterData } = action.payload
      state.characterData = characterData
      state.info = info
    },
    updateSearch: (state, action) => {
      const { search, page } = action.payload
      state.search = search
      state.info.page = page
    },
    reset: () => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCharactersAsync.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchCharactersAsync.fulfilled, (state, action) => {
        const keyStorages = { characters: 'characters' }
        const { characters, info } = action.payload
        const { characterData, search } = state
        const isNewSearch = search.value && info.page === 1
        state.status = 'succeeded'
        state.info = info

        //Initial Search create new data
        if (isNewSearch) {
          state.characterData = characters
        } else {
          const newCharacterData = [...characterData, ...characters]
          state.characterData = newCharacterData
          //add data  in local storage when not have search
          if (!search.value) {
            const storageData = JSON.stringify(newCharacterData)
            createLocalStorage(keyStorages.characters, storageData)
          }
        }
        // valida
        // if (state.data.length < 40) {
        // }
      })
      .addCase(fetchCharactersAsync.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  }
})

export const fetchCharactersAsync = createAsyncThunk(
  'character/fetchCharactersAsync',
  async (filters) => await servicesCharacters.getCharacters({ filters })
)

export const { addCharacters, updateCharacters, updateSearch, reset } =
  charactersSlice.actions
export default charactersSlice.reducer
