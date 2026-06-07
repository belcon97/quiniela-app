import { API_ROUTES } from '@/constants/api'

import type { LoginRequest, RegisterRequest, AuthResponse } from '../types/auth.types'

export const authService = {
  login: async (user: LoginRequest): Promise<AuthResponse> => {
    const response = await fetch(API_ROUTES.login, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(user),
    })
    const data = await response.json()
    if (!response.ok) throw new Error(data.message)
    return data
  },

  register: async (user: RegisterRequest): Promise<AuthResponse> => {
    const response = await fetch(API_ROUTES.register, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(user),
    })
    const data = await response.json()
    if (!response.ok) throw new Error(data.message)
    return data
  },
}