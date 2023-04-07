import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import debounce from 'just-debounce-it'
import { ThemeContext } from '@context/ThemeContext'

import Search from '@components/Search'
import * as icons from '@components/icons'
import {
  fetchCharactersAsync,
  updateSearch,
  reset
} from '@redux/slice/character.slice'

import imgBanner from '@images/rick-and-Morty.png'
import '@styles/Header.scss'

const Header = () => {
  const { theme, setTheme } = React.useContext(ThemeContext)
  const dispatch = useDispatch()
  const handleChangeTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  function handleSearch({ target: { value } }) {
    const search = { value: `name=${value}` }
    return value === ''
      ? dispatch(reset())
      : debounceGetSearchCharacters(search)
  }

  const debounceGetSearchCharacters = useCallback(
    debounce(async (search) => {
      const filters = `page=1&${search.value}`
      dispatch(updateSearch({ search, page: 1 }))
      dispatch(fetchCharactersAsync(filters))
    }, 300),
    []
  )

  return (
    <header className={`header ${theme}-theme`}>
      <div className='header--content'>
        <section className='header--content__logo'>
          <img src={imgBanner} alt='rick-and-Morty' />
        </section>
        <section className='header--content__theme'>
          <input
            type='checkbox'
            id='icon-theme'
            onChange={() => handleChangeTheme()}
          />
          <label data-id='icon-theme' htmlFor='icon-theme'>
            {icons[`${theme}Icon`]}
          </label>
        </section>
      </div>
      <Search theme={theme} handleSearch={handleSearch} />
    </header>
  )
}

export default Header
