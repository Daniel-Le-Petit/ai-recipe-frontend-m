'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Mail, Lock, User, ArrowLeft } from 'lucide-react'
import { useAppContext } from '../../context/AppContext'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import Link from 'next/link'

export default function ConnexionPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  
  const { login, isAuthenticated } = useAppContext()
  const router = useRouter()

  // Rediriger si déjà connecté
  if (isAuthenticated) {
    router.push('/compte')
    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    // Simulation d'un délai d'API
    await new Promise(resolve => setTimeout(resolve, 1000))

    const success = login(email, password)
    
    if (success) {
      router.push('/compte')
    } else {
      setError('Email ou mot de passe incorrect')
    }
    
    setIsLoading(false)
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
                Connexion
              </div>
              <h1 className="font-playfair text-4xl sm:text-5xl md:text-6xl font-bold text-slate-900">
                Connectez-vous
              </h1>
              <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
                Accédez à votre espace personnel et gérez vos recettes
              </p>
            </div>
          </div>
        </div>

        {/* Login Form */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <div className="max-w-md mx-auto">
            <div className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
              <div className="p-8">
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                      Email
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="votre@email.com"
                        className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-herb-green/30 focus:border-herb-green/50 transition-all duration-300"
                        required
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-2">
                      Mot de passe
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-herb-green/30 focus:border-herb-green/50 transition-all duration-300"
                        required
                      />
                    </div>
                  </div>

                  {/* Error message */}
                  {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
                      {error}
                    </div>
                  )}

                  {/* Demo credentials */}
                  <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded-xl text-sm">
                    <p className="font-medium mb-1">Identifiants de démonstration :</p>
                    <p>Email : <code className="bg-blue-100 px-1 rounded">test@test.com</code></p>
                    <p>Mot de passe : <code className="bg-blue-100 px-1 rounded">password</code></p>
                  </div>

                  {/* Submit button */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-herb-green to-sage hover:from-herb-dark hover:to-sage-dark text-white py-3 px-6 rounded-xl font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                  >
                    {isLoading ? (
                      <>
                        <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span>Connexion en cours...</span>
                      </>
                    ) : (
                      <>
                        <User className="h-5 w-5" />
                        <span>Se connecter</span>
                      </>
                    )}
                  </button>

                  {/* Back to home */}
                  <div className="text-center pt-3">
                    <Link href="/" className="inline-flex items-center space-x-2 text-slate-600 hover:text-herb-green transition-colors">
                      <ArrowLeft className="h-4 w-4" />
                      <span>Retour à l'accueil</span>
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
} 