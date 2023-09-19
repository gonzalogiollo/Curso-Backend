// import Router from './router.js';
// import {
//   getProducts,
//   getProductById,
//   addProducts,
//   updateProduct,
//   deleteProduct,
// } from '../controllers/productsController.js';
// import { passportStrategiesEnum } from '../config/enums.js';
// import { PREMIUM_ACCESS, PRIVATE_ACCESS } from '../config/access.js';


// export default class ProductsRouter extends Router {
//   init() {
//     this.post('/', PREMIUM_ACCESS, addProducts);
//     this.get('/', PRIVATE_ACCESS, passportStrategiesEnum.JWT, getProducts);
//     this.get(
//       '/:id',
//       PRIVATE_ACCESS,
//       passportStrategiesEnum.JWT,
//       getProductById
//     );

//     this.put('/:id', PREMIUM_ACCESS, passportStrategiesEnum.JWT, updateProduct);

//     this.delete(
//       '/:id',
//       PREMIUM_ACCESS,
//       passportStrategiesEnum.JWT,
//       deleteProduct
//     );
//   }
// }

import Router from './router.js';
import {
  getProducts,
  getProductById,
  addProducts,
  updateProduct,
  deleteProduct,
} from '../controllers/productsController.js';

import { PREMIUM_ACCESS, PRIVATE_ACCESS } from '../config/access.js';

import { passportStrategiesEnum } from '../config/enums.js';

export default class ProductsRouter extends Router {
  init() {
    this.post('/', PREMIUM_ACCESS, passportStrategiesEnum.JWT, addProducts);
    this.get('/', PRIVATE_ACCESS, passportStrategiesEnum.JWT, getProducts);
    this.get('/:id', PRIVATE_ACCESS, passportStrategiesEnum.JWT, getProductById);
    this.put('/:pid', PREMIUM_ACCESS, passportStrategiesEnum.JWT, updateProduct);
    this.delete('/:pid', PREMIUM_ACCESS, passportStrategiesEnum.JWT, deleteProduct);
  }
}