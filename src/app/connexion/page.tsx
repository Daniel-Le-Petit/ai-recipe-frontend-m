'use client'

import { useState } from 'react'

export default function ConnexionPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)
    
    // Simulation de connexion
    setTimeout(() => {
      if (email && password) {
        setIsLoggedIn(true)
        setError('')
        // Stocker l'email pour simuler une session
        if (typeof window !== 'undefined') {
          localStorage.setItem('user_email', email)
        }
      } else {
        setError('Veuillez remplir tous les champs')
      }
      setIsLoading(false)
    }, 1000)
  }

  if (isLoggedIn) {
    return (
      <div style={{ 
        padding: '50px', 
        textAlign: 'center',
        backgroundColor: '#f5f5f5',
        minHeight: '100vh',
        fontFamily: 'Arial, sans-serif'
      }}>
        <div style={{ 
          backgroundColor: 'white',
          padding: '40px',
          borderRadius: '10px',
          maxWidth: '500px',
          margin: '0 auto'
        }}>
          <div style={{ fontSize: '48px', marginBottom: '20px' }}>✅</div>
          <h1 style={{ color: '#20B251', fontSize: '24px', margin: '0 0 10px 0' }}>
            Connexion réussie !
          </h1>
          <p style={{ color: '#666', margin: '0 0 20px 0' }}>
            Bienvenue {email} !
          </p>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
            <a href="/mes-recettes" style={{ 
              backgroundColor: '#20B251',
              color: 'white',
              padding: '10px 20px',
              borderRadius: '5px',
              textDecoration: 'none'
            }}>
              Mes Recettes
            </a>
            <a href="/" style={{ 
              backgroundColor: '#666',
              color: 'white',
              padding: '10px 20px',
              borderRadius: '5px',
              textDecoration: 'none'
            }}>
              Accueil
            </a>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={{ 
      padding: '20px', 
      backgroundColor: '#f5f5f5', 
      minHeight: '100vh',
      fontFamily: 'Arial, sans-serif'
    }}>
      {/* Header */}
      <div style={{ 
        backgroundColor: 'white', 
        padding: '20px', 
        borderRadius: '10px',
        marginBottom: '20px',
        textAlign: 'center'
      }}>
        <button
          onClick={() => window.history.back()}
          style={{ 
            position: 'absolute',
            left: '20px',
            top: '20px',
            background: 'none',
            border: 'none',
            fontSize: '18px',
            cursor: 'pointer',
            color: '#20B251'
          }}
        >
          ← Retour
        </button>
        <h1 style={{ color: '#333', fontSize: '32px', margin: '0 0 10px 0' }}>
          🔐 Connexion
        </h1>
        <p style={{ color: '#666', fontSize: '18px', margin: '0' }}>
          Accédez à votre espace personnel
        </p>
      </div>

      {/* Navigation */}
      <div style={{ 
        backgroundColor: 'white', 
        padding: '15px', 
        borderRadius: '10px',
        marginBottom: '20px',
        textAlign: 'center'
      }}>
        <a href="/" style={{ 
          color: '#20B251', 
          margin: '0 15px', 
          textDecoration: 'none',
          fontWeight: 'bold'
        }}>Accueil</a>
        <a href="/mes-recettes" style={{ 
          color: '#20B251', 
          margin: '0 15px', 
          textDecoration: 'none',
          fontWeight: 'bold'
        }}>Mes Recettes</a>
        <a href="/creer-recette" style={{ 
          color: '#20B251', 
          margin: '0 15px', 
          textDecoration: 'none',
          fontWeight: 'bold'
        }}>Créer Recette</a>
      </div>

      {/* Login Form */}
      <div style={{ 
        backgroundColor: 'white', 
        padding: '40px', 
        borderRadius: '10px',
        maxWidth: '500px',
        margin: '0 auto'
      }}>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Email */}
          <div>
            <label htmlFor="email" style={{ 
              display: 'block', 
              color: '#333', 
              fontWeight: 'bold',
              marginBottom: '8px'
            }}>
              📧 Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="votre@email.com"
              style={{ 
                width: '100%',
                padding: '12px',
                border: '1px solid #ddd',
                borderRadius: '5px',
                fontSize: '16px'
              }}
              required
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" style={{ 
              display: 'block', 
              color: '#333', 
              fontWeight: 'bold',
              marginBottom: '8px'
            }}>
              🔒 Mot de passe
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
              style={{ 
                width: '100%',
                padding: '12px',
                border: '1px solid #ddd',
                borderRadius: '5px',
                fontSize: '16px'
              }}
              required
            />
          </div>

          {/* Error message */}
          {error && (
            <div style={{ 
              backgroundColor: '#fee',
              border: '1px solid #fcc',
              color: '#c33',
              padding: '12px',
              borderRadius: '5px',
              fontSize: '14px'
            }}>
              ❌ {error}
            </div>
          )}

          {/* Submit button */}
          <button
            type="submit"
            disabled={isLoading}
            style={{ 
              backgroundColor: isLoading ? '#ccc' : '#20B251',
              color: 'white',
              padding: '15px',
              border: 'none',
              borderRadius: '5px',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              opacity: isLoading ? 0.7 : 1
            }}
          >
            {isLoading ? (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                <div style={{ 
                  width: '20px',
                  height: '20px',
                  border: '2px solid #fff',
                  borderTop: '2px solid transparent',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite'
                }}></div>
                Connexion en cours...
              </div>
            ) : (
              '🔐 Se connecter'
            )}
          </button>

          {/* Demo credentials */}
          <div style={{ 
            backgroundColor: '#f0f8ff',
            padding: '15px',
            borderRadius: '5px',
            fontSize: '14px',
            color: '#666'
          }}>
            <p style={{ margin: '0 0 10px 0', fontWeight: 'bold' }}>💡 Démo :</p>
            <p style={{ margin: '0' }}>Email: demo@example.com</p>
            <p style={{ margin: '0' }}>Mot de passe: (n'importe quoi)</p>
          </div>
        </form>
      </div>

      {/* Footer */}
      <div style={{ 
        backgroundColor: 'white', 
        padding: '15px', 
        borderRadius: '10px',
        marginTop: '20px',
        textAlign: 'center',
        color: '#666',
        fontSize: '14px'
      }}>
        <p>✅ Page "Connexion" fonctionnelle avec simulation</p>
        <p>Dernière mise à jour: 23/07/2025 11:30:00</p>
      </div>

      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}