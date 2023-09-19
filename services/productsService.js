import {
    addProduct as addProductRepository,
    getProducts as getProductsRepository,
    getProductById as getProductByIdRepository,
    updateProduct as updateProductRepository,
    deleteProduct as deleteProductRepository,
  } from "../repositories/productsRepository.js";
  
  const addProduct = async (product) => {
    const newProduct = await addProductRepository(product);
    return newProduct;
  };
  
  const getProducts = async (limit, page, query, sort) => {
    const products = await getProductsRepository(limit, page, query, sort);
    return products;
  };
  
  const getProductById = async (pid) => {
    const product = await getProductByIdRepository(pid);
    if (!product) {
      throw new Error("Producto no encontrado");
    }
    return product;
  };
  
  const updateProduct = async (id, product) => {
    const updatedProduct = await updateProductRepository(id, product);
  
    if (!updatedProduct) {
      throw new Error("Producto no encontrado");
    }
    return updatedProduct;
  };
  
  const deleteProduct = async (id) => {
    const result = await deleteProductRepository(id);
  
    if (!result) {
      throw new Error("Producto no encontrado");
    }
    return result;
  };
  
  export {
    addProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct,
  };