const https = require('https');

console.log('🔍 Test des endpoints du backend Render');
console.log('=======================================');

const backendUrl = 'https://aifh-backend.onrender.com';

// Liste des endpoints à tester
const endpoints = [
  '/api/recipie?populate=*',
  '/api/recipies?populate=*',
  '/api/recipie-categories?populate=*',
  '/api/recipie-categories',
  '/api/recipies',
  '/api/recipie',
  '/admin',
  '/'
];

function testEndpoint(endpoint) {
  return new Promise((resolve) => {
    const url = `${backendUrl}${endpoint}`;
    console.log(`\n🔍 Test: ${url}`);
    
    https.get(url, (res) => {
      console.log(`   Status: ${res.statusCode} ${res.statusMessage}`);
      
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        if (res.statusCode === 200) {
          try {
            const jsonData = JSON.parse(data);
            if (jsonData.data) {
              console.log(`   ✅ Succès - ${jsonData.data.length || 0} éléments`);
            } else {
              console.log(`   ✅ Succès - Réponse reçue`);
            }
          } catch (error) {
            console.log(`   ✅ Succès - Contenu HTML/text reçu`);
          }
        } else {
          console.log(`   ❌ Erreur ${res.statusCode}`);
        }
        resolve();
      });
    }).on('error', (error) => {
      console.log(`   ❌ Erreur de connexion: ${error.message}`);
      resolve();
    });
  });
}

async function testAllEndpoints() {
  for (const endpoint of endpoints) {
    await testEndpoint(endpoint);
  }
  
  console.log('\n📋 Résumé:');
  console.log('==========');
  console.log('Si aucun endpoint ne fonctionne, le problème vient de:');
  console.log('1. Configuration Strapi sur Render');
  console.log('2. Variables d\'environnement du backend');
  console.log('3. Base de données non accessible');
  console.log('4. Strapi non démarré correctement');
}

testAllEndpoints(); 