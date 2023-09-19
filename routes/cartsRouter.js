import Router from './router.js';
import {
  addCart,
  getCart,
  getCartById,
  addProductToCart,
  deleteCart,
  updateProducts,
  updateProductQuantity,
  deleteProductFromCart,
  updateInvoicePurchase,
} from '../controllers/cartsController.js';

import { passportStrategiesEnum } from '../config/enums.js';
import { PRIVATE_ACCESS, ADMIN_ACCESS, CARTS_ACCESS } from "../config/access.js";

export default class CartsRouter extends Router {
  init() {
    this.get('/', ADMIN_ACCESS, passportStrategiesEnum.JWT, getCart);	

    this.get("/:cid", PRIVATE_ACCESS, passportStrategiesEnum.JWT, getCartById);
    
    this.post('/', CARTS_ACCESS, passportStrategiesEnum.JWT, addCart);

    this.post('/:cid/products/:pid', CARTS_ACCESS, passportStrategiesEnum.JWT, addProductToCart);

    this.post('/:cid/purchase', CARTS_ACCESS, passportStrategiesEnum.JWT, updateInvoicePurchase);

    this.put('/:cid', CARTS_ACCESS, passportStrategiesEnum.JWT, updateProducts);

    this.put('/:cid/products/:pid', CARTS_ACCESS, passportStrategiesEnum.JWT, updateProductQuantity);

    this.delete('/:pid', CARTS_ACCESS, passportStrategiesEnum.JWT, deleteCart);

    this.delete('/:cid/products/:pid', CARTS_ACCESS, passportStrategiesEnum.JWT, deleteProductFromCart);

  }
}