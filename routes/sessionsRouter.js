// import { Router } from 'express';
// import { passportStrategiesEnum } from '../config/enums.js';
// import { createHash, generateToken, isValidPassword } from '../utils.js';

// const router = Router();

// router.post( '/login', ['PUBLIC'], passportStrategiesEnum.NOTHING, async (req, res) => {
//   const { email, password } = req.body;
//   const user = await usersManager.getByEmail(email);
//   if (!user) return res.sendClientError('Incorrect credentials');

//   const comparePassword = isValidPassword(user, password);

//   if (!comparePassword) {
//       return res.sendClientError('Incorrect credentials');
//   }

//   const accessToken = generateToken(user);

//   res
//       .cookie('cookieToken', accessToken, {
//       maxAge: 60 * 60 * 1000,
//       httpOnly: true,
//       })
//       .send({ status: 'success' });
//   }
// );
//   // Register
// router.post('/register', ['PUBLIC'], passportStrategiesEnum.NOTHING, async (req, res) => {
// try {
//   const { first_name, last_name, email, password } = req.body;
//   const role = 'USER';
//   if (!first_name || !last_name || !role || !email || !password)
//     return res.sendClientError('incomplete values');

//   const exists = await usersManager.getByEmail(email);

//   if (exists) return res.sendClientError('user already exists');

//   const hashedPassword = createHash(password);

//   const newUser = {
//     ...req.body,
//   };

//   newUser.password = hashedPassword;

//   const result = await usersManager.save(newUser);

//   res.sendSuccess(result);
// } catch (error) {
//   res.sendServerError(error.message);
// }
// }
// );

// router.get('/github',['PUBLIC'], passportStrategiesEnum.NOTHING, passport.authenticate('github', { scope: ['user:email'] }),
// async (req, res) => {
//   res.send({ status: 'success', message: 'Succesfully registered' });
// }
// );

// router.get('/github-callback',['PUBLIC'], passportStrategiesEnum.NOTHING, passport.authenticate('github', { failureRedirect: '/' }),
// async (req, res) => {
//   const user = req.user;
//   const accessToken = generateToken(user);
//   res
//     .cookie('cookieToken', accessToken, {
//       maxAge: 60 * 60 * 1000,
//       httpOnly: true,
//     })
//     .redirect('/');
// }
// );

// router.get('/logout', ['PUBLIC'], passportStrategiesEnum.NOTHING, (req, res) => {
//   req.session.destroy((err) => {
//     if (err) return res.status(500).send({ status: 'error', error: err });
//     res.clearCookie('cookieToken');
//     res.redirect('/');
//   });
// }
// );

// router.get( '/current', ['ADMIN', 'USER_PREMIUM', 'USER'], passportStrategiesEnum.JWT,
//   (req, res) => {
//     res.sendSuccess(req.user);
//   }
// );

// export default router;


import Router from './router.js';
import { passportStrategiesEnum } from '../config/enums.js';
import { PRIVATE_ACCESS } from '../config/access.js';

export default class SessionsRouter extends Router {
  init() {
    this.get(
      '/current',
      PRIVATE_ACCESS,
      passportStrategiesEnum.JWT,
      (req, res) => {
        res.sendSuccess(req.user);
      }
    );
  }
}