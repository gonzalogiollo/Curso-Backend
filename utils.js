import { fileURLToPath } from 'url';
import { dirname } from 'path';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { PRIVATE_KEY } from './config/constants.js';
import multer from "multer";

export const createHash = password =>
	bcrypt.hashSync(password, bcrypt.genSaltSync(10));

export const isValidPassword = (user, password) =>
	bcrypt.compareSync(password, user.password);

export const generateToken = (user) => {
	const token = jwt.sign({ user }, PRIVATE_KEY, { expiresIn: '24h' });
	return token;
};

export const verifyToken = async (token) => {
	return new Promise((resolve, reject) => {
    jwt.verify(token, PRIVATE_KEY, (err, decoded) => {
    if (err) {
      reject(err);
    }
    resolve(decoded);
    });
});
};

export const storage = multer.diskStorage({	
  destination: (req, file, cb) => {	
    let filePath = "";	
    if (req.files.products) {	
      filePath = "products";	
    } else if (req.files.profile) {	
      filePath = "profiles";	
    } else {	
      filePath = "documents";	
    }	
    cb(null, `${__dirname}/public/img/${filePath}`);	
    console.log(filePath);	
  },	
  filename: (req, file, cb) => {	
    cb(null, `${Date.now()}-${file.originalname}`);	
  },	
});	

export const uploader = multer({	
  storage,	
  onError: (err, next) => {	
    console.log(err);	
    next();	
  },	
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default  __dirname ;