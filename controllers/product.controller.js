import { Op } from 'sequelize';
import Product from '../models/product.model.js';
import Category from '../models/category.model.js';
import cloudinary from '../config/cloudinary.js';

export const createProduct = async (req, res) => {
  try {
    const { name, description, price, stock, categoryId } = req.body;
    const image = req.file;

    let imageUrl = '';
    if (image) {
      const result = await cloudinary.uploader.upload(image.path);
      imageUrl = result.secure_url;
    }

    const product = await Product.create({
      name,
      description,
      price,
      stock,
      categoryId,
      imageUrl
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error creating product', error: error.message });
  }
};

export const getProducts = async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 10, 
      minPrice, 
      maxPrice, 
      category, 
      search 
    } = req.query;

    const where = {};
    
    if (minPrice || maxPrice) {
      where.price = {};
      if (minPrice) where.price[Op.gte] = minPrice;
      if (maxPrice) where.price[Op.lte] = maxPrice;
    }

    if (category) {
      where.categoryId = category;
    }

    if (search) {
      where.name = { [Op.iLike]: `%${search}%` };
    }

    const products = await Product.findAndCountAll({
      where,
      include: [Category],
      limit: parseInt(limit),
      offset: (page - 1) * limit,
      order: [['createdAt', 'DESC']]
    });

    res.json({
      products: products.rows,
      totalPages: Math.ceil(products.count / limit),
      currentPage: parseInt(page)
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, stock, categoryId } = req.body;
    const image = req.file;

    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    if (image) {
      const result = await cloudinary.uploader.upload(image.path);
      product.imageUrl = result.secure_url;
    }

    Object.assign(product, {
      name: name || product.name,
      description: description || product.description,
      price: price || product.price,
      stock: stock || product.stock,
      categoryId: categoryId || product.categoryId
    });

    await product.save();
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error updating product', error: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    await product.destroy();
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting product', error: error.message });
  }
};