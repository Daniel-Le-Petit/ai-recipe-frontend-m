#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔍 Vérification de la configuration Render...\n');

// Vérifier le fichier render.yaml
function checkRenderYaml() {
  console.log('1️⃣ Vérification du fichier render.yaml...');
  
  const renderYamlPath = path.join(process.cwd(), 'render.yaml');
  
  if (!fs.existsSync(renderYamlPath)) {
    console.log('❌ Fichier render.yaml manquant');
    return false;
  }
  
  const renderYaml = fs.readFileSync(renderYamlPath, 'utf8');
  
  // Vérifier les variables d'environnement
  const requiredEnvVars = [
    'NODE_ENV',
    'API_BASE_URL',
    'NEXT_PUBLIC_API_URL'
  ];
  
  let missingVars = [];
  requiredEnvVars.forEach(varName => {
    if (!renderYaml.includes(varName)) {
      missingVars.push(varName);
    }
  });
  
  if (missingVars.length > 0) {
    console.log(`❌ Variables manquantes dans render.yaml: ${missingVars.join(', ')}`);
    return false;
  }
  
  // Vérifier l'URL de l'API
  if (!renderYaml.includes('https://aifb-backend.onrender.com')) {
    console.log('⚠️  URL de l\'API backend différente de celle attendue');
  }
  
  console.log('✅ Fichier render.yaml configuré correctement');
  return true;
}

// Vérifier le fichier env.example
function checkEnvExample() {
  console.log('\n2️⃣ Vérification du fichier env.example...');
  
  const envExamplePath = path.join(process.cwd(), 'env.example');
  
  if (!fs.existsSync(envExamplePath)) {
    console.log('❌ Fichier env.example manquant');
    return false;
  }
  
  const envExample = fs.readFileSync(envExamplePath, 'utf8');
  
  if (!envExample.includes('NEXT_PUBLIC_API_URL')) {
    console.log('❌ Variable NEXT_PUBLIC_API_URL manquante dans env.example');
    return false;
  }
  
  console.log('✅ Fichier env.example configuré correctement');
  return true;
}

// Vérifier le package.json
function checkPackageJson() {
  console.log('\n3️⃣ Vérification du package.json...');
  
  const packageJsonPath = path.join(process.cwd(), 'package.json');
  
  if (!fs.existsSync(packageJsonPath)) {
    console.log('❌ Fichier package.json manquant');
    return false;
  }
  
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  
  // Vérifier les scripts nécessaires
  const requiredScripts = ['dev', 'build', 'start'];
  let missingScripts = [];
  
  requiredScripts.forEach(script => {
    if (!packageJson.scripts[script]) {
      missingScripts.push(script);
    }
  });
  
  if (missingScripts.length > 0) {
    console.log(`❌ Scripts manquants: ${missingScripts.join(', ')}`);
    return false;
  }
  
  // Vérifier les dépendances Next.js
  if (!packageJson.dependencies.next) {
    console.log('❌ Next.js manquant dans les dépendances');
    return false;
  }
  
  console.log('✅ Package.json configuré correctement');
  return true;
}

// Vérifier la structure des pages
function checkPagesStructure() {
  console.log('\n4️⃣ Vérification de la structure des pages...');
  
  const pagesToCheck = [
    'src/app/plan-semaine/page.tsx',
    'src/app/plan-semaine/voir/page.tsx'
  ];
  
  let missingPages = [];
  
  pagesToCheck.forEach(pagePath => {
    const fullPath = path.join(process.cwd(), pagePath);
    if (!fs.existsSync(fullPath)) {
      missingPages.push(pagePath);
    }
  });
  
  if (missingPages.length > 0) {
    console.log(`❌ Pages manquantes: ${missingPages.join(', ')}`);
    return false;
  }
  
  console.log('✅ Structure des pages correcte');
  return true;
}

// Générer un rapport de configuration
function generateConfigReport() {
  console.log('\n📋 Rapport de configuration Render...\n');
  
  const checks = [
    { name: 'render.yaml', check: checkRenderYaml },
    { name: 'env.example', check: checkEnvExample },
    { name: 'package.json', check: checkPackageJson },
    { name: 'Structure des pages', check: checkPagesStructure }
  ];
  
  let passed = 0;
  let total = checks.length;
  
  checks.forEach(({ name, check }) => {
    if (check()) {
      passed++;
    }
  });
  
  console.log(`\n📊 Résultats: ${passed}/${total} vérifications réussies`);
  
  if (passed === total) {
    console.log('🎉 Configuration Render prête pour le déploiement !');
  } else {
    console.log('⚠️  Certaines configurations nécessitent des corrections.');
  }
  
  // Recommandations
  console.log('\n💡 Recommandations:');
  console.log('1. Vérifiez les variables d\'environnement dans le dashboard Render');
  console.log('2. Assurez-vous que le service backend est actif');
  console.log('3. Testez les pages localement avant le déploiement');
  console.log('4. Consultez les logs Render en cas de problème');
}

// Exécuter les vérifications
generateConfigReport(); 