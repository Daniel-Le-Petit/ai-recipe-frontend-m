'use client'

import { RecipeCard, RecipeCardHorizontal } from '../components/RecipeCard'
import { FadeIn } from '../components/FadeIn'
import { SlideIn } from '../components/SlideIn'
import { Pulse } from '../components/Pulse'
import { StaggeredList } from '../components/StaggeredList'

// Données de test pour les recettes
const mockRecipes = [
  {
    id: 1,
    title: 'Poulet rôti aux herbes',
    description: 'Un délicieux poulet rôti avec des herbes fraîches',
    duration: 45,
    difficulty: 'Facile',
    servings: 4,
    rating: 4.5,
    image: '/Images/fallback-recipe.jpg',
    recipeState: 'approved',
    isRobotCompatible: true
  },
  {
    id: 2,
    title: 'Salade composée méditerranéenne',
    description: 'Une salade fraîche et colorée',
    duration: 20,
    difficulty: 'Facile',
    servings: 2,
    rating: 4.2,
    image: '/Images/fallback-recipe.jpg',
    recipeState: 'saved',
    isRobotCompatible: false
  },
  {
    id: 3,
    title: 'Tarte aux pommes traditionnelle',
    description: 'La recette de grand-mère',
    duration: 90,
    difficulty: 'Intermédiaire',
    servings: 6,
    rating: 4.8,
    image: '/Images/fallback-recipe.jpg',
    recipeState: 'completed',
    isRobotCompatible: true
  },
  {
    id: 4,
    title: 'Risotto aux champignons',
    description: 'Un risotto crémeux et parfumé',
    duration: 35,
    difficulty: 'Intermédiaire',
    servings: 3,
    rating: 4.3,
    image: '/Images/fallback-recipe.jpg',
    recipeState: 'draft',
    isRobotCompatible: false
  }
]

export default function HomePage() {
  const handleStartCooking = (recipe: any) => {
    console.log('Commencer la cuisson:', recipe.title)
    window.location.href = `/cuisson-guidee?id=${recipe.id}`
  }

  const handleFavorite = (recipe: any) => {
    console.log('Ajouter aux favoris:', recipe.title)
  }

  return (
    <div style={{ 
      padding: '24px', 
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #f1f5f9 100%)',
      minHeight: '100vh',
      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      {/* Hero Section avec design moderne */}
      <SlideIn direction="down" delay={200}>
        <div style={{
          background: 'white',
          borderRadius: '24px',
          padding: '60px 40px',
          marginBottom: '40px',
          color: '#10b981',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: '0 20px 60px rgba(0,0,0,0.08)',
          border: '1px solid rgba(0,0,0,0.03)'
        }}>
          {/* Éléments décoratifs animés */}
          <div style={{
            position: 'absolute',
            top: '-80px',
            right: '-80px',
            width: '300px',
            height: '300px',
            background: 'radial-gradient(circle, rgba(16, 185, 129, 0.05) 0%, rgba(16, 185, 129, 0.02) 70%, transparent 100%)',
            borderRadius: '50%',
            zIndex: 1,
            animation: 'float 6s ease-in-out infinite'
          }} />
          <div style={{
            position: 'absolute',
            bottom: '-60px',
            left: '-60px',
            width: '250px',
            height: '250px',
            background: 'radial-gradient(circle, rgba(16, 185, 129, 0.04) 0%, rgba(16, 185, 129, 0.01) 70%, transparent 100%)',
            borderRadius: '50%',
            zIndex: 1,
            animation: 'float 8s ease-in-out infinite reverse'
          }} />
          
          <div style={{ position: 'relative', zIndex: 2 }}>
            <FadeIn delay={400}>
              <div style={{
                fontSize: '42px',
                fontWeight: '800',
                marginBottom: '20px',
                textShadow: '0 4px 8px rgba(0,0,0,0.1)',
                color: '#20B251',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '16px'
              }}>
                <img 
                  src="/main-image-cart.svg" 
                  alt="AI & Fines Herbes"
                  style={{
                    width: '42px',
                    height: '42px',
                    objectFit: 'contain'
                  }}
                />
                AI & Fines Herbes
              </div>
            </FadeIn>
            <FadeIn delay={600}>
              <p style={{
                fontSize: '20px',
                marginBottom: '40px',
                lineHeight: '1.7',
                maxWidth: '600px',
                margin: '0 auto 40px auto',
                fontWeight: '400',
                color: '#64748b'
              }}>
                Découvrez l'art culinaire avec l'intelligence artificielle
              </p>
            </FadeIn>
            <FadeIn delay={800}>
              <Pulse>
                <button
                  onClick={() => window.location.href = '/creer-recette'}
                  style={{
                    background: 'linear-gradient(135deg, #20B251 0%, #1a8f42 50%, #147a3a 100%)',
                    color: 'white',
                    padding: '18px 36px',
                    border: 'none',
                    borderRadius: '60px',
                    fontSize: '18px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    boxShadow: '0 12px 40px rgba(32, 178, 81, 0.3)',
                    textTransform: 'none',
                    letterSpacing: '0.3px'
                  }}
                  onMouseEnter={(e) => {
                    (e.target as HTMLButtonElement).style.transform = 'translateY(-3px) scale(1.02)';
                    (e.target as HTMLButtonElement).style.boxShadow = '0 20px 60px rgba(32, 178, 81, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    (e.target as HTMLButtonElement).style.transform = 'translateY(0) scale(1)';
                    (e.target as HTMLButtonElement).style.boxShadow = '0 12px 40px rgba(32, 178, 81, 0.3)';
                  }}
                >
                  Créer une recette
                </button>
              </Pulse>
            </FadeIn>
          </div>
        </div>
      </SlideIn>

      {/* Section Plan repas avec design moderne */}
      <SlideIn direction="up" delay={1000}>
        <div style={{
          background: 'white',
          borderRadius: '24px',
          padding: '50px',
          marginBottom: '40px',
          boxShadow: '0 20px 60px rgba(0,0,0,0.08)',
          border: '1px solid rgba(0,0,0,0.03)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Fond décoratif */}
          <div style={{
            position: 'absolute',
            top: '0',
            right: '0',
            width: '200px',
            height: '200px',
            background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
            borderRadius: '0 24px 0 200px',
            zIndex: 1
          }} />
          
          <div style={{ position: 'relative', zIndex: 2 }}>
            <FadeIn delay={1200}>
              <div style={{
                textAlign: 'center',
                marginBottom: '40px'
              }}>
                <h2 style={{
                  color: '#20B251',
                  fontSize: '36px',
                  fontWeight: '800',
                  marginBottom: '16px'
                }}>
                  📅 Plan repas de la semaine
                </h2>
                <p style={{
                  color: '#64748b',
                  fontSize: '20px',
                  lineHeight: '1.7',
                  maxWidth: '600px',
                  margin: '0 auto',
                  fontWeight: '400'
                }}>
                  Créez votre plan de semaine personnalisé ! Choisissez vos types de repas préférés et laissez notre IA créer votre menu sur-mesure.
                </p>
              </div>
            </FadeIn>
            

            
            <FadeIn delay={1600}>
              <div style={{ textAlign: 'center' }}>
                <button
                  onClick={() => window.location.href = '/plan-semaine'}
                  style={{
                    background: 'linear-gradient(135deg, #20B251 0%, #1a8f42 50%, #147a3a 100%)',
                    color: 'white',
                    padding: '18px 36px',
                    border: 'none',
                    borderRadius: '60px',
                    fontSize: '18px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    boxShadow: '0 12px 40px rgba(32, 178, 81, 0.3)',
                    textTransform: 'none',
                    letterSpacing: '0.3px'
                  }}
                  onMouseEnter={(e) => {
                    (e.target as HTMLButtonElement).style.transform = 'translateY(-3px) scale(1.02)';
                    (e.target as HTMLButtonElement).style.boxShadow = '0 20px 60px rgba(32, 178, 81, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    (e.target as HTMLButtonElement).style.transform = 'translateY(0) scale(1)';
                    (e.target as HTMLButtonElement).style.boxShadow = '0 12px 40px rgba(32, 178, 81, 0.3)';
                  }}
                >
                  Créer mon plan de semaine personnalisé
                </button>
              </div>
            </FadeIn>
          </div>
        </div>
      </SlideIn>

      {/* Section Recettes populaires avec design amélioré */}
      <SlideIn direction="left" delay={1800}>
        <div style={{ 
          background: 'white',
          borderRadius: '24px',
          padding: '40px', 
          marginBottom: '30px',
          boxShadow: '0 20px 60px rgba(0,0,0,0.08)',
          border: '1px solid rgba(0,0,0,0.03)'
        }}>
          <FadeIn delay={2000}>
            <h2 style={{ 
              color: '#20B251', 
              fontSize: '32px', 
              margin: '0 0 30px 0', 
              textAlign: 'center',
              fontWeight: '800'
            }}>
              🏆 Recettes populaires
            </h2>
          </FadeIn>
          <div style={{ padding: '0 20px' }}>
            <RecipeCardHorizontal
              recipes={mockRecipes}
              title=""
              onStartCooking={handleStartCooking}
              onFavorite={handleFavorite}
              showStatus={true}
              showRating={true}
              compact={true}
            />
          </div>
        </div>
      </SlideIn>

      {/* Section Recettes récentes avec design amélioré */}
      <SlideIn direction="right" delay={2200}>
        <div style={{ 
          background: 'white',
          borderRadius: '24px',
          padding: '40px', 
          marginBottom: '30px',
          boxShadow: '0 20px 60px rgba(0,0,0,0.08)',
          border: '1px solid rgba(0,0,0,0.03)'
        }}>
          <FadeIn delay={2400}>
            <h2 style={{ 
              color: '#20B251', 
              fontSize: '32px', 
              margin: '0 0 30px 0', 
              textAlign: 'center',
              fontWeight: '800'
            }}>
              ⏰ Recettes récentes
            </h2>
          </FadeIn>
          <div style={{ padding: '0 20px' }}>
            <RecipeCardHorizontal
              recipes={mockRecipes}
              title=""
              onStartCooking={handleStartCooking}
              onFavorite={handleFavorite}
              showStatus={true}
              showRating={true}
              compact={true}
              customColors={{
                duration: { bg: '#eff6ff', text: '#1e40af' },
                servings: { bg: '#faf5ff', text: '#7c3aed' },
                difficulty: { bg: '#f0fdf4', text: '#059669' },
                rating: { bg: '#fffbeb', text: '#d97706' }
              }}
            />
          </div>
        </div>
      </SlideIn>

      {/* Section Recettes compatibles robot avec design amélioré */}
      <FadeIn delay={2600}>
        <div style={{ 
          background: 'white',
          borderRadius: '24px',
          padding: '40px', 
          marginBottom: '30px',
          boxShadow: '0 20px 60px rgba(0,0,0,0.08)',
          border: '1px solid rgba(0,0,0,0.03)'
        }}>
          <h2 style={{ 
            color: '#20B251', 
            fontSize: '32px', 
            margin: '0 0 30px 0', 
            textAlign: 'center',
            fontWeight: '800'
          }}>
            🤖 Recettes compatibles robot
          </h2>
          <div style={{ padding: '0 20px' }}>
            <RecipeCardHorizontal
              recipes={mockRecipes.filter(r => r.isRobotCompatible)}
              title=""
              onStartCooking={handleStartCooking}
              onFavorite={handleFavorite}
              showStatus={false}
              showRating={true}
              compact={true}
            />
          </div>
        </div>
      </FadeIn>

      {/* Footer avec design amélioré */}
      <FadeIn delay={2800}>
        <div style={{ 
          background: 'white',
          borderRadius: '20px',
          padding: '30px', 
          textAlign: 'center',
          color: '#64748b',
          fontSize: '16px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
          border: '1px solid rgba(0,0,0,0.03)'
        }}>
          <p style={{ margin: '0 0 8px 0', fontWeight: '600' }}>✅ Page d'accueil avec animations avancées et planification de repas</p>
          <p style={{ margin: '0', opacity: '0.8' }}>Dernière mise à jour: 23/07/2025 12:00:00</p>
        </div>
      </FadeIn>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
      `}</style>
    </div>
  )
} 