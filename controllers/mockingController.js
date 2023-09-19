import {
    addProducts as addProductsService,
    getProducts as getProductsService,
    getProductById as getProductByIdService,
    updateProduct as updateProductService,
    deleteProduct as deleteProductService,
  } from "../services/mockingService.js";
  
  const addProducts = async (req, res) => {
    const { title, description, category, price, thumbnail, code, stock } =
      req.body;
  
    const product = {
      title,
      description,
      category,
      price,
      thumbnail,
      code,
      stock,
    };
  
    try {
      const createProduct = await addProductsService(product);
      res.status(201).json({ status: "Success", payload: createProduct });
    } catch (error) {
      res.status(406).json({ info: "Product already present in list", error });
    }
  };
  
  const getProducts = async (req, res) => {
    const limit = parseInt(req.query.limit) || 10;
    const page = parseInt(req.query.page) || 1;
  
    const query = req.query.query || undefined;
    const sort = req.query.sort || undefined;
  
    try {
      const result = await getProductsService(limit, page, query, sort);
      const products = [...result];
  
      res.send({
        status: "success",
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
      res.status(500).json({ error: "Internal server error" });
    }
  };
  
  const getProductById = async (req, res) => {
    try {
      const id = req.params.id;
      const product = await getProductByIdService(id);
      if (product) {
        res.json(product);
      } else {
        res.status(404).json({ status: "Success", payload: product });
      }
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  };
  
  const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { title, description, code, price, thumbnail, stock, category } =
      req.body;
  
    if (
      !title ||
      !description ||
      !code ||
      !price ||
      !thumbnail ||
      !stock ||
      !category
    ) {
      res.status(400).send({ error: "Missing fields" });
    }
  
    try {
      const response = await updateProductService(id, {
        title,
        description,
        code,
        price,
        thumbnail,
        stock,
        category,
      });
      res.status(200).send({ message: "Producto actualizado", response });
    } catch (error) {
      res.status(500).send(error.message);
    }
  };
  
  const deleteProduct = async (req, res) => {
    let { id } = req.params;
  
    try {
      let response = await deleteProductService(id);
      res.status(200).json({ info: "Product deleted", response });
    } catch (error) {
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