import {
  getUsersRepository,
  getUserByIdRepository,
  deleteUserRepository,
} from "../../repositories/admin/userRepository";

// Listar todos los usuarios
export const getUsersService = async () => {
  return getUsersRepository();
};

// Eliminar usuario
export const deleteUserService = async (id: string, adminId: string) => {
  // Verificar que el usuario existe
  const user = await getUserByIdRepository(id);
  if (!user) {
    throw { status: 404, message: "Usuario no encontrado" };
  }

  // El admin no puede eliminarse a si mismo
  if (id === adminId) {
    throw { status: 400, message: "No podés eliminarte a vos mismo" };
  }

  await deleteUserRepository(id);
  return { message: `Usuario ${user.username} eliminado correctamente` };
};