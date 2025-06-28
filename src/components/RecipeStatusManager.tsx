import React from 'react'
import { RecipeStatus, RECIPE_STATUSES } from '@/types/api'
import { RecipeStatusBadge } from './RecipeStatusBadge'
import { RecipeStatusActions } from './RecipeStatusActions'
import { useRecipeStatus } from '@/hooks/useRecipeStatus'

interface RecipeStatusManagerProps {
  recipeId: number
  initialStatus: RecipeStatus
  isAdmin?: boolean
  onStatusChange?: (newStatus: RecipeStatus) => void
  className?: string
}

export const RecipeStatusManager: React.FC<RecipeStatusManagerProps> = ({
  recipeId,
  initialStatus,
  isAdmin = false,
  onStatusChange,
  className = ''
}) => {
  const { status, isUpdating, error, updateStatus, resetError } = useRecipeStatus(
    recipeId,
    initialStatus,
    {
      onStatusChange,
      onError: (error) => {
        console.error('Erreur lors de la mise à jour du statut:', error)
      }
    }
  )

  const handleStatusChange = async (newStatus: RecipeStatus) => {
    await updateStatus(newStatus)
  }

  return (
    <div className={`bg-white rounded-lg shadow-sm border p-6 ${className}`}>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Gestion du statut
      </h3>

      {/* Affichage des erreurs */}
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
          <div className="flex items-center gap-2">
            <span className="text-red-600">❌</span>
            <span className="text-red-800 text-sm">{error.message}</span>
            <button
              onClick={resetError}
              className="ml-auto text-red-600 hover:text-red-800 text-sm underline"
            >
              Fermer
            </button>
          </div>
        </div>
      )}

      {/* Indicateur de chargement */}
      {isUpdating && (
        <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
          <div className="flex items-center gap-2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
            <span className="text-blue-800 text-sm">Mise à jour du statut...</span>
          </div>
        </div>
      )}

      {/* Gestionnaire de statut */}
      <RecipeStatusActions
        currentStatus={status}
        onStatusChange={handleStatusChange}
        isAdmin={isAdmin}
      />

      {/* Informations sur le statut */}
      <div className="mt-6 p-4 bg-gray-50 rounded-md">
        <h4 className="text-sm font-medium text-gray-700 mb-2">
          Informations sur le statut
        </h4>
        <p className="text-sm text-gray-600">
          {RECIPE_STATUSES[status].description}
        </p>
      </div>
    </div>
  )
}

export default RecipeStatusManager 