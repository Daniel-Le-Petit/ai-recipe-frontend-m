'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Check, X, Edit, Copy, ArrowLeft, Clock, User, Calendar } from 'lucide-react';

interface Recipe {
  id: number;
  attributes: {
    title: string;
    description?: string;
    instructions?: string;
    ingredients?: Array<{ name: string; quantity: string }>;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    recipeState: string;
    image?: {
      data?: {
        attributes: {
          url: string;
        };
      };
    };
    author?: {
      data?: {
        attributes: {
          username: string;
        };
      };
    };
  };
}

export default function ValidationRecettePage() {
  const params = useParams();
  const router = useRouter();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectReason, setRejectReason] = useState('');

  const recipeId = params.id;

  const checkAdminStatus = useCallback(async () => {
    // Temporairement désactivé pour les tests
    setIsAdmin(true);
    return;
    
    try {
      const token = localStorage.getItem('jwt');
      if (!token) {
        router.push('/connexion');
        return;
      }
      
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/me`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      
      if (response.ok) {
        const user = await response.json();
        setIsAdmin(user.role?.name === 'admin');
      } else {
        setIsAdmin(false);
      }
    } catch (error) {
      console.error('Erreur lors de la vérification admin:', error);
      setIsAdmin(false);
    }
  }, [router]);

  const loadRecipe = useCallback(async () => {
    try {
      console.log('Chargement de la recette ID:', recipeId);
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1338';
      console.log('URL API utilisée:', apiUrl);
      
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/recipies/${recipeId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
        },
      });
      
      console.log('Réponse API:', response.status, response.statusText);
      
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error(`Recette avec l'ID ${recipeId} non trouvée`);
        }
        throw new Error(`Erreur ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log('Données reçues:', data);
      
      if (!data.data) {
        throw new Error('Aucune donnée reçue de l\'API');
      }
      
      // Vérifier et nettoyer les données
      const recipeData = data.data;
      console.log('Données de la recette:', {
        id: recipeData.id,
        title: recipeData.attributes?.title,
        description: recipeData.attributes?.description,
        instructions: recipeData.attributes?.instructions,
        ingredients: recipeData.attributes?.ingredients,
        recipeState: recipeData.attributes?.recipeState
      });
      
      setRecipe(recipeData);
    } catch (error) {
      console.error('Erreur lors du chargement de la recette:', error);
      
      // Message d'erreur plus spécifique
      const errorMessage = error instanceof Error ? error.message : 'Erreur inconnue'
      if (errorMessage.includes('ECONNREFUSED') || errorMessage.includes('fetch failed')) {
        setError('Le serveur backend n\'est pas démarré. Veuillez démarrer le backend Strapi avec "npm run develop" dans le dossier backend-js.');
      } else {
        setError(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  }, [recipeId]);

  useEffect(() => {
    checkAdminStatus();
    loadRecipe();
  }, [checkAdminStatus, loadRecipe]);

  const copyToChatGPT = () => {
    if (!recipe) return;

    const ingredients = recipe.attributes?.ingredients?.map(i => `${i.name || 'Ingrédient'} (${i.quantity || 'quantité non spécifiée'})`).join(', ') || 'Non spécifiés';
    const instructions = recipe.attributes?.instructions || recipe.attributes?.description || 'Non spécifiées';

    const prompt = `Vérifie cette recette :

Titre : ${recipe.attributes?.title || 'Sans titre'}
Ingrédients : ${ingredients}
Instructions : ${instructions}

1. Tous les champs sont-ils présents ?
2. Y a-t-il une incohérence ou un oubli ?
3. Donne un score de qualité (0 à 100), une remarque et une suggestion d'amélioration.`;

    navigator.clipboard.writeText(prompt);
    alert('Prompt copié dans le presse-papiers !');
  };

  const updateRecipeStatus = async (status: string, comment?: string) => {
    try {
      const token = localStorage.getItem('jwt');
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/recipies/${recipeId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          data: {
            recipeState: status,
            ...(comment && { commentaireModeration: comment }),
          },
        }),
      });

      if (response.ok) {
        loadRecipe();
        setShowRejectModal(false);
        setRejectReason('');
      } else {
        throw new Error('Erreur lors de la mise à jour');
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour du statut:', error);
      alert('Erreur lors de la mise à jour du statut');
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'draft':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">🟡 Brouillon</span>;
      case 'submitted':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">🟡 En attente</span>;
      case 'approved':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">🟢 Validée</span>;
      case 'rejected':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">🔴 Refusée</span>;
      default:
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">⚪ {status}</span>;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Accès interdit</h1>
          <p className="text-gray-600 mb-4">Vous n'avez pas les permissions nécessaires pour accéder à cette page.</p>
          <button
            onClick={() => router.push('/')}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Retour à l'accueil
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement de la recette...</p>
        </div>
      </div>
    );
  }

  if (error || !recipe) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Erreur</h1>
          <p className="text-gray-600 mb-4">{error || 'Recette non trouvée'}</p>
          <button
            onClick={() => router.push('/admin')}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Retour à l'administration
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto py-8 px-4">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.push('/admin')}
            className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour à la liste
          </button>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              �� {recipe.attributes?.title || 'Sans titre'}
            </h1>
            
            <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
              <div className="flex items-center">
                <User className="w-4 h-4 mr-1" />
                par @{recipe.attributes?.author?.data?.attributes?.username || 'Anonyme'}
              </div>
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                {recipe.attributes?.createdAt ? formatDate(recipe.attributes.createdAt) : 'Date inconnue'}
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                {getStatusBadge(recipe.attributes?.recipeState)}
              </div>
            </div>

            {/* Image */}
            {recipe.attributes?.image?.data?.attributes?.url && (
              <div className="mb-6">
                <img
                  src={`${process.env.NEXT_PUBLIC_API_URL}${recipe.attributes.image.data.attributes.url}`}
                  alt={recipe.attributes?.title || 'Recette'}
                  className="w-full h-64 object-cover rounded-lg"
                />
              </div>
            )}
          </div>
        </div>

        {/* Détails de la recette */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Ingrédients */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              🧂 Ingrédients
            </h2>
            {recipe.attributes?.ingredients && recipe.attributes.ingredients.length > 0 ? (
              <ul className="space-y-2">
                {recipe.attributes.ingredients.map((ingredient, index) => (
                  <li key={index} className="flex items-center">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                    <span className="font-medium">{ingredient.name || 'Ingrédient'}</span>
                    <span className="text-gray-600 ml-2">({ingredient.quantity || 'quantité non spécifiée'})</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 italic">Aucun ingrédient spécifié</p>
            )}
          </div>

          {/* Instructions */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              🥣 Instructions
            </h2>
            <div className="prose max-w-none">
              {recipe.attributes?.instructions || recipe.attributes?.description ? (
                <p className="text-gray-700 whitespace-pre-wrap">
                  {recipe.attributes.instructions || recipe.attributes.description}
                </p>
              ) : (
                <p className="text-gray-500 italic">Aucune instruction spécifiée</p>
              )}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={copyToChatGPT}
              className="flex items-center justify-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              <Copy className="w-4 h-4 mr-2" />
              📋 Copier pour ChatGPT
            </button>
            
            <button
              onClick={() => updateRecipeStatus('approved')}
              className="flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <Check className="w-4 h-4 mr-2" />
              ✅ Valider
            </button>
            
            <button
              onClick={() => setShowRejectModal(true)}
              className="flex items-center justify-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              <X className="w-4 h-4 mr-2" />
              ❌ Refuser
            </button>
            
            <button
              onClick={() => router.push(`/admin/edit-recette/${recipeId}`)}
              className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Edit className="w-4 h-4 mr-2" />
              ✏️ Corriger
            </button>
          </div>
        </div>
      </div>

      {/* Modal de refus */}
      {showRejectModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">Raison du refus</h3>
            <textarea
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              placeholder="Expliquez pourquoi cette recette est refusée..."
              className="w-full h-32 p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <div className="flex justify-end space-x-3 mt-4">
              <button
                onClick={() => setShowRejectModal(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Annuler
              </button>
              <button
                onClick={() => updateRecipeStatus('rejected', rejectReason)}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Confirmer le refus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 