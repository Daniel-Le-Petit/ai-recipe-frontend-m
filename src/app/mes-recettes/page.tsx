"use client"

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
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

function MesRecettesContent() {
  const [recipes, setRecipes] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [sortBy, setSortBy] = useState('date')
  const searchParams = useSearchParams()
  const router = useRouter()

  useEffect(() => {
    // Vérifier si on doit rediriger vers creer-recette étape 4
    const stepParam = searchParams.get('step')
    if (stepParam === '4') {
      router.push('/creer-recette?step=4')
      return
    }

    // Récupère l'email de l'utilisateur connecté (à adapter selon ta logique d'auth)
    const email = typeof window !== 'undefined' ? localStorage.getItem('user_email') : null
    if (!email) {
      setError("Utilisateur non connecté ou email non trouvé.")
      setLoading(false)
      return
    }
    fetch(`${API_URL}/api/recipie?filters[RecipieUser][email][$eq]=${encodeURIComponent(email)}&populate=image,recipieCategory`)
      .then(res => res.json())
      .then(data => {
        setRecipes(Array.isArray(data) ? data : data.data || [])
      })
      .catch(() => setError("Erreur lors du chargement des recettes."))
      .finally(() => setLoading(false))
  }, [searchParams, router])

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

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Mes Recettes</h1>
          <p className="text-lg text-gray-600">Gérez et suivez vos recettes personnalisées</p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-herb-green mx-auto mb-4"></div>
            <p className="text-gray-600">Chargement de vos recettes...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <div className="text-red-600 mb-4">
              <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <p className="text-gray-600">{error}</p>
          </div>
        ) : (
          <>
            {/* Contrôles de tri */}
            <div className="mb-6 flex justify-between items-center">
              <div className="flex items-center gap-4">
                <label className="text-sm font-medium text-gray-700">Trier par:</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-herb-green"
                >
                  {sortOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="text-sm text-gray-600">
                {sortedRecipes.length} recette{sortedRecipes.length !== 1 ? 's' : ''}
              </div>
            </div>

            {/* Grille des recettes */}
            {sortedRecipes.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <svg className="mx-auto h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune recette trouvée</h3>
                <p className="text-gray-600 mb-6">Vous n&apos;avez pas encore créé de recettes personnalisées.</p>
                <button
                  onClick={() => router.push('/creer-recette')}
                  className="bg-herb-green text-white px-6 py-3 rounded-lg hover:bg-herb-dark transition-colors"
                >
                  Créer ma première recette
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedRecipes.map((recipe) => {
                  const normalizedRecipe = normalizeRecipe(recipe)
                  return (
                    <div key={normalizedRecipe.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="relative">
                        <img
                          src={getRecipeImage(normalizedRecipe)}
                          alt={getRecipeTitle(normalizedRecipe)}
                          className="w-full h-48 object-cover"
                        />
                        <div className="absolute top-2 right-2">
                          <RecipeStatusBadge status={getRecipeStatus(normalizedRecipe)} />
                        </div>
                      </div>
                      
                      <div className="p-4">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          {getRecipeTitle(normalizedRecipe)}
                        </h3>
                        
                        <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            <span>{formatDuration(getRecipeDuration(normalizedRecipe))}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            <span>{getRecipeServings(normalizedRecipe)} pers.</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <ChefHat className="h-4 w-4" />
                            <span>{getRecipeDifficulty(normalizedRecipe)}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 text-yellow-400 fill-current" />
                            <span className="text-sm text-gray-600">{getRecipeRating(normalizedRecipe)}/5</span>
                          </div>
                          <button
                            onClick={() => handleOrder(normalizedRecipe)}
                            className="bg-herb-green text-white px-4 py-2 rounded-md text-sm hover:bg-herb-dark transition-colors"
                          >
                            Commander
                          </button>
                        </div>
                        
                        <div className="mt-3 text-xs text-gray-500">
                          Créée le {formatDate(normalizedRecipe.attributes.createdAt)}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </>
        )}
      </div>
      <Footer />
    </>
  )
}

export default function MesRecettesPage() {
  return (
    <Suspense fallback={
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-herb-green mx-auto mb-4"></div>
        <p className="text-gray-600">Chargement...</p>
      </div>
    }>
      <MesRecettesContent />
    </Suspense>
  )
} 