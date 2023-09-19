import productsModel from '../dao/models/productModel.js';
import { getCart } from '../services/cartsService.js';
import { getProducts } from '../services/productsService.js';
import { verifyToken } from '../utils.js';

const loginView = (req, res) => {
  res.render('login');
};

const registerView = (req, res) => {
  res.render('register');
};

const resetView = (req, res) => {
  res.render('reset');
};

const getProfile = (req, res) => {
  const user = req.user;
  res.render('profile', { user });
};

const homeView = async (req, res) => {
  const { category } = req.query;
  const user = req.user;

  let { limit, sort } = req.query;
  const { page = 1 } = req.query;
  limit = limit || 10;

  let filter = {};

  if (category) {
    filter.category = category;
  }

  // Sort options
  const sortOptions = {};
  if (sort === 'asc') {
    sortOptions.price = 1;
  } else if (sort === 'desc') {
    sortOptions.price = -1;
  }

  const {
    docs,
    hasPrevPage,
    hasNextPage,
    prevPage,
    nextPage,
    prevLink,
    nextLink,
  } = await productsModel.paginate(filter, {
    limit,
    page,
    sort: sortOptions,
    lean: true,
  });

  let productsList = docs.slice(0, limit);

  res.render('home', {
    productsList: productsList,
    hasPrevPage,
    hasNextPage,
    prevPage,
    nextPage,
    prevLink,
    nextLink,
    currentSort: sort,
    user,
  });
};

const getCategory = async (req, res) => {
  const { category } = req.params;

  let { limit } = req.query;
  const { page = 1 } = req.query;

  limit = limit || 10;

  const {
    docs,
    hasPrevPage,
    hasNextPage,
    prevPage,
    nextPage,
    prevLink,
    nextLink,
  } = await productsModel.paginate({ category }, { limit, page, lean: true });

  let productsList = docs.slice(0, limit);

  res.render('home', {
    productsList: productsList,
    hasPrevPage,
    hasNextPage,
    prevPage,
    nextPage,
    prevLink,
    nextLink,
    user: req.session.user,
  });
};

const chatRender = (req, res) => {
  res.render("chat");
};

const getCarts = async (req, res) => {
  let { cid } = req.params;
  let { products, _id } = await getCart(cid);
  res.render('cart', {
    title: 'Products',
    products,
    _id,
    user: req.session.user,
  });
};

const realtimeproductsView = async (req, res) => {
  const productsList = await getProducts();
  res.render('realTimeProducts', {
    productsList: productsList,
    user: req.session.user,
  });
};

const resetPasswordView = async (req, res) => {
  const token = req.query.token;
  try {
    const decoded = await verifyToken(token);
    const email = decoded.user.email;

    return res.render('resetPassword', { email, token });
  } catch (err) {
    return res.status(400).send('Invalid token');
  }
};

export {
  registerView,
  loginView,
  resetView,
  getProfile,
  homeView,
  getCategory,
  getCarts,
  realtimeproductsView,
  resetPasswordView,
  chatRender
};