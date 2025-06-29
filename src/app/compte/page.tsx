'use client'

import { useAppContext } from '../../context/AppContext'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { User, Mail, Crown, LogOut, ArrowLeft, Settings, Shield } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'

export default function ComptePage() {
  const { isAuthenticated, user, logout } = useAppContext()
  const router = useRouter()
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    if (isAuthenticated) {
      checkAdminStatus()
    }
  }, [isAuthenticated])

  const checkAdminStatus = async () => {
    try {
      const token = localStorage.getItem('jwt')
      console.log('🔍 Vérification du statut admin...')
      console.log('Token présent:', !!token)
      
      if (!token) {
        console.log('❌ Pas de token JWT trouvé')
        setIsAdmin(false)
        return
      }
      
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1338'}/api/users/me`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
      
      console.log('Réponse API:', response.status, response.statusText)
      
      if (response.ok) {
        const userData = await response.json()
        console.log('Données utilisateur:', userData)
        console.log('Rôle utilisateur:', userData.role?.name)
        console.log('IsAdmin:', userData.isAdmin)
        
        // Vérifier le rôle admin (méthode standard Strapi)
        const isUserAdmin = userData.role?.name === 'Admin' || 
                           userData.role?.name === 'admin' ||
                           userData.isAdmin === true
        
        console.log('Est admin:', isUserAdmin)
        setIsAdmin(isUserAdmin)
      } else {
        console.log('❌ Erreur lors de la vérification admin:', response.status)
        setIsAdmin(false)
      }
    } catch (error) {
      console.error('❌ Erreur lors de la vérification admin:', error)
      setIsAdmin(false)
    }
  }

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  if (!isAuthenticated) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gradient-to-br from-herb-green/5 to-sage/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
            <div className="max-w-4xl mx-auto">
              <div className="text-center">
                <div className="h-24 w-24 bg-herb-green/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <User className="h-12 w-12 text-herb-green" />
                </div>
                <h1 className="font-playfair text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                  Accès réservé
                </h1>
                <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
                  Vous devez être connecté pour accéder à votre espace personnel.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/">
                    <button className="flex items-center space-x-2 px-6 py-3 bg-slate-200 text-slate-700 rounded-xl hover:bg-slate-300 transition-colors">
                      <ArrowLeft className="h-5 w-5" />
                      <span>Retour à l'accueil</span>
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-herb-green/5 to-sage/5">
        {/* Header */}
        <div className="bg-white/80 backdrop-blur-sm border-b border-slate-200/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-16">
            <div className="text-center space-y-4 sm:space-y-6">
              <div className="inline-flex items-center gap-2 bg-herb-green/20 backdrop-blur-sm text-herb-dark px-3 sm:px-4 py-2 rounded-full text-sm font-medium border border-herb-green/30">
                <User className="h-4 w-4" />
                Mon Compte
              </div>
              <h1 className="font-playfair text-4xl sm:text-5xl md:text-6xl font-bold text-slate-900">
                Bonjour, <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">{user?.name}</span> !
              </h1>
              <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
                Gérez vos préférences et suivez votre activité culinaire
              </p>
            </div>
          </div>
        </div>

        {/* User Info */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
              <div className="bg-gradient-to-r from-herb-green to-herb-dark p-6 sm:p-8 text-white">
                <div className="flex items-center space-x-4">
                  <div className="h-16 w-16 bg-white/20 rounded-full flex items-center justify-center">
                    <User className="h-8 w-8" />
                  </div>
                  <div>
                    <h2 className="font-playfair text-2xl font-bold">{user?.name}</h2>
                    <p className="text-white/80">Membre Premium</p>
                  </div>
                </div>
              </div>

              <div className="p-6 sm:p-8 space-y-5">
                {/* Email */}
                <div className="flex items-center space-x-4 p-4 bg-slate-50 rounded-xl">
                  <Mail className="h-6 w-6 text-herb-green" />
                  <div>
                    <p className="text-sm text-slate-500">Email</p>
                    <p className="font-semibold text-slate-900">{user?.email}</p>
                  </div>
                </div>

                {/* Plan */}
                <div className="flex items-center space-x-4 p-4 bg-slate-50 rounded-xl">
                  <Crown className="h-6 w-6 text-herb-green" />
                  <div>
                    <p className="text-sm text-slate-500">Votre abonnement</p>
                    <p className="font-semibold text-slate-900">{user?.plan}</p>
                  </div>
                </div>

                {/* Admin Section */}
                {isAdmin && (
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl border border-purple-200">
                      <Shield className="h-6 w-6 text-purple-600" />
                      <div className="flex-1">
                        <p className="text-sm text-purple-600 font-medium">Administrateur</p>
                        <p className="text-sm text-purple-700">Accès aux outils d'administration</p>
                      </div>
                    </div>
                    
                    {/* Admin Links */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <Link href="/admin">
                        <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200 hover:from-blue-100 hover:to-indigo-100 transition-all duration-300 cursor-pointer">
                          <div className="flex items-center space-x-3">
                            <div className="h-10 w-10 bg-blue-600 rounded-lg flex items-center justify-center">
                              <Settings className="h-5 w-5 text-white" />
                            </div>
                            <div>
                              <p className="font-semibold text-blue-900">Tableau de bord</p>
                              <p className="text-sm text-blue-700">Vue d'ensemble</p>
                            </div>
                          </div>
                        </div>
                      </Link>
                      
                      <Link href="/admin/recettes">
                        <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200 hover:from-green-100 hover:to-emerald-100 transition-all duration-300 cursor-pointer">
                          <div className="flex items-center space-x-3">
                            <div className="h-10 w-10 bg-green-600 rounded-lg flex items-center justify-center">
                              <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                              </svg>
                            </div>
                            <div>
                              <p className="font-semibold text-green-900">Gestion des recettes</p>
                              <p className="text-sm text-green-700">Créer et modifier</p>
                            </div>
                          </div>
                        </div>
                      </Link>
                      
                      <Link href="/admin/validation-recette">
                        <div className="p-4 bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl border border-orange-200 hover:from-orange-100 hover:to-amber-100 transition-all duration-300 cursor-pointer">
                          <div className="flex items-center space-x-3">
                            <div className="h-10 w-10 bg-orange-600 rounded-lg flex items-center justify-center">
                              <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                            </div>
                            <div>
                              <p className="font-semibold text-orange-900">Validation des recettes</p>
                              <p className="text-sm text-orange-700">Approuver les recettes</p>
                            </div>
                          </div>
                        </div>
                      </Link>
                      
                      <div className="p-4 bg-gradient-to-r from-gray-50 to-slate-50 rounded-xl border border-gray-200">
                        <div className="flex items-center space-x-3">
                          <div className="h-10 w-10 bg-gray-600 rounded-lg flex items-center justify-center">
                            <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">Plus d'outils</p>
                            <p className="text-sm text-gray-700">Bientôt disponible</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Section de test temporaire pour le développement */}
                {process.env.NODE_ENV === 'development' && !isAdmin && (
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl border border-yellow-200">
                      <Shield className="h-6 w-6 text-yellow-600" />
                      <div className="flex-1">
                        <p className="text-sm text-yellow-600 font-medium">Mode Développement</p>
                        <p className="text-sm text-yellow-700">Accès admin temporaire pour les tests</p>
                      </div>
                    </div>
                    
                    {/* Debug Info */}
                    <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                      <h4 className="text-sm font-medium text-gray-900 mb-2">Informations de débogage:</h4>
                      <div className="text-xs text-gray-600 space-y-1">
                        <p>Statut admin: {isAdmin ? '✅ Oui' : '❌ Non'}</p>
                        <p>Utilisateur connecté: {isAuthenticated ? '✅ Oui' : '❌ Non'}</p>
                        <p>Nom utilisateur: {user?.name || 'Non défini'}</p>
                        <p>Email utilisateur: {user?.email || 'Non défini'}</p>
                        <p>Token JWT: {localStorage.getItem('jwt') ? '✅ Présent' : '❌ Absent'}</p>
                      </div>
                    </div>
                    
                    {/* Admin Links de test */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <Link href="/admin">
                        <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200 hover:from-blue-100 hover:to-indigo-100 transition-all duration-300 cursor-pointer">
                          <div className="flex items-center space-x-3">
                            <div className="h-10 w-10 bg-blue-600 rounded-lg flex items-center justify-center">
                              <Settings className="h-5 w-5 text-white" />
                            </div>
                            <div>
                              <p className="font-semibold text-blue-900">Tableau de bord (TEST)</p>
                              <p className="text-sm text-blue-700">Vue d'ensemble</p>
                            </div>
                          </div>
                        </div>
                      </Link>
                      
                      <Link href="/admin/recettes">
                        <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200 hover:from-green-100 hover:to-emerald-100 transition-all duration-300 cursor-pointer">
                          <div className="flex items-center space-x-3">
                            <div className="h-10 w-10 bg-green-600 rounded-lg flex items-center justify-center">
                              <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                              </svg>
                            </div>
                            <div>
                              <p className="font-semibold text-green-900">Gestion des recettes (TEST)</p>
                              <p className="text-sm text-green-700">Créer et modifier</p>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  </div>
                )}

                {/* Logout button */}
                <div className="pt-5 border-t border-slate-200">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-red-50 text-red-600 hover:bg-red-100 border border-red-200 rounded-xl font-semibold transition-all duration-300"
                  >
                    <LogOut className="h-5 w-5" />
                    <span>Se déconnecter</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
} 