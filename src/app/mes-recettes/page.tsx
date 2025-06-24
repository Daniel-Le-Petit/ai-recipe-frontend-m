"use client"

import { useEffect, useState } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

const API_URL = process.env.NEXT_PUBLIC_API_URL || process.env.VITE_APP_STRAPI_API_URL

export default function MesRecettesPage() {
  const [recipes, setRecipes] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    // Récupère l'email de l'utilisateur connecté (à adapter selon ta logique d'auth)
    const email = typeof window !== 'undefined' ? localStorage.getItem('user_email') : null
    if (!email) {
      setError("Utilisateur non connecté ou email non trouvé.")
      setLoading(false)
      return
    }
    fetch(`${API_URL}/api/recipies?filters[user][email][$eq]=${encodeURIComponent(email)}`)
      .then(res => res.json())
      .then(data => {
        setRecipes(Array.isArray(data) ? data : data.data || [])
      })
      .catch(() => setError("Erreur lors du chargement des recettes."))
      .finally(() => setLoading(false))
  }, [])

  return (
    <>
      <Header />
      <div className="max-w-3xl mx-auto py-8">
        <h1 className="text-2xl font-bold mb-4">Mes Recettes</h1>
        {loading ? (
          <div>Chargement...</div>
        ) : error ? (
          <div className="text-red-500">{error}</div>
        ) : recipes.length === 0 ? (
          <div>Aucune recette trouvée.</div>
        ) : (
          <ul className="space-y-4">
            {recipes.map(recipe => (
              <li key={recipe.id} className="border p-4 rounded">
                <h2 className="font-semibold text-lg">{recipe.title}</h2>
                <p>{recipe.description}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
      <Footer />
    </>
  )
} 