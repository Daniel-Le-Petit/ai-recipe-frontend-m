import React, { useState, useEffect, useRef } from 'react';
import { Search, Filter, X, Clock, Users, ChefHat } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SearchFilters {
  query: string;
  category?: string;
  difficulty?: string;
  maxDuration?: number;
  minServings?: number;
  isRobotCompatible?: boolean;
}

interface SearchBarProps {
  onSearch: (filters: SearchFilters) => void;
  categories?: Array<{ id: number; categoryName: string }>;
  loading?: boolean;
  className?: string;
}

const difficulties = ['Facile', 'Intermédiaire', 'Difficile'];
const durationOptions = [
  { label: 'Tous', value: 0 },
  { label: '≤ 15 min', value: 15 },
  { label: '≤ 30 min', value: 30 },
  { label: '≤ 45 min', value: 45 },
  { label: '≤ 60 min', value: 60 },
];

export const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  categories = [],
  loading = false,
  className = ''
}) => {
  const [filters, setFilters] = useState<SearchFilters>({ query: '' });
  const [showFilters, setShowFilters] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);

  // Suggestions basées sur les catégories et difficultés
  const allSuggestions = [
    ...categories.map(cat => cat.categoryName),
    ...difficulties,
    'Robot compatible',
    'Rapide',
    'Végétarien',
    'Sans gluten'
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setSuggestions([]);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (value: string) => {
    setFilters(prev => ({ ...prev, query: value }));
    
    if (value.length > 1) {
      const filtered = allSuggestions.filter(suggestion =>
        suggestion.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered.slice(0, 5));
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setFilters(prev => ({ ...prev, query: suggestion }));
    setSuggestions([]);
  };

  const handleSearch = () => {
    onSearch(filters);
    setSuggestions([]);
  };

  const clearFilters = () => {
    setFilters({ query: '' });
    onSearch({ query: '' });
  };

  const hasActiveFilters = filters.query || filters.category || filters.difficulty || 
    filters.maxDuration || filters.minServings || filters.isRobotCompatible;

  return (
    <div className={`relative ${className}`} ref={searchRef}>
      {/* Barre de recherche principale */}
      <div className="relative">
        <div className="flex items-center bg-white rounded-lg shadow-md border border-gray-200 focus-within:border-herb-green focus-within:ring-2 focus-within:ring-herb-green/20">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Rechercher une recette, ingrédient, catégorie..."
              value={filters.query}
              onChange={(e) => handleInputChange(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              className="w-full pl-10 pr-4 py-3 text-gray-700 placeholder-gray-400 focus:outline-none"
            />
          </div>
          
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`p-3 transition-colors ${showFilters ? 'text-herb-green bg-herb-green/10' : 'text-gray-400 hover:text-herb-green'}`}
            title="Filtres"
          >
            <Filter className="w-5 h-5" />
          </button>
          
          <button
            onClick={handleSearch}
            disabled={loading}
            className="px-6 py-3 bg-herb-green text-white font-medium rounded-r-lg hover:bg-herb-dark transition-colors disabled:opacity-50"
          >
            {loading ? 'Recherche...' : 'Rechercher'}
          </button>
        </div>

        {/* Suggestions */}
        <AnimatePresence>
          {suggestions.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg z-50 mt-1"
            >
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors first:rounded-t-lg last:rounded-b-lg"
                >
                  {suggestion}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Panneau de filtres */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden"
          >
            <div className="p-4 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-900">Filtres avancés</h3>
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="text-sm text-gray-500 hover:text-herb-green flex items-center gap-1"
                  >
                    <X className="w-4 h-4" />
                    Effacer
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Catégorie */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Catégorie
                  </label>
                  <select
                    value={filters.category || ''}
                    onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value || undefined }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-herb-green/20 focus:border-herb-green"
                    aria-label="Sélectionner une catégorie"
                  >
                    <option value="">Toutes les catégories</option>
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.categoryName}>
                        {cat.categoryName}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Difficulté */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Difficulté
                  </label>
                  <select
                    value={filters.difficulty || ''}
                    onChange={(e) => setFilters(prev => ({ ...prev, difficulty: e.target.value || undefined }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-herb-green/20 focus:border-herb-green"
                    aria-label="Sélectionner une difficulté"
                  >
                    <option value="">Toutes les difficultés</option>
                    {difficulties.map(diff => (
                      <option key={diff} value={diff}>{diff}</option>
                    ))}
                  </select>
                </div>

                {/* Durée maximale */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    Durée max
                  </label>
                  <select
                    value={filters.maxDuration || 0}
                    onChange={(e) => setFilters(prev => ({ ...prev, maxDuration: Number(e.target.value) || undefined }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-herb-green/20 focus:border-herb-green"
                    aria-label="Sélectionner une durée maximale"
                  >
                    {durationOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Nombre de personnes minimum */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    Personnes min
                  </label>
                  <select
                    value={filters.minServings || 0}
                    onChange={(e) => setFilters(prev => ({ ...prev, minServings: Number(e.target.value) || undefined }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-herb-green/20 focus:border-herb-green"
                    aria-label="Sélectionner un nombre minimum de personnes"
                  >
                    <option value={0}>Tous</option>
                    {[1, 2, 4, 6, 8, 10].map(num => (
                      <option key={num} value={num}>≥ {num} pers.</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Filtres supplémentaires */}
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.isRobotCompatible || false}
                    onChange={(e) => setFilters(prev => ({ ...prev, isRobotCompatible: e.target.checked || undefined }))}
                    className="w-4 h-4 text-herb-green border-gray-300 rounded focus:ring-herb-green/20"
                  />
                  <span className="text-sm text-gray-700 flex items-center gap-1">
                    <ChefHat className="w-4 h-4" />
                    Compatible robot
                  </span>
                </label>
              </div>

              {/* Boutons d'action */}
              <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                <button
                  onClick={() => setShowFilters(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Fermer
                </button>
                <button
                  onClick={handleSearch}
                  className="px-6 py-2 bg-herb-green text-white font-medium rounded-md hover:bg-herb-dark transition-colors"
                >
                  Appliquer les filtres
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchBar; 