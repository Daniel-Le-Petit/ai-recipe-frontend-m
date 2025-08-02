'use client'

import React, { createContext, useContext, ReactNode } from 'react'

interface AppContextType {
  isAuthenticated: boolean
  user: any
  cart: any[]
  selectedDistributor: string
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  addToCart: (ingredients: any[], distributor?: string) => void
  removeFromCart: (ingredientId: string) => void
  clearCart: () => void
  setSelectedDistributor: (distributor: string) => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function useAppContext() {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider')
  }
  return context
}

interface AppProviderProps {
  children: ReactNode
}

export function AppProvider({ children }: AppProviderProps) {
  // Valeurs par défaut simplifiées
  const value: AppContextType = {
    isAuthenticated: false,
    user: null,
    cart: [],
    selectedDistributor: '',
    login: async () => false,
    logout: () => {},
    addToCart: () => {},
    removeFromCart: () => {},
    clearCart: () => {},
    setSelectedDistributor: () => {}
  }

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  )
} 