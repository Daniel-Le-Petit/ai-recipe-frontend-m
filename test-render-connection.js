const https = require('https');

console.log('🔍 Test de connexion au backend Render');
console.log('=====================================');

const backendUrl = 'https://aifh-backend.onrender.com';
const apiUrl = `${backendUrl}/api/recipie?populate=*`;

console.log(`URL testée: ${apiUrl}`);

// Test simple avec https.get
https.get(apiUrl, (res) => {
  console.log(`Status: ${res.statusCode} ${res.statusMessage}`);
  
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    try {
      const jsonData = JSON.parse(data);
      console.log('✅ Backend accessible !');
      console.log(`📊 Nombre de recettes: ${jsonData.data?.length || 0}`);
      
      if (jsonData.data && jsonData.data.length > 0) {
        console.log('📋 Première recette:');
        console.log(`   ID: ${jsonData.data[0].id}`);
        console.log(`   Titre: ${jsonData.data[0].attributes?.title || 'Sans titre'}`);
      }
    } catch (error) {
      console.log('⚠️  Réponse reçue mais pas du JSON valide');
      console.log('Contenu reçu:', data.substring(0, 200) + '...');
    }
  });
}).on('error', (error) => {
  console.error('❌ Erreur de connexion:', error.message);
  console.log('\n🔧 Solutions possibles:');
  console.log('1. Le backend n\'est pas démarré sur Render');
  console.log('2. Problème de configuration du backend');
  console.log('3. Problème de base de données');
}); 