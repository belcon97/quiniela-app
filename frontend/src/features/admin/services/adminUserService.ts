import { API_ROUTES } from "@/constants/constants";

export interface AdminUser {
  id: string;
  name: string;
  username: string;
  role: string;
  favoriteTeam: string | null;
  hasReadRules: boolean;
  createdAt: string;
}

// Listar todos los usuarios
export const getUsers = async (token: string): Promise<AdminUser[]> => {
  const response = await fetch(API_ROUTES.adminUsers, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message);
  return data;
};

// Eliminar usuario
export const deleteUser = async (token: string, id: string) => {
  const response = await fetch(`${API_ROUTES.adminUsers}/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message);
  return data;
};