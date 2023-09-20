import { USERSDAO } from "../dao/index.js";

// GET ALL USERS
const getUsers = async () => {
  const users = await USERSDAO.getAll();
  return users;
};

// GET USER
const getByEmail = async (email) => {
  const user = await USERSDAO.getByEmail(email);
  return user;
};

// POST USER
const createUser = async (user) => {
  const result = await USERSDAO.createUser(user);
  return result;
};

const updateUser = async (email, user) => {	
  const result = await USERSDAO.updateOne(email, user);	
  return result;
};

const updateUserRole = async (id, role) => {	
  const result = await USERSDAO.updateUserRole(id, role);	
  return result;	
};	
const updateUserDocument = async (id, file) => {	
  const result = await USERSDAO.updateUserDocument(id, file);	
  return result;
};

const updateLastConnection = async (id) => {
    const user = await USERSDAO.update(
      { _id: id },
      { lastConnection: Date.now() }
    );
    return user;
};

const deleteInactiveUsers = async () => {
  const currentDate = new Date();
  const twoDaysAgo = new Date(
    currentDate.getTime() - 2 * 24 * 60 * 60 * 1000
  );
  const isNotActive = {
    lastConnection: { $lt: twoDaysAgo }
  };
  const inactiveUsers = await USERSDAO.getMany(isNotActive);

  await inactiveUsers.forEach(async (user) => {
    await mailing.sendDeletionNotice(user);
  });

  USERSDAO.deleteMany(isNotActive);
  return true;
};

const getUser = async (id) => {
  const user = await USERSDAO.getById(id);
  return user;
};

const deleteUser = async (id) => {
  const user = await USERSDAO.deleteOne(id);
  return user;
};

export { getUsers, createUser, getByEmail, updateUser, updateUserRole, updateUserDocument, deleteInactiveUsers, updateLastConnection, getUser, deleteUser };