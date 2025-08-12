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

      const response = await apiService.getRecipes()

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

// Hook pour les plans de semaine
export function useWeeklyPlans(userId?: number) {
  const [plans, setPlans] = useState<StrapiWeeklyPlan[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchPlans = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await apiService.getWeeklyPlans(userId)
      setPlans(response.data || [])
    } catch (err) {
      console.error('Error fetching weekly plans:', err)
      setError(err instanceof Error ? err.message : 'Erreur lors du chargement des plans')
    } finally {
      setLoading(false)
    }
  }, [userId])

  const refetch = useCallback(async () => {
    await fetchPlans()
  }, [fetchPlans])

  useEffect(() => {
    fetchPlans()
  }, [fetchPlans])

  return {
    plans,
    loading,
    error,
    refetch
  }
}

// Hook pour les alternatives de recettes
export function useMealAlternatives(mealId: number) {
  const [alternatives, setAlternatives] = useState<StrapiWeeklyPlanMealAlternative[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchAlternatives = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await apiService.getMealAlternatives(mealId)
      setAlternatives(response.data || [])
    } catch (err) {
      console.error('Error fetching meal alternatives:', err)
      setError(err instanceof Error ? err.message : 'Erreur lors du chargement des alternatives')
    } finally {
      setLoading(false)
    }
  }, [mealId])

  const createAlternative = useCallback(async (alternativeData: any) => {
    try {
      const response = await apiService.createMealAlternative(alternativeData)
      await fetchAlternatives() // Recharger les alternatives
      return response
    } catch (err) {
      console.error('Error creating alternative:', err)
      throw err
    }
  }, [fetchAlternatives])

  const selectAlternative = useCallback(async (alternativeId: number, isSelected: boolean) => {
    try {
      const response = await apiService.selectAlternative(alternativeId, isSelected)
      await fetchAlternatives() // Recharger les alternatives
      return response
    } catch (err) {
      console.error('Error selecting alternative:', err)
      throw err
    }
  }, [fetchAlternatives])

  useEffect(() => {
    if (mealId) {
      fetchAlternatives()
    }
  }, [fetchAlternatives, mealId])

  return {
    alternatives,
    loading,
    error,
    createAlternative,
    selectAlternative,
    refetch: fetchAlternatives
  }
}

// Hook pour l'historique des changements
export function useMealChanges(mealId: number) {
  const [changes, setChanges] = useState<StrapiWeeklyPlanMealChange[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchChanges = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await apiService.getMealChanges(mealId)
      setChanges(response.data || [])
    } catch (err) {
      console.error('Error fetching meal changes:', err)
      setError(err instanceof Error ? err.message : 'Erreur lors du chargement de l\'historique')
    } finally {
      setLoading(false)
    }
  }, [mealId])

  const recordChange = useCallback(async (changeData: any) => {
    try {
      const response = await apiService.recordMealChange(changeData)
      await fetchChanges() // Recharger l'historique
      return response
    } catch (err) {
      console.error('Error recording change:', err)
      throw err
    }
  }, [fetchChanges])

  const switchRecipe = useCallback(async (newRecipeId: number, reason: string, reasonDetails?: string) => {
    try {
      const response = await apiService.switchRecipe(mealId, newRecipeId, reason, reasonDetails)
      await fetchChanges() // Recharger l'historique
      return response
    } catch (err) {
      console.error('Error switching recipe:', err)
      throw err
    }
  }, [mealId, fetchChanges])

  useEffect(() => {
    if (mealId) {
      fetchChanges()
    }
  }, [fetchChanges, mealId])

  return {
    changes,
    loading,
    error,
    recordChange,
    switchRecipe,
    refetch: fetchChanges
  }
}

// Hook pour les raisons de changement
export function useChangeReasons() {
  const reasons: ChangeReason[] = [
    {
      id: 'ingredients-missing',
      label: 'Ingrédients manquants',
      icon: '🛒',
      description: 'Je n\'ai pas tous les ingrédients nécessaires'
    },
    {
      id: 'time-constraint',
      label: 'Version plus rapide',
      icon: '⏱️',
      description: 'J\'ai besoin d\'une recette plus rapide'
    },
    {
      id: 'difficulty',
      label: 'Version plus simple',
      icon: '🎯',
      description: 'Je préfère une recette plus facile'
    },
    {
      id: 'preference',
      label: 'Préférence personnelle',
      icon: '❤️',
      description: 'Je préfère un autre type de recette'
    },
    {
      id: 'seasonal',
      label: 'Recette de saison',
      icon: '🌱',
      description: 'Je veux des ingrédients de saison'
    },
    {
      id: 'dietary',
      label: 'Régime alimentaire',
      icon: '🥗',
      description: 'Adaptation pour mon régime'
    },
    {
      id: 'allergy',
      label: 'Allergie ou intolérance',
      icon: '⚠️',
      description: 'J\'ai une allergie ou intolérance'
    },
    {
      id: 'budget',
      label: 'Budget limité',
      icon: '💰',
      description: 'Je cherche des recettes moins chères'
    },
    {
      id: 'other',
      label: 'Autre raison',
      icon: '📝',
      description: 'Autre raison personnelle'
    }
  ]

  return { reasons }
} 