import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import '../styles/globals.css'
import { AppProvider } from '../context/AppContext'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
})

export const metadata: Metadata = {
  title: 'AI et Fines Herbes - Recettes personnalisées par IA',
  description: 'Créez des recettes personnalisées grâce à l\'intelligence artificielle, adaptées à vos goûts et contraintes.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className={`${playfair.variable} ${inter.variable} font-inter min-h-screen antialiased pt-24`} style={{backgroundColor: '#FDFBF5', color: '#333333'}}>
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  )
} 