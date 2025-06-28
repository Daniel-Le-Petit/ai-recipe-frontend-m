import React from 'react'
import { RecipeStatus, RECIPE_STATUSES } from '@/types/api'

interface RecipeStatusBadgeProps {
  status: RecipeStatus
  showDescription?: boolean
  className?: string
}

export const RecipeStatusBadge: React.FC<RecipeStatusBadgeProps> = ({
  status,
  showDescription = false,
  className = ''
}) => {
  const statusInfo = RECIPE_STATUSES[status]

  return (
    <div className={`inline-flex items-center gap-2 ${className}`}>
      <span
        className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${statusInfo.color}`}
        title={statusInfo.description}
      >
        <span>{statusInfo.icon}</span>
        <span>{statusInfo.displayName}</span>
      </span>
      {showDescription && (
        <span className="text-sm text-gray-600 hidden sm:inline">
          {statusInfo.description}
        </span>
      )}
    </div>
  )
}

export default RecipeStatusBadge 