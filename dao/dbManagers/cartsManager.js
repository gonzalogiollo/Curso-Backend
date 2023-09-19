import cartModel from '../models/cartModel.js';
import ProductManager from './productsManager.js';
import InvoiceManager from './invoiceManager.js';
import { v4 as uuidv4 } from 'uuid';

const productManager = new ProductManager();
const invoiceManager = new InvoiceManager();

const randomCode = uuidv4();

export default class CartManager {
  getCart = async () => {
    const carts = await cartModel.find().lean();
    return carts;
  };
  getCartById = async (id) => {
    const cart = await cartModel.findOne({ _id: id }).lean();
    if (!cart) {
      throw new Error('Cart not found');
    }
    return cart;
  };

  addCart = async (cart) => {
    const result = await cartModel.create(cart);
    return result;
  };
  addProductToCart = async (cid, pid) => {
    const cart = await this.getCartById(cid);

    let product = cart.products.find(
      (cart) => cart.product._id.toString() === pid
    );
    if (product) {
      product.quantity++;
    } else {
      product = {
        product: pid,
        quantity: 1,
      };
      cart.products.push(product);
    }
    const result = await cartModel.updateOne({ _id: cid }, cart);

    return result;
  };

  updateProducts = async (cid, products) => {
    const cart = await this.getCartById(cid);

    const insertToCart = [];
    products.forEach((p) => {
      let product = cart.products.find(
        (cart) => cart.product._id.toString() === p.id
      );
      if (product) {
        product.quantity = p.quantity;
      } else {
        product = {
          product: p.id,
          quantity: p.quantity,
        };
        insertToCart.push(product);
      }
    });
    insertToCart.forEach((data) => {
      cart.products.push(data);
    });
    const result = await cartModel.updateOne({ _id: cid }, cart);
    return result;
  };

  updateProductQuantity = async (cid, pid, qty) => {
    const cart = await this.getCartById(cid);
    let product = cart.products.find(
      (cart) => cart.product._id.toString() === pid
    );

    if (product) {
      product.quantity = qty;
    } else {
      product = {
        product: pid,
        quantity: qty,
      };
      cart.products.push(product);
    }
    const result = await cartModel.updateOne({ _id: cid }, cart);
    return result;
  };

  deleteCart = async (id) => {
    const result = await cartModel.deleteOne({ _id: id });
    return result;
  };

  deleteProduct = async (cid, pid) => {
    const result = await cartModel.updateOne(
      { _id: cid },
      { $pull: { products: { product: pid } } }
    );
    return result;
  };

  updateinvoicePurchase = async (cid, user) => {
    const cart = await this.getCartById(cid);
    const invoiceProducts = [];

    let amount = 0;
    const cartInit = [...cart.products];

    for (const productsOnCart of cartInit) {
      const product = await productManager.getProductById(
        productsOnCart.product._id.toString()
      );
      if (product.stock >= productsOnCart.quantity) {
        product.stock = product.stock - productsOnCart.quantity;

        const result = await productManager.updateProduct(
          productsOnCart.product._id.toString(),
          product
        );

        if (result) {
          const index = cart.products.indexOf(productsOnCart);

          invoiceProducts.push(product);
          cart.products.splice(index, 1);
          await this.deleteProduct(cid, productsOnCart.product._id.toString());
          amount = amount + productsOnCart.quantity * product.price;
        }
      }
    }

    // Create invoice
    if (invoiceProducts.length === 0) {
      return {
        status: 'error',
        error: 'No products on cart',
        cart: cart.products,
      };
    } else {
      const dateInfo = new Date().toLocaleString('es-AR', {
        timeZone: 'America/Argentina/Buenos_Aires',
      });

      const idCode = randomCode;

      const invoice = await invoiceManager.createinvoice(
        idCode,
        dateInfo,
        amount,
        user,
        invoiceProducts
      );

      if (cart.products.length === 0) {
        return {
          status: 'success',
          payload: invoice,
          invoiceProducts: invoiceProducts,
        };
      } else {
        return {
          status: 'success',
          error: 'Some products could not be purchased',
          cart: cart.products,
          payload: invoice,
          invoiceProducts: invoiceProducts,
        };
      }
    }
  };
}