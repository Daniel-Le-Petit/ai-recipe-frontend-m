import type { Metadata } from 'next'
import { AppProvider } from '../context/AppContext'
import Header from '../components/Header'
import Footer from '../components/Footer'

export const metadata: Metadata = {
  title: 'AI & Fines Herbes - Recettes culinaires intelligentes',
  description: 'Découvrez l\'art culinaire avec l\'intelligence artificielle. Créez des recettes uniques et savoureuses adaptées à vos goûts.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body style={{
        fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        margin: 0,
        padding: 0,
        minHeight: '100vh',
        backgroundColor: '#f5f5f5'
      }}>
        <AppProvider>
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            minHeight: '100vh' 
          }}>
            <Header />
            <main style={{ 
              flex: 1, 
              paddingTop: '80px' // Espace pour le header fixe
            }}>
              {children}
            </main>
            <Footer />
          </div>
        </AppProvider>
      </body>
    </html>
  )
} 