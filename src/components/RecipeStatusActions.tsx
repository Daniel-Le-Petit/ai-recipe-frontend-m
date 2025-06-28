import React from 'react'
import { RecipeStatus, RECIPE_STATUSES } from '@/types/api'
import { RecipeStatusBadge } from './RecipeStatusBadge'

interface RecipeStatusActionsProps {
  currentStatus: RecipeStatus
  onStatusChange: (newStatus: RecipeStatus) => void
  isAdmin?: boolean
  className?: string
}

export const RecipeStatusActions: React.FC<RecipeStatusActionsProps> = ({
  currentStatus,
  onStatusChange,
  isAdmin = false,
  className = ''
}) => {
  // Définir les transitions possibles selon le statut actuel
  const getAvailableTransitions = (status: RecipeStatus): RecipeStatus[] => {
    switch (status) {
      case 'draft':
        return ['saved']
      case 'saved':
        return ['submitted', 'draft']
      case 'submitted':
        return isAdmin ? ['approved', 'rejected'] : ['draft']
      case 'approved':
        return ['ordered']
      case 'ordered':
        return ['completed']
      case 'completed':
        return ['archived']
      case 'rejected':
        return ['draft']
      case 'archived':
        return []
      default:
        return []
    }
  }

  const availableTransitions = getAvailableTransitions(currentStatus)

  const handleStatusChange = (newStatus: RecipeStatus) => {
    onStatusChange(newStatus)
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Statut actuel */}
      <div className="flex items-center gap-3">
        <span className="text-sm font-medium text-gray-700">Statut actuel :</span>
        <RecipeStatusBadge status={currentStatus} showDescription />
      </div>

      {/* Actions disponibles */}
      {availableTransitions.length > 0 && (
        <div className="space-y-2">
          <span className="text-sm font-medium text-gray-700">Actions disponibles :</span>
          <div className="flex flex-wrap gap-2">
            {availableTransitions.map((transitionStatus) => {
              const statusInfo = RECIPE_STATUSES[transitionStatus]
              return (
                <button
                  key={transitionStatus}
                  onClick={() => handleStatusChange(transitionStatus)}
                  className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${statusInfo.color} hover:opacity-80`}
                >
                  <span>{statusInfo.icon}</span>
                  <span>Passer à {statusInfo.displayName}</span>
                </button>
              )
            })}
          </div>
        </div>
      )}

      {/* Aucune action disponible */}
      {availableTransitions.length === 0 && (
        <div className="text-sm text-gray-500 italic">
          Aucune action disponible pour ce statut.
        </div>
      )}
    </div>
  )
}

export default RecipeStatusActions 