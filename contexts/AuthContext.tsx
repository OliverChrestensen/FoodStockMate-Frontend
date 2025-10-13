"use client"

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { useRouter } from 'next/navigation'


interface User {
  username: string
  token: string
}


interface AuthContextType {
  user: User | null
  login: (username: string, token: string) => void
  logout: () => void
  isAuthenticated: boolean
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  // Check for existing token on app load
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      // Handle guest token
      if (token === 'guest') {
        setUser({ username: 'guest', token })
        setIsLoading(false)
        return
      }
      
      // Handle JWT token
      try {
        const payload = JSON.parse(atob(token.split('.')[1]))
        
        // Check if token is expired
        if (payload.exp && payload.exp < Date.now() / 1000) {
          console.log('Token expired, removing...')
          localStorage.removeItem('token')
          localStorage.removeItem('userType')
          setIsLoading(false)
          return
        }
        
        const username = payload.username || payload.sub || 'User'
        setUser({ username, token })
        setIsLoading(false)
      } catch (error) {
        console.error('Error decoding token:', error)
        // Don't remove token immediately, might be a different format
        // Try to use token as-is if it's not a JWT
        const username = localStorage.getItem('username') || 'User'
        setUser({ username, token })
        setIsLoading(false)
      }
    } else {
      // No token found
      setIsLoading(false)
    }
  }, [])

  const login = (username: string, token: string) => {
    setUser({ username, token })
    localStorage.setItem('token', token)
    localStorage.setItem('username', username)
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('token')
    localStorage.removeItem('userType')
    localStorage.removeItem('username')
    router.push('/login')
  }

  const isAuthenticated = !!user

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
