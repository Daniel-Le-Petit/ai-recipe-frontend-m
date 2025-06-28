import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { RecipeCard } from '@/components/RecipeCard'
import type { StrapiRecipe } from '@/types/api'

// Mock the RecipeStatusBadge component
jest.mock('@/components/RecipeStatusBadge', () => ({
  RecipeStatusBadge: ({ status }: { status: string }) => (
    <div data-testid="status-badge">{status}</div>
  ),
}))

const mockRecipe: StrapiRecipe = {
  id: 1,
  attributes: {
    title: 'Test Recipe',
    description: 'A delicious test recipe',
    ingredients: ['ingredient 1', 'ingredient 2'],
    instructions: 'Cook the ingredients',
    duration: 30,
    difficulty: 'Facile',
    servings: 4,
    rating: 4.5,
    tags: ['test', 'delicious'],
    isRobotCompatible: true,
    recipeState: 'approved',
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z',
    publishedAt: '2024-01-01T00:00:00.000Z',
    image: null,
    recipieCategory: null,
    author: null,
  },
}

describe('RecipeCard', () => {
  it('renders recipe information correctly', () => {
    render(<RecipeCard recipe={mockRecipe} />)
    
    expect(screen.getByText('Test Recipe')).toBeInTheDocument()
    expect(screen.getByText('A delicious test recipe')).toBeInTheDocument()
    expect(screen.getByText('⏱️ 30 min')).toBeInTheDocument()
    expect(screen.getByText('👥 4 pers.')).toBeInTheDocument()
    expect(screen.getByText('Facile')).toBeInTheDocument()
  })

  it('calls onStartCooking when start cooking button is clicked', () => {
    const mockOnStartCooking = jest.fn()
    render(<RecipeCard recipe={mockRecipe} onStartCooking={mockOnStartCooking} />)
    
    const startButton = screen.getByTestId('start-cooking-button')
    fireEvent.click(startButton)
    
    expect(mockOnStartCooking).toHaveBeenCalledWith(mockRecipe)
  })

  it('calls onFavorite when favorite button is clicked', () => {
    const mockOnFavorite = jest.fn()
    render(<RecipeCard recipe={mockRecipe} onFavorite={mockOnFavorite} />)
    
    const favoriteButton = screen.getByTestId('favorite-button')
    fireEvent.click(favoriteButton)
    
    expect(mockOnFavorite).toHaveBeenCalledWith(mockRecipe)
  })

  it('shows robot compatibility badge when isRobotCompatible is true', () => {
    render(<RecipeCard recipe={mockRecipe} compact={true} />)
    
    expect(screen.getByText('🤖 Robot')).toBeInTheDocument()
  })

  it('shows status badge when showStatus is true', () => {
    render(<RecipeCard recipe={mockRecipe} showStatus={true} />)
    
    expect(screen.getByTestId('status-badge')).toBeInTheDocument()
  })

  it('renders compact version when compact prop is true', () => {
    render(<RecipeCard recipe={mockRecipe} compact={true} />)
    
    const card = screen.getByTestId('recipe-card')
    expect(card).toHaveClass('h-48')
  })
}) 