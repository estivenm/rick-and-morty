import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Search from '@components/Search'

describe('Search Component', () => {
  test('renders with the correct placeholder text in input', () => {
    //Arrange
    const expectPlaceholderText = 'Search name, specie, status'
    //Active
    const { getByPlaceholderText } = render(<Search />)
    //Assert
    expect(getByPlaceholderText(expectPlaceholderText)).toBeInTheDocument()
  })

  test('Renders with the correct theme dark-theme', () => {
    //Arrange
    const theme = 'dark'
    const resultExpect = `${theme}-theme`
    //Active
    const { container } = render(<Search theme={theme} />)
    //Assert
    expect(container.getElementsByClassName(resultExpect).length).toBe(1)
  })

  test('Calls handleSearch function when input changes', () => {
    // Arrange
    const handleSearchMock = jest.fn()
    // Active
    const { getByPlaceholderText } = render(
      <Search handleSearch={handleSearchMock} />
    )
    // Assert
    const input = getByPlaceholderText('Search name, specie, status')
    fireEvent.change(input, { target: { value: 'test' } })
    expect(handleSearchMock).toHaveBeenCalledTimes(1)
  })
})
