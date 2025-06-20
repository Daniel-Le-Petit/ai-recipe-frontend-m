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
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon.png', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: '/favicon.png',
  },
  openGraph: {
    title: 'AI et Fines Herbes - Recettes personnalisées par IA',
    description: 'Créez des recettes personnalisées grâce à l\'intelligence artificielle, adaptées à vos goûts et contraintes.',
    type: 'website',
    locale: 'fr_FR',
    url: 'https://ai-fines-herbes.vercel.app',
    siteName: 'AI et Fines Herbes',
    images: [
      {
        url: 'https://ai-fines-herbes.vercel.app/banner-aietfinesherbes-meta.png',
        width: 1200,
        height: 630,
        alt: 'AI et Fines Herbes - Recettes personnalisées par IA',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI et Fines Herbes - Recettes personnalisées par IA',
    description: 'Créez des recettes personnalisées grâce à l\'intelligence artificielle, adaptées à vos goûts et contraintes.',
    images: ['https://ai-fines-herbes.vercel.app/banner-aietfinesherbes-meta.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <head>
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="icon" href="/favicon.png" type="image/png" />
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="apple-touch-icon" href="/favicon.png" />
      </head>
      <body className={`${playfair.variable} ${inter.variable} font-inter min-h-screen antialiased pt-24`} style={{backgroundColor: '#FDFBF5', color: '#333333'}}>
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  )
} 