import React from 'react'
import '@styles/Search.scss'
import * as icons from './icons'
// { search, searchInput, handleSearch }
const Search = () => {
  function handleSearch({ target: { value } }) {
    // console.log(e.target.value)
    console.log(value)
  }
  return (
    <div className='search'>
      <div className='search-content'>
        {icons.searchIcon}
        <input
          className='search-input'
          type='text'
          // value={search}
          // ref={searchInput}
          onChange={handleSearch}
          placeholder='Search name, specie, status'
        />
      </div>
    </div>
  )
}
export default Search
