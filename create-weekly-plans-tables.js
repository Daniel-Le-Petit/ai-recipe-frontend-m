const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1338';

async function createWeeklyPlansTables() {
  console.log('🗄️ Création des tables pour les plans de semaine avec alternatives et changements...\n');

  try {
    // Test de connectivité
    console.log('1. Test de connectivité...');
    const healthResponse = await fetch(`${API_URL}/api/recipies?pagination[pageSize]=1`);
    if (!healthResponse.ok) {
      throw new Error('API non accessible');
    }
    console.log('✅ API accessible');

    console.log('\n2. Instructions pour créer les tables dans Strapi :');
    console.log('📋 Étapes à suivre dans l\'interface Strapi :');
    console.log('');

    console.log('=== TABLE 1: weekly-plans ===');
    console.log('1. Aller dans Content Manager → Create new collection type');
    console.log('2. Nom: "weekly-plans"');
    console.log('3. Champs à ajouter :');
    console.log('   - userId (Number, required)');
    console.log('   - weekStart (Date, required)');
    console.log('   - weekEnd (Date)');
    console.log('   - selections (JSON)');
    console.log('   - status (Enumeration: draft, active, completed, archived)');
    console.log('4. Relations :');
    console.log('   - user (Many-to-one avec users)');
    console.log('   - weekly_plan_meals (One-to-many avec weekly-plan-meals)');
    console.log('');

    console.log('=== TABLE 2: weekly-plan-meals ===');
    console.log('1. Aller dans Content Manager → Create new collection type');
    console.log('2. Nom: "weekly-plan-meals"');
    console.log('3. Champs à ajouter :');
    console.log('   - day (Date, required)');
    console.log('   - mealType (Enumeration: petit-dejeuner, dejeuner, collation, diner)');
    console.log('   - status (Enumeration: accepted, declined, pending)');
    console.log('   - userNotes (Text)');
    console.log('4. Relations :');
    console.log('   - weekly_plan (Many-to-one avec weekly-plans)');
    console.log('   - recipe (Many-to-one avec recipies)');
    console.log('   - alternatives (One-to-many avec weekly-plan-meal-alternatives)');
    console.log('   - changes (One-to-many avec weekly-plan-meal-changes)');
    console.log('');

    console.log('=== TABLE 3: weekly-plan-meal-alternatives ===');
    console.log('1. Aller dans Content Manager → Create new collection type');
    console.log('2. Nom: "weekly-plan-meal-alternatives"');
    console.log('3. Champs à ajouter :');
    console.log('   - reason (Enumeration: ingredients-missing, time-constraint, difficulty, preference, seasonal, dietary, allergy, budget, other)');
    console.log('   - reasonDetails (Text)');
    console.log('   - isSelected (Boolean, default: false)');
    console.log('4. Relations :');
    console.log('   - weekly_plan_meal (Many-to-one avec weekly-plan-meals)');
    console.log('   - recipe (Many-to-one avec recipies)');
    console.log('');

    console.log('=== TABLE 4: weekly-plan-meal-changes ===');
    console.log('1. Aller dans Content Manager → Create new collection type');
    console.log('2. Nom: "weekly-plan-meal-changes"');
    console.log('3. Champs à ajouter :');
    console.log('   - changeType (Enumeration: recipe-switch, status-change, alternative-selected, notes-updated)');
    console.log('   - reason (Enumeration: ingredients-missing, time-constraint, difficulty, preference, seasonal, dietary, allergy, budget, other)');
    console.log('   - reasonDetails (Text)');
    console.log('   - previousValue (Text)');
    console.log('   - newValue (Text)');
    console.log('4. Relations :');
    console.log('   - weekly_plan_meal (Many-to-one avec weekly-plan-meals)');
    console.log('   - previousRecipe (Many-to-one avec recipies)');
    console.log('   - newRecipe (Many-to-one avec recipies)');
    console.log('');

    console.log('3. Permissions à configurer :');
    console.log('📋 Aller dans Settings → Users & Permissions Plugin → Roles → Authenticated');
    console.log('✅ weekly-plans: find, findOne, create, update, delete');
    console.log('✅ weekly-plan-meals: find, findOne, create, update, delete');
    console.log('✅ weekly-plan-meal-alternatives: find, findOne, create, update, delete');
    console.log('✅ weekly-plan-meal-changes: find, findOne, create, update, delete');
    console.log('');

    console.log('4. Test des endpoints :');
    console.log('🔗 Endpoints disponibles après création :');
    console.log(`   - GET ${API_URL}/api/weekly-plans`);
    console.log(`   - POST ${API_URL}/api/weekly-plans`);
    console.log(`   - GET ${API_URL}/api/weekly-plan-meals`);
    console.log(`   - POST ${API_URL}/api/weekly-plan-meals`);
    console.log(`   - GET ${API_URL}/api/weekly-plan-meal-alternatives`);
    console.log(`   - POST ${API_URL}/api/weekly-plan-meal-alternatives`);
    console.log(`   - GET ${API_URL}/api/weekly-plan-meal-changes`);
    console.log(`   - POST ${API_URL}/api/weekly-plan-meal-changes`);

  } catch (error) {
    console.error('❌ Erreur:', error.message);
  }
}

createWeeklyPlansTables(); 