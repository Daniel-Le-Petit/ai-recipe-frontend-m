import type { 
  RecipesResponse, 
  RecipeResponse, 
  CategoriesResponse, 
  RecipeParams,
  CreateRecipeData,
  UpdateRecipeData,
  RecipeStatus
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
}

// Instance singleton
const apiService = new ApiService();

export { ApiService };
export default apiService;
