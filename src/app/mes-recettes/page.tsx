"use client"

import { useEffect, useState } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { RecipeStatusBadge } from '../../components/RecipeStatusBadge'
import { Clock, Users, ChefHat, Star } from 'lucide-react'

const API_URL = process.env.NEXT_PUBLIC_API_URL || process.env.VITE_APP_STRAPI_API_URL || '';

const sortOptions = [
  { value: 'date', label: 'Date' },
  { value: 'categorie', label: 'Catégorie' },
  { value: 'titre', label: 'Titre' }
]

// Helper function to normalize recipe data structure
const normalizeRecipe = (recipe: any) => {
  if (recipe && recipe.attributes) {
    return recipe
  }
  
  if (recipe && typeof recipe === 'object') {
    const { id, ...attributes } = recipe
    return {
      id: id || recipe.id,
      attributes: {
        title: attributes.title || '',
        description: attributes.description || '',
        ingredients: attributes.ingredients || [],
        instructions: attributes.instructions || '',
        duration: attributes.duration || 0,
        difficulty: attributes.difficulty || 'Facile',
        servings: attributes.servings || 1,
        rating: attributes.rating || 0,
        tags: attributes.tags || [],
        isRobotCompatible: attributes.isRobotCompatible || false,
        recipeState: attributes.recipeState || 'draft',
        createdAt: attributes.createdAt || new Date().toISOString(),
        updatedAt: attributes.updatedAt || new Date().toISOString(),
        publishedAt: attributes.publishedAt || new Date().toISOString(),
        image: attributes.image || null,
        recipieCategory: attributes.recipieCategory ? { data: attributes.recipieCategory } : null,
        author: attributes.author ? { data: attributes.author } : null
      }
    }
  }
  
  return {
    id: 0,
    attributes: {
      title: 'Recette invalide',
      description: '',
      ingredients: [],
      instructions: '',
      duration: 0,
      difficulty: 'Facile',
      servings: 1,
      rating: 0,
      tags: [],
      isRobotCompatible: false,
      recipeState: 'draft',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      publishedAt: new Date().toISOString(),
      image: null,
      recipieCategory: null,
      author: null
    }
  }
}

// Helper functions to safely access recipe properties
const getRecipeTitle = (recipe: any): string => {
  return recipe.attributes?.title || (recipe as any).title || 'Sans titre'
}

const getRecipeDuration = (recipe: any): number => {
  return recipe.attributes?.duration || (recipe as any).duration || 0
}

const getRecipeServings = (recipe: any): number => {
  return recipe.attributes?.servings || (recipe as any).servings || 1
}

const getRecipeDifficulty = (recipe: any): string => {
  return recipe.attributes?.difficulty || (recipe as any).difficulty || 'Facile'
}

const getRecipeRating = (recipe: any): number => {
  return recipe.attributes?.rating || (recipe as any).rating || 0
}

const getRecipeStatus = (recipe: any) => {
  return recipe.recipeState || recipe.attributes?.recipeState || 'draft'
}

const getRecipeImage = (recipe: any) => {
  const normalizedRecipe = normalizeRecipe(recipe)
  const image = normalizedRecipe.attributes.image
  
  if (image?.data?.attributes?.formats?.medium?.url) {
    return image.data.attributes.formats.medium.url
  }
  if (image?.data?.attributes?.url) {
    return image.data.attributes.url
  }
  if (image?.url) {
    return image.url
  }
  if (image?.formats?.medium?.url) {
    return image.formats.medium.url
  }
  return 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
}

const formatDuration = (minutes: number) => {
  if (minutes < 60) {
    return `${minutes} min`
  }
  const hours = Math.floor(minutes / 60)
  const remainingMinutes = minutes % 60
  return remainingMinutes > 0 ? `${hours}h${remainingMinutes}` : `${hours}h`
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
}

export default function MesRecettesPage() {
  const [recipes, setRecipes] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [sortBy, setSortBy] = useState('date')

  useEffect(() => {
    // Récupère l'email de l'utilisateur connecté (à adapter selon ta logique d'auth)
    const email = typeof window !== 'undefined' ? localStorage.getItem('user_email') : null
    if (!email) {
      setError("Utilisateur non connecté ou email non trouvé.")
      setLoading(false)
      return
    }
    fetch(`${API_URL}/api/recipies?filters[RecipieUser][email][$eq]=${encodeURIComponent(email)}&populate=image,recipieCategory`)
      .then(res => res.json())
      .then(data => {
        setRecipes(Array.isArray(data) ? data : data.data || [])
      })
      .catch(() => setError("Erreur lors du chargement des recettes."))
      .finally(() => setLoading(false))
  }, [])

  // Fonction de tri
  const sortedRecipes = [...recipes].sort((a, b) => {
    if (sortBy === 'date') {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    }
    if (sortBy === 'categorie') {
      const catA = a.recipieCategory?.categoryName || ''
      const catB = b.recipieCategory?.categoryName || ''
      return catA.localeCompare(catB)
    }
    if (sortBy === 'titre') {
      return getRecipeTitle(a).localeCompare(getRecipeTitle(b))
    }
    return 0
  })

  // Handler pour commander (redirige vers la création de recette étape 3)
  const handleOrder = (recipe: any) => {
    window.location.href = `/creer-recette?id=${recipe.id}&fromCard=1&step=3`;
  }

  return (
    <>
      <Header />
      <div className="max-w-5xl mx-auto py-8">
        <div className="mb-4">
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 text-herb-green hover:text-herb-dark font-semibold text-lg"
            aria-label="Retour"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Retour
          </button>
        </div>
        <h1 className="text-2xl font-bold mb-4">Mes recettes sauvegardées</h1>
        <p className="text-center text-gray-500 italic text-md mb-6">Conservez l'historique de vos recettes et partagez vos découvertes gourmandes</p>
        <div className="mb-6 flex items-center gap-4">
          <label htmlFor="sort" className="font-medium">Trier par :</label>
          <select
            id="sort"
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
            className="border rounded px-2 py-1"
          >
            {sortOptions.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
        {loading ? (
          <div>Chargement...</div>
        ) : error ? (
          <div className="text-red-500">{error}</div>
        ) : sortedRecipes.length === 0 ? (
          <div>Aucune recette trouvée.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {sortedRecipes.map(recipe => {
              const normalizedRecipe = normalizeRecipe(recipe)
              const {
                title,
                duration,
                difficulty,
                servings,
                rating,
                isRobotCompatible,
                recipeState,
                updatedAt
              } = normalizedRecipe.attributes

              return (
                <div key={recipe.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 h-64 flex flex-col cursor-pointer transform hover:scale-105">
                  {/* Image with badges on top right - 5/7 of card height */}
                  <div className="relative h-[calc(5/7*16rem)] bg-gray-200 flex-shrink-0">
                    <img
                      src={getRecipeImage(recipe)}
                      alt={title || 'Recette'}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
                      }}
                    />
                    {/* Status and Robot badges on top right of image */}
                    <div className="absolute top-2 right-2 flex items-center gap-1">
                      <RecipeStatusBadge status={getRecipeStatus(recipe)} />
                      {isRobotCompatible && (
                        <span className="text-xs bg-white/20 text-white px-1 py-0.5 rounded">
                          🤖 Robot
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Content with AI & Fines Herbes green background - 2/7 of card height */}
                  <div className="h-[calc(2/7*16rem)] bg-[#20B251] p-3 flex flex-col justify-between">
                    {/* Line 1: Title */}
                    <div>
                      <h3 className="text-sm font-bold text-white line-clamp-1">
                        {title || 'Sans titre'}
                      </h3>
                    </div>

                    {/* Line 2: Duration + Servings + Difficulty + Rating */}
                    <div className="flex items-center justify-between text-xs text-white/90">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{formatDuration(duration || 0)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        <span>{servings || 1} pers.</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <ChefHat className="w-3 h-3" />
                        <span>{difficulty || 'Facile'}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-yellow-300" />
                        <span>{(rating || 0).toFixed(1)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Line 3: Commander button */}
                  <div className="bg-white p-3 border-t">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleOrder(recipe)
                      }}
                      className="w-full bg-[#20B251] text-white px-3 py-2 rounded text-sm font-medium hover:bg-[#1a8f42] transition-colors"
                    >
                      Commander
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
      <Footer />
    </>
  )
} 