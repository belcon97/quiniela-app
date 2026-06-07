import { useState } from 'react'
// Store
import { useAuthStore } from '@/store/authStore'
// Services
import * as adminUserService from '@/features/admin/services/adminUserService'
// Types
import type { AdminUser } from '@/features/admin/types/admin.types'

export function useUsers() {
  const { token } = useAuthStore()

  // Lista 
  const [users,   setUsers]   = useState<AdminUser[]>([])
  const [loading, setLoading] = useState(false)
  const [loaded,  setLoaded]  = useState(false)

  // Eliminar 
  const [deleting,      setDeleting]      = useState(false)
  const [deleteError,   setDeleteError]   = useState('')
  const [deleteSuccess, setDeleteSuccess] = useState('')

  const fetchUsers = async () => {
    if (!token) return
    setLoading(true)
    try {
      const data = await adminUserService.getUsers(token)
      setUsers(data)
      setLoaded(true)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!token) return
    setDeleting(true)
    setDeleteError('')
    setDeleteSuccess('')
    try {
      const result = await adminUserService.deleteUser(token, id)
      setUsers(prev => prev.filter(user => user.id !== id))
      setDeleteSuccess(result.message)
    } catch (error) {
      if (error instanceof Error) setDeleteError(error.message)
    } finally {
      setDeleting(false)
    }
  }

  return {
    users,
    loading,
    loaded,
    deleting,
    deleteError,
    deleteSuccess,
    fetchUsers,
    handleDelete,
    clearDeleteError:   () => setDeleteError(''),
    clearDeleteSuccess: () => setDeleteSuccess(''),
  }
}