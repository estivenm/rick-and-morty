import React from 'react'
import '@styles/Search.scss'
import * as icons from './icons'
const Search = ({ theme, handleSearch }) => {
  return (
    <div className='search'>
      <div className={`search-content ${theme}-theme`}>
        {icons.searchIcon}
        <input
          className='search-input'
          onChange={handleSearch}
          placeholder='Search name, specie, status'
        />
      </div>
    </div>
  )
}
export default Search
