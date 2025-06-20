import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const { ingredients, dietary, mealType, servings, style, difficulty, variation, cookingMode } = await request.json()

  // Simulation d'un délai d'API
  await new Promise(resolve => setTimeout(resolve, 2000))

  // Base de recettes variées selon le style et la difficulté
  const recipeTemplates = {
    classique: {
      title: "Risotto aux Champignons et Parmesan",
      description: "Un risotto crémeux et réconfortant, classique de la cuisine italienne.",
      prepTime: "15 min",
      cookTime: "25 min"
    },
    moderne: {
      title: "Risotto Fusion aux Champignons et Épices",
      description: "Une version moderne du risotto avec des épices exotiques et une présentation contemporaine.",
      prepTime: "20 min",
      cookTime: "30 min"
    },
    gastronomique: {
      title: "Risotto Gastronomique aux Champignons Sauvages",
      description: "Un risotto raffiné avec des champignons sauvages sélectionnés et une technique de chef.",
      prepTime: "25 min",
      cookTime: "35 min"
    },
    rapide: {
      title: "Risotto Express aux Champignons",
      description: "Un risotto rapide et délicieux, parfait pour les soirs pressés.",
      prepTime: "8 min",
      cookTime: "18 min"
    },
    fusion: {
      title: "Risotto Asiatique aux Champignons et Gingembre",
      description: "Un risotto fusion mariant les saveurs italiennes et asiatiques.",
      prepTime: "18 min",
      cookTime: "28 min"
    },
    traditionnel: {
      title: "Risotto Traditionnel aux Champignons",
      description: "Le risotto authentique comme le préparent les nonnas italiennes.",
      prepTime: "12 min",
      cookTime: "22 min"
    }
  }

  // Sélectionner le template selon le style
  const template = recipeTemplates[style as keyof typeof recipeTemplates] || recipeTemplates.classique

  // Adapter les ingrédients selon la difficulté et le style
  const baseIngredients = [
    { name: "Riz Arborio", quantity: "300g" },
    { name: "Champignons de Paris frais", quantity: "250g" },
    { name: "Oignon jaune moyen", quantity: "1" },
    { name: "Gousses d'ail", quantity: "2" },
    { name: "Bouillon de volaille chaud", quantity: "1L" },
    { name: "Vin blanc sec", quantity: "150ml" },
    { name: "Parmesan râpé", quantity: "80g" },
    { name: "Beurre", quantity: "60g" },
    { name: "Huile d'olive", quantity: "2 cuillères à soupe" },
    { name: "Sel et poivre noir du moulin", quantity: "À votre goût" }
  ]

  let finalIngredients = [...baseIngredients]

  // Ajouter des ingrédients selon le style
  if (style === 'moderne') {
    finalIngredients.push(
      { name: "Curry en poudre", quantity: "1 cuillère à café" },
      { name: "Coriandre fraîche", quantity: "Quelques brins" }
    )
  } else if (style === 'gastronomique') {
    finalIngredients.push(
      { name: "Champignons sauvages mélangés", quantity: "200g" },
      { name: "Truffe noire en lamelles", quantity: "10g" },
      { name: "Vin blanc de qualité", quantity: "200ml" }
    )
  } else if (style === 'fusion') {
    finalIngredients.push(
      { name: "Gingembre frais râpé", quantity: "1 cuillère à soupe" },
      { name: "Sauce soja", quantity: "2 cuillères à soupe" },
      { name: "Ciboulette", quantity: "Quelques brins" }
    )
  } else {
    finalIngredients.push({ name: "Persil frais", quantity: "Quelques brins" })
  }

  // Adapter selon la difficulté
  if (difficulty === 'facile') {
    finalIngredients = finalIngredients.filter(ing => 
      !ing.name.includes('sauvages') && 
      !ing.name.includes('truffe') && 
      !ing.name.includes('gingembre')
    )
  }

  // Fonction pour adapter les étapes selon le mode de cuisson
  const adaptStepsForCookingMode = (steps: any[], mode: string) => {
    const applianceNames = {
      'manual': 'Casserole',
      'thermomix': 'Thermomix',
      'magimix': 'Magimix',
      'cookeo': 'Cookeo',
      'companion': 'Companion',
      'monsieur-cuisine': 'Monsieur Cuisine'
    }

    const applianceSettings = {
      'manual': {
        'sauté': 'Feu moyen',
        'simmer': 'Feu doux',
        'boil': 'Feu vif'
      },
      'thermomix': {
        'sauté': 'Sens inverse / Vitesse 2 / 120°C',
        'simmer': 'Sens inverse / Vitesse 1 / 100°C',
        'boil': 'Sens inverse / Vitesse 2 / 120°C'
      },
      'magimix': {
        'sauté': 'Expert, 2A, 120°C',
        'simmer': 'Expert, 1A, 100°C',
        'boil': 'Expert, 2A, 120°C'
      },
      'cookeo': {
        'sauté': 'Mode DORER',
        'simmer': 'Mode CUISSON DOUCE',
        'boil': 'Mode CUISSON RAPIDE'
      },
      'companion': {
        'sauté': 'Vitesse 2 / 120°C',
        'simmer': 'Vitesse 1 / 100°C',
        'boil': 'Vitesse 2 / 120°C'
      },
      'monsieur-cuisine': {
        'sauté': 'Vitesse 2 / 120°C',
        'simmer': 'Vitesse 1 / 100°C',
        'boil': 'Vitesse 2 / 120°C'
      }
    }

    return steps.map(step => {
      let adaptedStep = { ...step }
      
      // Adapter les instructions selon le mode
      if (mode === 'manual') {
        adaptedStep.instruction = step.instruction
          .replace(/Thermomix|Magimix|Cookeo|Companion|Monsieur Cuisine/g, 'casserole')
          .replace(/Sens inverse \/ Vitesse \d+ \/ \d+°C/g, 'feu moyen')
          .replace(/Expert, \d+[A-Z], \d+°C/g, 'feu moyen')
          .replace(/Mode [A-Z\s]+/g, 'feu moyen')
          .replace(/Vitesse \d+ \/ \d+°C/g, 'feu moyen')
        adaptedStep.appliance = null
      } else {
        // Adapter le nom de l'appareil
        if (step.appliance) {
          adaptedStep.appliance = {
            name: applianceNames[mode as keyof typeof applianceNames] || step.appliance.name,
            settings: step.appliance.settings
          }
        }
        
        // Adapter les paramètres selon le mode
        if (step.appliance?.settings) {
          if (step.appliance.settings.includes('Sens inverse') || step.appliance.settings.includes('Expert') || step.appliance.settings.includes('Vitesse')) {
            if (mode === 'thermomix') {
              adaptedStep.appliance.settings = 'Sens inverse / Vitesse 2 / 120°C'
            } else if (mode === 'magimix') {
              adaptedStep.appliance.settings = 'Expert, 2A, 120°C'
            } else if (mode === 'cookeo') {
              adaptedStep.appliance.settings = 'Mode DORER'
            } else if (mode === 'companion' || mode === 'monsieur-cuisine') {
              adaptedStep.appliance.settings = 'Vitesse 2 / 120°C'
            }
          }
        }
      }
      
      return adaptedStep
    })
  }

  // Étapes de base pour le risotto
  const baseSteps = [
    {
      instruction: "Émincez finement l'oignon et les champignons. Hachez l'ail finement. Gardez le bouillon au chaud dans une casserole à part.",
      duration: null,
      appliance: null
    },
    {
      instruction: "Dans une grande sauteuse, faites fondre la moitié du beurre avec un filet d'huile d'olive à feu moyen.",
      duration: 60,
      appliance: { name: "Magimix", settings: "Expert, 2A, 120°C" }
    },
    {
      instruction: "Ajoutez l'oignon et l'ail. Faites revenir pendant 5 minutes jusqu'à ce qu'ils soient translucides et parfumés.",
      duration: 300,
      appliance: null
    },
    {
      instruction: "Ajoutez les champignons émincés et faites-les sauter 3-4 minutes jusqu'à ce qu'ils rendent leur eau.",
      duration: 240,
      appliance: { name: "Thermomix", settings: "Sens inverse / Vitesse 2 / 100°C" }
    },
    {
      instruction: "Ajoutez le riz Arborio et remuez pendant 1 minute pour bien l'enrober. Le riz doit devenir nacré et translucide.",
      duration: 60,
      appliance: { name: "Thermomix", settings: "Sens inverse / Vitesse 1 / 100°C" }
    },
    {
      instruction: "Déglacez avec le vin blanc et laissez-le s'évaporer complètement en remuant constamment.",
      duration: 120,
      appliance: null
    },
    {
      instruction: "Commencez à ajouter le bouillon chaud louche par louche. Attendez que le riz ait absorbé presque tout le liquide avant d'ajouter la louche suivante. Remuez régulièrement.",
      duration: 900,
      appliance: null
    },
    {
      instruction: "Continuez l'ajout de bouillon pendant encore 8-10 minutes. Le riz doit être crémeux mais encore légèrement al dente.",
      duration: 540,
      appliance: { name: "Magimix", settings: "Maintien à 85°C, mélange lent" }
    },
    {
      instruction: "Hors du feu, incorporez le parmesan râpé et le reste du beurre. Assaisonnez avec du sel et du poivre. Mélangez énergiquement pour obtenir une texture crémeuse.",
      duration: null,
      appliance: null
    },
    {
      instruction: "Servez immédiatement dans des assiettes chaudes. Parsemez de persil frais haché et d'un peu de parmesan supplémentaire si désiré.",
      duration: null,
      appliance: null
    }
  ]

  // Adapter les étapes selon le mode de cuisson
  const adaptedSteps = adaptStepsForCookingMode(baseSteps, cookingMode || 'manual')

  // Recette enrichie avec détails pour le mode cuisson
  const recipe = {
    title: template.title,
    description: template.description,
    prepTime: template.prepTime,
    cookTime: template.cookTime,
    servings: servings || 4,
    ingredients: finalIngredients,
    steps: adaptedSteps
  }

  // Adaptation basée sur les paramètres reçus
  if (dietary === 'vegan') {
    recipe.title = recipe.title.replace('Parmesan', 'Végan')
    recipe.ingredients = recipe.ingredients.map(ingredient => 
      ingredient.name.includes('parmesan') ? { name: 'Levure nutritionnelle', quantity: '60g' } :
      ingredient.name.includes('beurre') ? { name: 'Huile d\'olive', quantity: '4 cuillères à soupe' } :
      ingredient.name.includes('bouillon de volaille') ? { name: 'Bouillon de légumes', quantity: '1L' } :
      ingredient
    )
  }

  if (mealType === 'lunch') {
    recipe.description = "Un déjeuner réconfortant et nutritif, parfait pour une pause gourmande."
  } else if (mealType === 'dinner') {
    recipe.description = "Un dîner élégant et savoureux, idéal pour terminer la journée en beauté."
  }

  // Ajouter une variation dans le titre pour éviter les doublons
  if (variation && variation > 1) {
    recipe.title = `${recipe.title} - Version ${variation}`
  }

  return NextResponse.json(recipe)
} 