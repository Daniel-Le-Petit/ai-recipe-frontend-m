'use client'

import { useAppContext } from '../../context/AppContext'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { User, Mail, Crown, LogOut, ArrowLeft, ChefHat } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function ComptePage() {
  const { isAuthenticated, user, logout } = useAppContext()
  const router = useRouter()

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

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-5 border-t border-slate-200">
                  <div className="text-center p-4 bg-herb-green/10 rounded-xl">
                    <div className="text-2xl font-bold text-herb-green">12</div>
                    <div className="text-sm text-slate-600">Recettes créées</div>
                  </div>
                  <div className="text-center p-4 bg-sage/10 rounded-xl">
                    <div className="text-2xl font-bold text-sage">8</div>
                    <div className="text-sm text-slate-600">Commandes passées</div>
                  </div>
                  <div className="text-center p-4 bg-herb-dark/10 rounded-xl">
                    <div className="text-2xl font-bold text-herb-dark">4.9</div>
                    <div className="text-sm text-slate-600">Note moyenne</div>
                  </div>
                </div>

                {/* Recettes sauvegardées */}
                <div className="pt-5 border-t border-slate-200">
                  <h3 className="font-semibold text-lg text-slate-900 mb-4 flex items-center gap-2">
                    <ChefHat className="h-5 w-5 text-herb-green" />
                    Mes recettes sauvegardées
                  </h3>
                  <div className="space-y-3">
                    <div className="p-4 bg-gradient-to-r from-herb-green/10 to-sage/10 rounded-xl border border-herb-green/20">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold text-slate-900">Risotto aux champignons et parmesan</h4>
                          <p className="text-sm text-slate-600">Sauvegardée le 15 janvier 2024</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs bg-herb-green text-white px-2 py-1 rounded-full">En attente</span>
                          <button className="text-herb-green hover:text-herb-dark transition-colors">
                            <ChefHat className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 bg-gradient-to-r from-sage/10 to-herb-green/10 rounded-xl border border-sage/20">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold text-slate-900">Salade de quinoa aux légumes grillés</h4>
                          <p className="text-sm text-slate-600">Sauvegardée le 12 janvier 2024</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs bg-green-500 text-white px-2 py-1 rounded-full">Prête</span>
                          <button className="text-sage hover:text-sage-dark transition-colors">
                            <ChefHat className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

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