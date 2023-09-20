import {
  getUsers as getUsersService,
  getByEmail as getByEmailService,
  createUser as createUserService,
  resetEmailUser as resetEmailUserService,
  updateUser as updateUserService,
  updateUserDocument as updateUserDocumentService,	
  updateUserRole as updateUserRoleService,
  getUser as getUserService,
  deleteUser as deleteUserService,
 
} from '../services/usersService.js';
import { createHash, generateToken, isValidPassword } from '../utils.js';
import { getLogger } from '../utils/logger.js';

const getUsers = async (req, res) => {
  const users = await getUsersService();
  res.send(users);
};
  
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  let user = {};

  try {
    if (email === 'adminLibreria@libreria.com' && password === 'admin1234') {
      user = {
        first_name: 'Administrador',
        last_name: 'Librería',
        email: 'adminLibreria@libreria.com',
        role: 'ADMIN',
        age: 18,
        carts: [],
      };
    } else {
      user = await getByEmailService(email);

      const comparePassword = isValidPassword(user, password);
      if (!comparePassword) {
        return res.sendClientError('Credenciales incorrectas');
      }
      user.last_connection = new Date().toISOString();	
      await updateUserService(email, user);
    }

    const accessToken = generateToken(user);

    res
      .cookie('cookieToken', accessToken, {
        maxAge: 60 * 60 * 1000,
        httpOnly: true,
      })
      .send({ status: 'success', message: 'Usuario logueado', payload: user });
  } catch (error) {
    res.status(400).send({
      status: 'error',
      message: 'Credenciales incorrectas',
      payload: error.message,
    });
  }
};
  
const registerUser = async (req, res) => {
  try {
    const { first_name, last_name, email, password } = req.body;
    const role = 'USER';
    if (!first_name || !last_name || !role || !email || !password)
      return res.sendClientError('Incomplete values');

    const exists = await getByEmailService(email);

    if (exists) return res.sendClientError('User already exists');

    const hashedPassword = createHash(password);

    const user = {
      ...req.body,
    };

    user.password = hashedPassword;

    const result = await createUserService(user);

    res.sendSuccess(result);
  } catch (error) {
    res.sendServerError(error.message);
  }
};
  
const githubUser = async (req, res) => {
  res.send({ status: 'success', message: 'Usuario Registrado' });
};
  
const githubCallbackUser = async (req, res) => {
  const user = req.user;
  const accessToken = generateToken(user);
  res
    .cookie('cookieToken', accessToken, {
      maxAge: 60 * 60 * 1000,
      httpOnly: true,
    })
    .redirect('/home');
};
  
const logoutUser = (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).send({ status: 'error', error: err });
    res.clearCookie('cookieToken');
    res.redirect('/');
  });
};

const resetUser = async (req, res) => {
  try {
    const { token, password } = req.body;

    const tokenData = await verifyToken(token);
    const email = tokenData.user.email;

    if (!email || !password)
      return res
        .status(400)
        .send({ status: 'error', error: 'Incomplete values' });

    const user = await getByEmailService(email);

    if (!user)
      return res.status(400).send({ status: 'error', error: 'User not found' });

    if (isValidPassword(user, password)) {
      return res.status(400).send({
        status: 'error',
        error: 'New password must be different from current password',
      });
    }

    const newPass = createHash(password);
    user.password = newPass;

    await updateUserService(email, user);

    res.send({ status: 'success', message: 'Password reset' });
  } catch (error) {
    getLogger().error(error.message);
    res.status(500).send({ status: 'error', error: error.message });
  }
};

const resetEmailUser = async (req, res) => {
  try {
    const email = req.body.email;

    if (!email)
      return res
        .status(400)
        .send({ status: 'error', error: 'Incomplete values' });

    await resetEmailUserService(email);
    res.send({ status: 'success', message: 'Email reset' });
  } catch (error) {
    getLogger().error(error.message);
    res.status(500).send({ status: 'error', error: error.message });
  }
};

const handleUpdate = async (res, updateFunction, successMessage) => {
  try {
    const result = await updateFunction();
    res.send({
      status: 'success',
      message: successMessage,
    });
  } catch (error) {
    getLogger().warn(error.message);
    res.status(400).send({ status: 'error', error: error.message });
  }
};

const updateUserRole = async (req, res) => {
  const uid = req.params.uid;
  const role = req.body.role;
  await handleUpdate(
    res,
    () => updateUserRoleService(uid, role),
    'Rol actualizado correctamente'
  );
};

const updateUserDocument = async (req, res) => {
  const uid = req.params.uid;
  const files = req.files;
  await handleUpdate(
    res,
    () => updateUserDocumentService(uid, files),
    'Documento actualizado correctamente'
  );
};

const getUser = async(req,res)=> {
  const users = await getUserService();
  res.send(users);
}

const updateUser =async(req,res)=>{
  const user = await updateUserService();
  res.send(user);
}

const deleteUser = async(req,res) =>{
  const user = await deleteUserService();
  res.send({status:"success",message:"User deleted"})
}

const deleteInactiveUsers = async(req,res) =>{
  const users = await deleteInactiveUsersService();
  res.send({status:"success",message:"Inactive users deleted"})
}

export { getUsers, loginUser, registerUser, logoutUser, githubUser, githubCallbackUser, resetEmailUser, resetUser, updateUserRole, updateUserDocument, getUser, updateUser, deleteUser, deleteInactiveUsers };