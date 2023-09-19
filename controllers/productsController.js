import {
  addProduct as addProductsService,
  getProducts as getProductsService,
  getProductById as getProductByIdService,
  updateProduct as updateProductService,
  deleteProduct as deleteProductService,
} from '../services/productsService.js';

import { ROLE_PERMISSIONS, PRODUCT_PREMIUM } from '../config/access.js';

import { getLogger } from '../utils/logger.js';


const getProducts = async (req, res) => {
  const limit = parseInt(req.query.limit) || 10;
  const page = parseInt(req.query.page) || 1;

  const query = req.query.query || undefined;
  const sort = req.query.sort || undefined;

  try {
    const result = await getProductsService(limit, page, query, sort);
    const products = [...result];

    res.send({
      status: 'success',
      payload: products,
      totalPages: result.totalPages,
      prevPage: result.prevPage,
      nextPage: result.nextPage,
      hasPrevPage: result.hasPrevPage,
      hasNextPage: result.hasNextPage,
      prevLink: result.prevLink,
      nextLink: result.nextLink,
    });
  } catch (error) {
    getLogger().error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getProductById = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await getProductByIdService(id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ status: 'Success', payload: product });
    }
  } catch (error) {
    getLogger().error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const updateProduct = async (req, res) => {
  const pid = req.params.pid;
  const { body: productUpdate, user } = req;
  try {
    const product = await getProductByIdService(pid);
    if (!product) throw new Error('Producto no encontrado');

    const noAuth = PRODUCT_PREMIUM.includes(user.role);

    if (noAuth) {
      if (product.owner !== user.email) {
        throw new Error('No está autorizado a editar');
      }
    }

    const updatedProduct = await updateProductService(pid, productUpdate);

    res.send({ status: 'success', payload: updatedProduct });
  } catch (error) {
    getLogger().error(error);
    res.status(500).send(error.message);
  }
};

const addProducts = async (req, res) => {
  const { body: productNew } = req;
  try {
    const result = await addProductsService(productNew);
    res.send({ status: 'success', payload: result });
  } catch (error) {
    res.status(406).json({ info: 'Producto ya presente en la lista', error });
  }
}


const deleteProduct = async (req, res) => {
  let { id } = req.params;

  try {
    let response = await deleteProductService(id);
    res.status(200).json({ info: 'Product deleted', response });
  } catch (error) {
    getLogger().error(error);
    res.status(500).send(error.message);
  }
};

export {
  getProducts,
  getProductById,
  addProducts,
  updateProduct,
  deleteProduct,
};