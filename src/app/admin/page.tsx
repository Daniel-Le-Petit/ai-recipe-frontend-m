'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Recipe } from '@/types/api';
import { Database, Server, User, Lock, Eye, EyeOff } from 'lucide-react';

interface AdminStats {
  total: number;
  pending: number;
  approved: number;
  rejected: number;
  draft: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<AdminStats>({
    total: 0,
    pending: 0,
    approved: 0,
    rejected: 0,
    draft: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [recentRecipes, setRecentRecipes] = useState<Recipe[]>([]);
  const [showSensitiveInfo, setShowSensitiveInfo] = useState(false);
  const [apiUrl, setApiUrl] = useState<string>(process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1338');
  const [apiDiag, setApiDiag] = useState<{status: number|null, statusText: string, count: number|null, error?: string}|null>(null);

  useEffect(() => {
    fetchAdminData();
    // Diagnostic API fetch
    fetch(`${apiUrl}/api/recipie?populate=*`)
      .then(res => {
        if (!res.ok) {
          setApiDiag({status: res.status, statusText: res.statusText, count: null});
          return res.json();
        }
        return res.json().then(data => {
          setApiDiag({status: res.status, statusText: res.statusText, count: data.data?.length || 0});
        });
      })
      .catch(e => {
        setApiDiag({status: null, statusText: '', count: null, error: e.message});
      });
  }, [apiUrl]);

  const fetchAdminData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch all recipes to calculate stats
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/recipie?populate=*`);
      
      if (!response.ok) {
        throw new Error(`Erreur API: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();
      const recipes = data.data || [];

      console.log('Recipes loaded:', recipes.length, recipes);

      // Calculate statistics
      const statsData: AdminStats = {
        total: recipes.length,
        pending: recipes.filter((r: any) => r.attributes?.recipe_state === 'pending').length,
        approved: recipes.filter((r: any) => r.attributes?.recipe_state === 'approved').length,
        rejected: recipes.filter((r: any) => r.attributes?.recipe_state === 'rejected').length,
        draft: recipes.filter((r: any) => r.attributes?.recipe_state === 'draft').length
      };

      console.log('Stats calculated:', statsData);
      setStats(statsData);

      // Get recent recipes (last 5)
      const recent = recipes
        .sort((a: any, b: any) => new Date(b.attributes?.updatedAt || 0).getTime() - new Date(a.attributes?.updatedAt || 0).getTime())
        .slice(0, 5);

      setRecentRecipes(recent);
    } catch (err) {
      console.error('Erreur lors du chargement des données admin:', err);
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'approved': return 'Approuvée';
      case 'pending': return 'En attente';
      case 'rejected': return 'Rejetée';
      case 'draft': return 'Brouillon';
      default: return 'Inconnu';
    }
  };

  const maskPassword = (password: string) => {
    if (!password || password.length < 8) return '****';
    return `${password.substring(0, 4)}****${password.substring(password.length - 4)}`;
  };

  const maskExternalUrl = (url: string) => {
    if (!url || url.length < 63) return '****';
    return `${url.substring(0, 20)}****${url.substring(url.length - 43)}`;
  };

  const getConnectionInfo = () => {
    return {
      hostname: process.env.NEXT_PUBLIC_API_URL?.replace('http://', '').replace('https://', '').split(':')[0] || 'localhost',
      port: process.env.NEXT_PUBLIC_API_URL?.includes(':') ? process.env.NEXT_PUBLIC_API_URL.split(':')[2]?.split('/')[0] : '1337',
      database: process.env.NEXT_PUBLIC_DATABASE_NAME || 'strapi',
      username: process.env.NEXT_PUBLIC_DATABASE_USER || 'postgres',
      password: process.env.NEXT_PUBLIC_DATABASE_PASSWORD || 'password',
      externalUrl: process.env.NEXT_PUBLIC_EXTERNAL_DATABASE_URL || 'postgresql://user:pass@host:5432/db'
    };
  };

  const getUserInfo = () => {
    // Simulation des informations utilisateur (à adapter selon votre système d'auth)
    return {
      id: '1',
      username: 'admin',
      email: 'admin@aietfinesherbes.com',
      isAdmin: true,
      role: 'admin',
      confirmationToken: 'abc123def456ghi789'
    };
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-white p-6 rounded-lg shadow">
                  <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                  <div className="h-8 bg-gray-200 rounded w-1/3"></div>
                </div>
              ))}
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
                onClick={fetchAdminData}
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
      {/* DIAGNOSTIC */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-2">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="font-semibold text-blue-900 mb-1">Diagnostic API</div>
          <div className="text-sm text-blue-800">
            <div><span className="font-medium">NEXT_PUBLIC_API_URL</span> : <code className="bg-blue-100 px-1 rounded">{apiUrl}</code></div>
            <div className="mt-1">
              <span className="font-medium">/api/recipie</span> : {
                apiDiag === null ? (
                  <span>Chargement…</span>
                ) : apiDiag.error ? (
                  <span className="text-red-600">Erreur : {apiDiag.error}</span>
                ) : (
                  <span>
                    Status <b>{apiDiag.status}</b> {apiDiag.statusText} —
                    {typeof apiDiag.count === 'number' ? ` ${apiDiag.count} recette(s)` : ' aucune donnée'}
                  </span>
                )
              }
            </div>
          </div>
        </div>
      </div>
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Tableau de bord Admin</h1>
              <p className="mt-1 text-sm text-gray-500">
                Gestion des recettes et validation du contenu
              </p>
            </div>
            <div className="flex space-x-3">
              <Link
                href="/admin/recettes"
                className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700"
              >
                Gérer les recettes
              </Link>
              <Link
                href="/admin/validation-recette"
                className="bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-700"
              >
                Valider les recettes
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Total des recettes
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {stats.total}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-6 w-6 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      En attente
                    </dt>
                    <dd className="text-lg font-medium text-yellow-600">
                      {stats.pending}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-6 w-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Approuvées
                    </dt>
                    <dd className="text-lg font-medium text-green-600">
                      {stats.approved}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-6 w-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Rejetées
                    </dt>
                    <dd className="text-lg font-medium text-red-600">
                      {stats.rejected}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Database Connection Info */}
        <div className="bg-white shadow rounded-lg mb-8">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg leading-6 font-medium text-gray-900 flex items-center gap-2">
                <Database className="h-5 w-5 text-blue-500" />
                Informations de connexion
              </h3>
              <button
                onClick={() => setShowSensitiveInfo(!showSensitiveInfo)}
                className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800"
              >
                {showSensitiveInfo ? (
                  <>
                    <EyeOff className="h-4 w-4" />
                    Masquer
                  </>
                ) : (
                  <>
                    <Eye className="h-4 w-4" />
                    Afficher
                  </>
                )}
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Database Info */}
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-700 flex items-center gap-2">
                  <Server className="h-4 w-4" />
                  Base de données
                </h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Hostname:</span>
                    <span className="text-sm font-mono text-gray-800">{getConnectionInfo().hostname}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Port:</span>
                    <span className="text-sm font-mono text-gray-800">{getConnectionInfo().port}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Database:</span>
                    <span className="text-sm font-mono text-gray-800">{getConnectionInfo().database}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Username:</span>
                    <span className="text-sm font-mono text-gray-800">{getConnectionInfo().username}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Password:</span>
                    <span className="text-sm font-mono text-gray-800">
                      {showSensitiveInfo ? getConnectionInfo().password : maskPassword(getConnectionInfo().password)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">External URL:</span>
                    <span className="text-sm font-mono text-gray-800 break-all">
                      {showSensitiveInfo ? getConnectionInfo().externalUrl : maskExternalUrl(getConnectionInfo().externalUrl)}
                    </span>
                  </div>
                </div>
              </div>

              {/* User Info */}
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-700 flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Utilisateur actuel
                </h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">ID:</span>
                    <span className="text-sm font-mono text-gray-800">{getUserInfo().id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Username:</span>
                    <span className="text-sm font-mono text-gray-800">{getUserInfo().username}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Email:</span>
                    <span className="text-sm font-mono text-gray-800">{getUserInfo().email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Is Admin:</span>
                    <span className={`text-sm font-mono px-2 py-1 rounded ${
                      getUserInfo().isAdmin ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {getUserInfo().isAdmin ? 'Oui' : 'Non'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Role:</span>
                    <span className="text-sm font-mono text-gray-800">{getUserInfo().role}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Confirmation Token:</span>
                    <span className="text-sm font-mono text-gray-800">
                      {showSensitiveInfo ? getUserInfo().confirmationToken : '****'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white shadow rounded-lg mb-8">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
              Actions rapides
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link
                href="/admin/validation-recette"
                className="relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500 rounded-lg border border-gray-200 hover:border-gray-300"
              >
                <div>
                  <span className="rounded-lg inline-flex p-3 bg-yellow-50 text-yellow-700 ring-4 ring-white">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </span>
                </div>
                <div className="mt-8">
                  <h3 className="text-lg font-medium">
                    <span className="absolute inset-0" aria-hidden="true" />
                    Valider les recettes
                  </h3>
                  <p className="mt-2 text-sm text-gray-500">
                    Examiner et approuver les nouvelles recettes en attente
                  </p>
                </div>
                <span className="pointer-events-none absolute top-6 right-6 text-gray-300 group-hover:text-gray-400" aria-hidden="true">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z" />
                  </svg>
                </span>
              </Link>

              <Link
                href="/admin/recettes"
                className="relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500 rounded-lg border border-gray-200 hover:border-gray-300"
              >
                <div>
                  <span className="rounded-lg inline-flex p-3 bg-blue-50 text-blue-700 ring-4 ring-white">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                    </svg>
                  </span>
                </div>
                <div className="mt-8">
                  <h3 className="text-lg font-medium">
                    <span className="absolute inset-0" aria-hidden="true" />
                    Gérer les recettes
                  </h3>
                  <p className="mt-2 text-sm text-gray-500">
                    Voir, modifier et supprimer toutes les recettes
                  </p>
                </div>
                <span className="pointer-events-none absolute top-6 right-6 text-gray-300 group-hover:text-gray-400" aria-hidden="true">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z" />
                  </svg>
                </span>
              </Link>

              <Link
                href="/creer-recette"
                className="relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500 rounded-lg border border-gray-200 hover:border-gray-300"
              >
                <div>
                  <span className="rounded-lg inline-flex p-3 bg-green-50 text-green-700 ring-4 ring-white">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </span>
                </div>
                <div className="mt-8">
                  <h3 className="text-lg font-medium">
                    <span className="absolute inset-0" aria-hidden="true" />
                    Créer une recette
                  </h3>
                  <p className="mt-2 text-sm text-gray-500">
                    Ajouter une nouvelle recette au système
                  </p>
                </div>
                <span className="pointer-events-none absolute top-6 right-6 text-gray-300 group-hover:text-gray-400" aria-hidden="true">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z" />
                  </svg>
                </span>
              </Link>
            </div>
          </div>
        </div>

        {/* Recent Recipes */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Recettes récentes
              </h3>
              <Link
                href="/admin/recettes"
                className="text-sm text-blue-600 hover:text-blue-500"
              >
                Voir toutes →
              </Link>
            </div>
            
            {recentRecipes.length === 0 ? (
              <div className="text-center py-12">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">Aucune recette</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Commencez par créer votre première recette.
                </p>
              </div>
            ) : (
              <div className="overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Recette
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Statut
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Dernière modification
                      </th>
                      <th className="relative px-6 py-3">
                        <span className="sr-only">Actions</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {recentRecipes.map((recipe: any) => (
                      <tr key={recipe.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              {recipe.attributes?.image?.data?.attributes?.url ? (
                                <img
                                  className="h-10 w-10 rounded-full object-cover"
                                  src={`${process.env.NEXT_PUBLIC_API_URL}${recipe.attributes.image.data.attributes.url}`}
                                  alt={recipe.attributes.title || 'Recette'}
                                  onError={(e) => {
                                    e.currentTarget.src = '/recipe-fallback.jpg';
                                  }}
                                />
                              ) : (
                                <img
                                  className="h-10 w-10 rounded-full object-cover"
                                  src="/recipe-fallback.jpg"
                                  alt="Image par défaut"
                                />
                              )}
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {recipe.attributes?.title || 'Sans titre'}
                              </div>
                              <div className="text-sm text-gray-500">
                                {recipe.attributes?.difficulty || 'Difficulté non définie'}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(recipe.attributes?.recipe_state || 'draft')}`}>
                            {getStatusLabel(recipe.attributes?.recipe_state || 'draft')}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {recipe.attributes?.updatedAt ? new Date(recipe.attributes.updatedAt).toLocaleDateString('fr-FR') : 'N/A'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <Link
                            href={`/admin/edit-recette/${recipe.id}`}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            Modifier
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 