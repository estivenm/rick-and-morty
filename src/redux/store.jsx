import { composeWithDevTools } from 'redux-devtools-extension'
import { configureStore } from '@reduxjs/toolkit'
import characterSlice from '@redux/slice/character.slice'

const composeEnhancers = composeWithDevTools({
  name: 'Rick and Morty', // El nombre que se muestra en la barra de herramientas de Redux DevTools
  trace: true, // Habilitar el seguimiento de acciones
  traceLimit: 25 // Limitar la cantidad de acciones que se pueden rastrear
})

export default configureStore(
  {
    reducer: {
      characters: characterSlice
    }
  },
  composeEnhancers()
)
//
