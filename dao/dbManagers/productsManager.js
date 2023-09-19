import productsModel from '../models/productModel.js';

export default class ProductManager {
  getProducts = async () => {
    const products = await productsModel.find().lean();
    return products;
  };

  getProductById = async (id) => {
    const findById = await productsModel.findOne({ _id: id }).lean();
    return findById;
  };

  addProduct = async (product) => {
    const createProduct = await productsModel.create(product);
    return createProduct;
  };

  updateProduct = async (productId, newProduct) => {
    const findAndUpdate = await productsModel.findByIdAndUpdate(
      productId,
      newProduct
    );
    return findAndUpdate;
  };

  getProductByCode = async (code) => {
    const product = await productsModel.findOne({ code: code }).lean();
    return product;
  };

  deleteProduct = async (pid) => {
    const result = await productsModel.findByIdAndDelete(pid);
    return result;
  };
}