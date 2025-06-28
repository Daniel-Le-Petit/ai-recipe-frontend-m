'use client'

import React, { useState, useEffect } from 'react'
import { RecipeStatus, RECIPE_STATUSES, StrapiRecipe } from '@/types/api'
import { apiService } from '@/api'
import { RecipeCard } from '@/components/RecipeCard'
import { RecipeStatusBadge } from '@/components/RecipeStatusBadge'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function AdminRecipesPage() {
  const [selectedStatus, setSelectedStatus] = useState<RecipeStatus>('submitted')
  const [recipes, setRecipes] = useState<StrapiRecipe[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
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

  const fetchRecipesByStatus = async (status: RecipeStatus) => {
    setLoading(true)
    setError(null)
    
    try {
      // Utiliser directement l'API Strapi avec le bon format de filtre
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1338'
      const response = await fetch(`${API_URL}/api/recipies?filters[recipeState][$eq]=${status}&populate=*`)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      setRecipes(data.data || [])
    } catch (err) {
      setError('Erreur lors du chargement des recettes')
      console.error('Error fetching recipes:', err)
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
      // Récupérer le nombre de recettes pour chaque statut
      for (const status of Object.keys(RECIPE_STATUSES) as RecipeStatus[]) {
        const response = await fetch(`${API_URL}/api/recipies?filters[recipeState][$eq]=${status}&pagination[pageSize]=1`)
        if (response.ok) {
          const data = await response.json()
          counts[status] = data.meta?.pagination?.total || 0
        }
      }
      setStatusCounts(counts)
    } catch (err) {
      console.error('Error fetching status counts:', err)
    }
  }

  useEffect(() => {
    fetchRecipesByStatus(selectedStatus)
    fetchAllStatusCounts()
  }, [selectedStatus])

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
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      // Recharger les recettes après la mise à jour
      fetchRecipesByStatus(selectedStatus)
      fetchAllStatusCounts()
    } catch (err) {
      setError('Erreur lors de la mise à jour du statut')
      console.error('Error updating status:', err)
    }
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Administration des recettes
          </h1>
          <p className="text-gray-600">
            Gérez les statuts et la validation des recettes
          </p>
        </div>

        {/* Filtres par statut avec icônes et compteurs */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Filtrer par statut
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
            {Object.entries(RECIPE_STATUSES).map(([statusCode, statusInfo]) => (
              <button
                key={statusCode}
                onClick={() => setSelectedStatus(statusCode as RecipeStatus)}
                className={`p-3 rounded-lg border transition-colors ${
                  selectedStatus === statusCode
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 bg-white hover:bg-gray-50'
                }`}
              >
                <div className="text-center">
                  <div className="text-2xl mb-1">{statusInfo.icon}</div>
                  <div className="text-xs font-medium text-gray-700">
                    {statusInfo.displayName}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {statusCounts[statusCode as RecipeStatus]} recette(s)
                  </div>
                </div>
              </button>
            ))}
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
            <h3 className="text-lg font-semibold text-gray-900">
              Recettes avec le statut "{RECIPE_STATUSES[selectedStatus].displayName}"
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              {recipes.length} recette(s) trouvée(s)
            </p>
          </div>

          {loading ? (
            <div className="p-8 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Chargement des recettes...</p>
            </div>
          ) : recipes.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-gray-500">
                Aucune recette avec le statut "{RECIPE_STATUSES[selectedStatus].displayName}"
              </p>
            </div>
          ) : (
            <div className="p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {recipes.map((recipe) => (
                  <div key={recipe.id} className="relative">
                    <RecipeCard
                      recipe={recipe}
                      showStatus={true}
                    />
                    
                    {/* Actions rapides pour les admins */}
                    {selectedStatus === 'submitted' && (
                      <div className="mt-3 flex gap-2">
                        <button
                          onClick={() => handleStatusChange(recipe.id, 'approved')}
                          className="flex-1 px-3 py-2 bg-green-600 text-white text-sm rounded-md hover:bg-green-700 transition-colors"
                        >
                          ✅ Approuver
                        </button>
                        <button
                          onClick={() => handleStatusChange(recipe.id, 'rejected')}
                          className="flex-1 px-3 py-2 bg-red-600 text-white text-sm rounded-md hover:bg-red-700 transition-colors"
                        >
                          ❌ Rejeter
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </main>
  )
} 