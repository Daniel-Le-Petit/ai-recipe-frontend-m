import { useState, useEffect, useCallback } from 'react'
import apiService from '@/api'
import type { 
  StrapiRecipe, 
  RecipeFilters, 
  RecipeSort, 
  UseRecipesOptions 
} from '@/types/api'

interface UseRecipesReturn {
  recipes: StrapiRecipe[]
  loading: boolean
  error: string | null
  refetch: () => Promise<void>
  filters: RecipeFilters
  setFilters: (filters: RecipeFilters) => void
  sort: RecipeSort
  setSort: (sort: RecipeSort) => void
}

export function useRecipes(options: UseRecipesOptions = {}): UseRecipesReturn {
  const [recipes, setRecipes] = useState<StrapiRecipe[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filters, setFilters] = useState<RecipeFilters>(options.filters || {})
  const [sort, setSort] = useState<RecipeSort>(options.sort || { createdAt: 'desc' })

  const fetchRecipes = useCallback(async () => {
    if (!options.enabled) return

    try {
      setLoading(true)
      setError(null)

      const response = await apiService.getRecipes({
        populate: '*',
        filters,
        sort,
        pagination: options.pagination
      })

      setRecipes(response.data || [])
    } catch (err) {
      console.error('Error fetching recipes:', err)
      setError(err instanceof Error ? err.message : 'Erreur lors du chargement des recettes')
    } finally {
      setLoading(false)
    }
  }, [filters, sort, options.pagination, options.enabled])

  const refetch = useCallback(async () => {
    await fetchRecipes()
  }, [fetchRecipes])

  useEffect(() => {
    fetchRecipes()
  }, [fetchRecipes])

  return {
    recipes,
    loading,
    error,
    refetch,
    filters,
    setFilters,
    sort,
    setSort
  }
}

// Hook pour une recette spécifique
export function useRecipe(id: number | null) {
  const [recipe, setRecipe] = useState<StrapiRecipe | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchRecipe = useCallback(async () => {
    if (!id) return

    try {
      setLoading(true)
      setError(null)

      const response = await apiService.getRecipeById(id)
      setRecipe(response.data)
    } catch (err) {
      console.error('Error fetching recipe:', err)
      setError(err instanceof Error ? err.message : 'Erreur lors du chargement de la recette')
    } finally {
      setLoading(false)
    }
  }, [id])

  useEffect(() => {
    fetchRecipe()
  }, [fetchRecipe])

  return { recipe, loading, error, refetch: fetchRecipe }
}

// Hook pour les catégories
export function useCategories() {
  const [categories, setCategories] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchCategories = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await apiService.getCategories()
      setCategories(response.data || [])
    } catch (err) {
      console.error('Error fetching categories:', err)
      setError(err instanceof Error ? err.message : 'Erreur lors du chargement des catégories')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchCategories()
  }, [fetchCategories])

  return { categories, loading, error, refetch: fetchCategories }
}

// Hook pour les recettes populaires
export function usePopularRecipes(limit: number = 10) {
  const [recipes, setRecipes] = useState<StrapiRecipe[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchPopularRecipes = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await apiService.getPopularRecipes(limit)
      setRecipes(response.data || [])
    } catch (err) {
      console.error('Error fetching popular recipes:', err)
      setError(err instanceof Error ? err.message : 'Erreur lors du chargement des recettes populaires')
    } finally {
      setLoading(false)
    }
  }, [limit])

  useEffect(() => {
    fetchPopularRecipes()
  }, [fetchPopularRecipes])

  return { recipes, loading, error, refetch: fetchPopularRecipes }
}

// Hook pour les recettes récentes
export function useRecentRecipes(limit: number = 10) {
  const [recipes, setRecipes] = useState<StrapiRecipe[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchRecentRecipes = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await apiService.getRecentRecipes(limit)
      setRecipes(response.data || [])
    } catch (err) {
      console.error('Error fetching recent recipes:', err)
      setError(err instanceof Error ? err.message : 'Erreur lors du chargement des recettes récentes')
    } finally {
      setLoading(false)
    }
  }, [limit])

  useEffect(() => {
    fetchRecentRecipes()
  }, [fetchRecentRecipes])

  return { recipes, loading, error, refetch: fetchRecentRecipes }
} 