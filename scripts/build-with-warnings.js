#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');

console.log('🚀 Démarrage du build avec gestion des warnings...');

// Fonction pour filtrer les warnings d'images
function filterImageWarnings(data) {
  const lines = data.toString().split('\n');
  const filteredLines = lines.filter(line => {
    // Ignorer les warnings d'images
    if (line.includes('@next/next/no-img-element')) {
      return false;
    }
    // Ignorer les warnings de useEffect
    if (line.includes('react-hooks/exhaustive-deps')) {
      return false;
    }
    return true;
  });
  
  if (filteredLines.length !== lines.length) {
    console.log('⚠️  Warnings filtrés pour permettre le déploiement');
  }
  
  return filteredLines.join('\n');
}

// Lancer le build Next.js
const buildProcess = spawn('npm', ['run', 'build'], {
  stdio: ['inherit', 'pipe', 'pipe'],
  shell: true
});

let stdout = '';
let stderr = '';

buildProcess.stdout.on('data', (data) => {
  const filteredOutput = filterImageWarnings(data);
  process.stdout.write(filteredOutput);
  stdout += data.toString();
});

buildProcess.stderr.on('data', (data) => {
  const filteredOutput = filterImageWarnings(data);
  process.stderr.write(filteredOutput);
  stderr += data.toString();
});

buildProcess.on('close', (code) => {
  console.log(`\n🏁 Build terminé avec le code: ${code}`);
  
  if (code === 0) {
    console.log('✅ Build réussi !');
    process.exit(0);
  } else {
    console.log('❌ Build échoué');
    
    // Afficher les erreurs critiques seulement
    const criticalErrors = stderr.split('\n').filter(line => 
      line.includes('Error:') || 
      line.includes('Failed to compile') ||
      line.includes('Type error:')
    );
    
    if (criticalErrors.length > 0) {
      console.log('\n🚨 Erreurs critiques:');
      criticalErrors.forEach(error => console.log(error));
    }
    
    process.exit(code);
  }
});

buildProcess.on('error', (error) => {
  console.error('❌ Erreur lors du build:', error);
  process.exit(1);
});
