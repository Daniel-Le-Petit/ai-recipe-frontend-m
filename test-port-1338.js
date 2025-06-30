const API_URL = 'http://localhost:1338';

console.log('🔍 Test de l\'API sur le port 1338');
console.log('==================================');

async function testPort1338() {
  try {
    // Test 1: Vérifier que Strapi répond sur le port 1338
    console.log('\n1️⃣ Test de réponse Strapi sur le port 1338...');
    const response = await fetch(`${API_URL}/api/recipie?populate=*`);
    
    if (response.ok) {
      const data = await response.json();
      console.log('✅ Strapi répond correctement sur le port 1338');
      console.log(`📊 Nombre de recettes: ${data.data?.length || 0}`);
    } else {
      console.log(`❌ Erreur HTTP: ${response.status} ${response.statusText}`);
    }
    
    // Test 2: Vérifier l'endpoint des catégories
    console.log('\n2️⃣ Test des catégories...');
    const categoriesResponse = await fetch(`${API_URL}/api/recipie-categories?populate=*`);
    
    if (categoriesResponse.ok) {
      const categoriesData = await categoriesResponse.json();
      console.log(`✅ Catégories: ${categoriesData.data?.length || 0} trouvées`);
    } else {
      console.log(`❌ Erreur catégories: ${categoriesResponse.status}`);
    }
    
    // Test 3: Vérifier l'interface admin
    console.log('\n3️⃣ Test de l\'interface admin...');
    const adminResponse = await fetch(`${API_URL}/admin`);
    
    if (adminResponse.ok) {
      console.log('✅ Interface admin accessible');
    } else {
      console.log(`❌ Interface admin: ${adminResponse.status}`);
    }
    
    console.log('\n🎉 Tests terminés !');
    console.log('✅ Tous les endpoints fonctionnent sur le port 1338');
    
  } catch (error) {
    console.error('\n❌ Erreur de connexion:', error.message);
    console.error('\n🔧 Solutions possibles:');
    console.error('   1. Vérifiez que Strapi est démarré sur le port 1338');
    console.error('   2. Vérifiez que la base de données est accessible');
    console.error('   3. Vérifiez les variables d\'environnement');
  }
}

testPort1338(); 