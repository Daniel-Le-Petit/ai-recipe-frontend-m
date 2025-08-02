'use client'

import React from 'react'
import { useMealChanges, useChangeReasons } from '../hooks/useRecipes'
import { StrapiWeeklyPlanMealChange } from '../types/api'

interface MealChangeHistoryProps {
  mealId: number
  onClose: () => void
}

export function MealChangeHistory({ mealId, onClose }: MealChangeHistoryProps) {
  const { changes, loading, error } = useMealChanges(mealId)
  const { reasons } = useChangeReasons()

  const getReasonLabel = (reasonId: string) => {
    return reasons.find(r => r.id === reasonId)?.label || reasonId
  }

  const getReasonIcon = (reasonId: string) => {
    return reasons.find(r => r.id === reasonId)?.icon || '📝'
  }

  const getChangeTypeLabel = (changeType: string) => {
    const labels = {
      'recipe-switch': 'Changement de recette',
      'status-change': 'Changement de statut',
      'alternative-selected': 'Alternative sélectionnée',
      'notes-updated': 'Notes mises à jour'
    }
    return labels[changeType as keyof typeof labels] || changeType
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (loading) {
    return (
      <div className="p-4 bg-white rounded-lg shadow-lg">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
        <p className="text-red-600">Erreur: {error}</p>
      </div>
    )
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg max-w-2xl">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold text-gray-800">
          📋 Historique des changements
        </h3>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>
      </div>

      {changes.length > 0 ? (
        <div className="space-y-4">
          {changes.map((change) => (
            <div
              key={change.id}
              className="p-4 border border-gray-200 rounded-lg bg-gray-50"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-600">
                    {getReasonIcon(change.attributes.reason)} {getReasonLabel(change.attributes.reason)}
                  </span>
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                    {getChangeTypeLabel(change.attributes.changeType)}
                  </span>
                </div>
                <span className="text-xs text-gray-500">
                  {formatDate(change.attributes.createdAt)}
                </span>
              </div>

              {change.attributes.reasonDetails && (
                <p className="text-sm text-gray-600 mb-3">
                  💬 {change.attributes.reasonDetails}
                </p>
              )}

              <div className="space-y-2">
                {change.attributes.previousValue && (
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-red-600">❌ Avant:</span>
                    <span className="text-sm text-gray-700">
                      {change.attributes.previousValue}
                    </span>
                  </div>
                )}
                
                {change.attributes.newValue && (
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-green-600">✅ Après:</span>
                    <span className="text-sm text-gray-700">
                      {change.attributes.newValue}
                    </span>
                  </div>
                )}
              </div>

              {/* Informations sur les recettes si changement de recette */}
              {change.attributes.changeType === 'recipe-switch' && (
                <div className="mt-3 pt-3 border-t border-gray-200">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Ancienne recette:</span>
                      <p className="font-medium">
                        {change.attributes.previousRecipe?.data?.attributes?.title || 'N/A'}
                      </p>
                    </div>
                    <div>
                      <span className="text-gray-500">Nouvelle recette:</span>
                      <p className="font-medium">
                        {change.attributes.newRecipe?.data?.attributes?.title || 'N/A'}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          <p>Aucun changement enregistré</p>
          <p className="text-sm">L'historique des modifications apparaîtra ici</p>
        </div>
      )}

      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="text-xs text-gray-500">
          <p>💡 Cet historique garde une trace de tous vos changements pour vous aider à optimiser vos plans.</p>
        </div>
      </div>
    </div>
  )
} 