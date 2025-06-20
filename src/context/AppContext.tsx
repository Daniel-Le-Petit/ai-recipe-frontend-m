'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'

interface User {
  name: string
  email: string
  plan: string
}

interface CartItem {
  id: string
  name: string
  quantity: string
}

interface AppContextType {
  isAuthenticated: boolean
  user: User | null
  cart: CartItem[]
  selectedDistributor: string
  login: (email: string, password: string) => boolean
  logout: () => void
  addToCart: (ingredients: { name: string; quantity: string }[], distributor?: string) => void
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
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [cart, setCart] = useState<CartItem[]>([])
  const [selectedDistributor, setSelectedDistributor] = useState<string>('')

  const login = (email: string, password: string): boolean => {
    if (email === 'test@test.com' && password === 'password') {
      const mockUser: User = {
        name: 'Marie Dupont',
        email: 'test@test.com',
        plan: 'Premium'
      }
      setUser(mockUser)
      setIsAuthenticated(true)
      return true
    }
    return false
  }

  const logout = () => {
    setIsAuthenticated(false)
    setUser(null)
    setCart([]) // Vider le panier à la déconnexion
  }

  const addToCart = (ingredients: { name: string; quantity: string }[], distributor?: string) => {
    setCart(prevCart => {
      const newCart = [...prevCart]
      
      ingredients.forEach(ingredient => {
        const existingItemIndex = newCart.findIndex(item => item.name === ingredient.name)
        
        if (existingItemIndex !== -1) {
          // Si l'ingrédient existe déjà, on met à jour la quantité
          const existingItem = newCart[existingItemIndex]
          const existingQuantity = parseFloat(existingItem.quantity.replace(/[^\d.]/g, ''))
          const newQuantity = parseFloat(ingredient.quantity.replace(/[^\d.]/g, ''))
          const unit = existingItem.quantity.replace(/[\d.]/g, '').trim()
          
          newCart[existingItemIndex] = {
            ...existingItem,
            quantity: `${existingQuantity + newQuantity}${unit}`
          }
        } else {
          // Sinon, on ajoute un nouvel ingrédient
          newCart.push({
            id: `${ingredient.name}-${Date.now()}`,
            name: ingredient.name,
            quantity: ingredient.quantity
          })
        }
      })
      
      return newCart
    })
  }

  const removeFromCart = (ingredientId: string) => {
    setCart(prevCart => prevCart.filter(item => item.id !== ingredientId))
  }

  const clearCart = () => {
    setCart([])
  }

  const value: AppContextType = {
    isAuthenticated,
    user,
    cart,
    selectedDistributor,
    login,
    logout,
    addToCart,
    removeFromCart,
    clearCart,
    setSelectedDistributor
  }

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  )
} 