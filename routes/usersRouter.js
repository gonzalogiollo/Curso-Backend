import Router from './router.js';
import passport from 'passport';
import {
  loginUser,
  registerUser,
  logoutUser,
  githubUser,
  githubCallbackUser,
  resetUser,
  resetEmailUser,
  updateUserRole,
  updateUserDocument,
} from '../controllers/usersController.js';

import { PUBLIC_ACCESS, PRIVATE_ACCESS } from '../config/access.js';
import { uploader } from '../utils.js';	
import Users from '../dao/dbManagers/usersManager.js';
import { passportStrategiesEnum } from '../config/enums.js';

const usersManager = new Users();

export default class UsersRouter extends Router {
  init() {
    this.post(
      '/login',
      PUBLIC_ACCESS,
      passportStrategiesEnum.NOTHING,
      loginUser
    );
    this.post(
      '/register',
      PUBLIC_ACCESS,
      passportStrategiesEnum.NOTHING,
      registerUser
    );
    this.post(
      '/reset',
      PUBLIC_ACCESS,
      passportStrategiesEnum.NOTHING,
      resetEmailUser
    );
    this.post(
      "/reset-user",
      PUBLIC_ACCESS,
      passportStrategiesEnum.NOTHING,
      resetUser
    );
    this.get(
      '/github',
      PUBLIC_ACCESS,
      passportStrategiesEnum.NOTHING,
      passport.authenticate('github', { scope: ['user:email'] }),
      githubUser
    );

    this.get(
      '/github-callback',
      PUBLIC_ACCESS,
      passportStrategiesEnum.NOTHING,
      passport.authenticate('github', { failureRedirect: '/' }),
      githubCallbackUser
    );
    this.get(
      '/logout',
      PUBLIC_ACCESS,
      passportStrategiesEnum.NOTHING,
      logoutUser
    );
    this.post(	
      '/:uid/documents',	
      PRIVATE_ACCESS,	
      passportStrategiesEnum.JWT,	
      uploader.fields([	
        { name: 'products' },	
        { name: 'profile' },	
        { name: 'identification' },	
        { name: 'address' },	
        { name: 'account_state' },	
      ]),	
      updateUserDocument	
    );
    this.put(	
      '/premium/:uid',	
      PUBLIC_ACCESS,	
      passportStrategiesEnum.JWT,	
      updateUserRole	
    );	
  }
}