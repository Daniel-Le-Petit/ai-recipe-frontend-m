import type { 
  RecipesResponse, 
  RecipeResponse, 
  CategoriesResponse, 
  RecipeParams,
  CreateRecipeData,
  UpdateRecipeData,
  RecipeStatus,
  WeeklyPlansResponse,
  WeeklyPlanResponse,
  WeeklyPlanMealsResponse,
  WeeklyPlanMealResponse,
  WeeklyPlanMealAlternativesResponse,
  WeeklyPlanMealAlternativeResponse,
  WeeklyPlanMealChangesResponse,
  WeeklyPlanMealChangeResponse
} from './types/api'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://172.22.143.84:1338';

class ApiService {
  private baseURL: string;

  constructor() {
    this.baseURL = API_URL;
  }

  // Récupérer toutes les recettes
  async getRecipes(): Promise<RecipesResponse> {
    try {
      const url = `${this.baseURL}/api/recipies?populate=*`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching recipes:', error);
      throw error;
    }
  }

  // Récupérer une recette par ID
  async getRecipeById(id: number): Promise<RecipeResponse> {
    try {
      const url = `${this.baseURL}/api/recipies/${id}?populate=*`;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching recipe:', error);
      throw error;
    }
  }

  // Récupérer les catégories de recettes
  async getCategories(): Promise<CategoriesResponse> {
    try {
      const url = `${this.baseURL}/api/recipie-categories?populate=*`;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  }

  // Rechercher des recettes par catégorie
  async getRecipesByCategory(categoryId: number): Promise<RecipesResponse> {
    try {
      const url = `${this.baseURL}/api/recipies?filters[recipieCategory][id][$eq]=${categoryId}&populate=*`;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching recipes by category:', error);
      throw error;
    }
  }

  // Rechercher des recettes par difficulté
  async getRecipesByDifficulty(difficulty: string): Promise<RecipesResponse> {
    try {
      const url = `${this.baseURL}/api/recipies?filters[difficulty][$eq]=${difficulty}&populate=*`;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching recipes by difficulty:', error);
      throw error;
    }
  }

  // Rechercher des recettes compatibles robot
  async getRobotCompatibleRecipes(): Promise<RecipesResponse> {
    try {
      const url = `${this.baseURL}/api/recipies?filters[isRobotCompatible][$eq]=true&populate=*`;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching robot compatible recipes:', error);
      throw error;
    }
  }

  // Noter une recette
  async rateRecipe(id: number, rating: number): Promise<RecipeResponse> {
    try {
      const url = `${this.baseURL}/api/recipies/${id}`;
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: { rating }
        })
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error rating recipe:', error);
      throw error;
    }
  }

  // Créer une nouvelle recette
  async createRecipe(recipeData: CreateRecipeData): Promise<RecipeResponse> {
    try {
      const url = `${this.baseURL}/api/recipies`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: {
            ...recipeData,
            publishedAt: new Date().toISOString()
          }
        })
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log("HOOK beforeCreate", data.data.title, new Date().toISOString());
      return data;
    } catch (error) {
      console.error('Error creating recipe:', error);
      throw error;
    }
  }

  // Mettre à jour une recette
  async updateRecipe(id: number, recipeData: UpdateRecipeData): Promise<RecipeResponse> {
    try {
      const url = `${this.baseURL}/api/recipies/${id}`;
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: recipeData
        })
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error updating recipe:', error);
      throw error;
    }
  }

  // Supprimer une recette
  async deleteRecipe(id: number): Promise<void> {
    try {
      const url = `${this.baseURL}/api/recipies/${id}`;
      const response = await fetch(url, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error deleting recipe:', error);
      throw error;
    }
  }

  // Rechercher des recettes par texte
  async searchRecipes(query: string): Promise<RecipesResponse> {
    try {
      const url = `${this.baseURL}/api/recipies?filters[title][$contains]=${encodeURIComponent(query)}&populate=*`;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error searching recipes:', error);
      throw error;
    }
  }

  // Récupérer les recettes populaires (par note)
  async getPopularRecipes(limit: number = 10): Promise<RecipesResponse> {
    try {
      const url = `${this.baseURL}/api/recipies?sort[rating]=desc&pagination[pageSize]=${limit}&populate=*`;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching popular recipes:', error);
      throw error;
    }
  }

  // Récupérer les recettes récentes
  async getRecentRecipes(limit: number = 10): Promise<RecipesResponse> {
    try {
      const url = `${this.baseURL}/api/recipies?sort[createdAt]=desc&pagination[pageSize]=${limit}&populate=*`;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching recent recipes:', error);
      throw error;
    }
  }

  // Mettre à jour le statut d'une recette
  async updateRecipeStatus(id: number, status: string): Promise<RecipeResponse> {
    try {
      const url = `${this.baseURL}/api/recipies/${id}`;
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: { recipeState: status }
        })
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error updating recipe status:', error);
      throw error;
    }
  }

  // Récupérer les recettes par statut
  async getRecipesByStatus(status: RecipeStatus): Promise<RecipesResponse> {
    try {
      const url = `${this.baseURL}/api/recipies?filters[recipeState][$eq]=${status}&populate=*`;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching recipes by status:', error);
      throw error;
    }
  }

  // Récupérer les recettes en attente de validation (pour les admins)
  async getPendingRecipes(): Promise<RecipesResponse> {
    try {
      const url = `${this.baseURL}/api/recipies?filters[recipeState][$eq]=submitted&populate=*`;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching pending recipes:', error);
      throw error;
    }
  }

  // Récupérer les recettes rejetées
  async getRejectedRecipes(): Promise<RecipesResponse> {
    try {
      const url = `${this.baseURL}/api/recipies?filters[recipeState][$eq]=rejected&populate=*`;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching rejected recipes:', error);
      throw error;
    }
  }

  // Récupérer les recettes archivées
  async getArchivedRecipes(): Promise<RecipesResponse> {
    try {
      const url = `${this.baseURL}/api/recipies?filters[recipeState][$eq]=archived&populate=*`;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching archived recipes:', error);
      throw error;
    }
  }

  // ===== MÉTHODES POUR LES PLANS DE SEMAINE =====

  // Récupérer tous les plans de semaine d'un utilisateur
  async getWeeklyPlans(userId?: number): Promise<WeeklyPlansResponse> {
    try {
      const filters = userId ? `&filters[userId][$eq]=${userId}` : '';
      const url = `${this.baseURL}/api/weekly-plans?populate=*${filters}`;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching weekly plans:', error);
      throw error;
    }
  }

  // Récupérer un plan de semaine par ID
  async getWeeklyPlanById(id: number): Promise<WeeklyPlanResponse> {
    try {
      const url = `${this.baseURL}/api/weekly-plans/${id}?populate=*`;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching weekly plan:', error);
      throw error;
    }
  }

  // Créer un nouveau plan de semaine
  async createWeeklyPlan(planData: any): Promise<WeeklyPlanResponse> {
    try {
      const url = `${this.baseURL}/api/weekly-plans`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: planData }),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error creating weekly plan:', error);
      throw error;
    }
  }

  // Mettre à jour un plan de semaine
  async updateWeeklyPlan(id: number, planData: any): Promise<WeeklyPlanResponse> {
    try {
      const url = `${this.baseURL}/api/weekly-plans/${id}`;
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: planData }),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error updating weekly plan:', error);
      throw error;
    }
  }

  // Supprimer un plan de semaine
  async deleteWeeklyPlan(id: number): Promise<void> {
    try {
      const url = `${this.baseURL}/api/weekly-plans/${id}`;
      const response = await fetch(url, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error deleting weekly plan:', error);
      throw error;
    }
  }

  // Récupérer les repas d'un plan de semaine
  async getWeeklyPlanMeals(planId: number): Promise<WeeklyPlanMealsResponse> {
    try {
      const url = `${this.baseURL}/api/weekly-plan-meals?filters[weekly_plan][id][$eq]=${planId}&populate=*`;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching weekly plan meals:', error);
      throw error;
    }
  }

  // Créer un repas dans un plan de semaine
  async createWeeklyPlanMeal(mealData: any): Promise<WeeklyPlanMealResponse> {
    try {
      const url = `${this.baseURL}/api/weekly-plan-meals`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: mealData }),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error creating weekly plan meal:', error);
      throw error;
    }
  }

  // Mettre à jour le statut d'un repas
  async updateMealStatus(mealId: number, status: string): Promise<WeeklyPlanMealResponse> {
    try {
      const url = `${this.baseURL}/api/weekly-plan-meals/${mealId}`;
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: { status } }),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error updating meal status:', error);
      throw error;
    }
  }

  // ===== MÉTHODES POUR LES ALTERNATIVES =====

  // Récupérer les alternatives d'un repas
  async getMealAlternatives(mealId: number): Promise<WeeklyPlanMealAlternativesResponse> {
    try {
      const url = `${this.baseURL}/api/weekly-plan-meal-alternatives?filters[weekly_plan_meal][id][$eq]=${mealId}&populate=*`;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching meal alternatives:', error);
      throw error;
    }
  }

  // Créer une alternative pour un repas
  async createMealAlternative(alternativeData: any): Promise<WeeklyPlanMealAlternativeResponse> {
    try {
      const url = `${this.baseURL}/api/weekly-plan-meal-alternatives`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: alternativeData }),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error creating meal alternative:', error);
      throw error;
    }
  }

  // Sélectionner une alternative
  async selectAlternative(alternativeId: number, isSelected: boolean): Promise<WeeklyPlanMealAlternativeResponse> {
    try {
      const url = `${this.baseURL}/api/weekly-plan-meal-alternatives/${alternativeId}`;
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: { isSelected } }),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error selecting alternative:', error);
      throw error;
    }
  }

  // ===== MÉTHODES POUR L'HISTORIQUE DES CHANGEMENTS =====

  // Récupérer l'historique des changements d'un repas
  async getMealChanges(mealId: number): Promise<WeeklyPlanMealChangesResponse> {
    try {
      const url = `${this.baseURL}/api/weekly-plan-meal-changes?filters[weekly_plan_meal][id][$eq]=${mealId}&populate=*&sort[0]=createdAt:desc`;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching meal changes:', error);
      throw error;
    }
  }

  // Enregistrer un changement
  async recordMealChange(changeData: any): Promise<WeeklyPlanMealChangeResponse> {
    try {
      const url = `${this.baseURL}/api/weekly-plan-meal-changes`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: changeData }),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error recording meal change:', error);
      throw error;
    }
  }

  // Changer de recette avec historique
  async switchRecipe(mealId: number, newRecipeId: number, reason: string, reasonDetails?: string): Promise<any> {
    try {
      // 1. Récupérer l'ancienne recette
      const mealResponse = await this.getWeeklyPlanMealById(mealId);
      const oldRecipeId = mealResponse.data.attributes.recipe?.data?.id;

      // 2. Mettre à jour le repas avec la nouvelle recette
      const updateResponse = await this.updateWeeklyPlanMeal(mealId, {
        recipe: newRecipeId
      });

      // 3. Enregistrer le changement
      await this.recordMealChange({
        weekly_plan_meal: mealId,
        changeType: 'recipe-switch',
        reason,
        reasonDetails,
        previousRecipe: oldRecipeId,
        newRecipe: newRecipeId
      });

      return updateResponse;
    } catch (error) {
      console.error('Error switching recipe:', error);
      throw error;
    }
  }

  // Méthodes utilitaires pour les repas
  async getWeeklyPlanMealById(id: number): Promise<WeeklyPlanMealResponse> {
    try {
      const url = `${this.baseURL}/api/weekly-plan-meals/${id}?populate=*`;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching weekly plan meal:', error);
      throw error;
    }
  }

  async updateWeeklyPlanMeal(id: number, mealData: any): Promise<WeeklyPlanMealResponse> {
    try {
      const url = `${this.baseURL}/api/weekly-plan-meals/${id}`;
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: mealData }),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error updating weekly plan meal:', error);
      throw error;
    }
  }
}

// Instance singleton
const apiService = new ApiService();

export { ApiService };
export default apiService;
