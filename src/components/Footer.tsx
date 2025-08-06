'use client'

import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer style={{
      backgroundColor: '#1f2937',
      color: 'white',
      padding: '40px 20px',
      marginTop: 'auto'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '40px'
      }}>
        {/* Logo et description */}
        <div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '20px'
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              backgroundColor: '#20B251',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: 'bold',
              fontSize: '18px'
            }}>
              🍃
            </div>
            <span style={{
              fontSize: '20px',
              fontWeight: 'bold',
              color: '#20B251'
            }}>
              AI & Fines Herbes
            </span>
          </div>
          <p style={{
            color: '#9ca3af',
            lineHeight: '1.6',
            marginBottom: '20px'
          }}>
            Découvrez l'art culinaire avec l'intelligence artificielle. 
            Créez des recettes uniques et savoureuses adaptées à vos goûts.
          </p>
          <div style={{
            display: 'flex',
            gap: '16px'
          }}>
            <a href="#" style={{
              width: '40px',
              height: '40px',
              backgroundColor: '#374151',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              textDecoration: 'none',
              transition: 'background-color 0.2s ease'
            }}
            onMouseEnter={(e) => (e.target as HTMLElement).style.backgroundColor = '#20B251'}
            onMouseLeave={(e) => (e.target as HTMLElement).style.backgroundColor = '#374151'}
            >
              📘
            </a>
            <a href="#" style={{
              width: '40px',
              height: '40px',
              backgroundColor: '#374151',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              textDecoration: 'none',
              transition: 'background-color 0.2s ease'
            }}
            onMouseEnter={(e) => (e.target as HTMLElement).style.backgroundColor = '#20B251'}
            onMouseLeave={(e) => (e.target as HTMLElement).style.backgroundColor = '#374151'}
            >
              📷
            </a>
            <a href="#" style={{
              width: '40px',
              height: '40px',
              backgroundColor: '#374151',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              textDecoration: 'none',
              transition: 'background-color 0.2s ease'
            }}
            onMouseEnter={(e) => (e.target as HTMLElement).style.backgroundColor = '#20B251'}
            onMouseLeave={(e) => (e.target as HTMLElement).style.backgroundColor = '#374151'}
            >
              🐦
            </a>
          </div>
        </div>

        {/* Navigation rapide */}
        <div>
          <h3 style={{
            fontSize: '18px',
            fontWeight: 'bold',
            marginBottom: '20px',
            color: 'white'
          }}>
            Navigation
          </h3>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}>
            <Link href="/" style={{
              color: '#9ca3af',
              textDecoration: 'none',
              transition: 'color 0.2s ease'
            }}
            onMouseEnter={(e) => (e.target as HTMLElement).style.color = '#20B251'}
            onMouseLeave={(e) => (e.target as HTMLElement).style.color = '#9ca3af'}
            >
              Accueil
            </Link>
            <Link href="/mes-recettes" style={{
              color: '#9ca3af',
              textDecoration: 'none',
              transition: 'color 0.2s ease'
            }}
            onMouseEnter={(e) => (e.target as HTMLElement).style.color = '#20B251'}
            onMouseLeave={(e) => (e.target as HTMLElement).style.color = '#9ca3af'}
            >
              Mes Recettes
            </Link>
            <Link href="/creer-recette" style={{
              color: '#9ca3af',
              textDecoration: 'none',
              transition: 'color 0.2s ease'
            }}
            onMouseEnter={(e) => (e.target as HTMLElement).style.color = '#20B251'}
            onMouseLeave={(e) => (e.target as HTMLElement).style.color = '#9ca3af'}
            >
              Créer Recette
            </Link>
            <Link href="/contact" style={{
              color: '#9ca3af',
              textDecoration: 'none',
              transition: 'color 0.2s ease'
            }}
            onMouseEnter={(e) => (e.target as HTMLElement).style.color = '#20B251'}
            onMouseLeave={(e) => (e.target as HTMLElement).style.color = '#9ca3af'}
            >
              Contact
            </Link>
          </div>
        </div>

        {/* Ressources */}
        <div>
          <h3 style={{
            fontSize: '18px',
            fontWeight: 'bold',
            marginBottom: '20px',
            color: 'white'
          }}>
            Ressources
          </h3>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}>
            <Link href="/aide" style={{
              color: '#9ca3af',
              textDecoration: 'none',
              transition: 'color 0.2s ease'
            }}
            onMouseEnter={(e) => (e.target as HTMLElement).style.color = '#20B251'}
            onMouseLeave={(e) => (e.target as HTMLElement).style.color = '#9ca3af'}
            >
              Centre d'aide
            </Link>
            <Link href="/comment-ca-marche" style={{
              color: '#9ca3af',
              textDecoration: 'none',
              transition: 'color 0.2s ease'
            }}
            onMouseEnter={(e) => (e.target as HTMLElement).style.color = '#20B251'}
            onMouseLeave={(e) => (e.target as HTMLElement).style.color = '#9ca3af'}
            >
              Comment ça marche
            </Link>
            <Link href="/a-propos" style={{
              color: '#9ca3af',
              textDecoration: 'none',
              transition: 'color 0.2s ease'
            }}
            onMouseEnter={(e) => (e.target as HTMLElement).style.color = '#20B251'}
            onMouseLeave={(e) => (e.target as HTMLElement).style.color = '#9ca3af'}
            >
              À propos
            </Link>
            <Link href="/conditions" style={{
              color: '#9ca3af',
              textDecoration: 'none',
              transition: 'color 0.2s ease'
            }}
            onMouseEnter={(e) => (e.target as HTMLElement).style.color = '#20B251'}
            onMouseLeave={(e) => (e.target as HTMLElement).style.color = '#9ca3af'}
            >
              Conditions d'utilisation
            </Link>
          </div>
        </div>

        {/* Contact */}
        <div>
          <h3 style={{
            fontSize: '18px',
            fontWeight: 'bold',
            marginBottom: '20px',
            color: 'white'
          }}>
            Contact
          </h3>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              color: '#9ca3af'
            }}>
              <span>📧</span>
              <span>hello@aietfinesherbes.com</span>
            </div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              color: '#9ca3af'
            }}>
              <span>📞</span>
              <span>+33 1 23 45 67 89</span>
            </div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              color: '#9ca3af'
            }}>
              <span>📍</span>
              <span>Lyon, France</span>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div style={{
        borderTop: '1px solid #374151',
        marginTop: '40px',
        paddingTop: '20px',
        textAlign: 'center',
        color: '#9ca3af',
        fontSize: '14px'
      }}>
        <p>
          © {currentYear} AI & Fines Herbes. Tous droits réservés.
        </p>
        <p style={{ marginTop: '8px' }}>
          🍃 Créé avec passion pour l'art culinaire
        </p>
      </div>
    </footer>
  )
} 