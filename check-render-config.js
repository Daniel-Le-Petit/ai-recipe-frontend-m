#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔍 Diagnostic de la configuration Render');
console.log('=======================================');

// URLs Render
const RENDER_FRONTEND_URL = 'https://aifb-frontend-m.onrender.com';
const RENDER_BACKEND_URL = 'https://aifh-backend.onrender.com';

console.log('📋 URLs Render:');
console.log(`   Frontend: ${RENDER_FRONTEND_URL}`);
console.log(`   Backend: ${RENDER_BACKEND_URL}`);

async function testBackendConnection() {
  console.log('\n🔌 Test de connexion au backend Render...');
  
  try {
    // Test 1: Vérifier que le backend répond
    const response = await fetch(`${RENDER_BACKEND_URL}/api/recipie?populate=*`);
    console.log(`   Status: ${response.status} ${response.statusText}`);
    
    if (response.ok) {
      const data = await response.json();
      console.log(`   ✅ Backend accessible - ${data.data?.length || 0} recettes`);
      return true;
    } else {
      console.log(`   ❌ Backend retourne une erreur: ${response.status}`);
      return false;
    }
  } catch (error) {
    console.error(`   ❌ Erreur de connexion au backend: ${error.message}`);
    return false;
  }
}

async function testFrontendConnection() {
  console.log('\n🌐 Test de connexion au frontend Render...');
  
  try {
    const response = await fetch(RENDER_FRONTEND_URL);
    console.log(`   Status: ${response.status} ${response.statusText}`);
    
    if (response.ok) {
      console.log('   ✅ Frontend accessible');
      return true;
    } else {
      console.log(`   ❌ Frontend retourne une erreur: ${response.status}`);
      return false;
    }
  } catch (error) {
    console.error(`   ❌ Erreur de connexion au frontend: ${error.message}`);
    return false;
  }
}

async function checkEnvironmentVariables() {
  console.log('\n⚙️  Vérification des variables d\'environnement:');
  console.log('   (Ces valeurs sont celles utilisées en local)');
  console.log(`   NEXT_PUBLIC_API_URL: ${process.env.NEXT_PUBLIC_API_URL || 'Non défini'}`);
  console.log(`   NEXT_PUBLIC_ENVIRONMENT: ${process.env.NEXT_PUBLIC_ENVIRONMENT || 'Non défini'}`);
  
  console.log('\n📋 Configuration recommandée pour Render:');
  console.log('   NEXT_PUBLIC_API_URL=https://aifh-backend.onrender.com');
  console.log('   NEXT_PUBLIC_ENVIRONMENT=production');
}

async function runDiagnostic() {
  const backendOk = await testBackendConnection();
  const frontendOk = await testFrontendConnection();
  checkEnvironmentVariables();
  
  console.log('\n📊 Résumé du diagnostic:');
  console.log('========================');
  console.log(`   Backend Render: ${backendOk ? '✅' : '❌'}`);
  console.log(`   Frontend Render: ${frontendOk ? '✅' : '❌'}`);
  
  if (!backendOk) {
    console.log('\n🔧 Problème détecté: Backend inaccessible');
    console.log('   Solutions:');
    console.log('   1. Vérifiez que le service backend est "live" sur Render');
    console.log('   2. Vérifiez les logs du backend sur Render');
    console.log('   3. Vérifiez les variables d\'environnement du backend');
  }
  
  if (!frontendOk) {
    console.log('\n🔧 Problème détecté: Frontend inaccessible');
    console.log('   Solutions:');
    console.log('   1. Vérifiez que le service frontend est "live" sur Render');
    console.log('   2. Vérifiez les logs du frontend sur Render');
    console.log('   3. Vérifiez les variables d\'environnement du frontend');
  }
  
  if (backendOk && frontendOk) {
    console.log('\n🎉 Diagnostic terminé !');
    console.log('   Le problème vient probablement de la configuration des variables d\'environnement.');
    console.log('   Vérifiez NEXT_PUBLIC_API_URL sur le service frontend Render.');
  }
}

runDiagnostic(); 