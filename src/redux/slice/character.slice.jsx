import { createLocalStorage, getLocalStorage } from '@hooks/useLocalStorage'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import * as servicesCharacters from '@services/rickAndMorty'

const keyStorages = {
  characters: 'characters'
}

const initialState = {
  data: getLocalStorage(keyStorages.characters) ?? [],
  status: 'initial',
  error: null
}

const charactersSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    addCharacters: (state, action) => {
      state.characters.push(action.payload)
    },
    updateCharacters: (state, action) => {
      console.log('state', state.data)
      state.data = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCharactersAsync.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchCharactersAsync.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.data.push(...action.payload)
        createLocalStorage(keyStorages.characters, JSON.stringify(state.data))
      })
      .addCase(fetchCharactersAsync.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  }
})

export const fetchCharactersAsync = createAsyncThunk(
  'charactera/fetchCharactersAsync',
  async (page) => await servicesCharacters.getCharacters({ page })
)

const getCharactersAsync = async (page) => {
  const newCharacters = await servicesCharacters.getCharacters({ page })
  //return await getCharacters({ page })
  //dispatch(updateCharacters(newCharacters))
  console.log(
    '🚀 ~ file: character.reducer.jsx:29 ~ getCharactersAsync ~ newCharacters',
    newCharacters
  )
  return newCharacters
}

export const { addCharacters, updateCharacters } = charactersSlice.actions
export default charactersSlice.reducer
