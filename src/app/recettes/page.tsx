'use client'

import { useState } from 'react'
import { Search, ArrowDownAZ, Star, Clock } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import RecipeCard from '@/components/RecipeCard'
import { useRecipes, useCategories } from '@/hooks/useRecipes'
import type { StrapiRecipe, FlexibleRecipe } from '@/types/api'
import Link from 'next/link'

const SORT_OPTIONS = [
  { id: 'popular', name: 'Populaires', icon: Star },
  { id: 'time', name: 'Plus rapides', icon: Clock },
  { id: 'name', name: 'Ordre A-Z', icon: ArrowDownAZ }
]

// Helper functions to safely access recipe properties
const getRecipeTitle = (recipe: StrapiRecipe | FlexibleRecipe): string => {
  return recipe.attributes?.title || (recipe as any).title || 'Sans titre'
}

const getRecipeDescription = (recipe: StrapiRecipe | FlexibleRecipe): string => {
  return recipe.attributes?.description || (recipe as any).description || ''
}

const getRecipeDifficulty = (recipe: StrapiRecipe | FlexibleRecipe): string => {
  return recipe.attributes?.difficulty || (recipe as any).difficulty || 'Facile'
}

const getRecipeDuration = (recipe: StrapiRecipe | FlexibleRecipe): number => {
  return recipe.attributes?.duration || (recipe as any).duration || 0
}

const getRecipeRating = (recipe: StrapiRecipe | FlexibleRecipe): number => {
  return recipe.attributes?.rating || (recipe as any).rating || 0
}

const getRecipeCategory = (recipe: StrapiRecipe | FlexibleRecipe): any => {
  return recipe.attributes?.recipieCategory?.data || (recipe as any).recipieCategory || null
}

export default function RecipesPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedDifficulty, setSelectedDifficulty] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('popular')

  // Utiliser les hooks TypeScript
  const { recipes, loading, error, filters, setFilters, sort, setSort } = useRecipes({
    enabled: true
  })
  const { categories } = useCategories()

  // Appliquer les filtres et la recherche
  const filteredRecipes = recipes.filter(recipe => {
    const recipeCat = getRecipeCategory(recipe);
    const matchesCategory = selectedCategory === 'all' ||
      (recipeCat && (
        recipeCat.categoryName?.toLowerCase() === selectedCategory.toLowerCase() ||
        recipeCat.id?.toString() === selectedCategory
      ));
    const matchesDifficulty = selectedDifficulty === 'all' || 
      getRecipeDifficulty(recipe) === selectedDifficulty
    const matchesSearch = getRecipeTitle(recipe).toLowerCase().includes(searchQuery.toLowerCase()) ||
      getRecipeDescription(recipe).toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesDifficulty && matchesSearch
  })

  // Trier les recettes
  const sortedRecipes = [...filteredRecipes].sort((a, b) => {
    switch (sortBy) {
      case 'popular':
        return getRecipeRating(b) - getRecipeRating(a)
      case 'time':
        return getRecipeDuration(a) - getRecipeDuration(b)
      case 'name':
        return getRecipeTitle(a).localeCompare(getRecipeTitle(b))
      default:
        return 0
    }
  })

  const handleStartCooking = (recipe: StrapiRecipe) => {
    window.location.href = `/cuisson-guidee?id=${recipe.id}`
  }

  const handleFavorite = (recipe: StrapiRecipe) => {
    // TODO: Implémenter la logique des favoris
    console.log('Ajouter aux favoris:', getRecipeTitle(recipe))
  }

  if (loading) {
  return (
      <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-3xl mx-auto py-6">
        <button
          onClick={() => window.history.back()}
          className="flex items-center gap-2 text-herb-green hover:text-herb-dark font-semibold text-lg mb-4"
          aria-label="Retour"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Retour
        </button>
      </div>
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Chargement des recettes...</p>
            </div>
          </div>
        </div>
        <Footer />
              </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="text-red-500 text-6xl mb-4">⚠️</div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Erreur de chargement</h2>
              <p className="text-gray-600 mb-4">{error}</p>
              <button 
                onClick={() => window.location.reload()}
                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                Réessayer
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-3xl mx-auto py-6">
        <button
          onClick={() => window.history.back()}
          className="flex items-center gap-2 text-herb-green hover:text-herb-dark font-semibold text-lg mb-4"
          aria-label="Retour"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Retour
        </button>
      </div>
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 to-green-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Découvrez nos délicieuses recettes
            </h1>
            <p className="text-xl mb-8 text-green-100">
              Des recettes testées et approuvées, du petit-déjeuner au dessert
            </p>
            
            {/* Barre de recherche */}
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Rechercher une recette..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>
          </div>
        </div>
            </div>

      <div className="container mx-auto px-4 py-8">
        {/* Filtres et tri */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-4 items-center justify-between mb-6">
              {/* Catégories */}
              <div className="flex flex-wrap gap-2">
              <button
                key="all"
                onClick={() => setSelectedCategory('all')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === 'all'
                    ? 'bg-green-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                Toutes
              </button>
              {categories.map((category) => (
                  <button
                    key={category.id}
                  onClick={() => setSelectedCategory(category.id.toString())}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category.id.toString()
                      ? 'bg-green-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  {category.categoryName}
                  </button>
                ))}
              </div>

              {/* Tri */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Trier par:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
              >
                {SORT_OPTIONS.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Filtre difficulté */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedDifficulty('all')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedDifficulty === 'all'
                  ? 'bg-green-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              Toutes les difficultés
            </button>
            <button
              onClick={() => setSelectedDifficulty('Facile')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedDifficulty === 'Facile'
                  ? 'bg-green-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              Facile
            </button>
            <button
              onClick={() => setSelectedDifficulty('Intermédiaire')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedDifficulty === 'Intermédiaire'
                  ? 'bg-green-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              Moyen
            </button>
            <button
              onClick={() => setSelectedDifficulty('Difficile')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedDifficulty === 'Difficile'
                  ? 'bg-green-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              Difficile
            </button>
                  </div>
                </div>

        {/* Résultats */}
        <div className="mb-6">
          <p className="text-gray-600">
            {sortedRecipes.length} recette{sortedRecipes.length !== 1 ? 's' : ''} trouvée{sortedRecipes.length !== 1 ? 's' : ''}
          </p>
                    </div>

        {/* Grille des recettes */}
        {sortedRecipes.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-gray-400 text-6xl mb-4">🍽️</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Aucune recette trouvée</h3>
            <p className="text-gray-600">Essayez de modifier vos filtres ou votre recherche</p>
                        </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedRecipes.map((recipe) => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                onStartCooking={handleStartCooking}
                onFavorite={handleFavorite}
                showCategory={true}
                showRating={true}
                showTags={true}
              />
            ))}
          </div>
        )}
      </div>
      
      <Footer />

      <div className="my-8 flex justify-center">
        <Link href="/plan-semaine">
          <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-8 rounded-xl text-lg shadow-lg transition-colors">
            Découvrir le plan de la semaine
            </button>
          </Link>
        </div>
    </div>
  )
} 