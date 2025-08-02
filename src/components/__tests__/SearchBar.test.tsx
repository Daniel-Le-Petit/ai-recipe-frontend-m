import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { SearchBar } from '../SearchBar'

const mockOnSearch = jest.fn()

const defaultProps = {
  onSearch: mockOnSearch,
  categories: [
    { id: 1, categoryName: 'Entrées' },
    { id: 2, categoryName: 'Plats' },
    { id: 3, categoryName: 'Desserts' },
  ],
  loading: false,
}

describe('SearchBar', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders search input and button', () => {
    render(<SearchBar {...defaultProps} />)
    
    expect(screen.getByPlaceholderText(/rechercher une recette/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /rechercher/i })).toBeInTheDocument()
  })

  it('shows loading state when loading prop is true', () => {
    render(<SearchBar {...defaultProps} loading={true} />)
    
    expect(screen.getByRole('button', { name: /recherche\.\.\./i })).toBeInTheDocument()
  })

  it('calls onSearch with query when search button is clicked', async () => {
    const user = userEvent.setup()
    render(<SearchBar {...defaultProps} />)
    
    const input = screen.getByPlaceholderText(/rechercher une recette/i)
    const searchButton = screen.getByRole('button', { name: /rechercher/i })
    
    await user.type(input, 'poulet')
    await user.click(searchButton)
    
    expect(mockOnSearch).toHaveBeenCalledWith({
      query: 'poulet',
      category: undefined,
      difficulty: undefined,
      maxDuration: undefined,
      minServings: undefined,
      isRobotCompatible: undefined,
    })
  })

  it('calls onSearch when Enter key is pressed', async () => {
    const user = userEvent.setup()
    render(<SearchBar {...defaultProps} />)
    
    const input = screen.getByPlaceholderText(/rechercher une recette/i)
    
    await user.type(input, 'poulet{enter}')
    
    expect(mockOnSearch).toHaveBeenCalledWith({
      query: 'poulet',
      category: undefined,
      difficulty: undefined,
      maxDuration: undefined,
      minServings: undefined,
      isRobotCompatible: undefined,
    })
  })

  it('shows filter panel when filter button is clicked', async () => {
    const user = userEvent.setup()
    render(<SearchBar {...defaultProps} />)
    
    const filterButton = screen.getByRole('button', { name: /filtres/i })
    await user.click(filterButton)
    
    expect(screen.getByText(/filtres avancés/i)).toBeInTheDocument()
    expect(screen.getByText(/catégorie/i)).toBeInTheDocument()
    expect(screen.getByText(/difficulté/i)).toBeInTheDocument()
  })

  it('applies filters when filter form is submitted', async () => {
    const user = userEvent.setup()
    render(<SearchBar {...defaultProps} />)
    
    // Open filter panel
    const filterButton = screen.getByRole('button', { name: /filtres/i })
    await user.click(filterButton)
    
    // Select category
    const categorySelect = screen.getByLabelText(/sélectionner une catégorie/i)
    await user.selectOptions(categorySelect, 'Plats')
    
    // Select difficulty
    const difficultySelect = screen.getByLabelText(/sélectionner une difficulté/i)
    await user.selectOptions(difficultySelect, 'Facile')
    
    // Apply filters
    const applyButton = screen.getByRole('button', { name: /appliquer les filtres/i })
    await user.click(applyButton)
    
    expect(mockOnSearch).toHaveBeenCalledWith({
      query: '',
      category: 'Plats',
      difficulty: 'Facile',
      maxDuration: undefined,
      minServings: undefined,
      isRobotCompatible: undefined,
    })
  })

  it('shows suggestions when typing', async () => {
    const user = userEvent.setup()
    render(<SearchBar {...defaultProps} />)
    
    const input = screen.getByPlaceholderText(/rechercher une recette/i)
    await user.type(input, 'ent')
    
    await waitFor(() => {
      expect(screen.getByText('Entrées')).toBeInTheDocument()
    })
  })

  it('selects suggestion when clicked', async () => {
    const user = userEvent.setup()
    render(<SearchBar {...defaultProps} />)
    
    const input = screen.getByPlaceholderText(/rechercher une recette/i)
    await user.type(input, 'ent')
    
    await waitFor(() => {
      const suggestion = screen.getByText('Entrées')
      user.click(suggestion)
    })
    
    expect(input).toHaveValue('Entrées')
  })

  it('clears filters when clear button is clicked', async () => {
    const user = userEvent.setup()
    render(<SearchBar {...defaultProps} />)
    
    // Open filter panel and add some filters
    const filterButton = screen.getByRole('button', { name: /filtres/i })
    await user.click(filterButton)
    
    const categorySelect = screen.getByLabelText(/sélectionner une catégorie/i)
    await user.selectOptions(categorySelect, 'Plats')
    
    // Clear filters
    const clearButton = screen.getByRole('button', { name: /effacer/i })
    await user.click(clearButton)
    
    expect(mockOnSearch).toHaveBeenCalledWith({ query: '' })
  })

  it('handles robot compatibility filter', async () => {
    const user = userEvent.setup()
    render(<SearchBar {...defaultProps} />)
    
    // Open filter panel
    const filterButton = screen.getByRole('button', { name: /filtres/i })
    await user.click(filterButton)
    
    // Check robot compatibility
    const robotCheckbox = screen.getByLabelText(/compatible robot/i)
    await user.click(robotCheckbox)
    
    // Apply filters
    const applyButton = screen.getByRole('button', { name: /appliquer les filtres/i })
    await user.click(applyButton)
    
    expect(mockOnSearch).toHaveBeenCalledWith({
      query: '',
      category: undefined,
      difficulty: undefined,
      maxDuration: undefined,
      minServings: undefined,
      isRobotCompatible: true,
    })
  })
}) 