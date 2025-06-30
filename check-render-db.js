#!/usr/bin/env node

const API_URL = 'https://aifb-backend.onrender.com';

async function checkRenderDatabase() {
  console.log('🔍 Diagnostic de la base de données Render...\n');

  try {
    // Test 1: Vérifier si l'API est accessible
    console.log('1️⃣ Test de connectivité API...');
    const healthResponse = await fetch(`${API_URL}/_health`);
    console.log(`   Status: ${healthResponse.status}`);
    console.log(`   OK: ${healthResponse.ok ? '✅' : '❌'}\n`);

    // Test 2: Vérifier les recettes
    console.log('2️⃣ Test de récupération des recettes...');
    const recipesResponse = await fetch(`${API_URL}/api/recipies?populate=*`);
    console.log(`   Status: ${recipesResponse.status}`);
    
    if (recipesResponse.ok) {
      const recipesData = await recipesResponse.json();
      console.log(`   Recettes trouvées: ${recipesData.data?.length || 0}`);
      console.log(`   OK: ✅\n`);
    } else {
      console.log(`   Erreur: ${recipesResponse.statusText}`);
      console.log(`   OK: ❌\n`);
    }

    // Test 3: Vérifier les catégories
    console.log('3️⃣ Test de récupération des catégories...');
    const categoriesResponse = await fetch(`${API_URL}/api/recipie-categories`);
    console.log(`   Status: ${categoriesResponse.status}`);
    
    if (categoriesResponse.ok) {
      const categoriesData = await categoriesResponse.json();
      console.log(`   Catégories trouvées: ${categoriesData.data?.length || 0}`);
      console.log(`   OK: ✅\n`);
    } else {
      console.log(`   Erreur: ${categoriesResponse.statusText}`);
      console.log(`   OK: ❌\n`);
    }

    // Test 4: Test de création d'une recette de test
    console.log('4️⃣ Test de création de recette...');
    const testRecipe = {
      data: {
        title: `Test Render - ${new Date().toISOString()}`,
        description: 'Recette de test pour vérifier la base de données',
        difficulty: 'Facile',
        duration: 30,
        servings: 2,
        ingredients: [{ name: 'Ingrédient test', quantity: '100g' }],
        instructions: 'Instructions de test',
        isRobotCompatible: true,
        tags: ['Test', 'Render'],
        rating: 4.0
      }
    };

    const createResponse = await fetch(`${API_URL}/api/recipies`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testRecipe)
    });

    console.log(`   Status: ${createResponse.status}`);
    
    if (createResponse.ok) {
      const createdData = await createResponse.json();
      console.log(`   Recette créée avec ID: ${createdData.data?.id}`);
      console.log(`   OK: ✅\n`);
      
      // Nettoyer la recette de test
      console.log('5️⃣ Nettoyage de la recette de test...');
      const deleteResponse = await fetch(`${API_URL}/api/recipies/${createdData.data.id}`, {
        method: 'DELETE'
      });
      console.log(`   Suppression: ${deleteResponse.ok ? '✅' : '❌'}\n`);
    } else {
      const errorText = await createResponse.text();
      console.log(`   Erreur: ${errorText}`);
      console.log(`   OK: ❌\n`);
    }

  } catch (error) {
    console.error('❌ Erreur lors du diagnostic:', error.message);
  }
}

// Vérifier les variables d'environnement
console.log('📋 Configuration:');
console.log(`   API_URL: ${API_URL}`);
console.log(`   NODE_ENV: ${process.env.NODE_ENV || 'non défini'}`);
console.log('');

checkRenderDatabase(); 