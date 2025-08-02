import React, { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface FavoriteButtonProps {
  recipeId: number;
  recipeTitle: string;
  initialFavorited?: boolean;
  onToggle?: (isFavorited: boolean) => void;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  showCount?: boolean;
}

interface FavoriteRecipe {
  id: number;
  title: string;
  addedAt: string;
}

const FAVORITES_STORAGE_KEY = 'ai-fines-herbes-favorites';

export const FavoriteButton: React.FC<FavoriteButtonProps> = ({
  recipeId,
  recipeTitle,
  initialFavorited = false,
  onToggle,
  size = 'md',
  className = '',
  showCount = false
}) => {
  const [isFavorited, setIsFavorited] = useState(initialFavorited);
  const [favoritesCount, setFavoritesCount] = useState(0);

  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10'
  };

  const iconSizes = {
    sm: 16,
    md: 20,
    lg: 24
  };

  // Charger les favoris depuis le localStorage
  useEffect(() => {
    const loadFavorites = () => {
      try {
        const stored = localStorage.getItem(FAVORITES_STORAGE_KEY);
        if (stored) {
          const favorites: FavoriteRecipe[] = JSON.parse(stored);
          const isInFavorites = favorites.some(fav => fav.id === recipeId);
          setIsFavorited(isInFavorites);
          setFavoritesCount(favorites.length);
        }
      } catch (error) {
        console.error('Erreur lors du chargement des favoris:', error);
      }
    };

    loadFavorites();
  }, [recipeId]);

  const toggleFavorite = () => {
    try {
      const stored = localStorage.getItem(FAVORITES_STORAGE_KEY);
      let favorites: FavoriteRecipe[] = stored ? JSON.parse(stored) : [];

      if (isFavorited) {
        // Retirer des favoris
        favorites = favorites.filter(fav => fav.id !== recipeId);
      } else {
        // Ajouter aux favoris
        const newFavorite: FavoriteRecipe = {
          id: recipeId,
          title: recipeTitle,
          addedAt: new Date().toISOString()
        };
        favorites.push(newFavorite);
      }

      localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
      setIsFavorited(!isFavorited);
      setFavoritesCount(favorites.length);
      onToggle?.(!isFavorited);

      // Animation de feedback
      if (!isFavorited) {
        // Animation d'ajout
        const button = document.querySelector(`[data-favorite-id="${recipeId}"]`);
        if (button) {
          button.classList.add('scale-110');
          setTimeout(() => {
            button.classList.remove('scale-110');
          }, 200);
        }
      }
    } catch (error) {
      console.error('Erreur lors de la sauvegarde des favoris:', error);
    }
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <motion.button
        data-favorite-id={recipeId}
        onClick={toggleFavorite}
        className={`relative flex items-center justify-center rounded-full transition-all duration-200 ${
          sizeClasses[size]
        } ${
          isFavorited
            ? 'bg-red-500 text-white shadow-lg hover:bg-red-600'
            : 'bg-white text-gray-400 border border-gray-200 hover:border-red-300 hover:text-red-400'
        }`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label={isFavorited ? 'Retirer des favoris' : 'Ajouter aux favoris'}
      >
        <AnimatePresence mode="wait">
          {isFavorited ? (
            <motion.div
              key="filled"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
              transition={{ duration: 0.2 }}
            >
              <Heart
                size={iconSizes[size]}
                className="fill-current"
              />
            </motion.div>
          ) : (
            <motion.div
              key="outline"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Heart
                size={iconSizes[size]}
                className="stroke-current"
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Particules d'animation lors de l'ajout */}
        <AnimatePresence>
          {isFavorited && (
            <motion.div
              className="absolute inset-0 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-red-400 rounded-full"
                  initial={{
                    x: 0,
                    y: 0,
                    opacity: 1,
                    scale: 1
                  }}
                  animate={{
                    x: Math.cos((i * 60) * Math.PI / 180) * 20,
                    y: Math.sin((i * 60) * Math.PI / 180) * 20,
                    opacity: 0,
                    scale: 0
                  }}
                  transition={{
                    duration: 0.6,
                    delay: i * 0.1
                  }}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {showCount && favoritesCount > 0 && (
        <span className="text-sm text-gray-500 font-medium">
          {favoritesCount} favori{favoritesCount > 1 ? 's' : ''}
        </span>
      )}
    </div>
  );
};

// Hook pour gérer les favoris
export const useFavorites = () => {
  const [favorites, setFavorites] = useState<FavoriteRecipe[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFavorites = () => {
      try {
        const stored = localStorage.getItem(FAVORITES_STORAGE_KEY);
        if (stored) {
          const parsedFavorites: FavoriteRecipe[] = JSON.parse(stored);
          setFavorites(parsedFavorites);
        }
      } catch (error) {
        console.error('Erreur lors du chargement des favoris:', error);
      } finally {
        setLoading(false);
      }
    };

    loadFavorites();
  }, []);

  const addToFavorites = (recipe: Omit<FavoriteRecipe, 'addedAt'>) => {
    const newFavorite: FavoriteRecipe = {
      ...recipe,
      addedAt: new Date().toISOString()
    };
    const updatedFavorites = [...favorites, newFavorite];
    setFavorites(updatedFavorites);
    localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(updatedFavorites));
  };

  const removeFromFavorites = (recipeId: number) => {
    const updatedFavorites = favorites.filter(fav => fav.id !== recipeId);
    setFavorites(updatedFavorites);
    localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(updatedFavorites));
  };

  const isFavorited = (recipeId: number) => {
    return favorites.some(fav => fav.id === recipeId);
  };

  const clearFavorites = () => {
    setFavorites([]);
    localStorage.removeItem(FAVORITES_STORAGE_KEY);
  };

  return {
    favorites,
    loading,
    addToFavorites,
    removeFromFavorites,
    isFavorited,
    clearFavorites,
    favoritesCount: favorites.length
  };
};

// Composant pour afficher la liste des favoris
export const FavoritesList: React.FC<{
  onRecipeClick?: (recipeId: number) => void;
  className?: string;
}> = ({ onRecipeClick, className = '' }) => {
  const { favorites, loading, removeFromFavorites } = useFavorites();

  if (loading) {
    return (
      <div className={`space-y-4 ${className}`}>
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex items-center gap-3 p-4 bg-white rounded-lg shadow animate-pulse">
            <div className="w-12 h-12 bg-gray-200 rounded"></div>
            <div className="flex-1">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (favorites.length === 0) {
    return (
      <div className={`text-center py-8 ${className}`}>
        <Heart className="w-12 h-12 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Aucun favori pour le moment
        </h3>
        <p className="text-gray-600">
          Ajoutez vos recettes préférées pour les retrouver facilement ici.
        </p>
      </div>
    );
  }

  return (
    <div className={`space-y-3 ${className}`}>
      {favorites.map((favorite) => (
        <motion.div
          key={favorite.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="flex items-center gap-3 p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
        >
          <div className="flex-1">
            <h4 className="font-medium text-gray-900 mb-1">
              {favorite.title}
            </h4>
            <p className="text-sm text-gray-500">
              Ajouté le {new Date(favorite.addedAt).toLocaleDateString('fr-FR')}
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            {onRecipeClick && (
              <button
                onClick={() => onRecipeClick(favorite.id)}
                className="px-3 py-1 text-sm bg-herb-green text-white rounded hover:bg-herb-dark transition-colors"
              >
                Voir
              </button>
            )}
            <FavoriteButton
              recipeId={favorite.id}
              recipeTitle={favorite.title}
              initialFavorited={true}
              size="sm"
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default FavoriteButton; 