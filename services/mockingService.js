import { fakeProductGenerator } from "../mocks/fakeProducts.js";
import CustomError from "../middlewares/errors/CustomErrors.js";
import Error from "../middlewares/errors/enums.js";
import { generateProductErrorInfo } from "../middlewares/errors/info.js";
import { v4 as uuidv4 } from "uuid";

const customId = uuidv4();

let products = [];

const addProducts = async (product) => {
  const codeCheck = products.find((p) => p.code === product.code);

  if (codeCheck) {
    throw new CustomError.createError({
      name: "El producto ya existe",
      cause: "El producto ya existe",
      message: "El producto ya existe",
      code: Error.PRODUCT_EXISTS_ERROR,
      info: generateProductErrorInfo(product),
    });
  }

  product.id = customId;

  products.push(product);
  return product;
};

const getProducts = async () => {
  for (let i = 0; i < 100; i++) {
    products.push(fakeProductGenerator());
  }
  return products;
};

const getProductById = async (id) => {
  const product = products.find((product) => product.id === id);

  if (product === undefined) {
    throw new CustomError.createError({
      name: "Producto no encontrado",
      cause: "Producto no encontrado",
      message: "Producto no encontrado",
      code: Error.PRODUCT_NOT_FOUND,
    });
  }

  return product;
};

const updateProduct = async (id, productUpdate) => {
  const productFind = products.find((product) => product.id === id);

  if (productFind !== undefined) {
    const indexProduct = products.indexOf(productFind);
    const updatedProduct = {
      ...productFind,
      ...productUpdate,
      id: productFind.id,
    };
    products[indexProduct] = updatedProduct;
    return updatedProduct;
  } else {
    throw CustomError.createError({
      name: "Producto no encontrado",
      cause: "Producto no encontrado",
      message: "Producto no encontrado",
      code: Error.PRODUCT_NOT_FOUND,
    });
  }
};

const deleteProduct = async (id) => {
  const product = products.find((product) => product.id === id);

  if (product !== undefined) {
    const deleteProduct = products.filter((product) => product.id !== id);
    products = [...deleteProduct];
    return deleteProduct;
  } else {
    throw new CustomError.createError({
      name: "Producto no encontrado",
      cause: "Producto no encontrado",
      message: "Producto no encontrado",
      code: EError.PRODUCT_NOT_FOUND,
    });
  }
};

export {
  getProducts,
  getProductById,
  addProducts,
  updateProduct,
  deleteProduct,
};