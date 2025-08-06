'use client'

import React, { useState, useEffect } from 'react'
import { RecipeStatus, RECIPE_STATUSES, StrapiRecipe } from '@/types/api'
import { RecipeCard } from '@/components/RecipeCard'
import { RecipeStatusBadge } from '@/components/RecipeStatusBadge'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { RefreshCw, Plus, Eye } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface RecipeFilters {
  status: string;
  search: string;
  difficulty: string;
}

export default function AdminRecipesPage() {
  const [selectedStatus, setSelectedStatus] = useState<RecipeStatus>('submitted')
  const [recipes, setRecipes] = useState<StrapiRecipe[]>([])
  const [filteredRecipes, setFilteredRecipes] = useState<StrapiRecipe[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [refreshing, setRefreshing] = useState(false)
  const [statusCounts, setStatusCounts] = useState<Record<RecipeStatus, number>>({
    draft: 0,
    saved: 0,
    submitted: 0,
    approved: 0,
    ordered: 0,
    completed: 0,
    archived: 0,
    rejected: 0
  })
  const [filters, setFilters] = useState<RecipeFilters>({
    status: 'all',
    search: '',
    difficulty: 'all'
  })
  const router = useRouter()

  const fetchRecipesByStatus = async (status: RecipeStatus) => {
    setLoading(true)
    setError(null)
    
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1338'
      console.log(`Chargement des recettes avec le statut: ${status}`)
      
      const response = await fetch(`${API_URL}/api/recipies?filters[recipeState][$eq]=${status}&populate=*&sort=createdAt:desc`)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}`)
      }
      
      const data = await response.json()
      console.log(`Recettes trouvées pour le statut ${status}:`, data)
      setRecipes(data.data || [])
    } catch (err) {
      console.error('Error fetching recipes:', err)
      
      // Message d'erreur plus spécifique
      const errorMessage = err instanceof Error ? err.message : 'Erreur inconnue'
      if (errorMessage.includes('ECONNREFUSED') || errorMessage.includes('fetch failed')) {
        setError('Le serveur backend n\'est pas démarré. Veuillez démarrer le backend Strapi avec "npm run develop" dans le dossier backend-js.')
      } else {
        setError('Erreur lors du chargement des recettes')
      }
    } finally {
      setLoading(false)
    }
  }

  const fetchAllStatusCounts = async () => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1338'
    const counts: Record<RecipeStatus, number> = {
      draft: 0,
      saved: 0,
      submitted: 0,
      approved: 0,
      ordered: 0,
      completed: 0,
      archived: 0,
      rejected: 0
    }

    try {
      console.log('📊 Récupération des compteurs par statut...')
      
      // Récupérer le nombre de recettes pour chaque statut
      for (const status of Object.keys(RECIPE_STATUSES) as RecipeStatus[]) {
        try {
          const response = await fetch(`${API_URL}/api/recipies?filters[recipeState][$eq]=${status}&pagination[pageSize]=1`)
          if (response.ok) {
            const data = await response.json()
            const count = data.meta?.pagination?.total || 0
            counts[status] = count
            console.log(`   ${status}: ${count} recette(s)`)
          } else {
            console.log(`   ❌ Erreur pour ${status}: ${response.status}`)
          }
        } catch (err) {
          const errorMessage = err instanceof Error ? err.message : 'Erreur inconnue'
          console.log(`   ❌ Erreur réseau pour ${status}:`, errorMessage)
        }
      }
      
      setStatusCounts(counts)
      console.log('✅ Compteurs mis à jour:', counts)
    } catch (err) {
      console.error('❌ Erreur lors de la récupération des compteurs:', err)
    }
  }

  const refreshData = async () => {
    setRefreshing(true)
    await Promise.all([
      fetchRecipesByStatus(selectedStatus),
      fetchAllStatusCounts()
    ])
    setRefreshing(false)
  }

  useEffect(() => {
    fetchRecipesByStatus(selectedStatus)
    fetchAllStatusCounts()
  }, [selectedStatus])

  useEffect(() => {
    applyFilters()
  }, [recipes, filters])

  const applyFilters = () => {
    let filtered = [...recipes]

    // Filter by status
    if (filters.status !== 'all') {
      filtered = filtered.filter(recipe => recipe.attributes?.recipeState === filters.status)
    }

    // Filter by search
    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      filtered = filtered.filter(recipe => 
        recipe.attributes?.title?.toLowerCase().includes(searchLower) ||
        recipe.attributes?.description?.toLowerCase().includes(searchLower)
      )
    }

    // Filter by difficulty
    if (filters.difficulty !== 'all') {
      filtered = filtered.filter(recipe => recipe.attributes?.difficulty === filters.difficulty)
    }

    setFilteredRecipes(filtered)
  }

  const handleStatusChange = async (recipeId: number, newStatus: RecipeStatus) => {
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1338'
      const response = await fetch(`${API_URL}/api/recipies/${recipeId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: { recipeState: newStatus }
        })
      })
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}`)
      }
      
      // Recharger les recettes après la mise à jour
      await refreshData()
    } catch (err) {
      setError('Erreur lors de la mise à jour du statut')
      console.error('Error updating status:', err)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'rejected': return 'bg-red-100 text-red-800'
      case 'draft': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'approved': return 'Approuvée'
      case 'pending': return 'En attente'
      case 'rejected': return 'Rejetée'
      case 'draft': return 'Brouillon'
      default: return 'Inconnu'
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'facile': return 'bg-green-100 text-green-800'
      case 'moyen': return 'bg-yellow-100 text-yellow-800'
      case 'difficile': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="bg-white p-6 rounded-lg shadow mb-6">
              <div className="h-4 bg-gray-200 rounded w-1/3 mb-4"></div>
              <div className="space-y-3">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-16 bg-gray-200 rounded"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">
                  Erreur de connexion
                </h3>
                <div className="mt-2 text-sm text-red-700">
                  <p>{error}</p>
                  <p className="mt-2">Vérifiez que le backend Strapi est en cours d&apos;exécution sur {process.env.NEXT_PUBLIC_API_URL}</p>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <button
                onClick={refreshData}
                className="bg-red-100 text-red-800 px-4 py-2 rounded-md text-sm font-medium hover:bg-red-200"
              >
                Réessayer
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Administration des recettes
              </h1>
              <p className="text-gray-600">
                Gérez les statuts et la validation des recettes
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={refreshData}
                disabled={refreshing}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
                <span>Actualiser</span>
              </button>
              <Link href="/admin">
                <button className="flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
                  <Eye className="h-4 w-4" />
                  <span>Tableau de bord</span>
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Status Tabs */}
        <div className="bg-white shadow rounded-lg mb-6">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
              Statuts des recettes
            </h3>
            <div className="flex flex-wrap gap-2">
              {Object.entries(RECIPE_STATUSES).map(([status, config]) => (
                <button
                  key={status}
                  onClick={() => setSelectedStatus(status as RecipeStatus)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedStatus === status
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {config.displayName} ({statusCounts[status as RecipeStatus] || 0})
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white shadow rounded-lg mb-6">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
              Filtres
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Search */}
              <div>
                <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
                  Rechercher
                </label>
                <input
                  type="text"
                  id="search"
                  value={filters.search}
                  onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                  placeholder="Titre ou description..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Status Filter */}
              <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                  Statut
                </label>
                <select
                  id="status"
                  value={filters.status}
                  onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">Tous les statuts</option>
                  <option value="draft">Brouillon</option>
                  <option value="pending">En attente</option>
                  <option value="approved">Approuvée</option>
                  <option value="rejected">Rejetée</option>
                </select>
              </div>

              {/* Difficulty Filter */}
              <div>
                <label htmlFor="difficulty" className="block text-sm font-medium text-gray-700 mb-1">
                  Difficulté
                </label>
                <select
                  id="difficulty"
                  value={filters.difficulty}
                  onChange={(e) => setFilters(prev => ({ ...prev, difficulty: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">Toutes les difficultés</option>
                  <option value="facile">Facile</option>
                  <option value="moyen">Moyen</option>
                  <option value="difficile">Difficile</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Affichage des erreurs */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
            <div className="flex items-center gap-2">
              <span className="text-red-600">❌</span>
              <span className="text-red-800">{error}</span>
            </div>
          </div>
        )}

        {/* Liste des recettes */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Recettes avec le statut "{RECIPE_STATUSES[selectedStatus].displayName}"
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  {filteredRecipes.length} recette(s) trouvée(s)
                </p>
              </div>
              <div className="text-sm text-gray-500">
                Dernière mise à jour: {new Date().toLocaleTimeString('fr-FR')}
              </div>
            </div>
          </div>

          {filteredRecipes.length === 0 ? (
            <div className="p-8 text-center">
              <div className="text-6xl mb-4">📝</div>
              <p className="text-gray-500 text-lg mb-2">
                Aucune recette trouvée
              </p>
              <p className="text-gray-400 text-sm">
                Essayez de modifier vos filtres.
              </p>
            </div>
          ) : (
            <div className="p-6">
              <div className="overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Recette
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Statut
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Difficulté
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Dernière modification
                      </th>
                      <th className="relative px-6 py-3">
                        <span className="sr-only">Actions</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredRecipes.map((recipe) => (
                      <tr key={recipe.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-12 w-12">
                              {recipe.attributes?.image?.data?.attributes?.url ? (
                                <img
                                  className="h-12 w-12 rounded-lg object-cover"
                                  src={recipe.attributes.image.data.attributes.url}
                                  alt={recipe.attributes.title || 'Recette'}
                                  onError={(e) => {
                                    if (!e.currentTarget.src.endsWith('/Images/fallback-recipe.jpg')) {
                                      e.currentTarget.src = '/Images/fallback-recipe.jpg';
                                    }
                                  }}
                                />
                              ) : (
                                <img
                                  className="h-12 w-12 rounded-lg object-cover"
                                  src="/Images/fallback-recipe.jpg"
                                  alt="Image par défaut"
                                />
                              )}
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {recipe.attributes?.title || 'Sans titre'}
                              </div>
                              {recipe.attributes?.description && (
                                <div className="text-sm text-gray-500 line-clamp-2">
                                  {recipe.attributes.description}
                                </div>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <select
                            value={recipe.attributes?.recipeState || 'draft'}
                            onChange={(e) => handleStatusChange(recipe.id, e.target.value as RecipeStatus)}
                            className="inline-flex px-2 py-1 text-xs font-semibold rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            <option value="draft">Brouillon</option>
                            <option value="pending">En attente</option>
                            <option value="approved">Approuvée</option>
                            <option value="rejected">Rejetée</option>
                          </select>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getDifficultyColor(recipe.attributes?.difficulty || '')}`}>
                            {recipe.attributes?.difficulty || 'Non définie'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {recipe.attributes?.updatedAt ? new Date(recipe.attributes.updatedAt).toLocaleDateString('fr-FR') : 'N/A'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex space-x-2">
                            <Link
                              href={`/admin/edit-recette/${recipe.id}`}
                              className="text-blue-600 hover:text-blue-900"
                            >
                              Modifier
                            </Link>
                            <Link
                              href={`/creer-recette?id=${recipe.id}&step=4`}
                              className="text-green-600 hover:text-green-900"
                            >
                              Continuer
                            </Link>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  )
} 