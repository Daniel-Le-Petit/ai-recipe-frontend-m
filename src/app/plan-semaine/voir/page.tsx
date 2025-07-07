"use client";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ArrowLeft, Calendar, Clock, Users, Star, ShoppingCart, Download, Share2, Heart, ChefHat, Utensils, Coffee, Sun, Moon, Settings, Edit3, ChevronDown, ChevronUp, Check, X, Filter } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function VoirPlanSemainePage() {
  const [likedRecipes, setLikedRecipes] = useState<Set<number>>(new Set());
  const [acceptedRecipes, setAcceptedRecipes] = useState<Set<string>>(new Set());
  const [planPreferences, setPlanPreferences] = useState(null);
  const [weeklyPlan, setWeeklyPlan] = useState(null);
  const [expandedDays, setExpandedDays] = useState<Set<string>>(new Set(['Lundi'])); // Lundi ouvert par défaut
  const [filterMode, setFilterMode] = useState<'all' | 'accepted' | 'pending'>('all');

  useEffect(() => {
    // Récupérer les préférences stockées
    const stored = localStorage.getItem('planPreferences');
    if (stored) {
      const preferences = JSON.parse(stored);
      setPlanPreferences(preferences);
      generateWeeklyPlan(preferences);
    }

    // Récupérer les recettes acceptées sauvegardées
    const savedAccepted = localStorage.getItem('acceptedRecipes');
    if (savedAccepted) {
      setAcceptedRecipes(new Set(JSON.parse(savedAccepted)));
    }
  }, []);

  // Sauvegarder les recettes acceptées quand elles changent
  useEffect(() => {
    localStorage.setItem('acceptedRecipes', JSON.stringify(Array.from(acceptedRecipes)));
  }, [acceptedRecipes]);

  const generateWeeklyPlan = (preferences) => {
    const mealTypes = preferences.mealTypes;
    const selectedMealTypes = Object.keys(mealTypes).filter(key => mealTypes[key]);
    
    const days = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
    const plan = {
      week: preferences.week,
      totalTime: "3h45",
      totalCost: "€65",
      difficulty: preferences.preferences.difficulty,
      days: {}
    };

    days.forEach((day, dayIndex) => {
      plan.days[day] = {
        day,
        recipes: []
      };

      // Déterminer les types de repas pour chaque jour
      let dayMealTypes = [];
      
      if (dayIndex < 5) { // Lundi à Vendredi
        if (mealTypes.petitDejeuner) dayMealTypes.push('petitDejeuner');
        if (mealTypes.dejeuner) dayMealTypes.push('dejeuner');
        if (mealTypes.diner) dayMealTypes.push('diner');
        if (mealTypes.collation) dayMealTypes.push('collation');
      } else { // Weekend
        if (mealTypes.brunch) dayMealTypes.push('brunch');
        if (mealTypes.dejeuner) dayMealTypes.push('dejeuner');
        if (mealTypes.diner) dayMealTypes.push('diner');
        if (mealTypes.collation) dayMealTypes.push('collation');
      }

      dayMealTypes.forEach((mealType, index) => {
        const recipe = generateRecipeForMealType(day, mealType, `${day}-${index}`, preferences.preferences);
        plan.days[day].recipes.push(recipe);
      });
    });

    setWeeklyPlan(plan);

    // Accepter tous les repas par défaut si c'est la première fois
    const savedAccepted = localStorage.getItem('acceptedRecipes');
    if (!savedAccepted) {
      const allRecipeIds = [];
      Object.values(plan.days).forEach(day => {
        day.recipes.forEach(recipe => {
          allRecipeIds.push(recipe.id);
        });
      });
      setAcceptedRecipes(new Set(allRecipeIds));
    }
  };

  const generateRecipeForMealType = (day, mealType, id, preferences) => {
    const mealTypeConfig = {
      petitDejeuner: {
        titles: ['Bowl de granola et fruits', 'Omelette aux herbes', 'Smoothie bowl tropical', 'Pain perdu à la cannelle', 'Tartines avocat-saumon'],
        times: [10, 15, 8, 20, 12],
        difficulties: ['Facile', 'Facile', 'Facile', 'Moyen', 'Facile'],
        tags: ['Végétarien', 'Sain', 'Rapide', 'Classique', 'Protéines'],
        ingredients: ['Céréales', 'Fruits', 'Lait', 'Œufs', 'Pain', 'Miel', 'Avocat', 'Saumon']
      },
      dejeuner: {
        titles: ['Salade composée méditerranéenne', 'Poulet rôti aux herbes', 'Risotto aux champignons', 'Quiche lorraine', 'Burger végétarien'],
        times: [15, 45, 30, 40, 25],
        difficulties: ['Facile', 'Moyen', 'Moyen', 'Difficile', 'Facile'],
        tags: ['Méditerranéen', 'Protéines', 'Végétarien', 'Français', 'Végétarien'],
        ingredients: ['Salade', 'Poulet', 'Riz', 'Champignons', 'Légumes', 'Fromage', 'Pain burger']
      },
      diner: {
        titles: ['Soupe de légumes d\'hiver', 'Saumon en papillote', 'Pâtes carbonara', 'Ratatouille provençale', 'Tajine de poulet'],
        times: [30, 20, 20, 35, 45],
        difficulties: ['Facile', 'Facile', 'Moyen', 'Moyen', 'Moyen'],
        tags: ['Soupe', 'Poisson', 'Italien', 'Végétarien', 'Marocain'],
        ingredients: ['Légumes', 'Saumon', 'Pâtes', 'Courgettes', 'Tomates', 'Herbes', 'Poulet']
      },
      brunch: {
        titles: ['Avocado toast', 'Benedict eggs', 'Pancakes américains', 'Croissants maison', 'Waffles belges'],
        times: [10, 25, 20, 60, 30],
        difficulties: ['Facile', 'Difficile', 'Moyen', 'Difficile', 'Moyen'],
        tags: ['Healthy', 'Classique', 'Américain', 'Français', 'Belge'],
        ingredients: ['Pain', 'Avocat', 'Œufs', 'Farine', 'Beurre', 'Jambon', 'Chocolat']
      },
      collation: {
        titles: ['Smoothie vert', 'Energy balls', 'Yogurt parfait', 'Mix de noix', 'Compote maison'],
        times: [5, 15, 8, 3, 20],
        difficulties: ['Facile', 'Facile', 'Facile', 'Facile', 'Facile'],
        tags: ['Healthy', 'Énergisant', 'Protéines', 'Snack', 'Fruits'],
        ingredients: ['Fruits', 'Noix', 'Yogurt', 'Graines', 'Miel', 'Chocolat', 'Pommes']
      }
    };

    const config = mealTypeConfig[mealType];
    const randomIndex = Math.floor(Math.random() * config.titles.length);

    return {
      id,
      day,
      mealType,
      title: config.titles[randomIndex],
      time: config.times[randomIndex],
      difficulty: config.difficulties[randomIndex],
      servings: preferences.servings,
      rating: (4.5 + Math.random() * 0.5).toFixed(1),
      image: "/Images/fallback-recipe.jpg",
      ingredients: config.ingredients.slice(0, 4),
      tags: config.tags.slice(0, 3)
    };
  };

  const toggleLike = (recipeId: number) => {
    const newLiked = new Set(likedRecipes);
    if (newLiked.has(recipeId)) {
      newLiked.delete(recipeId);
    } else {
      newLiked.add(recipeId);
    }
    setLikedRecipes(newLiked);
  };

  const toggleRecipeAcceptance = (recipeId: string) => {
    const newAccepted = new Set(acceptedRecipes);
    if (newAccepted.has(recipeId)) {
      newAccepted.delete(recipeId);
    } else {
      newAccepted.add(recipeId);
    }
    setAcceptedRecipes(newAccepted);
  };

  const toggleDayExpansion = (day) => {
    const newExpanded = new Set(expandedDays);
    if (newExpanded.has(day)) {
      newExpanded.delete(day);
    } else {
      newExpanded.add(day);
    }
    setExpandedDays(newExpanded);
  };

  const getMealTypeIcon = (mealType) => {
    const icons = {
      petitDejeuner: <Coffee className="h-4 w-4" />,
      dejeuner: <Sun className="h-4 w-4" />,
      diner: <Moon className="h-4 w-4" />,
      brunch: <ChefHat className="h-4 w-4" />,
      collation: <Heart className="h-4 w-4" />
    };
    return icons[mealType] || <Utensils className="h-4 w-4" />;
  };

  const getMealTypeColor = (mealType) => {
    const colors = {
      petitDejeuner: 'bg-yellow-500',
      dejeuner: 'bg-orange-500',
      diner: 'bg-blue-500',
      brunch: 'bg-purple-500',
      collation: 'bg-green-500'
    };
    return colors[mealType] || 'bg-gray-500';
  };

  const getMealTypeName = (mealType) => {
    const names = {
      petitDejeuner: 'Petit-déj',
      dejeuner: 'Déjeuner',
      diner: 'Dîner',
      brunch: 'Brunch',
      collation: 'Collation'
    };
    return names[mealType] || mealType;
  };

  const getMealTypeOrder = (mealType) => {
    const order = {
      petitDejeuner: 1,
      brunch: 1,
      dejeuner: 2,
      collation: 3,
      diner: 4
    };
    return order[mealType] || 5;
  };

  const getFilteredRecipes = (recipes) => {
    switch (filterMode) {
      case 'accepted':
        return recipes.filter(recipe => acceptedRecipes.has(recipe.id));
      case 'pending':
        return recipes.filter(recipe => !acceptedRecipes.has(recipe.id));
      default:
        return recipes;
    }
  };

  const getAcceptedCount = () => {
    if (!weeklyPlan) return 0;
    let count = 0;
    Object.values(weeklyPlan.days).forEach(day => {
      day.recipes.forEach(recipe => {
        if (acceptedRecipes.has(recipe.id)) count++;
      });
    });
    return count;
  };

  const getTotalCount = () => {
    if (!weeklyPlan) return 0;
    let count = 0;
    Object.values(weeklyPlan.days).forEach(day => {
      count += day.recipes.length;
    });
    return count;
  };

  if (!weeklyPlan) {
    return (
      <>
        <Header />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Génération de votre plan personnalisé...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const shoppingList = [
    { 
      category: "Légumes", 
      items: [
        { name: "Salade", quantity: "1 sachet", price: "€2.50" },
        { name: "Tomates", quantity: "500g", price: "€3.20" },
        { name: "Concombre", quantity: "2 pièces", price: "€1.80" },
        { name: "Courgettes", quantity: "4 pièces", price: "€2.40" },
        { name: "Carottes", quantity: "1kg", price: "€1.90" },
        { name: "Poireaux", quantity: "3 pièces", price: "€2.10" },
        { name: "Oignons", quantity: "500g", price: "€1.20" }
      ] 
    },
    { 
      category: "Viandes & Poissons", 
      items: [
        { name: "Poulet", quantity: "1kg", price: "€8.50" },
        { name: "Saumon", quantity: "400g", price: "€12.80" },
        { name: "Jambon", quantity: "200g", price: "€4.20" },
        { name: "Lardons", quantity: "150g", price: "€3.50" }
      ] 
    },
    { 
      category: "Produits laitiers", 
      items: [
        { name: "Œufs", quantity: "12 pièces", price: "€3.60" },
        { name: "Fromage", quantity: "300g", price: "€4.80" },
        { name: "Yogurt", quantity: "4 pots", price: "€2.40" },
        { name: "Lait", quantity: "1L", price: "€1.20" },
        { name: "Beurre", quantity: "250g", price: "€2.50" },
        { name: "Crème", quantity: "200ml", price: "€1.80" }
      ] 
    },
    { 
      category: "Épicerie", 
      items: [
        { name: "Pain", quantity: "2 baguettes", price: "€2.40" },
        { name: "Pâtes", quantity: "500g", price: "€1.50" },
        { name: "Riz", quantity: "1kg", price: "€2.20" },
        { name: "Céréales", quantity: "500g", price: "€3.80" },
        { name: "Fruits", quantity: "1kg", price: "€4.50" },
        { name: "Noix", quantity: "200g", price: "€5.20" },
        { name: "Miel", quantity: "250g", price: "€3.90" },
        { name: "Huile d'olive", quantity: "500ml", price: "€4.20" }
      ] 
    },
    { 
      category: "Fruits", 
      items: [
        { name: "Bananes", quantity: "1kg", price: "€2.80" },
        { name: "Pommes", quantity: "1kg", price: "€3.20" },
        { name: "Oranges", quantity: "1kg", price: "€2.90" },
        { name: "Avocat", quantity: "4 pièces", price: "€4.80" },
        { name: "Baies", quantity: "250g", price: "€5.50" }
      ] 
    }
  ];

  const days = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
  const acceptedCount = getAcceptedCount();
  const totalCount = getTotalCount();

  // Calculer le total de la liste de courses
  const calculateTotal = () => {
    let total = 0;
    shoppingList.forEach(category => {
      category.items.forEach(item => {
        const price = parseFloat(item.price.replace('€', ''));
        total += price;
      });
    });
    return total.toFixed(2);
  };

  const shoppingTotal = calculateTotal();

  return (
    <>
      <Header />
      
      <div className="bg-gradient-to-br from-green-50 to-orange-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Navigation */}
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 text-herb-green hover:text-herb-dark font-semibold text-lg mb-8 transition-colors"
            aria-label="Retour"
          >
            <ArrowLeft className="h-6 w-6" />
            Retour
          </button>

          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Votre plan de la semaine personnalisé
            </h1>
            <p className="text-xl text-gray-600 mb-6">{weeklyPlan.week}</p>
            
            {/* Stats */}
            <div className="flex justify-center gap-8 mb-8">
              <div className="flex items-center gap-2 text-gray-600">
                <Clock className="h-5 w-5 text-orange-500" />
                <span className="font-semibold">{weeklyPlan.totalTime}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <ShoppingCart className="h-5 w-5 text-green-500" />
                <span className="font-semibold">{weeklyPlan.totalCost}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <ChefHat className="h-5 w-5 text-purple-500" />
                <span className="font-semibold">{weeklyPlan.difficulty}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Check className="h-5 w-5 text-green-500" />
                <span className="font-semibold">{acceptedCount}/{totalCount} repas inclus</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center gap-4 mb-8">
              <button className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-xl flex items-center gap-2 transition-colors">
                <Download className="h-5 w-5" />
                Télécharger le plan
              </button>
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-xl flex items-center gap-2 transition-colors">
                <Share2 className="h-5 w-5" />
                Partager
              </button>
              <button 
                onClick={() => window.history.back()}
                className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-xl flex items-center gap-2 transition-colors"
              >
                <Edit3 className="h-5 w-5" />
                Modifier
              </button>
            </div>

            {/* Filter Buttons */}
            <div className="flex justify-center gap-2 mb-8">
              <button
                onClick={() => setFilterMode('all')}
                className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                  filterMode === 'all' 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-white text-gray-600 hover:bg-gray-100'
                }`}
              >
                Tous ({totalCount})
              </button>
              <button
                onClick={() => setFilterMode('accepted')}
                className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                  filterMode === 'accepted' 
                    ? 'bg-green-500 text-white' 
                    : 'bg-white text-gray-600 hover:bg-gray-100'
                }`}
              >
                Inclus ({acceptedCount})
              </button>
              <button
                onClick={() => setFilterMode('pending')}
                className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                  filterMode === 'pending' 
                    ? 'bg-orange-500 text-white' 
                    : 'bg-white text-gray-600 hover:bg-gray-100'
                }`}
              >
                Exclus ({totalCount - acceptedCount})
              </button>
            </div>
          </div>

          {/* Weekly Plan by Day */}
          <div className="space-y-6 mb-12">
            {days.map((day) => {
              const dayData = weeklyPlan.days[day];
              const isExpanded = expandedDays.has(day);
              const sortedRecipes = dayData.recipes.sort((a, b) => 
                getMealTypeOrder(a.mealType) - getMealTypeOrder(b.mealType)
              );
              const filteredRecipes = getFilteredRecipes(sortedRecipes);
              const dayAcceptedCount = sortedRecipes.filter(recipe => acceptedRecipes.has(recipe.id)).length;

              // Ne pas afficher le jour s'il n'y a pas de recettes filtrées
              if (filteredRecipes.length === 0) return null;

              return (
                <div key={day} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                  {/* Day Header */}
                  <button
                    onClick={() => toggleDayExpansion(day)}
                    className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="bg-gradient-to-r from-orange-400 to-yellow-400 p-3 rounded-full">
                        <Calendar className="h-6 w-6 text-white" />
                      </div>
                      <div className="text-left">
                        <h2 className="text-2xl font-bold text-gray-800">{day}</h2>
                        <p className="text-gray-600">
                          {filteredRecipes.length} repas {filterMode !== 'all' ? 'filtrés' : 'prévus'}
                          {filterMode === 'all' && dayAcceptedCount > 0 && (
                            <span className="text-green-600 font-semibold"> • {dayAcceptedCount} inclus</span>
                          )}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex gap-2">
                        {filteredRecipes.map((recipe, index) => (
                          <div
                            key={index}
                            className={`${getMealTypeColor(recipe.mealType)} text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${
                              acceptedRecipes.has(recipe.id) ? 'ring-2 ring-green-300' : ''
                            }`}
                          >
                            {getMealTypeIcon(recipe.mealType)}
                            {getMealTypeName(recipe.mealType)}
                            {acceptedRecipes.has(recipe.id) && (
                              <Check className="h-3 w-3" />
                            )}
                          </div>
                        ))}
                      </div>
                      {isExpanded ? (
                        <ChevronUp className="h-6 w-6 text-gray-500" />
                      ) : (
                        <ChevronDown className="h-6 w-6 text-gray-500" />
                      )}
                    </div>
                  </button>

                  {/* Day Content */}
                  {isExpanded && (
                    <div className="px-6 pb-6">
                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredRecipes.map((recipe) => {
                          const isAccepted = acceptedRecipes.has(recipe.id);
                          return (
                            <div 
                              key={recipe.id} 
                              className={`bg-gray-50 rounded-xl p-4 hover:shadow-md transition-all ${
                                isAccepted ? 'ring-2 ring-green-300 bg-green-50' : ''
                              }`}
                            >
                              <div className="flex items-start justify-between mb-3">
                                <div className={`${getMealTypeColor(recipe.mealType)} text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1`}>
                                  {getMealTypeIcon(recipe.mealType)}
                                  {getMealTypeName(recipe.mealType)}
                                </div>
                                <div className="flex items-center gap-2">
                                  <button
                                    onClick={() => toggleRecipeAcceptance(recipe.id)}
                                    className={`p-2 rounded-full transition-colors ${
                                      likedRecipes.has(recipe.id) 
                                        ? 'bg-red-500 text-white' 
                                        : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                                    }`}
                                    title="Ajouter aux favoris"
                                  >
                                    <Heart className={`h-4 w-4 ${likedRecipes.has(recipe.id) ? 'fill-current' : ''}`} />
                                  </button>
                                </div>
                              </div>
                              
                              <h3 className="text-lg font-bold text-gray-800 mb-2">{recipe.title}</h3>
                              
                              <div className="flex items-center gap-4 mb-3 text-sm text-gray-600">
                                <div className="flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  {recipe.time} min
                                </div>
                                <div className="flex items-center gap-1">
                                  <Users className="h-3 w-3" />
                                  {recipe.servings} pers
                                </div>
                                <div className="flex items-center gap-1">
                                  <Star className="h-3 w-3 text-yellow-400 fill-current" />
                                  {recipe.rating}
                                </div>
                              </div>

                              <div className="flex flex-wrap gap-1 mb-3">
                                {recipe.tags.map((tag, index) => (
                                  <span key={index} className="bg-white text-gray-700 px-2 py-1 rounded-full text-xs border">
                                    {tag}
                                  </span>
                                ))}
                              </div>

                              <div className="text-sm text-gray-600">
                                <p className="font-semibold mb-1">Ingrédients :</p>
                                <p className="line-clamp-2">{recipe.ingredients.join(', ')}...</p>
                              </div>

                              {/* Status du repas */}
                              <div className={`mt-3 p-2 rounded-lg ${
                                isAccepted 
                                  ? 'bg-green-100 border border-green-200' 
                                  : 'bg-red-100 border border-red-200'
                              }`}>
                                <p className={`text-sm font-semibold flex items-center gap-1 ${
                                  isAccepted ? 'text-green-700' : 'text-red-700'
                                }`}>
                                  {isAccepted ? (
                                    <>
                                      <Check className="h-3 w-3" />
                                      Repas inclus dans le plan
                                    </>
                                  ) : (
                                    <>
                                      <X className="h-3 w-3" />
                                      Repas retiré du plan
                                    </>
                                  )}
                                </p>
                              </div>

                              {/* Bouton pour changer le statut */}
                              <button
                                onClick={() => toggleRecipeAcceptance(recipe.id)}
                                className={`mt-3 w-full py-2 px-4 rounded-lg font-semibold transition-colors ${
                                  isAccepted 
                                    ? 'bg-red-500 hover:bg-red-600 text-white' 
                                    : 'bg-green-500 hover:bg-green-600 text-white'
                                }`}
                              >
                                {isAccepted ? 'Retirer du plan' : 'Inclure dans le plan'}
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Shopping List */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <ShoppingCart className="h-6 w-6 text-green-500" />
              Liste de courses complète
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
              {shoppingList.map((category, index) => (
                <div key={index} className="bg-gray-50 rounded-xl p-4">
                  <h3 className="font-bold text-gray-800 mb-3 text-lg">{category.category}</h3>
                  <ul className="space-y-2">
                    {category.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-center justify-between text-gray-700">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="font-medium">{item.name}</span>
                        </div>
                        <div className="text-right text-sm">
                          <div className="text-gray-600">{item.quantity}</div>
                          <div className="font-semibold text-green-600">{item.price}</div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Total */}
            <div className="bg-green-50 rounded-xl p-4 mb-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-gray-800">Total estimé</h3>
                <div className="text-right">
                  <div className="text-2xl font-bold text-green-600">€{shoppingTotal}</div>
                  <div className="text-sm text-gray-600">Pour une semaine complète</div>
                </div>
              </div>
            </div>

            <div className="text-center">
              <button className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-8 rounded-xl flex items-center gap-2 mx-auto transition-colors">
                <Download className="h-5 w-5" />
                Télécharger la liste de courses
              </button>
            </div>
          </div>

          {/* Tips Section */}
          <div className="bg-gradient-to-r from-orange-100 to-yellow-100 rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              💡 Conseils pour optimiser votre semaine
            </h2>
            <div className="grid md:grid-cols-3 gap-6 text-left">
              <div>
                <h3 className="font-bold text-gray-800 mb-2">🕒 Préparation</h3>
                <p className="text-gray-600">Préparez les ingrédients communs le dimanche pour gagner du temps</p>
              </div>
              <div>
                <h3 className="font-bold text-gray-800 mb-2">💰 Économies</h3>
                <p className="text-gray-600">Achetez en vrac les ingrédients utilisés dans plusieurs recettes</p>
              </div>
              <div>
                <h3 className="font-bold text-gray-800 mb-2">♻️ Zéro gaspillage</h3>
                <p className="text-gray-600">Utilisez les restes pour créer de nouvelles recettes</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </>
  );
} 