'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, ChefHat, Sparkles, ArrowRight, ShoppingCart, User } from 'lucide-react'
import Logo from './Logo'
import { useAppContext } from '../context/AppContext'

const navigation = [
  { name: 'Accueil', href: '/' },
  { name: 'Recettes', href: '/recettes' },
  { name: 'Contact', href: '/contact' },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const { isAuthenticated, user, cart } = useAppContext()

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
          </div>

          {/* Actions desktop */}
          <div className="hidden md:flex md:items-center md:space-x-6">
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
              className="group relative overflow-hidden bg-gradient-to-r from-herb-green via-sage to-herb-dark hover:from-herb-dark hover:via-herb-green hover:to-sage text-white px-6 py-3 rounded-2xl font-poppins font-bold text-base transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 transform"
            >
              {/* Effet de brillance */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
              
              {/* Contenu du bouton */}
              <div className="relative flex items-center space-x-2">
                <ChefHat className="h-5 w-5" />
                <span>Créer une recette</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </div>
              
              {/* Bordure animée */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-herb-green/40 to-sage/40 opacity-0 group-hover:opacity-30 transition-opacity duration-300 blur-sm"></div>
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
              
              {/* Bouton CTA mobile */}
              <div className="pt-4 border-t border-gray-200">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false)
                    scrollToGenerator()
                  }}
                  className="w-full group relative overflow-hidden bg-gradient-to-r from-herb-green via-sage to-herb-dark hover:from-herb-dark hover:via-herb-green hover:to-sage text-white px-6 py-4 rounded-2xl font-poppins font-bold text-lg transition-all duration-300 shadow-xl hover:shadow-2xl"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
                  <div className="relative flex items-center justify-center space-x-3">
                    <ChefHat className="h-6 w-6" />
                    <span>Créer une recette</span>
                    <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </header>
  )
} 