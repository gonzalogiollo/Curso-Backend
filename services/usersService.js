import {
  getUsers as getUsersRepository,
  createUser as createUserRepository,
  getByEmail as getByEmailUserRepository,
  updateUser as updateUserRepository,
  updateUserRole as updateUserRoleRepository,
  updateUserDocument as updateUserDocumentRepository,
  updateLastConnection as updateLastConnectionRepository,
  getUser as getUserRepository,
  deleteUser as deleteUserRepository,
  deleteInactiveUsers as deleteInactiveUsersRepository,
} from '../repositories/usersRepository.js';
import resetEmailService from '../services/emailService.js';

import { generateToken } from '../utils.js';	
const updateUserRole = async (id, role) => {	
  const result = await updateUserRoleRepository(id, role);	
  return result;	
};	

const updateUserDocument = async (id, file) => {	
  const result = await updateUserDocumentRepository(id, file);	
  return result;	
};

const createUser = async (user) => {
  const result = await createUserRepository(user);
  return result;
};

const getUsers = async () => {
  const users = await getUsersRepository();
  return users;
};

const getByEmail = async (email) => {
  const user = await getByEmailUserRepository(email);
  return user;
};

const updateUser = async (email, user) => {	
  const result = await updateUserRepository(email, user);	
  return result;
};

const resetEmailUser = async (email) => {
  const user = await getByEmailUserRepository(email);

  if (!user) {
    return { status: 'error', message: 'User not found' };
  }

  const accessToken = generateToken({ email }, '1h');

  const message = `Recuperar contraseña: <a href='http://localhost:8080/reset-password/?token=${accessToken}'>aquí</a>`;

  await resetEmailService(email, message);
};

const updateLastConnection = async (id) => {
  const user = await updateLastConnectionRepository(id);
  return user;
}

const getUser = async (id) => {
  const user = await getUserRepository(id);
  return user;
};

const deleteUser = async (id) => {
  const user = await deleteUserRepository(id);
  return user;
};

const deleteInactiveUsers = async () => {
  const user = await deleteInactiveUsersRepository();
  return user;
};

export { createUser, getUsers, getByEmail, updateUser, resetEmailUser, updateUserDocument, updateUserRole, updateLastConnection, getUser, deleteUser, deleteInactiveUsers };