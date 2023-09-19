import { CARTSDAO } from '../dao/index.js';

// GET ALL CARTS
const getCart = async () => {
  const carts = await CARTSDAO.getCart();
  return carts;
};

// GET BY ID
const getCartById = async (id) => {
  const cart = await CARTSDAO.getCartById(id);
  return cart;
};

// POST CART
const addCart = async (cart) => {
    const newCarts = await CARTSDAO.addCart(cart);
    return newCarts;
  };

// POST PRODUCT TO CART
const addProductToCart = async (cid, pid) => {
  const result = await CARTSDAO.addProductToCart(cid, pid);
  return result;
};

// PUT PRODUCT QUANTITY
const updateProductQuantity = async (cid, pid, qty) => {
    const result = await CARTSDAO.updateProductQuantity(cid, pid, qty);
    return result;
  };
  
// PUT PRODUCTS
const updateProducts = async (cid, products) => {
  const result = await CARTSDAO.updateProducts(cid, products);
  return result;
};

// DELETE CART
const deleteCart = async (id) => {
  const result = await CARTSDAO.deleteCart(id);
  return result;
};

// DELETE PRODUCT FROM CART
const deleteCartProduct = async (cid, pid) => {
  const result = await CARTSDAO.deleteProduct(cid, pid);
  return result;
};

// UPDATE BUY
const updateInvoicePurchase = async (cid, user) => {
  const result = await CARTSDAO.updateInvoicePurchase(cid, user);
  return result;
};

export { getCart, getCartById, addCart, addProductToCart, updateProducts, updateProductQuantity, deleteCart, deleteCartProduct, updateInvoicePurchase };