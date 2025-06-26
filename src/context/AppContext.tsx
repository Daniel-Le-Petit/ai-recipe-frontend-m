'use client'

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react'

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
  login: (email: string, password: string) => Promise<boolean>
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

  // Reconnexion automatique si email présent dans localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const email = localStorage.getItem('user_email');
      if (email) {
        setIsAuthenticated(true);
        setUser({ name: email.split('@')[0], email, plan: 'Standard' });
      }
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ''}/api/auth/local`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier: email, password })
      });
      const data = await res.json();
      if (res.ok && data.jwt) {
        if (typeof window !== 'undefined') {
          localStorage.setItem('jwt', data.jwt);
          localStorage.setItem('user_email', email);
        }
        setIsAuthenticated(true);
        setUser({ name: email.split('@')[0], email, plan: 'Standard' });
        return true;
      }
      return false;
    } catch (e) {
      return false;
    }
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