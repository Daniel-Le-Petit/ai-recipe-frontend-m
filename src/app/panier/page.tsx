'use client'

import { useAppContext } from '../../context/AppContext'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { ShoppingCart, Trash2, Package, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

const DISTRIBUTORS = [
  { 
    id: 'carrefour', 
    name: 'Carrefour', 
    logo: '/distributeurs/carrefour.svg',
    desc: 'Grande distribution'
  },
  { 
    id: 'auchan', 
    name: 'Auchan', 
    logo: '/distributeurs/auchan.svg',
    desc: 'Grande distribution'
  },
  { 
    id: 'lavieclaire', 
    name: 'La Vie Claire', 
    logo: '/distributeurs/lavieclaire.svg',
    desc: 'Bio et naturel'
  },
  { 
    id: 'biocoop', 
    name: 'Biocoop', 
    logo: '/distributeurs/biocoop.svg',
    desc: 'Bio et coopératif'
  }
]

export default function PanierPage() {
  const { cart, removeFromCart, clearCart, selectedDistributor } = useAppContext()

  const handleOrder = () => {
    const distributorName = DISTRIBUTORS.find(d => d.id === selectedDistributor)?.name || 'notre partenaire'
    clearCart()
    alert(`Simulation : Votre panier a été préparé. Vous allez être redirigé vers ${distributorName}.fr pour finaliser votre commande.`)
  }

  const currentDistributor = DISTRIBUTORS.find(d => d.id === selectedDistributor)

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-herb-green/5 to-sage/5">
        {/* Header */}
        <div className="bg-white/80 backdrop-blur-sm border-b border-slate-200/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-16">
            <div className="text-center space-y-4 sm:space-y-6">
              <div className="inline-flex items-center gap-2 bg-herb-green/20 backdrop-blur-sm text-herb-dark px-3 sm:px-4 py-2 rounded-full text-sm font-medium border border-herb-green/30">
                <ShoppingCart className="h-4 w-4" />
                Mon Panier
              </div>
              <h1 className="font-playfair text-4xl sm:text-5xl md:text-6xl font-bold text-slate-900">
                Votre <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">panier</span>
              </h1>
              <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
                {cart.length > 0 
                  ? `Vous avez ${cart.length} ingrédient${cart.length > 1 ? 's' : ''} dans votre panier`
                  : "Votre panier est vide"
                }
              </p>
            </div>
          </div>
        </div>

        {/* Cart Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <div className="max-w-4xl mx-auto">
            {cart.length === 0 ? (
              // Empty cart
              <div className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
                <div className="p-12 text-center">
                  <div className="h-24 w-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <ShoppingCart className="h-12 w-12 text-slate-400" />
                  </div>
                  <h2 className="font-playfair text-2xl font-bold text-slate-900 mb-4">
                    Votre panier est vide
                  </h2>
                  <p className="text-slate-600 mb-8 max-w-md mx-auto">
                    Commencez par générer une recette et ajoutez les ingrédients à votre panier pour les commander.
                  </p>
                  <Link href="/creer-recette">
                    <button className="bg-gradient-to-r from-herb-green to-sage hover:from-herb-dark hover:to-sage-dark text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center space-x-2 mx-auto">
                      <Package className="h-5 w-5" />
                      <span>Créer une recette</span>
                    </button>
                  </Link>
                </div>
              </div>
            ) : (
              // Cart with items
              <div className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
                <div className="bg-gradient-to-r from-herb-green to-herb-dark p-6 sm:p-8 text-white">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <ShoppingCart className="h-8 w-8" />
                      <div>
                        <h2 className="font-playfair text-2xl font-bold">Vos ingrédients</h2>
                        <p className="text-white/80">{cart.length} article{cart.length > 1 ? 's' : ''}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold">{cart.length}</div>
                      <div className="text-white/80 text-sm">Ingrédients</div>
                    </div>
                  </div>
                </div>

                <div className="p-6 sm:p-8">
                  {/* Ingredients list */}
                  <div className="space-y-4 mb-8">
                    {cart.map((item) => (
                      <div key={item.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
                        <div className="flex items-center space-x-4">
                          <div className="h-3 w-3 bg-herb-green rounded-full"></div>
                          <div>
                            <p className="font-semibold text-slate-900">{item.name}</p>
                            <p className="text-sm text-slate-500">Quantité : {item.quantity}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-300"
                          title="Supprimer"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Partner info */}
                  <div className="bg-gradient-to-r from-blue-50 to-blue-100/50 rounded-2xl p-6 border border-blue-200/50 mb-8">
                    <div className="flex items-center space-x-3">
                      <img 
                        src={currentDistributor?.logo}
                        alt={currentDistributor?.name}
                        className="h-8 w-auto"
                      />
                      <div>
                        <p className="text-sm font-semibold text-blue-800">
                          Prêt à être envoyé chez {currentDistributor?.name}
                        </p>
                        <p className="text-xs text-blue-600">
                          Tous vos ingrédients seront disponibles chez {currentDistributor?.name}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link href="/creer-recette" className="flex-1">
                      <button className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-slate-200 text-slate-700 hover:bg-slate-300 rounded-xl font-semibold transition-all duration-300">
                        <ArrowLeft className="h-5 w-5" />
                        <span>Continuer mes achats</span>
                      </button>
                    </Link>
                    
                    <button
                      onClick={handleOrder}
                      className="flex-1 bg-gradient-to-r from-herb-green to-sage hover:from-herb-dark hover:to-sage-dark text-white py-3 px-6 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2"
                    >
                      <ShoppingCart className="h-5 w-5" />
                      <span>Commander les ingrédients chez {currentDistributor?.name}</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
} 