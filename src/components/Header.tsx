'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, ChefHat, Sparkles, ArrowRight, ShoppingCart, User, Settings, TestTube } from 'lucide-react'
import Image from 'next/image'
import Logo from './Logo'
import { useAppContext } from '../context/AppContext'

const navigation = [
  { name: 'Accueil', href: '/' },
  { name: 'Mes Recettes', href: '/mes-recettes' },
  { name: 'Contact', href: '/contact' },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const pathname = usePathname()
  const { isAuthenticated, user, cart } = useAppContext()

  useEffect(() => {
    checkAdminStatus();
  }, [isAuthenticated]);

  const checkAdminStatus = async () => {
    if (!isAuthenticated) {
      setIsAdmin(false);
      return;
    }

    try {
      const token = localStorage.getItem('jwt');
      if (!token) {
        setIsAdmin(false);
        return;
      }
      
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/me`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.status === 401) {
        setIsAdmin(false);
        return;
      }

      if (response.ok) {
        const user = await response.json();
        setIsAdmin(user.role?.name === 'admin');
      } else {
        setIsAdmin(false);
      }
    } catch (error) {
      setIsAdmin(false);
    }
  };

  const scrollToGenerator = () => {
    if (pathname === '/') {
      window.location.href = '/creer-recette'
    } else {
      window.location.href = '/creer-recette'
    }
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200/50 shadow-lg">
      <nav className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex h-24 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center flex-shrink-0">
            <Link href="/" className="block group">
              <div className="transition-transform duration-300 group-hover:scale-105">
                <Logo />
              </div>
            </Link>
          </div>

          {/* Navigation desktop */}
          <div className="hidden md:flex md:items-center md:space-x-10">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`text-base font-poppins font-semibold transition-all duration-300 relative group ${
                    isActive
                      ? 'text-herb-green'
                      : 'text-gray-800 hover:text-herb-green'
                  }`}
                >
                  {item.name}
                  <div className={`absolute -bottom-6 left-0 right-0 h-1 bg-gradient-to-r from-herb-green to-sage rounded-full transition-all duration-300 ${
                    isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                  }`} />
                </Link>
              )
            })}
            <Link href="/plan-semaine" className="text-herb-green hover:text-orange-500 font-semibold transition-colors px-3 py-2 rounded-lg">Plan de la semaine</Link>
          </div>

          {/* Actions desktop */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            {/* Administration (pour les admins) */}
            {isAdmin && (
              <Link href="/admin" className="flex items-center space-x-2 text-base font-poppins font-semibold text-gray-800 hover:text-herb-green transition-all duration-300">
                <div className="p-2 rounded-xl hover:bg-herb-green/10 transition-all duration-300">
                  <Settings className="h-6 w-6 text-herb-dark" />
                </div>
                <span>Admin</span>
              </Link>
            )}

            {/* Panier */}
            <Link href="/panier" className="relative group flex items-center space-x-2 text-base font-poppins font-semibold text-gray-800 hover:text-herb-green transition-all duration-300">
              <div className="relative p-2 rounded-xl hover:bg-herb-green/10 transition-all duration-300">
                <ShoppingCart className="h-6 w-6 text-sage" />
                {cart.length > 0 && (
                  <div className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                    {cart.length}
                  </div>
                )}
              </div>
              <span>Panier</span>
            </Link>

            {/* Connexion/Compte */}
            {isAuthenticated ? (
              <Link href="/compte" className="flex items-center space-x-2 text-base font-poppins font-semibold text-gray-800 hover:text-herb-green transition-all duration-300">
                <div className="p-2 rounded-xl hover:bg-herb-green/10 transition-all duration-300">
                  <User className="h-6 w-6 text-herb-dark" />
                </div>
                <span>Compte</span>
              </Link>
            ) : (
              <Link href="/connexion" className="flex items-center space-x-2 text-base font-poppins font-semibold text-gray-800 hover:text-herb-green transition-all duration-300">
                <div className="p-2 rounded-xl hover:bg-herb-green/10 transition-all duration-300">
                  <User className="h-6 w-6 text-herb-dark" />
                </div>
                <span>Connexion</span>
              </Link>
            )}

            {/* Bouton CTA Premium */}
            <button
              onClick={scrollToGenerator}
              className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full font-poppins font-bold text-base transition-all duration-200"
            >
              <span className="mr-2 flex items-center" style={{ lineHeight: 0 }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 3h6" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M10 3v5.5a4 4 0 0 1-.8 2.4l-4.1 5.7A4 4 0 0 0 8.4 21h7.2a4 4 0 0 0 3.3-4.4l-4.1-5.7A4 4 0 0 1 14 8.5V3" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M8 15h8" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </span>
              <span>Créer une recette</span>
            </button>
          </div>

          {/* Bouton menu mobile */}
          <div className="md:hidden">
            <button
              type="button"
              className="p-3 text-gray-700 hover:text-herb-green hover:bg-herb-green/10 rounded-xl transition-all duration-300"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Ouvrir le menu</span>
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Menu mobile premium */}
      {mobileMenuOpen && (
        <>
          {/* Overlay */}
          <div 
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
            onClick={() => setMobileMenuOpen(false)}
          />
          
          {/* Menu */}
          <div className="fixed top-24 left-4 right-4 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 overflow-hidden">
            <div className="px-6 py-6 space-y-3">
              {navigation.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`block px-4 py-3 text-lg font-poppins font-semibold rounded-2xl transition-all duration-300 ${
                      isActive
                        ? 'text-herb-green bg-gradient-to-r from-herb-green/10 to-sage/10 shadow-lg'
                        : 'text-gray-800 hover:text-herb-green hover:bg-gray-50'
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                )
              })}
              
              {/* Administration mobile (pour les admins) */}
              {isAdmin && (
                <Link
                  href="/admin"
                  className="block px-4 py-3 text-lg font-poppins font-semibold rounded-2xl transition-all duration-300 text-gray-800 hover:text-herb-green hover:bg-gray-50 flex items-center space-x-3"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Settings className="h-5 w-5 text-herb-dark" />
                  <span>Administration</span>
                </Link>
              )}
              
              {/* Séparateur */}
              <div className="border-t border-gray-200 my-4"></div>
              
              {/* Panier mobile */}
              <Link
                href="/panier"
                className="block px-4 py-3 text-lg font-poppins font-semibold rounded-2xl transition-all duration-300 text-gray-800 hover:text-herb-green hover:bg-gray-50 flex items-center justify-between"
                onClick={() => setMobileMenuOpen(false)}
              >
                <div className="flex items-center space-x-3">
                  <ShoppingCart className="h-5 w-5 text-sage" />
                  <span>Panier</span>
                </div>
                {cart.length > 0 && (
                  <div className="h-6 w-6 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                    {cart.length}
                  </div>
                )}
              </Link>

              {/* Connexion/Compte mobile */}
              {isAuthenticated ? (
                <Link
                  href="/compte"
                  className="block px-4 py-3 text-lg font-poppins font-semibold rounded-2xl transition-all duration-300 text-gray-800 hover:text-herb-green hover:bg-gray-50 flex items-center space-x-3"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <User className="h-5 w-5 text-herb-dark" />
                  <span>Compte</span>
                </Link>
              ) : (
                <Link
                  href="/connexion"
                  className="block px-4 py-3 text-lg font-poppins font-semibold rounded-2xl transition-all duration-300 text-gray-800 hover:text-herb-green hover:bg-gray-50 flex items-center space-x-3"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <User className="h-5 w-5 text-herb-dark" />
                  <span>Connexion</span>
                </Link>
              )}
              
              {/* Séparateur */}
              <div className="border-t border-gray-200 my-4"></div>
              
              {/* Bouton CTA mobile */}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  scrollToGenerator();
                }}
                className="w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-4 rounded-full font-poppins font-bold text-lg transition-all duration-200"
              >
                <span className="mr-2 flex items-center" style={{ lineHeight: 0 }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 3h6" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M10 3v5.5a4 4 0 0 1-.8 2.4l-4.1 5.7A4 4 0 0 0 8.4 21h7.2a4 4 0 0 0 3.3-4.4l-4.1-5.7A4 4 0 0 1 14 8.5V3" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M8 15h8" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </span>
                <span>Créer une recette</span>
              </button>
            </div>
          </div>
        </>
      )}
    </header>
  )
} 