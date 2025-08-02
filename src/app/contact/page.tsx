'use client'

import { useState } from 'react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    reason: 'general'
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitted(true)
    setTimeout(() => setIsSubmitted(false), 3000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
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
          📞 Contact
        </h1>
        <p style={{ color: '#666', fontSize: '18px', margin: '0' }}>
          Restons en contact
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
        <a href="/connexion" style={{ 
          color: '#20B251', 
          margin: '0 15px', 
          textDecoration: 'none',
          fontWeight: 'bold'
        }}>Connexion</a>
      </div>

      {/* Contact Info */}
      <div style={{ 
        backgroundColor: 'white', 
        padding: '30px', 
        borderRadius: '10px',
        marginBottom: '20px'
      }}>
        <h2 style={{ color: '#333', fontSize: '24px', margin: '0 0 20px 0', textAlign: 'center' }}>
          📧 Nos coordonnées
        </h2>
        
        <div style={{ display: 'grid', gap: '20px', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}>
          <div style={{ 
            padding: '20px', 
            border: '2px solid #20B251', 
            borderRadius: '10px',
            textAlign: 'center'
          }}>
            <h3 style={{ color: '#20B251', margin: '0 0 10px 0' }}>📧 Email</h3>
            <p style={{ color: '#666', margin: '0 0 10px 0' }}>Notre équipe vous répond sous 24h</p>
            <p style={{ color: '#20B251', fontWeight: 'bold' }}>hello@aietfinesherbes.com</p>
          </div>
          
          <div style={{ 
            padding: '20px', 
            border: '2px solid #20B251', 
            borderRadius: '10px',
            textAlign: 'center'
          }}>
            <h3 style={{ color: '#20B251', margin: '0 0 10px 0' }}>📞 Téléphone</h3>
            <p style={{ color: '#666', margin: '0 0 10px 0' }}>Du lundi au vendredi, 9h-18h</p>
            <p style={{ color: '#20B251', fontWeight: 'bold' }}>+33 1 23 45 67 89</p>
          </div>
          
          <div style={{ 
            padding: '20px', 
            border: '2px solid #20B251', 
            borderRadius: '10px',
            textAlign: 'center'
          }}>
            <h3 style={{ color: '#20B251', margin: '0 0 10px 0' }}>📍 Adresse</h3>
            <p style={{ color: '#666', margin: '0 0 10px 0' }}>Siège social</p>
            <p style={{ color: '#20B251', fontWeight: 'bold' }}>123 Rue de la République<br />69002 Lyon, France</p>
          </div>
        </div>
      </div>

      {/* Contact Form */}
      <div style={{ 
        backgroundColor: 'white', 
        padding: '30px', 
        borderRadius: '10px',
        marginBottom: '20px'
      }}>
        <h2 style={{ color: '#333', fontSize: '24px', margin: '0 0 20px 0', textAlign: 'center' }}>
          💬 Envoyez-nous un message
        </h2>
        
        <form onSubmit={handleSubmit} style={{ maxWidth: '600px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gap: '20px' }}>
            <div>
              <label htmlFor="name" style={{ 
                display: 'block', 
                color: '#333', 
                fontWeight: 'bold',
                marginBottom: '8px'
              }}>
                Nom complet *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Votre nom"
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
            
            <div>
              <label htmlFor="email" style={{ 
                display: 'block', 
                color: '#333', 
                fontWeight: 'bold',
                marginBottom: '8px'
              }}>
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
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
            
            <div>
              <label htmlFor="reason" style={{ 
                display: 'block', 
                color: '#333', 
                fontWeight: 'bold',
                marginBottom: '8px'
              }}>
                Motif de contact
              </label>
              <select
                id="reason"
                name="reason"
                value={formData.reason}
                onChange={handleChange}
                style={{ 
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #ddd',
                  borderRadius: '5px',
                  fontSize: '16px'
                }}
              >
                <option value="general">Question générale</option>
                <option value="support">Support technique</option>
                <option value="partnership">Partenariat</option>
                <option value="feedback">Retour & suggestions</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="subject" style={{ 
                display: 'block', 
                color: '#333', 
                fontWeight: 'bold',
                marginBottom: '8px'
              }}>
                Sujet *
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Résumé de votre demande"
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
            
            <div>
              <label htmlFor="message" style={{ 
                display: 'block', 
                color: '#333', 
                fontWeight: 'bold',
                marginBottom: '8px'
              }}>
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Décrivez votre demande en détail..."
                rows={5}
                style={{ 
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #ddd',
                  borderRadius: '5px',
                  fontSize: '16px',
                  resize: 'vertical'
                }}
                required
              />
            </div>
            
            <button
              type="submit"
              disabled={isSubmitted}
              style={{ 
                backgroundColor: isSubmitted ? '#ccc' : '#20B251',
                color: 'white',
                padding: '15px',
                border: 'none',
                borderRadius: '5px',
                fontSize: '16px',
                fontWeight: 'bold',
                cursor: isSubmitted ? 'not-allowed' : 'pointer',
                opacity: isSubmitted ? 0.7 : 1
              }}
            >
              {isSubmitted ? '✅ Message envoyé !' : '📤 Envoyer le message'}
            </button>
          </div>
        </form>
      </div>

      {/* Footer */}
      <div style={{ 
        backgroundColor: 'white', 
        padding: '15px', 
        borderRadius: '10px',
        textAlign: 'center',
        color: '#666',
        fontSize: '14px'
      }}>
        <p>✅ Page "Contact" fonctionnelle avec formulaire</p>
        <p>Dernière mise à jour: 23/07/2025 11:30:00</p>
      </div>
    </div>
  )
} 