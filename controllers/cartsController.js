import {
    addCart as addCartsService,
    getCart as getCartsService,
    getCartById as getCartByIdService,
    addProductToCart as addProductToCartService,
    updateProducts as updateProductsService,
    updateProductsQuantity as updateProductsQuantityService,
    deleteCart as deleteCartService,
    deleteCartProduct as deleteCartProductService,
    updateInvoicePurchase as updateInvoicePurchaseService,
  } from '../services/cartsService.js';

import { updateUser as updateUserService } from '../services/usersService.js';	

const addCart = async (req, res) => {
  const user = req.user;
  const email = user.email;	
  try {
    const cart = {
      products: [],
    };

    const newCart = await addCartsService(cart);
    user.carts.push({ cart: newCart._id.toString() });
    await updateUserService(email, user);	
    res.status(200).json({ status: 'Carrito Creado', payload: newCart });
  } catch (error) {
    console.log(error)
    res.status(400).json({ info: 'Error', error: error.message });
  }
};
  
const getCart = async (req, res) => {
  try {
    console.log(req.params.id)
    console.log('entra a get cart')
    const cart = await getCartsService(req.params.id);
    console.log('encontro el cart')
    console.log(cart)
    res.status(200).json({ status: 'Carrito Encontrado', payload: cart });
  } catch (error) {
    res.status(400).json({ info: 'Error', error: error.message });
  }
};
  
const getCartById = async (req, res) => {
  try {
    const cid = req.params.cid;

    const cart = user.carts.find((cart) => cart.cart === cid);
    if (!cart) {
      res.status(400).json({ info: 'Error', error: 'Carrito no encontrado' });
    } else {
      const cart = await getCartByIdService(cid);
      res.status(200).json({ status: 'Carrito encontrado', payload: cart });
    }
  } catch (error) {
    res.status(400).json({ info: 'Error', error });
  }
};
  
const addProductToCart = async (req, res) => {
  const cid = req.params.cid;
  const pid = req.params.pid;

  try {
    const cart = await addProductToCartService(cid, pid);

    res.status(200).json({ status: 'Producto agregado al carrito', payload: cart });
  } catch (error) {
    res.status(400).json({ info: 'Error', error });
  }
};

const updateProducts = async (req, res) => {
  const cid = req.params.cid;
  const products = req.body;
  const pid = products[0].id;

  try {
    let uptProd = await updateProductsService(cid, pid, products);
    res.status(200).json({ status: 'Productos actualizados', payload: uptProd });
  } catch (error) {
    res.status(400).json({ info: 'Error', error });
  }
};
  
const updateProductQuantity = async (req, res) => {
  const { cid, pid } = req.params;
  const { quantity } = req.body;

  try {
    let uptProdQua = await updateProductsQuantityService(cid, pid, quantity);
    res.send({ ...uptProdQua });
  } catch (error) {
    res.status(400).send({ ...uptProdQua });
  }
};
  
const deleteCart = async (req, res) => {
  const cid = req.params.cid;
  try {
    const cart = await deleteCartService(cid);
    res.status(200).json({ status: 'Carrito Eliminado', payload: cart });
  } catch (error) {
    res.status(400).json({ info: 'Error', error: error.message });
  }
};
  
const deleteProductFromCart = async (req, res) => {
  const cid = req.params.cid;
  const pid = req.params.pid;

  try {
    const cart = await deleteCartProductService(cid, pid);
    res
      .status(200)
      .json({ status: 'Producto borrado del carrito', payload: cart });
  } catch (error) {
    res.status(400).json({ info: 'Error', error: error.message });
  }
};
  
const updateInvoicePurchase = async (req, res) => {
  const cid = req.params.cid;
  const user = req.user;

  try {
    const invoice = await updateInvoicePurchaseService(cid, user);

    res.status(200).send({
      status: 'success',
      message: 'Factura actualizada',
      payload: invoice,
    });
  } catch (error) {
    res.status(400).send({
      status: 'error',
      message: 'Error actualizando factura',
      payload: error.message,
    });
  }
};
  
export {
  addCart,
  getCart,
  getCartById,
  addProductToCart,
  deleteCart,
  updateProducts,
  updateProductQuantity,
  deleteProductFromCart,
  updateInvoicePurchase,
};