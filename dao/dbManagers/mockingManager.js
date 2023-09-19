import { faker } from '@faker-js/faker';
import mockingModel from '../models/mocking.model.js';

import { fakeProductGenerator } from '../../mocks/fakeProducts.js';

faker.locale = 'es';

export default class MockingManager {
  getProducts = async () => {
    let products = [];
    for (let i = 0; i < 100; i++) {
      products.push(fakeProductGenerator());
    }
    return products;
  };

  getProductById = async (id) => {
    const findById = await mockingModel.findOne({ _id: id }).lean();
    return findById;
  };

  addProduct = async (product) => {
    const createProduct = await mockingModel.create(product);
    return createProduct;
  };

  updateProduct = async (productId, newProduct) => {
    const product = await mockingModel.findByIdAndUpdate(
      productId,
      newProduct
    );
    return product;
  };

  deleteProduct = async (id) => {
    let products = await mockingModel.deleteOne({ _id: id });
    return products;
  };
}