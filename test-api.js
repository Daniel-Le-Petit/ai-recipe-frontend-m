// Script de test pour vérifier l'intégration frontend-m + backend-js

const API_URL = 'http://localhost:1338'

// Fonction pour tester la récupération des recettes
async function testGetRecipes() {
  console.log('🧪 Test 1: Récupération des recettes...')
  
  try {
    const response = await fetch(`${API_URL}/api/recipies?populate=*`)
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const data = await response.json()
    console.log(`✅ Succès: ${data.data.length} recettes récupérées`)
    console.log('📋 Première recette:', data.data[0]?.title || 'Aucune recette')
    
    return data.data.length > 0
  } catch (error) {
    console.error('❌ Erreur lors de la récupération des recettes:', error.message)
    return false
  }
}

// Fonction pour tester la récupération des catégories
async function testGetCategories() {
  console.log('\n🧪 Test 2: Récupération des catégories...')
  
  try {
    const response = await fetch(`${API_URL}/api/recipie-categories`)
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const data = await response.json()
    console.log(`✅ Succès: ${data.data.length} catégories récupérées`)
    console.log('📋 Catégories:', data.data.map(cat => cat.categoryName).join(', '))
    
    return data.data.length > 0
  } catch (error) {
    console.error('❌ Erreur lors de la récupération des catégories:', error.message)
    return false
  }
}

// Fonction pour tester la création d'une recette
async function testCreateRecipe() {
  console.log('\n🧪 Test 3: Création d\'une recette de test...')
  
  const testRecipe = {
    data: {
      title: `Test Frontend-M - ${new Date().toISOString()}`,
      description: 'Recette de test créée depuis le frontend',
      difficulty: 'Facile',
      duration: 30,
      servings: 2,
      ingredients: [
        { name: 'Ingrédient test 1', quantity: '100g' },
        { name: 'Ingrédient test 2', quantity: '2 unités' }
      ],
      instructions: 'Instructions de test pour la recette',
      isRobotCompatible: true,
      tags: ['Test', 'Frontend', 'Intégration'],
      rating: 4.5
    }
  }
  
  try {
    const response = await fetch(`${API_URL}/api/recipies`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testRecipe)
    })
    
    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`)
    }
    
    const data = await response.json()
    console.log('✅ Succès: Recette créée avec l\'ID:', data.data.id)
    console.log('📋 Titre:', data.data.title)
    
    return data.data.id
  } catch (error) {
    console.error('❌ Erreur lors de la création de la recette:', error.message)
    return null
  }
}

// Fonction pour tester la récupération d'une recette spécifique
async function testGetRecipeById(recipeId) {
  if (!recipeId) return false
  
  console.log(`\n🧪 Test 4: Récupération de la recette ID ${recipeId}...`)
  
  try {
    const response = await fetch(`${API_URL}/api/recipies/${recipeId}?populate=*`)
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const data = await response.json()
    console.log('✅ Succès: Recette récupérée')
    console.log('📋 Titre:', data.data.title)
    console.log('📋 Difficulté:', data.data.difficulty)
    console.log('📋 Durée:', data.data.duration, 'minutes')
    
    return true
  } catch (error) {
    console.error('❌ Erreur lors de la récupération de la recette:', error.message)
    return false
  }
}

// Fonction pour tester la mise à jour d'une recette
async function testUpdateRecipe(recipeId) {
  if (!recipeId) return false
  
  console.log(`\n🧪 Test 5: Mise à jour de la recette ID ${recipeId}...`)
  
  const updateData = {
    data: {
      rating: 5.0,
      description: 'Description mise à jour depuis le frontend'
    }
  }
  
  try {
    const response = await fetch(`${API_URL}/api/recipies/${recipeId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateData)
    })
    
    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`)
    }
    
    const data = await response.json()
    console.log('✅ Succès: Recette mise à jour')
    console.log('📋 Nouvelle note:', data.data.rating)
    
    return true
  } catch (error) {
    console.error('❌ Erreur lors de la mise à jour de la recette:', error.message)
    return false
  }
}

// Fonction pour tester la suppression d'une recette
async function testDeleteRecipe(recipeId) {
  if (!recipeId) return false
  
  console.log(`\n🧪 Test 6: Suppression de la recette ID ${recipeId}...`)
  
  try {
    const response = await fetch(`${API_URL}/api/recipies/${recipeId}`, {
      method: 'DELETE'
    })
    
    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`)
    }
    
    console.log('✅ Succès: Recette supprimée')
    return true
  } catch (error) {
    console.error('❌ Erreur lors de la suppression de la recette:', error.message)
    return false
  }
}

// Fonction pour tester la recherche de recettes
async function testSearchRecipes() {
  console.log('\n🧪 Test 7: Recherche de recettes...')
  
  try {
    const response = await fetch(`${API_URL}/api/recipies?filters[title][$contains]=test&populate=*`)
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const data = await response.json()
    console.log(`✅ Succès: ${data.data.length} recettes trouvées avec "test" dans le titre`)
    
    return data.data.length >= 0
  } catch (error) {
    console.error('❌ Erreur lors de la recherche:', error.message)
    return false
  }
}

// Fonction principale de test
async function runAllTests() {
  console.log('🚀 Démarrage des tests d\'intégration frontend-m + backend-js\n')
  
  const results = {
    getRecipes: await testGetRecipes(),
    getCategories: await testGetCategories(),
    createRecipe: await testCreateRecipe(),
    searchRecipes: await testSearchRecipes()
  }
  
  // Tests dépendants de la création
  if (results.createRecipe) {
    results.getRecipeById = await testGetRecipeById(results.createRecipe)
    results.updateRecipe = await testUpdateRecipe(results.createRecipe)
    results.deleteRecipe = await testDeleteRecipe(results.createRecipe)
  }
  
  // Résumé des tests
  console.log('\n📊 Résumé des tests:')
  console.log('====================')
  Object.entries(results).forEach(([test, result]) => {
    console.log(`${result ? '✅' : '❌'} ${test}`)
  })
  
  const successCount = Object.values(results).filter(Boolean).length
  const totalCount = Object.keys(results).length
  
  console.log(`\n🎯 Résultat: ${successCount}/${totalCount} tests réussis`)
  
  if (successCount === totalCount) {
    console.log('🎉 Tous les tests sont passés ! L\'intégration fonctionne parfaitement.')
  } else {
    console.log('⚠️ Certains tests ont échoué. Vérifiez la configuration.')
  }
}

// Exécuter les tests si le script est lancé directement
if (typeof window === 'undefined') {
  runAllTests().catch(console.error)
}

// Exporter pour utilisation dans d'autres modules
module.exports = {
  testGetRecipes,
  testGetCategories,
  testCreateRecipe,
  testGetRecipeById,
  testUpdateRecipe,
  testDeleteRecipe,
  testSearchRecipes,
  runAllTests
} 