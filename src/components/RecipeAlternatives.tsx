'use client'

import React, { useState } from 'react'
import { useMealAlternatives, useChangeReasons } from '../hooks/useRecipes'
import { StrapiWeeklyPlanMealAlternative } from '../types/api'

interface RecipeAlternativesProps {
  mealId: number
  currentRecipeId: number
  onAlternativeSelected: (alternativeId: number, recipeId: number) => void
  onClose: () => void
}

export function RecipeAlternatives({ 
  mealId, 
  currentRecipeId, 
  onAlternativeSelected, 
  onClose 
}: RecipeAlternativesProps) {
  const { alternatives, loading, error, createAlternative, selectAlternative } = useMealAlternatives(mealId)
  const { reasons } = useChangeReasons()
  const [showAddForm, setShowAddForm] = useState(false)
  const [selectedReason, setSelectedReason] = useState('')
  const [reasonDetails, setReasonDetails] = useState('')
  const [selectedRecipeId, setSelectedRecipeId] = useState<number | null>(null)

  const handleAddAlternative = async () => {
    if (!selectedReason || !selectedRecipeId) return

    try {
      await createAlternative({
        weekly_plan_meal: mealId,
        recipe: selectedRecipeId,
        reason: selectedReason,
        reasonDetails: reasonDetails || undefined,
        isSelected: false
      })
      
      setShowAddForm(false)
      setSelectedReason('')
      setReasonDetails('')
      setSelectedRecipeId(null)
    } catch (error) {
      console.error('Erreur lors de la création de l\'alternative:', error)
    }
  }

  const handleSelectAlternative = async (alternativeId: number, recipeId: number, isSelected: boolean) => {
    try {
      await selectAlternative(alternativeId, isSelected)
      if (isSelected) {
        onAlternativeSelected(alternativeId, recipeId)
      }
    } catch (error) {
      console.error('Erreur lors de la sélection de l\'alternative:', error)
    }
  }

  const getReasonLabel = (reasonId: string) => {
    return reasons.find(r => r.id === reasonId)?.label || reasonId
  }

  const getReasonIcon = (reasonId: string) => {
    return reasons.find(r => r.id === reasonId)?.icon || '📝'
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
          🍽️ Alternatives de recettes
        </h3>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>
      </div>

      {/* Liste des alternatives existantes */}
      {alternatives.length > 0 && (
        <div className="mb-6">
          <h4 className="text-lg font-medium text-gray-700 mb-3">
            Alternatives disponibles
          </h4>
          <div className="space-y-3">
            {alternatives.map((alternative) => (
              <div
                key={alternative.id}
                className={`p-4 border rounded-lg ${
                  alternative.attributes.isSelected
                    ? 'border-green-200 bg-green-50'
                    : 'border-gray-200 bg-gray-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm font-medium text-gray-600">
                        {getReasonIcon(alternative.attributes.reason)} {getReasonLabel(alternative.attributes.reason)}
                      </span>
                      {alternative.attributes.isSelected && (
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                          Sélectionnée
                        </span>
                      )}
                    </div>
                    {alternative.attributes.reasonDetails && (
                      <p className="text-sm text-gray-600 mb-2">
                        {alternative.attributes.reasonDetails}
                      </p>
                    )}
                    <p className="text-sm text-gray-500">
                      Recette ID: {alternative.attributes.recipe?.data?.id}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleSelectAlternative(
                        alternative.id,
                        alternative.attributes.recipe?.data?.id || 0,
                        !alternative.attributes.isSelected
                      )}
                      className={`px-3 py-1 text-sm rounded ${
                        alternative.attributes.isSelected
                          ? 'bg-red-100 text-red-700 hover:bg-red-200'
                          : 'bg-green-100 text-green-700 hover:bg-green-200'
                      }`}
                    >
                      {alternative.attributes.isSelected ? 'Désélectionner' : 'Sélectionner'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Formulaire d'ajout d'alternative */}
      {!showAddForm ? (
        <button
          onClick={() => setShowAddForm(true)}
          className="w-full p-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-gray-400 hover:text-gray-700 transition-colors"
        >
          ➕ Ajouter une alternative
        </button>
      ) : (
        <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
          <h4 className="text-lg font-medium text-gray-700 mb-4">
            Nouvelle alternative
          </h4>
          
          <div className="space-y-4">
            {/* Raison du changement */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Raison du changement *
              </label>
              <select
                value={selectedReason}
                onChange={(e) => setSelectedReason(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                aria-label="Sélectionner une raison de changement"
              >
                <option value="">Sélectionner une raison</option>
                {reasons.map((reason) => (
                  <option key={reason.id} value={reason.id}>
                    {reason.icon} {reason.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Détails de la raison */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Détails (optionnel)
              </label>
              <textarea
                value={reasonDetails}
                onChange={(e) => setReasonDetails(e.target.value)}
                placeholder="Expliquez votre raison..."
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                rows={3}
              />
            </div>

            {/* Sélection de la recette */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Recette alternative *
              </label>
              <select
                value={selectedRecipeId || ''}
                onChange={(e) => setSelectedRecipeId(Number(e.target.value))}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                aria-label="Sélectionner une recette alternative"
              >
                <option value="">Sélectionner une recette</option>
                <option value={1}>Salade Quinoa Végétarienne</option>
                <option value={2}>Poulet Rôti aux Herbes</option>
                <option value={3}>Soupe de Légumes Express</option>
                <option value={4}>Pasta Carbonara Végétarienne</option>
                <option value={5}>Bowl Buddha Bowl</option>
              </select>
            </div>

            {/* Boutons d'action */}
            <div className="flex gap-3 pt-2">
              <button
                onClick={handleAddAlternative}
                disabled={!selectedReason || !selectedRecipeId}
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Ajouter l'alternative
              </button>
              <button
                onClick={() => {
                  setShowAddForm(false)
                  setSelectedReason('')
                  setReasonDetails('')
                  setSelectedRecipeId(null)
                }}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}

      {alternatives.length === 0 && !showAddForm && (
        <div className="text-center py-8 text-gray-500">
          <p>Aucune alternative disponible</p>
          <p className="text-sm">Ajoutez votre première alternative ci-dessus</p>
        </div>
      )}
    </div>
  )
} 