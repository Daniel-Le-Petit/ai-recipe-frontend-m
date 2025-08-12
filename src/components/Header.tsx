'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useAppContext } from '../context/AppContext'

const navigation = [
  { name: 'Accueil', href: '/' },
  { name: 'Mes Recettes', href: '/mes-recettes' },
  { name: 'Contact', href: '/contact' },
  { name: 'Mes Plans de la Semaine', href: '/mes-plans-semaines' },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const { isAuthenticated, user, cart } = useAppContext()

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  return (
    <header style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 50,
      backgroundColor: 'white',
      borderBottom: '1px solid #e5e7eb',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'
    }}>
      <nav style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
        <div style={{ 
          display: 'flex', 
          height: '80px', 
          alignItems: 'center', 
          justifyContent: 'space-between' 
        }}>
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Link href="/" style={{ textDecoration: 'none' }}>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '12px',
                transition: 'transform 0.3s ease'
              }}>
                <Image 
                  src="/logo-aietfinesherbes.svg" 
                  alt="AI & Fines Herbes Logo"
                  width={120}
                  height={40}
                  style={{
                    width: '120px',
                    height: 'auto',
                    objectFit: 'contain'
                  }}
                />

              </div>
            </Link>
          </div>

          {/* Navigation desktop - visible sur PC, laptop, iPad */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '40px' }} className="hidden md:flex">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  style={{
                    textDecoration: 'none',
                    fontSize: '16px',
                    fontWeight: '600',
                    color: isActive ? '#20B251' : '#374151',
                    transition: 'color 0.3s ease',
                    position: 'relative',
                    padding: '8px 0'
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      const target = e.target as HTMLElement
                      if (target && target.style) {
                        target.style.color = '#20B251'
                      }
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      const target = e.target as HTMLElement
                      if (target && target.style) {
                        target.style.color = '#374151'
                      }
                    }
                  }}
                >
                  {item.name}
                  {isActive && (
                    <div style={{
                      position: 'absolute',
                      bottom: '-8px',
                      left: 0,
                      right: 0,
                      height: '3px',
                      backgroundColor: '#20B251',
                      borderRadius: '2px'
                    }} />
                  )}
                </Link>
              )
            })}
          </div>

          {/* User menu et utilitaires - visible sur PC, laptop, iPad */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }} className="hidden md:flex">
            {/* Panier */}
            <Link href="/panier" style={{ textDecoration: 'none' }}>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '8px',
                color: '#374151',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'color 0.3s ease'
              }}
              onMouseEnter={(e) => {
                const target = e.target as HTMLElement
                if (target && target.style) {
                  target.style.color = '#20B251'
                }
              }}
              onMouseLeave={(e) => {
                const target = e.target as HTMLElement
                if (target && target.style) {
                  target.style.color = '#374151'
                }
              }}
              >
                <img 
                  src="/caddie-vert.svg" 
                  alt="Panier"
                  style={{
                    width: '24px',
                    height: '24px',
                    objectFit: 'contain'
                  }}
                />
                <span>Panier</span>
              </div>
            </Link>

            {/* Compte/Connexion */}
            {isAuthenticated ? (
              <Link href="/compte" style={{ textDecoration: 'none' }}>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '8px',
                  color: '#374151',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'color 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  const target = e.target as HTMLElement
                  if (target && target.style) {
                    target.style.color = '#20B251'
                  }
                }}
                onMouseLeave={(e) => {
                  const target = e.target as HTMLElement
                  if (target && target.style) {
                    target.style.color = '#374151'
                  }
                }}
                >
                  <span style={{ fontSize: '18px' }}>👤</span>
                  <span>Compte</span>
                </div>
              </Link>
            ) : (
              <Link href="/connexion" style={{ textDecoration: 'none' }}>
                <button style={{
                  padding: '10px 20px',
                  backgroundColor: '#20B251',
                  border: 'none',
                  borderRadius: '8px',
                  color: 'white',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  const target = e.target as HTMLElement
                  if (target && target.style) {
                    target.style.backgroundColor = '#1a8f42'
                  }
                }}
                onMouseLeave={(e) => {
                  const target = e.target as HTMLElement
                  if (target && target.style) {
                    target.style.backgroundColor = '#20B251'
                  }
                }}
                >
                  Connexion
                </button>
              </Link>
            )}
          </div>

          {/* Mobile menu button - visible uniquement sur téléphone */}
          <div style={{ position: 'relative' }} className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              aria-label="Ouvrir le menu de navigation"
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
                padding: '8px',
                backgroundColor: 'transparent',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              <div style={{
                width: '24px',
                height: '2px',
                backgroundColor: '#374151',
                transition: 'all 0.3s ease'
              }} />
              <div style={{
                width: '24px',
                height: '2px',
                backgroundColor: '#374151',
                transition: 'all 0.3s ease'
              }} />
              <div style={{
                width: '24px',
                height: '2px',
                backgroundColor: '#374151',
                transition: 'all 0.3s ease'
              }} />
            </button>

            {/* Mobile menu - déroulé directement sous l'icône burger */}
            {mobileMenuOpen && (
              <div style={{
                position: 'absolute',
                top: '100%',
                right: 0,
                width: '220px',
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                padding: '12px 0',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                borderRadius: '8px',
                zIndex: 100,
                marginTop: '4px'
              }}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  {/* Navigation principale */}
                  {navigation.map((item) => {
                    const isActive = pathname === item.href
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        style={{
                          textDecoration: 'none',
                          fontSize: '16px',
                          fontWeight: '600',
                          color: isActive ? '#20B251' : '#374151',
                          padding: '12px 16px',
                          transition: 'color 0.3s ease',
                          borderBottom: '1px solid #f3f4f6'
                        }}
                        onMouseEnter={(e) => {
                          if (!isActive) (e.target as HTMLElement).style.color = '#20B251'
                        }}
                        onMouseLeave={(e) => {
                          if (!isActive) (e.target as HTMLElement).style.color = '#374151'
                        }}
                      >
                        {item.name}
                      </Link>
                    )
                  })}
                  
                  {/* Panier */}
                  <Link
                    href="/panier"
                    onClick={() => setMobileMenuOpen(false)}
                    style={{
                      textDecoration: 'none',
                      fontSize: '16px',
                      fontWeight: '600',
                      color: '#374151',
                      padding: '12px 16px',
                      transition: 'color 0.3s ease',
                      borderBottom: '1px solid #f3f4f6',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                    onMouseEnter={(e) => (e.target as HTMLElement).style.color = '#20B251'}
                    onMouseLeave={(e) => (e.target as HTMLElement).style.color = '#374151'}
                  >
                    <Image 
                      src="/caddie-vert.svg" 
                      alt="Panier"
                      width={20}
                      height={20}
                      style={{
                        width: '20px',
                        height: '20px',
                        objectFit: 'contain'
                      }}
                    />
                    <span>Panier</span>
                  </Link>

                  {/* Compte/Connexion */}
                  {isAuthenticated ? (
                    <Link
                      href="/compte"
                      onClick={() => setMobileMenuOpen(false)}
                      style={{
                        textDecoration: 'none',
                        fontSize: '16px',
                        fontWeight: '600',
                        color: '#374151',
                        padding: '12px 16px',
                        transition: 'color 0.3s ease',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                      }}
                      onMouseEnter={(e) => (e.target as HTMLElement).style.color = '#20B251'}
                      onMouseLeave={(e) => (e.target as HTMLElement).style.color = '#374151'}
                    >
                      <span>👤</span>
                      <span>Compte</span>
                    </Link>
                  ) : (
                    <Link
                      href="/connexion"
                      onClick={() => setMobileMenuOpen(false)}
                      style={{
                        textDecoration: 'none',
                        fontSize: '16px',
                        fontWeight: '600',
                        color: '#20B251',
                        padding: '12px 16px',
                        transition: 'color 0.3s ease',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                      }}
                      onMouseEnter={(e) => (e.target as HTMLElement).style.color = '#1a8f42'}
                      onMouseLeave={(e) => (e.target as HTMLElement).style.color = '#20B251'}
                    >
                      <span>🔐</span>
                      <span>Connexion</span>
                    </Link>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  )
} 