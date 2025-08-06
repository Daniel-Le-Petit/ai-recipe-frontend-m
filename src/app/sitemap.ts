import { MetadataRoute } from 'next'

interface Recipe {
  id: number
  attributes: {
    title: string
    updatedAt?: string
    publishedAt?: string
    slug?: string
  }
}

interface Category {
  id: number
  attributes: {
    categoryName: string
    updatedAt?: string
    slug?: string
  }
}

async function getRecipes(): Promise<Recipe[]> {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1338'
    const response = await fetch(`${apiUrl}/api/recipies?populate=*`, {
      // Ajouter un timeout pour éviter les blocages
      signal: AbortSignal.timeout(5000)
    })
    
    if (!response.ok) {
      console.warn('API not available for sitemap, using fallback')
      return []
    }
    
    const data = await response.json()
    return data.data || []
  } catch (error) {
    console.warn('Error fetching recipes for sitemap, using fallback:', error)
    return []
  }
}

async function getCategories(): Promise<Category[]> {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1338'
    const response = await fetch(`${apiUrl}/api/recipie-categories?populate=*`, {
      // Ajouter un timeout pour éviter les blocages
      signal: AbortSignal.timeout(5000)
    })
    
    if (!response.ok) {
      console.warn('API not available for sitemap, using fallback')
      return []
    }
    
    const data = await response.json()
    return data.data || []
  } catch (error) {
    console.warn('Error fetching categories for sitemap, using fallback:', error)
    return []
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ai-fines-herbes.vercel.app'
  const currentDate = new Date().toISOString()

  // Static pages - toujours incluses
  const staticPages = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/recettes`,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/creer-recette`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/plan-semaine`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/mes-recettes`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/mes-plans-semaines`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/panier`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/a-propos`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/aide`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/comment-ca-marche`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/conditions`,
      lastModified: currentDate,
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/confidentialite`,
      lastModified: currentDate,
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
  ]

  // Dynamic recipe pages - avec gestion d'erreur robuste
  let recipePages: MetadataRoute.Sitemap = []
  try {
    const recipes = await getRecipes()
    recipePages = recipes
      .filter(recipe => recipe && recipe.attributes && recipe.id) // Filtrer les recettes valides
      .map((recipe) => ({
        url: `${baseUrl}/recettes/${recipe.id}`,
        lastModified: recipe.attributes.updatedAt || recipe.attributes.publishedAt || currentDate,
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      }))
  } catch (error) {
    console.warn('Failed to generate recipe pages for sitemap:', error)
  }

  // Dynamic category pages - avec gestion d'erreur robuste
  let categoryPages: MetadataRoute.Sitemap = []
  try {
    const categories = await getCategories()
    categoryPages = categories
      .filter(category => category && category.attributes && category.id) // Filtrer les catégories valides
      .map((category) => ({
        url: `${baseUrl}/recettes/categorie/${category.id}`,
        lastModified: category.attributes.updatedAt || currentDate,
        changeFrequency: 'weekly' as const,
        priority: 0.7,
      }))
  } catch (error) {
    console.warn('Failed to generate category pages for sitemap:', error)
  }

  // Search pages
  const searchPages = [
    {
      url: `${baseUrl}/recherche`,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 0.6,
    },
  ]

  // Combine all pages - toujours retourner au moins les pages statiques
  return [
    ...staticPages,
    ...recipePages,
    ...categoryPages,
    ...searchPages,
  ]
} 