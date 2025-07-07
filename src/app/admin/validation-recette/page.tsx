'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { StrapiRecipe, RecipeStatus, RECIPE_STATUSES } from '@/types/api';

export default function AdminValidationPage() {
  const [pendingRecipes, setPendingRecipes] = useState<StrapiRecipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updating, setUpdating] = useState<number | null>(null);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [quickViewRecipe, setQuickViewRecipe] = useState<StrapiRecipe | null>(null);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  useEffect(() => {
    fetchPendingRecipes();
  }, []);

  const fetchPendingRecipes = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/recipies?populate=*&filters[recipeState][$eq]=submitted&sort=createdAt:desc`);
      if (!response.ok) {
        throw new Error(`Erreur API: ${response.status} - ${response.statusText}`);
      }
      const data = await response.json();
      setPendingRecipes(data.data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
    } finally {
      setLoading(false);
    }
  };

  // Approve/reject a single recipe
  const handleStatusChange = async (recipeId: number, newStatus: RecipeStatus) => {
    try {
      setUpdating(recipeId);
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/recipies/${recipeId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: { recipeState: newStatus } })
      });
      console.log('Status update response:', response.status, await response.text());
      if (!response.ok) throw new Error('Erreur lors de la mise à jour');
      setPendingRecipes(prev => prev.filter(recipe => recipe.id !== recipeId));
      setSelectedIds(ids => ids.filter(id => id !== recipeId));
      if (quickViewRecipe && quickViewRecipe.id === recipeId) setQuickViewRecipe(null);
    } catch (err) {
      alert('Erreur lors de la mise à jour du statut');
    } finally {
      setUpdating(null);
    }
  };

  // Bulk approve/reject
  const handleBulkStatusChange = async (newStatus: RecipeStatus) => {
    for (const id of selectedIds) {
      await handleStatusChange(id, newStatus);
    }
  };

  // Filtered recipes
  const filteredRecipes = pendingRecipes
    .filter(recipe => recipe && typeof recipe.title === 'string')
    .filter(recipe => {
      const title = recipe.title.toLowerCase();
      const cat = recipe.recipieCategory?.categoryName || '';
      return (
        title.includes(search.toLowerCase()) &&
        (categoryFilter === '' || cat === categoryFilter)
      );
    });

  // Unique categories for filter dropdown
  const categories = Array.from(
    new Set(
      pendingRecipes
        .map(r => r?.recipieCategory?.categoryName)
        .filter(Boolean)
    )
  );

  // Status badge component
  const StatusBadge = ({ status }: { status: RecipeStatus }) => {
    const info = RECIPE_STATUSES[status] || RECIPE_STATUSES['draft'];
    return <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-semibold ${info.color}`}>{info.icon} {info.displayName}</span>;
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-gray-500">Chargement...</div>;
  }
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-100 border border-red-300 text-red-800 px-6 py-4 rounded">
          <div className="font-bold mb-2">Erreur de connexion</div>
          <div>{error}</div>
          <button onClick={fetchPendingRecipes} className="mt-4 bg-red-200 px-3 py-1 rounded">Réessayer</button>
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
              <p className="mt-1 text-sm text-gray-500">{pendingRecipes.length} recette(s) en attente de validation</p>
            </div>
            <div className="flex space-x-3">
              <Link href="/admin" className="bg-gray-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-700">Retour au tableau de bord</Link>
              <Link href="/admin/recettes" className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700">Gérer toutes les recettes</Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and filter controls */}
        <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
          <input
            type="text"
            placeholder="Recherche par titre..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="border px-2 py-1 rounded w-full md:w-64"
          />
          <select
            value={categoryFilter}
            onChange={e => setCategoryFilter(e.target.value)}
            className="border px-2 py-1 rounded w-full md:w-64"
          >
            <option value="">Toutes catégories</option>
            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
          <div className="flex gap-2">
            <button
              className="bg-green-500 text-white px-3 py-1 rounded disabled:opacity-50"
              disabled={selectedIds.length === 0}
              onClick={() => handleBulkStatusChange('approved')}
            >✅ Approuver sélection</button>
            <button
              className="bg-red-500 text-white px-3 py-1 rounded disabled:opacity-50"
              disabled={selectedIds.length === 0}
              onClick={() => handleBulkStatusChange('rejected')}
            >⛔ Rejeter sélection</button>
          </div>
        </div>

        {/* Table of recipes */}
        <div className="overflow-x-auto bg-white rounded shadow">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2"><input type="checkbox" onChange={e => setSelectedIds(e.target.checked ? filteredRecipes.map(r => r.id) : [])} checked={selectedIds.length === filteredRecipes.length && filteredRecipes.length > 0} /></th>
                <th className="p-2">Image</th>
                <th className="p-2">Titre</th>
                <th className="p-2">Auteur</th>
                <th className="p-2">Catégorie</th>
                <th className="p-2">Statut</th>
              </tr>
            </thead>
            <tbody>
              {filteredRecipes.map(recipe => (
                <tr
                  key={recipe.id}
                  className={
                    (selectedIds.includes(recipe.id) ? 'bg-blue-50 ' : '') +
                    'cursor-pointer hover:bg-blue-100 transition-colors'
                  }
                  onClick={e => {
                    // Prevent row click if clicking the checkbox
                    if ((e.target as HTMLElement).tagName === 'INPUT') return;
                    setQuickViewRecipe(recipe);
                  }}
                >
                  <td className="p-2 text-center">
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(recipe.id)}
                      onChange={ev => {
                        ev.stopPropagation();
                        setSelectedIds(ids =>
                          ids.includes(recipe.id) ? ids.filter(id => id !== recipe.id) : [...ids, recipe.id]
                        );
                      }}
                    />
                  </td>
                  <td className="p-2">
                    <img
                      src={recipe.image && recipe.image.url ? recipe.image.url : '/Images/fallback-recipe.jpg'}
                      alt={recipe.title || 'Recette'}
                      className="h-12 w-12 object-cover rounded"
                      onError={e => {
                        if (!e.currentTarget.src.endsWith('/Images/fallback-recipe.jpg')) {
                          e.currentTarget.src = '/Images/fallback-recipe.jpg';
                        }
                      }}
                    />
                  </td>
                  <td className="p-2">{recipe.title}</td>
                  <td className="p-2">{recipe.RecipeUser?.username || '—'}</td>
                  <td className="p-2">{recipe.recipieCategory?.categoryName || '—'}</td>
                  <td className="p-2"><StatusBadge status={recipe.recipeState || 'draft'} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Quick view modal */}
        {quickViewRecipe && (
          <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg max-w-lg w-full relative shadow-lg flex flex-col max-h-[90vh]">
              <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-800" onClick={() => setQuickViewRecipe(null)}>✖️</button>
              <div className="overflow-y-auto p-6 flex-1">
                <img
                  src={quickViewRecipe.image?.url || '/Images/fallback-recipe.jpg'}
                  alt={quickViewRecipe.title || 'Recette'}
                  className="w-full h-48 object-cover rounded mb-4"
                  onError={e => {
                    if (!e.currentTarget.src.endsWith('/Images/fallback-recipe.jpg')) {
                      e.currentTarget.src = '/Images/fallback-recipe.jpg';
                    }
                  }}
                />
                <h2 className="text-2xl font-bold mb-2">{quickViewRecipe.title}</h2>
                <div className="flex gap-2 my-2 flex-wrap">
                  <span>🧑‍🍳 {quickViewRecipe.RecipeUser?.username || '—'}</span>
                  <span>📂 {quickViewRecipe.recipieCategory?.categoryName || '—'}</span>
                  <span>🕒 {quickViewRecipe.duration} min</span>
                  <span>🍽️ {quickViewRecipe.servings}</span>
                  <span>💪 {quickViewRecipe.difficulty}</span>
                </div>
                <div className="my-2">
                  <strong>Description:</strong>
                  <p>{Array.isArray(quickViewRecipe.description) ? quickViewRecipe.description.map((d, i) => d.children?.map((c, j) => <span key={j}>{c.text}</span>)) : quickViewRecipe.description}</p>
                </div>
                {quickViewRecipe.ingredients && (
                  <div className="my-2">
                    <strong>Ingrédients:</strong>
                    <div className="text-sm text-gray-700 whitespace-pre-line">{Array.isArray(quickViewRecipe.ingredients) ? quickViewRecipe.ingredients.map((ing, i) => <div key={i}>- {ing.name} {ing.quantity}</div>) : quickViewRecipe.ingredients}</div>
                  </div>
                )}
                {quickViewRecipe.instructions && (
                  <div className="my-2">
                    <strong>Instructions:</strong>
                    <div className="text-sm text-gray-700 whitespace-pre-line">{quickViewRecipe.instructions}</div>
                  </div>
                )}
                {/* Extra info: robot, tags, state */}
                <div className="my-2 flex flex-wrap gap-4 items-center">
                  <span className="flex items-center">🤖 <span className="ml-1">Compatible robot :</span> <span className="ml-1 font-semibold">{quickViewRecipe.isRobotCompatible ? '✅' : '❌'}</span></span>
                  <span className="flex items-center">🏷️ <span className="ml-1">Tags :</span> <span className="ml-1 font-semibold">{Array.isArray(quickViewRecipe.tags) && quickViewRecipe.tags.length > 0 ? quickViewRecipe.tags.map((t, i) => typeof t === 'string' ? t : t.name).join(', ') : '—'}</span></span>
                  <span className="flex items-center">📄 <span className="ml-1">État actuel :</span> <span className="ml-1 font-semibold">{quickViewRecipe.recipeState || '—'}</span></span>
                </div>
              </div>
              <div className="flex gap-4 p-4 border-t bg-white sticky bottom-0 z-10">
                <button className="bg-green-500 text-white px-4 py-2 rounded flex-1" onClick={() => handleStatusChange(quickViewRecipe.id, 'approved')}>✅ Approuver</button>
                <button className="bg-red-500 text-white px-4 py-2 rounded flex-1" onClick={() => handleStatusChange(quickViewRecipe.id, 'rejected')}>⛔ Rejeter</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 