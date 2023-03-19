import React from 'react'
import { render, screen } from '@testing-library/react'
import CharacterItem from './CharacterItem'
import { charactersMock } from '@mocks/rickAndMorty'

describe('CharacterItem component', () => {
  const mockCharacter = charactersMock[0]

  test('renders character information correctly', () => {
    // Arrange
    const { name, species, status, location, gender } = mockCharacter
    // Active
    render(<CharacterItem character={mockCharacter} />)
    // Assert
    expect(screen.getByText(name)).toBeInTheDocument()
    //validate image
    expect(screen.getByAltText(name)).toBeInTheDocument()
    expect(screen.getByText(species)).toBeInTheDocument()
    expect(screen.getByText(gender)).toBeInTheDocument()
    expect(screen.getByText(status)).toBeInTheDocument()
    expect(screen.getByText(location.name)).toBeInTheDocument()
  })
})
