import {
  registerView,
  loginView,
  resetView,
  getProfile,
  homeView,
  getCategory,
  getCarts,
  realtimeproductsView,
  resetPasswordView,
} from '../controllers/viewsController.js';

import {
  PUBLIC_ACCESS,
  PRIVATE_ACCESS,
  PREMIUM_ACCESS,
} from '../config/access.js';

import  __dirname from '../utils.js';
import Router from './router.js';

import { passportStrategiesEnum } from '../config/enums.js';

export default class ViewsRouter extends Router {
  init() {
    this.get('/register', PUBLIC_ACCESS, passportStrategiesEnum.NOTHING, registerView);
    
    this.get('/', PUBLIC_ACCESS, passportStrategiesEnum.NOTHING, loginView);

    this.get('/reset', PUBLIC_ACCESS, passportStrategiesEnum.NOTHING, resetView);

    this.get('/reset-password', PUBLIC_ACCESS, passportStrategiesEnum.NOTHING, resetPasswordView);

    this.get('/profile', PRIVATE_ACCESS, passportStrategiesEnum.JWT, getProfile);

    this.get('/home', PRIVATE_ACCESS, passportStrategiesEnum.JWT, homeView);

    this.get('/category/:category', getCategory);

    this.get('/carts/:cid', PUBLIC_ACCESS, passportStrategiesEnum.NOTHING, getCarts);
  }
}