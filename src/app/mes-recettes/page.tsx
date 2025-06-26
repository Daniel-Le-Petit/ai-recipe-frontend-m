"use client"

import { useEffect, useState } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

const API_URL = process.env.NEXT_PUBLIC_API_URL || process.env.VITE_APP_STRAPI_API_URL || '';

const sortOptions = [
  { value: 'date', label: 'Date' },
  { value: 'categorie', label: 'Catégorie' },
  { value: 'titre', label: 'Titre' }
]

export default function MesRecettesPage() {
  const [recipes, setRecipes] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [sortBy, setSortBy] = useState('date')

  useEffect(() => {
    // Récupère l'email de l'utilisateur connecté (à adapter selon ta logique d'auth)
    const email = typeof window !== 'undefined' ? localStorage.getItem('user_email') : null
    if (!email) {
      setError("Utilisateur non connecté ou email non trouvé.")
      setLoading(false)
      return
    }
    fetch(`${API_URL}/api/recipies?filters[RecipieUser][email][$eq]=${encodeURIComponent(email)}&populate=image,recipieCategory`)
      .then(res => res.json())
      .then(data => {
        setRecipes(Array.isArray(data) ? data : data.data || [])
      })
      .catch(() => setError("Erreur lors du chargement des recettes."))
      .finally(() => setLoading(false))
  }, [])

  // Fonction de tri
  const sortedRecipes = [...recipes].sort((a, b) => {
    if (sortBy === 'date') {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    }
    if (sortBy === 'categorie') {
      const catA = a.recipieCategory?.categoryName || ''
      const catB = b.recipieCategory?.categoryName || ''
      return catA.localeCompare(catB)
    }
    if (sortBy === 'titre') {
      return a.title.localeCompare(b.title)
    }
    return 0
  })

  // Handler pour commander (redirige vers la création de recette étape 3)
  const handleOrder = (recipe: any) => {
    window.location.href = `/creer-recette?id=${recipe.id}&fromCard=1&step=3`;
  }

  // Helper pour obtenir l'URL de l'image
  const getImageUrl = (recipe: any) => {
    // Strapi v4 : image.data.attributes.url
    if (recipe.image && recipe.image.data && recipe.image.data.attributes && recipe.image.data.attributes.url) {
      let url = recipe.image.data.attributes.url
      if (url.startsWith('/')) {
        return API_URL.replace(/\/api$/, '') + url
      }
      return url
    }
    return null
  }

  return (
    <>
      <Header />
      <div className="max-w-5xl mx-auto py-8">
        <div className="mb-4">
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 text-herb-green hover:text-herb-dark font-semibold text-lg"
            aria-label="Retour"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Retour
          </button>
        </div>
        <h1 className="text-2xl font-bold mb-4">Mes Recettes</h1>
        <p className="text-center text-gray-500 italic text-md mb-6">Conservez l'historique de vos recettes et partagez vos découvertes gourmandes</p>
        <div className="mb-6 flex items-center gap-4">
          <label htmlFor="sort" className="font-medium">Trier par :</label>
          <select
            id="sort"
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
            className="border rounded px-2 py-1"
          >
            {sortOptions.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
        {loading ? (
          <div>Chargement...</div>
        ) : error ? (
          <div className="text-red-500">{error}</div>
        ) : sortedRecipes.length === 0 ? (
          <div>Aucune recette trouvée.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {sortedRecipes.map(recipe => (
              <div key={recipe.id} className="bg-white rounded-xl shadow p-5 flex flex-col justify-between">
                <img
                  src={getImageUrl(recipe) || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'}
                  alt={recipe.title}
                  className="w-full h-40 object-cover rounded mb-3"
                  onError={e => { e.currentTarget.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' }}
                />
                <div>
                  <h2 className="font-semibold text-lg mb-2">{recipe.title}</h2>
                  <p className="text-sm text-gray-500 mb-2">
                    {recipe.recipieCategory?.categoryName && (
                      <>Catégorie : <span className="font-medium">{recipe.recipieCategory.categoryName}</span><br /></>
                    )}
                    {recipe.createdAt && (
                      <>Créée le : {new Date(recipe.createdAt).toLocaleString()}<br /></>
                    )}
                  </p>
                </div>
                <button
                  onClick={() => handleOrder(recipe)}
                  className="mt-2 bg-herb-green text-white px-4 py-2 rounded hover:bg-herb-dark transition"
                >
                  Commander
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  )
} 