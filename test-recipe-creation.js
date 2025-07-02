const apiService = require('./src/api.ts');

async function testRecipeCreation() {
  try {
    console.log('🧪 Testing recipe creation...');
    
    // Test data for a new recipe
    const testRecipe = {
      title: 'Test Recipe - Création API',
      description: 'Test recipe created via API',
      ingredients: [
        { name: 'tomates', quantity: '4' },
        { name: 'oignons', quantity: '2' },
        { name: 'ail', quantity: '3 gousses' }
      ],
      instructions: '1. Couper les tomates\n2. Émincer les oignons\n3. Hacher l\'ail\n4. Mélanger le tout',
      servings: 4,
      difficulty: 'Facile',
      isRobotCompatible: false,
      recipieCategory: 1, // Assuming category ID 1 exists
      publishedAt: new Date().toISOString()
    };

    console.log('📝 Test recipe data:', testRecipe);
    
    // Test the API call
    const response = await fetch('http://localhost:1337/api/recipies', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: testRecipe
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ API Error:', response.status, errorText);
      return;
    }

    const data = await response.json();
    console.log('✅ Recipe created successfully!');
    console.log('📊 Response:', JSON.stringify(data, null, 2));
    
  } catch (error) {
    console.error('❌ Test failed:', error);
  }
}

testRecipeCreation(); 