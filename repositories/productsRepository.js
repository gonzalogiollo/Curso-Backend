import { PRODUCTSDAO } from "../dao/index.js";

// GET ALL PRODUCTS
const getProducts = async (limit, page, query, sort) => {
  const products = await PRODUCTSDAO.getProducts(limit, page, query, sort);
  return products;
};

// GET PRODUCT
const getProductById = async (pid) => {
    const product = await PRODUCTSDAO.getProductById(pid);
    return product;
  };

// POST PRODUCT
const addProduct = async (product) => {
    const newProduct = await PRODUCTSDAO.addProduct(product);
    return newProduct;
  };

// PUT PRODUCT
const updateProduct = async (id, product) => {
  const updatedProduct = await PRODUCTSDAO.updateProduct(id, product);
  return updatedProduct;
};

// DELETE PRODUCT
const deleteProduct = async (id) => {
  const result = await PRODUCTSDAO.deleteProduct(id);
  return result;
};

export { getProducts, getProductById, addProduct, updateProduct, deleteProduct };