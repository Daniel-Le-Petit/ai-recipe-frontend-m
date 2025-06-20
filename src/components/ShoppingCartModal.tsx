'use client'

import React, { useState } from 'react'
import { X, ShoppingCart, CheckCircle } from 'lucide-react'

interface Ingredient {
  name: string
  quantity: string
}

interface ShoppingCartModalProps {
  ingredients: Ingredient[]
  onClose: () => void
  onConfirm: () => void
}

export default function ShoppingCartModal({ ingredients, onClose, onConfirm }: ShoppingCartModalProps) {
  const [selectedIngredients, setSelectedIngredients] = useState<Set<number>>(
    new Set(ingredients.map((_, index) => index))
  )

  const toggleIngredient = (index: number) => {
    const newSelected = new Set(selectedIngredients)
    if (newSelected.has(index)) {
      newSelected.delete(index)
    } else {
      newSelected.add(index)
    }
    setSelectedIngredients(newSelected)
  }

  const selectedCount = selectedIngredients.size
  const totalCount = ingredients.length

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[80vh] overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <div className="flex items-center space-x-3">
              <ShoppingCart className="h-6 w-6 text-herb-green" />
              <h2 className="font-playfair text-xl font-bold text-slate-900">
                Mon Panier d'Ingrédients
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-all duration-300"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Partner Info */}
          <div className="px-6 py-4 bg-gradient-to-r from-blue-50 to-blue-100/50 border-b border-blue-200/50">
            <div className="flex items-center space-x-3">
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Carrefour_logo.svg/2560px-Carrefour_logo.svg.png"
                alt="Carrefour"
                className="h-8 w-auto"
              />
              <div>
                <p className="text-sm font-semibold text-blue-800">
                  Prêt à être envoyé chez notre partenaire
                </p>
                <p className="text-xs text-blue-600">
                  {selectedCount} sur {totalCount} ingrédients sélectionnés
                </p>
              </div>
            </div>
          </div>

          {/* Ingredients List */}
          <div className="p-6 max-h-96 overflow-y-auto">
            <div className="space-y-3">
              {ingredients.map((ingredient, index) => (
                <div 
                  key={index}
                  className="flex items-center space-x-3 p-3 rounded-xl border border-gray-100 hover:bg-gray-50 transition-all duration-300"
                >
                  <button
                    onClick={() => toggleIngredient(index)}
                    className={`flex-shrink-0 w-5 h-5 rounded border-2 transition-all duration-300 flex items-center justify-center ${
                      selectedIngredients.has(index)
                        ? 'bg-herb-green border-herb-green text-white'
                        : 'border-gray-300 hover:border-herb-green'
                    }`}
                  >
                    {selectedIngredients.has(index) && (
                      <CheckCircle className="h-3 w-3" />
                    )}
                  </button>
                  <span className="flex-1 text-slate-700 font-medium">
                    {ingredient.name}
                  </span>
                  <span className="text-sm text-slate-500 bg-slate-100 px-2 py-1 rounded-lg">
                    {ingredient.quantity}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="p-6 border-t border-gray-100 bg-gray-50/50">
            <div className="flex space-x-3">
              <button
                onClick={onClose}
                className="flex-1 px-4 py-3 text-slate-600 hover:text-slate-800 hover:bg-white border border-gray-300 rounded-xl font-semibold transition-all duration-300"
              >
                Annuler
              </button>
              <button
                onClick={onConfirm}
                disabled={selectedCount === 0}
                className="flex-1 px-4 py-3 bg-gradient-to-r from-herb-green to-sage hover:from-herb-dark hover:to-sage-dark text-white rounded-xl font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                <ShoppingCart className="h-4 w-4" />
                <span>Valider mon panier chez Carrefour</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
} 