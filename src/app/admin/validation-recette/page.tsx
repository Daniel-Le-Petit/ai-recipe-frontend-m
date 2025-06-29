'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Recipe } from '@/types/api';

export default function AdminValidationPage() {
  const [pendingRecipes, setPendingRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updating, setUpdating] = useState<number | null>(null);

  useEffect(() => {
    fetchPendingRecipes();
  }, []);

  const fetchPendingRecipes = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/recipies?populate=*&filters[recipe_state]=pending&sort=createdAt:desc`);
      
      if (!response.ok) {
        throw new Error(`Erreur API: ${response.status}`);
      }

      const data = await response.json();
      setPendingRecipes(data.data || []);
    } catch (err) {
      console.error('Erreur lors du chargement des recettes en attente:', err);
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (recipeId: number, newStatus: string) => {
    try {
      setUpdating(recipeId);
      
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/recipies/${recipeId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: {
            recipe_state: newStatus
          }
        })
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la mise à jour');
      }

      // Remove from pending list
      setPendingRecipes(prev => prev.filter(recipe => recipe.id !== recipeId));

    } catch (err) {
      console.error('Erreur lors de la mise à jour du statut:', err);
      alert('Erreur lors de la mise à jour du statut');
    } finally {
      setUpdating(null);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'facile': return 'bg-green-100 text-green-800';
      case 'moyen': return 'bg-yellow-100 text-yellow-800';
      case 'difficile': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="bg-white p-6 rounded-lg shadow mb-6">
              <div className="h-4 bg-gray-200 rounded w-1/3 mb-4"></div>
              <div className="space-y-3">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-32 bg-gray-200 rounded"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">
                  Erreur de connexion
                </h3>
                <div className="mt-2 text-sm text-red-700">
                  <p>{error}</p>
                  <p className="mt-2">Vérifiez que le backend Strapi est en cours d&apos;exécution sur {process.env.NEXT_PUBLIC_API_URL}</p>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <button
                onClick={fetchPendingRecipes}
                className="bg-red-100 text-red-800 px-4 py-2 rounded-md text-sm font-medium hover:bg-red-200"
              >
                Réessayer
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Validation des recettes</h1>
              <p className="mt-1 text-sm text-gray-500">
                {pendingRecipes.length} recette(s) en attente de validation
              </p>
            </div>
            <div className="flex space-x-3">
              <Link
                href="/admin"
                className="bg-gray-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-700"
              >
                Retour au tableau de bord
              </Link>
              <Link
                href="/admin/recettes"
                className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700"
              >
                Gérer toutes les recettes
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {pendingRecipes.length === 0 ? (
          <div className="bg-white shadow rounded-lg">
            <div className="text-center py-12">
              <svg className="mx-auto h-12 w-12 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">Aucune recette en attente</h3>
              <p className="mt-1 text-sm text-gray-500">
                Toutes les recettes ont été traitées !
              </p>
              <div className="mt-6">
                <Link
                  href="/admin/recettes"
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                >
                  Voir toutes les recettes
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {pendingRecipes.map((recipe: any) => (
              <div key={recipe.id} className="bg-white shadow rounded-lg overflow-hidden">
                <div className="p-6">
                  <div className="flex items-start space-x-6">
                    {/* Image */}
                    <div className="flex-shrink-0">
                      {recipe.attributes?.image?.data?.attributes?.url ? (
                        <img
                          className="h-24 w-24 rounded-lg object-cover"
                          src={`${process.env.NEXT_PUBLIC_API_URL}${recipe.attributes.image.data.attributes.url}`}
                          alt={recipe.attributes.title || 'Recette'}
                        />
                      ) : (
                        <div className="h-24 w-24 rounded-lg bg-gray-200 flex items-center justify-center">
                          <svg className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-medium text-gray-900">
                          {recipe.attributes?.title || 'Sans titre'}
                        </h3>
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getDifficultyColor(recipe.attributes?.difficulty || '')}`}>
                          {recipe.attributes?.difficulty || 'Difficulté non définie'}
                        </span>
                      </div>

                      {recipe.attributes?.description && (
                        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                          {recipe.attributes.description}
                        </p>
                      )}

                      {/* Recipe details */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm">
                        <div>
                          <span className="text-gray-500">Temps de préparation:</span>
                          <div className="font-medium">
                            {recipe.attributes?.preparation_time || 'Non défini'}
                          </div>
                        </div>
                        <div>
                          <span className="text-gray-500">Temps de cuisson:</span>
                          <div className="font-medium">
                            {recipe.attributes?.cooking_time || 'Non défini'}
                          </div>
                        </div>
                        <div>
                          <span className="text-gray-500">Portions:</span>
                          <div className="font-medium">
                            {recipe.attributes?.servings || 'Non défini'}
                          </div>
                        </div>
                        <div>
                          <span className="text-gray-500">Créée le:</span>
                          <div className="font-medium">
                            {recipe.attributes?.createdAt ? new Date(recipe.attributes.createdAt).toLocaleDateString('fr-FR') : 'N/A'}
                          </div>
                        </div>
                      </div>

                      {/* Ingredients preview */}
                      {recipe.attributes?.ingredients && (
                        <div className="mb-4">
                          <span className="text-sm font-medium text-gray-700">Ingrédients:</span>
                          <div className="mt-1 text-sm text-gray-600 line-clamp-2">
                            {recipe.attributes.ingredients}
                          </div>
                        </div>
                      )}

                      {/* Instructions preview */}
                      {recipe.attributes?.instructions && (
                        <div className="mb-4">
                          <span className="text-sm font-medium text-gray-700">Instructions:</span>
                          <div className="mt-1 text-sm text-gray-600 line-clamp-3">
                            {recipe.attributes.instructions}
                          </div>
                        </div>
                      )}

                      {/* Actions */}
                      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                        <div className="flex space-x-3">
                          <Link
                            href={`/recettes/${recipe.id}`}
                            className="text-blue-600 hover:text-blue-900 text-sm font-medium"
                          >
                            Voir la recette complète
                          </Link>
                          <Link
                            href={`/admin/edit-recette/${recipe.id}`}
                            className="text-gray-600 hover:text-gray-900 text-sm font-medium"
                          >
                            Modifier
                          </Link>
                        </div>

                        <div className="flex space-x-3">
                          <button
                            onClick={() => handleStatusChange(recipe.id, 'rejected')}
                            disabled={updating === recipe.id}
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
                          >
                            {updating === recipe.id ? (
                              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                            ) : (
                              <svg className="-ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            )}
                            Rejeter
                          </button>

                          <button
                            onClick={() => handleStatusChange(recipe.id, 'approved')}
                            disabled={updating === recipe.id}
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
                          >
                            {updating === recipe.id ? (
                              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                            ) : (
                              <svg className="-ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            )}
                            Approuver
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 