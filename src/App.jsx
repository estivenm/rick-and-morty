import Characters from '@components/characters'
import Header from '@components/Header'
import { ThemeContext } from '@context/ThemeContext'
import { useContext } from 'react'
import './App.css'
import Home from '@/container/Home'

function App() {
  const { theme } = useContext(ThemeContext)
  return (
    <div className={`App ${theme}-theme`}>
      <Home>
        <Header />
        <Characters />
      </Home>
    </div>
  )
}

export default App
