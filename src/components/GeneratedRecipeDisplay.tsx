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

interface GeneratedRecipeDisplayProps {
  generatedRecipe: Recipe | null
  onRecipeSelect: (recipe: Recipe) => void
  onViewOtherRecipes: () => void
  onCreateNewRecipe: () => void
}

// Recettes simulées pour la démonstration
const MOCK_RECIPES: Recipe[] = [
  {
    id: '1',
    title: 'Salade composée aux tomates et basilic',
    description: 'Une salade fraîche et colorée parfaite pour l\'été',
    ingredients: ['Tomates', 'Basilic', 'Mozzarella', 'Huile d\'olive', 'Vinaigre balsamique'],
    instructions: [
      'Lavez et coupez les tomates en quartiers',
      'Tranchez la mozzarella',
      'Arrangez les tomates et la mozzarella sur un plat',
      'Ajoutez le basilic frais',
      'Arrosez d\'huile d\'olive et de vinaigre balsamique',
      'Salez et poivrez selon vos goûts'
    ],
    duration: 15,
    servings: 4,
    difficulty: 'Facile',
    category: 'entree',
    image: '/Images/entree-category.svg'
  },
  {
    id: '2',
    title: 'Risotto aux légumes de saison',
    description: 'Un risotto crémeux et réconfortant',
    ingredients: ['Riz Arborio', 'Légumes de saison', 'Parmesan', 'Bouillon de légumes'],
    instructions: [
      'Faites revenir les légumes dans l\'huile d\'olive',
      'Ajoutez le riz et faites-le nacrer',
      'Versez le bouillon progressivement en remuant',
      'Ajoutez le parmesan à la fin',
      'Laissez reposer 2 minutes avant de servir'
    ],
    duration: 30,
    servings: 4,
    difficulty: 'Intermédiaire',
    category: 'plat-principal',
    image: '/Images/plat-principal-category.svg'
  },
  {
    id: '3',
    title: 'Tarte aux fruits rouges',
    description: 'Une tarte légère et fruitée',
    ingredients: ['Pâte sablée', 'Fruits rouges', 'Crème pâtissière', 'Gelée de fruits'],
    instructions: [
      'Préchauffez le four à 180°C',
      'Foncez le moule avec la pâte',
      'Préparez la crème pâtissière',
      'Disposez les fruits sur la crème',
      'Nappez de gelée et laissez refroidir'
    ],
    duration: 45,
    servings: 6,
    difficulty: 'Intermédiaire',
    category: 'dessert',
    image: '/Images/dessert-category.svg'
  }
]

export const GeneratedRecipeDisplay: React.FC<GeneratedRecipeDisplayProps> = ({
  generatedRecipe,
  onRecipeSelect,
  onViewOtherRecipes,
  onCreateNewRecipe
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
            🎉 Votre recette a été générée !
          </h2>
          <p style={{ 
            color: '#6b7280', 
            fontSize: '18px', 
            margin: '0'
          }}>
            Découvrez votre recette personnalisée et d'autres suggestions
          </p>
        </div>

        {/* Recette générée */}
        {generatedRecipe && (
          <div style={{
            backgroundColor: '#f0fdf4',
            border: '2px solid #20B251',
            borderRadius: '20px',
            padding: '30px',
            marginBottom: '40px',
            position: 'relative'
          }}>
            <div style={{
              position: 'absolute',
              top: '-15px',
              left: '50%',
              transform: 'translateX(-50%)',
              backgroundColor: '#20B251',
              color: 'white',
              padding: '8px 20px',
              borderRadius: '20px',
              fontSize: '14px',
              fontWeight: 'bold'
            }}>
              ✨ Votre recette personnalisée
            </div>

            <div style={{ textAlign: 'center', marginBottom: '25px' }}>
              <h3 style={{ 
                color: '#1f2937', 
                fontSize: '28px', 
                margin: '0 0 10px 0',
                fontWeight: 'bold'
              }}>
                {generatedRecipe.title}
              </h3>
              <p style={{ 
                color: '#6b7280', 
                fontSize: '18px', 
                margin: '0'
              }}>
                {generatedRecipe.description}
              </p>
            </div>

            {/* Détails de la recette */}
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
              gap: '20px',
              marginBottom: '25px'
            }}>
              <div style={{
                backgroundColor: 'white',
                borderRadius: '12px',
                padding: '15px',
                textAlign: 'center',
                border: '1px solid #d1fae5'
              }}>
                <div style={{ fontSize: '24px', marginBottom: '8px' }}>⏱️</div>
                <div style={{ 
                  color: '#1f2937',
                  fontSize: '16px',
                  fontWeight: 'bold'
                }}>
                  {generatedRecipe.duration} min
                </div>
              </div>

              <div style={{
                backgroundColor: 'white',
                borderRadius: '12px',
                padding: '15px',
                textAlign: 'center',
                border: '1px solid #d1fae5'
              }}>
                <div style={{ fontSize: '24px', marginBottom: '8px' }}>👥</div>
                <div style={{ 
                  color: '#1f2937',
                  fontSize: '16px',
                  fontWeight: 'bold'
                }}>
                  {generatedRecipe.servings} personne{generatedRecipe.servings > 1 ? 's' : ''}
                </div>
              </div>

              <div style={{
                backgroundColor: 'white',
                borderRadius: '12px',
                padding: '15px',
                textAlign: 'center',
                border: '1px solid #d1fae5'
              }}>
                <div style={{ fontSize: '24px', marginBottom: '8px' }}>📊</div>
                <div style={{ 
                  color: '#1f2937',
                  fontSize: '16px',
                  fontWeight: 'bold'
                }}>
                  {generatedRecipe.difficulty}
                </div>
              </div>
            </div>

            {/* Ingrédients et instructions */}
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
              gap: '25px',
              marginBottom: '25px'
            }}>
              {/* Ingrédients */}
              <div>
                <h4 style={{ 
                  color: '#1f2937', 
                  fontSize: '20px', 
                  margin: '0 0 15px 0',
                  fontWeight: 'bold'
                }}>
                  🥬 Ingrédients
                </h4>
                <ul style={{ 
                  listStyle: 'none', 
                  padding: '0',
                  margin: '0'
                }}>
                  {generatedRecipe.ingredients.map((ingredient, index) => (
                    <li key={index} style={{
                      backgroundColor: 'white',
                      padding: '8px 12px',
                      marginBottom: '8px',
                      borderRadius: '8px',
                      border: '1px solid #d1fae5',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}>
                      <span style={{ 
                        color: '#20B251',
                        fontSize: '16px'
                      }}>
                        •
                      </span>
                      <span style={{ 
                        color: '#1f2937',
                        fontSize: '14px'
                      }}>
                        {ingredient}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Instructions */}
              <div>
                <h4 style={{ 
                  color: '#1f2937', 
                  fontSize: '20px', 
                  margin: '0 0 15px 0',
                  fontWeight: 'bold'
                }}>
                  📝 Instructions
                </h4>
                <ol style={{ 
                  padding: '0',
                  margin: '0',
                  counterReset: 'step-counter'
                }}>
                  {generatedRecipe.instructions.map((instruction, index) => (
                    <li key={index} style={{
                      backgroundColor: 'white',
                      padding: '12px 16px',
                      marginBottom: '8px',
                      borderRadius: '8px',
                      border: '1px solid #d1fae5',
                      counterIncrement: 'step-counter',
                      position: 'relative',
                      paddingLeft: '45px'
                    }}>
                      <span style={{
                        position: 'absolute',
                        left: '12px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        backgroundColor: '#20B251',
                        color: 'white',
                        width: '24px',
                        height: '24px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '12px',
                        fontWeight: 'bold'
                      }}>
                        {index + 1}
                      </span>
                      <span style={{ 
                        color: '#1f2937',
                        fontSize: '14px',
                        lineHeight: '1.4'
                      }}>
                        {instruction}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            {/* Bouton pour commencer la cuisson */}
            <div style={{ textAlign: 'center' }}>
              <button
                onClick={() => onRecipeSelect(generatedRecipe)}
                style={{
                  backgroundColor: '#20B251',
                  color: 'white',
                  border: 'none',
                  borderRadius: '16px',
                  padding: '18px 36px',
                  fontSize: '18px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '12px'
                }}
                onMouseEnter={(e) => {
                  const target = e.target as HTMLElement
                  if (target && target.style) {
                    target.style.backgroundColor = '#1a8f42'
                    target.style.transform = 'translateY(-2px)'
                    target.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.15)'
                  }
                }}
                onMouseLeave={(e) => {
                  const target = e.target as HTMLElement
                  if (target && target.style) {
                    target.style.backgroundColor = '#20B251'
                    target.style.transform = 'translateY(0)'
                    target.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)'
                  }
                }}
              >
                <span style={{ fontSize: '24px' }}>👨‍🍳</span>
                Commencer la cuisson
              </button>
            </div>
          </div>
        )}

        {/* Autres recettes similaires */}
        <div style={{ marginBottom: '40px' }}>
          <h3 style={{ 
            color: '#1f2937', 
            fontSize: '24px', 
            margin: '0 0 20px 0',
            fontWeight: 'bold',
            textAlign: 'center'
          }}>
            🍽️ Découvrez d'autres recettes
          </h3>
          <p style={{ 
            color: '#6b7280', 
            fontSize: '16px', 
            margin: '0 0 25px 0',
            textAlign: 'center'
          }}>
            Voici 3 recettes qui pourraient vous plaire
          </p>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
            gap: '20px'
          }}>
            {MOCK_RECIPES.slice(0, 3).map((recipe) => (
              <div
                key={recipe.id}
                style={{
                  backgroundColor: 'white',
                  border: '2px solid #e5e7eb',
                  borderRadius: '16px',
                  padding: '20px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  position: 'relative'
                }}
                onClick={() => onRecipeSelect(recipe)}
                onMouseEnter={(e) => {
                  const target = e.currentTarget as HTMLElement
                  if (target && target.style) {
                    target.style.borderColor = '#20B251'
                    target.style.backgroundColor = '#f0fdf4'
                    target.style.transform = 'translateY(-2px)'
                  }
                }}
                onMouseLeave={(e) => {
                  const target = e.currentTarget as HTMLElement
                  if (target && target.style) {
                    target.style.borderColor = '#e5e7eb'
                    target.style.backgroundColor = 'white'
                    target.style.transform = 'translateY(0)'
                  }
                }}
              >
                {/* Image de la recette */}
                <div style={{
                  width: '100%',
                  height: '120px',
                  backgroundColor: '#f3f4f6',
                  borderRadius: '12px',
                  marginBottom: '15px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '48px'
                }}>
                  {recipe.image ? (
                    <img 
                      src={recipe.image} 
                      alt={recipe.title}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        borderRadius: '12px'
                      }}
                    />
                  ) : (
                    '🍽️'
                  )}
                </div>

                {/* Titre et description */}
                <h4 style={{ 
                  color: '#1f2937', 
                  fontSize: '18px', 
                  margin: '0 0 8px 0',
                  fontWeight: 'bold'
                }}>
                  {recipe.title}
                </h4>
                <p style={{ 
                  color: '#6b7280', 
                  fontSize: '14px', 
                  margin: '0 0 15px 0',
                  lineHeight: '1.4'
                }}>
                  {recipe.description}
                </p>

                {/* Détails rapides */}
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <span style={{
                    backgroundColor: '#f3f4f6',
                    color: '#6b7280',
                    padding: '4px 8px',
                    borderRadius: '6px',
                    fontSize: '12px',
                    fontWeight: '500'
                  }}>
                    ⏱️ {recipe.duration} min
                  </span>
                  <span style={{
                    backgroundColor: '#f3f4f6',
                    color: '#6b7280',
                    padding: '4px 8px',
                    borderRadius: '6px',
                    fontSize: '12px',
                    fontWeight: '500'
                  }}>
                    👥 {recipe.servings}
                  </span>
                  <span style={{
                    backgroundColor: '#f3f4f6',
                    color: '#6b7280',
                    padding: '4px 8px',
                    borderRadius: '6px',
                    fontSize: '12px',
                    fontWeight: '500'
                  }}>
                    📊 {recipe.difficulty}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Options d'action */}
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column',
          gap: '20px',
          maxWidth: '600px',
          margin: '0 auto'
        }}>
          {/* Option 1: Voir d'autres recettes */}
          <div style={{
            backgroundColor: 'white',
            border: '2px solid #e5e7eb',
            borderRadius: '16px',
            padding: '30px',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            textAlign: 'center'
          }}
          onClick={onViewOtherRecipes}
          onMouseEnter={(e) => {
            const target = e.currentTarget as HTMLElement
            if (target && target.style) {
              target.style.borderColor = '#20B251'
              target.style.backgroundColor = '#f0fdf4'
              target.style.transform = 'translateY(-2px)'
            }
          }}
          onMouseLeave={(e) => {
            const target = e.currentTarget as HTMLElement
            if (target && target.style) {
              target.style.borderColor = '#e5e7eb'
              target.style.backgroundColor = 'white'
              target.style.transform = 'translateY(0)'
            }
          }}
          >
            <div style={{ fontSize: '48px', marginBottom: '15px' }}>📚</div>
            <h3 style={{ 
              color: '#1f2937', 
              fontSize: '24px', 
              margin: '0 0 10px 0',
              fontWeight: 'bold'
            }}>
              Voir d'autres recettes
            </h3>
            <p style={{ 
              color: '#6b7280', 
              fontSize: '16px', 
              margin: '0'
            }}>
              Découvrez notre collection de recettes existantes
            </p>
          </div>

          {/* Option 2: Créer une nouvelle recette */}
          <div style={{
            backgroundColor: 'white',
            border: '2px solid #e5e7eb',
            borderRadius: '16px',
            padding: '30px',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            textAlign: 'center'
          }}
          onClick={onCreateNewRecipe}
          onMouseEnter={(e) => {
            const target = e.currentTarget as HTMLElement
            if (target && target.style) {
              target.style.borderColor = '#20B251'
              target.style.backgroundColor = '#f0fdf4'
              target.style.transform = 'translateY(-2px)'
            }
          }}
          onMouseLeave={(e) => {
            const target = e.currentTarget as HTMLElement
            if (target && target.style) {
              target.style.borderColor = '#e5e7eb'
              target.style.backgroundColor = 'white'
              target.style.transform = 'translateY(0)'
            }
          }}
          >
            <div style={{ fontSize: '48px', marginBottom: '15px' }}>✨</div>
            <h3 style={{ 
              color: '#1f2937', 
              fontSize: '24px', 
              margin: '0 0 10px 0',
              fontWeight: 'bold'
            }}>
              Créer une nouvelle recette
            </h3>
            <p style={{ 
              color: '#6b7280', 
              fontSize: '16px', 
              margin: '0'
            }}>
              Recommencer le processus avec de nouveaux ingrédients
            </p>
          </div>
        </div>
      </div>
    </FadeIn>
  )
}
