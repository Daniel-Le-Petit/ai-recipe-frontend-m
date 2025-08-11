'use client'

import React from 'react'
import { FadeIn } from './FadeIn'

interface Recipe {
  id: string
  title: string
  description: string
  ingredients: string[]
  instructions: string[]
  duration: number
  servings: number
  difficulty: string
  category: string
  image?: string
  cookingMode?: string
}

interface RecipeSelectionScreenProps {
  selectedRecipe: Recipe
  onConnectToMerchant: () => void
  onStartCooking: () => void
  onBackToRecipes: () => void
}

export const RecipeSelectionScreen: React.FC<RecipeSelectionScreenProps> = ({
  selectedRecipe,
  onConnectToMerchant,
  onStartCooking,
  onBackToRecipes
}) => {
  return (
    <FadeIn delay={1600}>
      <div>
        {/* Titre de l'étape */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h2 style={{ 
            color: '#1f2937', 
            fontSize: '32px', 
            margin: '0 0 20px 0',
            fontWeight: 'bold'
          }}>
            🎯 {selectedRecipe.title}
          </h2>
          <p style={{ 
            color: '#6b7280', 
            fontSize: '18px', 
            margin: '0'
          }}>
            Que souhaitez-vous faire avec cette recette ?
          </p>
        </div>

        {/* Boutons d'action */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '30px',
          maxWidth: '800px',
          margin: '0 auto 40px auto'
        }}>
          {/* Bouton 1: Se connecter au commerçant */}
          <div style={{
            backgroundColor: 'white',
            border: '3px solid #20B251',
            borderRadius: '20px',
            padding: '40px 30px',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden'
          }}
          onClick={onConnectToMerchant}
          onMouseEnter={(e) => {
            const target = e.currentTarget as HTMLElement
            if (target && target.style) {
              target.style.backgroundColor = '#f0fdf4'
              target.style.transform = 'translateY(-4px)'
              target.style.boxShadow = '0 8px 25px rgba(32, 178, 81, 0.2)'
            }
          }}
          onMouseLeave={(e) => {
            const target = e.currentTarget as HTMLElement
            if (target && target.style) {
              target.style.backgroundColor = 'white'
              target.style.transform = 'translateY(0)'
              target.style.boxShadow = 'none'
            }
          }}
          >
            {/* Icône du commerçant */}
            <div style={{ 
              fontSize: '64px', 
              marginBottom: '20px',
              filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.1))'
            }}>
              🛒
            </div>

            {/* Titre */}
            <h3 style={{ 
              color: '#1f2937', 
              fontSize: '26px', 
              margin: '0 0 15px 0',
              fontWeight: 'bold'
            }}>
              Se connecter au commerçant
            </h3>

            {/* Description */}
            <p style={{ 
              color: '#6b7280', 
              fontSize: '16px', 
              margin: '0 0 20px 0',
              lineHeight: '1.5'
            }}>
              Commandez vos ingrédients auprès de nos partenaires
            </p>

            {/* Logos des commerçants */}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '15px',
              marginBottom: '20px'
            }}>
              <div style={{
                backgroundColor: '#f3f4f6',
                padding: '8px 12px',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: 'bold',
                color: '#1f2937'
              }}>
                🟢 Auchan
              </div>
              <div style={{
                backgroundColor: '#f3f4f6',
                padding: '8px 12px',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: 'bold',
                color: '#1f2937'
              }}>
                🔵 Carrefour
              </div>
              <div style={{
                backgroundColor: '#f3f4f6',
                padding: '8px 12px',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: 'bold',
                color: '#1f2937'
              }}>
                🟡 Intermarché
              </div>
            </div>

            {/* Avantages */}
            <div style={{
              backgroundColor: '#f0fdf4',
              borderRadius: '12px',
              padding: '15px',
              textAlign: 'left'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '8px'
              }}>
                <span style={{ color: '#20B251', fontSize: '16px' }}>✓</span>
                <span style={{ 
                  color: '#1f2937',
                  fontSize: '14px',
                  fontWeight: '500'
                }}>
                  Livraison à domicile
                </span>
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '8px'
              }}>
                <span style={{ color: '#20B251', fontSize: '16px' }}>✓</span>
                <span style={{ 
                  color: '#1f2937',
                  fontSize: '14px',
                  fontWeight: '500'
                }}>
                  Prix compétitifs
                </span>
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <span style={{ color: '#20B251', fontSize: '16px' }}>✓</span>
                <span style={{ 
                  color: '#1f2937',
                  fontSize: '14px',
                  fontWeight: '500'
                }}>
                  Produits frais garantis
                </span>
              </div>
            </div>
          </div>

          {/* Bouton 2: Exécuter la recette pas à pas */}
          <div style={{
            backgroundColor: 'white',
            border: '3px solid #3b82f6',
            borderRadius: '20px',
            padding: '40px 30px',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden'
          }}
          onClick={onStartCooking}
          onMouseEnter={(e) => {
            const target = e.currentTarget as HTMLElement
            if (target && target.style) {
              target.style.backgroundColor = '#eff6ff'
              target.style.transform = 'translateY(-4px)'
              target.style.boxShadow = '0 8px 25px rgba(59, 130, 246, 0.2)'
            }
          }}
          onMouseLeave={(e) => {
            const target = e.currentTarget as HTMLElement
            if (target && target.style) {
              target.style.backgroundColor = 'white'
              target.style.transform = 'translateY(0)'
              target.style.boxShadow = 'none'
            }
          }}
          >
            {/* Icône de cuisson */}
            <div style={{ 
              fontSize: '64px', 
              marginBottom: '20px',
              filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.1))'
            }}>
              👨‍🍳
            </div>

            {/* Titre */}
            <h3 style={{ 
              color: '#1f2937', 
              fontSize: '26px', 
              margin: '0 0 15px 0',
              fontWeight: 'bold'
            }}>
              Exécuter la recette pas à pas
            </h3>

            {/* Description */}
            <p style={{ 
              color: '#6b7280', 
              fontSize: '16px', 
              margin: '0 0 20px 0',
              lineHeight: '1.5'
            }}>
              Suivez les instructions étape par étape avec guidage
            </p>

            {/* Fonctionnalités */}
            <div style={{
              backgroundColor: '#eff6ff',
              borderRadius: '12px',
              padding: '15px',
              textAlign: 'left'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '8px'
              }}>
                <span style={{ color: '#3b82f6', fontSize: '16px' }}>✓</span>
                <span style={{ 
                  color: '#1f2937',
                  fontSize: '14px',
                  fontWeight: '500'
                }}>
                  Instructions détaillées
                </span>
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '8px'
              }}>
                <span style={{ color: '#3b82f6', fontSize: '16px' }}>✓</span>
                <span style={{ 
                  color: '#1f2937',
                  fontSize: '14px',
                  fontWeight: '500'
                }}>
                  Timer intégré
                </span>
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <span style={{ color: '#3b82f6', fontSize: '16px' }}>✓</span>
                <span style={{ 
                  color: '#1f2937',
                  fontSize: '14px',
                  fontWeight: '500'
                }}>
                  Mode {selectedRecipe.cookingMode || 'manuel'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bouton retour */}
        <div style={{ textAlign: 'center' }}>
          <button
            onClick={onBackToRecipes}
            style={{
              backgroundColor: 'white',
              color: '#6b7280',
              border: '2px solid #e5e7eb',
              borderRadius: '12px',
              padding: '12px 24px',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px'
            }}
            onMouseEnter={(e) => {
              const target = e.target as HTMLElement
              if (target && target.style) {
                target.style.backgroundColor = '#f9fafb'
                target.style.borderColor = '#d1d5db'
              }
            }}
            onMouseLeave={(e) => {
              const target = e.target as HTMLElement
              if (target && target.style) {
                target.style.backgroundColor = 'white'
                target.style.borderColor = '#e5e7eb'
              }
            }}
          >
            ← Retour aux recettes
          </button>
        </div>
      </div>
    </FadeIn>
  )
}
