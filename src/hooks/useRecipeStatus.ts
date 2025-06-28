import { useState, useCallback } from 'react'
import { RecipeStatus } from '@/types/api'
import apiService from '@/api'

interface UseRecipeStatusOptions {
  onStatusChange?: (newStatus: RecipeStatus) => void
  onError?: (error: Error) => void
}

export const useRecipeStatus = (recipeId: number, initialStatus: RecipeStatus, options: UseRecipeStatusOptions = {}) => {
  const [status, setStatus] = useState<RecipeStatus>(initialStatus)
  const [isUpdating, setIsUpdating] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const updateStatus = useCallback(async (newStatus: RecipeStatus) => {
    setIsUpdating(true)
    setError(null)

    try {
      const response = await apiService.updateRecipeStatus(recipeId, newStatus)
      const updatedStatus = response.data.attributes.recipeState || newStatus
      
      setStatus(updatedStatus)
      options.onStatusChange?.(updatedStatus)
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Erreur lors de la mise à jour du statut')
      setError(error)
      options.onError?.(error)
    } finally {
      setIsUpdating(false)
    }
  }, [recipeId, options])

  const resetError = useCallback(() => {
    setError(null)
  }, [])

  return {
    status,
    isUpdating,
    error,
    updateStatus,
    resetError
  }
}

export default useRecipeStatus 