'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Clock, User, Calendar, Eye, Check, X } from 'lucide-react';

interface Recipe {
  id: number;
  attributes: {
    title: string;
    createdAt: string;
    updatedAt: string;
    recipeState: string;
    author?: {
      data?: {
        attributes: {
          username: string;
        };
      };
    };
  };
}

export default function AdminPage() {
  const router = useRouter();
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    checkAdminStatus();
    loadPendingRecipes();
  }, []);

  const checkAdminStatus = async () => {
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
  };

  const loadPendingRecipes = async () => {
    try {
      // Temporairement, charger toutes les recettes pour les tests
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/recipies?populate=*&sort=createdAt:desc`
      );
      
      if (!response.ok) {
        throw new Error('Erreur lors du chargement des recettes');
      }
      
      const data = await response.json();
      setRecipes(data.data || []);
    } catch (error) {
      console.error('Erreur lors du chargement des recettes:', error);
      setError('Erreur lors du chargement des recettes');
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string | undefined) => {
    if (!status) {
      return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">⚪ Non défini</span>;
    }
    
    switch (status) {
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
      month: 'short',
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
          <p className="text-gray-600">Chargement des recettes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto py-8 px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            🛠️ Administration - Validation des Recettes
          </h1>
          <p className="text-gray-600">
            Gérez les recettes en attente de validation
          </p>
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">En attente</p>
                <p className="text-2xl font-bold text-gray-900">
                  {recipes?.filter(r => r.attributes?.recipeState === 'submitted').length || 0}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <Check className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Validées</p>
                <p className="text-2xl font-bold text-gray-900">
                  {recipes?.filter(r => r.attributes?.recipeState === 'approved').length || 0}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-2 bg-red-100 rounded-lg">
                <X className="w-6 h-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Refusées</p>
                <p className="text-2xl font-bold text-gray-900">
                  {recipes?.filter(r => r.attributes?.recipeState === 'rejected').length || 0}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Liste des recettes */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Recettes à valider</h3>
            <p className="text-sm text-gray-600 mt-1">
              {recipes?.filter(r => r.attributes?.recipeState === 'submitted').length || 0} recettes en attente de validation
            </p>
          </div>
          
          <div className="divide-y divide-gray-200">
            {recipes
              ?.filter(recipe => recipe.attributes?.recipeState === 'submitted' || !recipe.attributes?.recipeState)
              .map((recipe) => (
                <div key={recipe.id || `recipe-${Math.random()}`} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="text-lg font-medium text-gray-900">
                          {recipe.attributes?.title || 'Sans titre'}
                        </h4>
                        {getStatusBadge(recipe.attributes?.recipeState)}
                      </div>
                      
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center">
                          <User className="w-4 h-4 mr-1" />
                          @{recipe.attributes?.author?.data?.attributes?.username || 'Anonyme'}
                        </div>
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {recipe.attributes?.createdAt ? formatDate(recipe.attributes.createdAt) : 'Date inconnue'}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => recipe.id && router.push(`/admin/validation-recette/${recipe.id}`)}
                        disabled={!recipe.id}
                        className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        Voir
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
} 