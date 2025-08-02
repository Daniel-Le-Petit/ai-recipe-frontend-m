export default function AccueilPage() {
  return (
    <div style={{ 
      padding: '20px', 
      backgroundColor: '#f5f5f5', 
      minHeight: '100vh',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1 style={{ color: '#20B251', fontSize: '32px', textAlign: 'center' }}>
        🍳 AI et Fines Herbes
      </h1>
      
      <p style={{ textAlign: 'center', fontSize: '18px', color: '#666' }}>
        Recettes personnalisées par IA
      </p>
      
      <div style={{ 
        backgroundColor: 'white', 
        padding: '20px', 
        borderRadius: '10px',
        margin: '20px 0',
        textAlign: 'center'
      }}>
        <h2>Navigation</h2>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '15px' }}>
          <a href="/mes-recettes" style={{ 
            color: '#20B251', 
            textDecoration: 'none',
            fontWeight: 'bold',
            padding: '10px 20px',
            border: '2px solid #20B251',
            borderRadius: '5px'
          }}>Mes Recettes</a>
          <a href="/connexion" style={{ 
            color: '#20B251', 
            textDecoration: 'none',
            fontWeight: 'bold',
            padding: '10px 20px',
            border: '2px solid #20B251',
            borderRadius: '5px'
          }}>Connexion</a>
          <a href="/creer-recette" style={{ 
            color: '#20B251', 
            textDecoration: 'none',
            fontWeight: 'bold',
            padding: '10px 20px',
            border: '2px solid #20B251',
            borderRadius: '5px'
          }}>Créer Recette</a>
        </div>
      </div>
      
      <div style={{ 
        backgroundColor: 'white', 
        padding: '20px', 
        borderRadius: '10px',
        textAlign: 'center'
      }}>
        <p style={{ color: 'green', fontWeight: 'bold' }}>
          ✅ Page d'accueil alternative fonctionnelle !
        </p>
        <p style={{ color: '#666', fontSize: '14px' }}>
          Test avec nom de fichier différent
        </p>
      </div>
    </div>
  );
} 