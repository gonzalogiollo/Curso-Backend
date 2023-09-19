import {
    addCart as addCartsRepository,
    getCart as getCartsRepository,
    getCartById as getCartByIdRepository,
    addProductToCart as addProductToCartRepository,
    updateProducts as updateProductsRepository,
    updateProductQuantity as updateProductQuantityRepository,
    deleteCart as deleteCartRepository,
    deleteCartProduct as deleteCartProductRepository,
    updateInvoicePurchase as updateInvoicePurchaseRepository,
  } from "../repositories/cartsRepository.js";
  
  import emailService from "./emailService.js";
  
  import {
    getProductById as getProductByIdRepository,
  } from "../repositories/productsRepository.js";
  
  const addCart = async (cart) => {
    const newCart = await addCartsRepository(cart);
    if (!newCart) {
      throw new Error("Error creando carrito");
    }
  
    return newCart;
  };
  
  const getCart = async () => {
    return await getCartsRepository();
  };
  
  const getCartById = async (id) => {
    const cart = await getCartByIdRepository(id);
    if (!cart) {
      throw new Error("Carrito no encontrado");
    }
    return cart;
  };
  
  const addProductToCart = async (cid, pid) => {
    const cart = await getCartByIdRepository(cid, pid);
    const existProduct = await getProductByIdRepository(pid);
    if (!existProduct) {
      throw new Error("Producto no encontrado");
    }
    if (!cart) {
      throw new Error("Carrito no encontrado");
    }
    const newCart = await addProductToCartRepository(cid, pid);
    if (!newCart) {
      throw new Error("Error agregando el producto al carrito");
    }
    return newCart;
  };
  
  const updateProducts = async (cid, products) => {
    const existProduct = await getProductByIdRepository(products.pid);
    if (!existProduct) {
      throw new Error("Producto no encontrado");
    }
  
    const cart = await getCartByIdRepository(cid, products.pid);
  
    if (!cart) {
      throw new Error("Carrito no encontrado");
    }
  
    const newCart = await updateProductsRepository(cid, products);
    if (!newCart) {
      throw new Error("Error actualizando productos");
    }
    return newCart;
  };
  
  const updateProductsQuantity = async (cid, pid, qty) => {
    const existProduct = await getProductByIdRepository(pid);
    if (!existProduct) {
      throw new Error("Producto no encontrado");
    }
    const cart = await getCartByIdRepository(cid, pid, qty);
    if (!cart) {
      throw new Error("Carrito no encontrado");
    }
    const newCart = await updateProductQuantityRepository(cid, pid, qty);
  
    if (!newCart) {
      throw new Error("Error actualizando cantidad de productos");
    }
    return newCart;
  };
  
  const deleteCart = async (id) => {
    const cart = await getCartByIdRepository(id);
    if (!cart) {
      throw new Error("Carrito no encontrado");
    }
    const result = await deleteCartRepository(id);
    if (!result) {
      throw new Error("Error borrando carrito");
    }
  
    return result;
  };
  
  const deleteCartProduct = async (cid, pid) => {
    const existProduct = await deleteCartProductRepository(pid);
  
    if (!existProduct) {
      throw new Error("Error borrando carrito de productos");
    }
    const cartProduct = await deleteCartProductRepository(cid, pid);
  
    if (!cartProduct) {
      throw new Error("Error borrando carrito de productos");
    }
  
    return cartProduct;
  };
  
  const updateInvoicePurchase = async (cid, user) => {
    const result = await updateInvoicePurchaseRepository(cid, user);
  
    if (result.status !== "success") {
      throw new Error("Error actualizando factura de compra");
    } else {
      const invoice = result.payload;
      const message = "Invoice ID: " + invoice.code;
      const total = invoice.amount;
  
      try {
        await emailService(message, total);
      } catch (error) {
      }
    }
  
    return result;
  };
  
  export {
    addCart,
    getCart,
    getCartById,
    addProductToCart,
    updateProducts,
    updateProductsQuantity,
    deleteCart,
    deleteCartProduct,
    updateInvoicePurchase,
  };