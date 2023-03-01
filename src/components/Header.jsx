import React from 'react'
import { ThemeContext } from '@context/ThemeContext'
import imgBanner from '@images/rick-and-Morty.png'
import '@styles/Header.scss'
import * as icons from '@components/icons'

const Header = () => {
  const { theme, setTheme } = React.useContext(ThemeContext)

  const handleChangeTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

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
          <label htmlFor='icon-theme'>{icons[`${theme}Icon`]}</label>
        </section>
      </div>
    </header>
  )
}

export default Header
