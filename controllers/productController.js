import Product from '../models/Product.js';
import Category from '../models/Category.js';

// @desc    Get all products
// @route   GET /api/products
// @access  Private
export const getProducts = async (req, res) => {
  try {
    const { keyword, page = 1, limit = 100 } = req.query;

    const query = keyword
      ? {
        name: { $regex: keyword, $options: 'i' }
      }
      : {};

    const products = await Product.find(query)
      .populate('category', 'name')
      .sort('-createdAt')
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const count = await Product.countDocuments(query);

    res.json({
      products,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      total: count
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single product
// @route   GET /api/products/:id
// @access  Private
export const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('category', 'name');

    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create product
// @route   POST /api/products
// @access  Private
export const createProduct = async (req, res) => {
  try {
    const { name, category, totalStock, sold = 0, returned = 0, price } = req.body;

    const product = await Product.create({
      name,
      category,
      totalStock,
      sold,
      returned,
      price
    });

    // Update category product count
    await Category.findByIdAndUpdate(category, { $inc: { productCount: 1 } });

    const populatedProduct = await Product.findById(product._id).populate('category', 'name');
    res.status(201).json(populatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Private
export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      const oldCategory = product.category;

      product.name = req.body.name || product.name;
      product.category = req.body.category || product.category;
      product.totalStock = req.body.totalStock !== undefined ? req.body.totalStock : product.totalStock;
      product.sold = req.body.sold !== undefined ? req.body.sold : product.sold;
      product.returned = req.body.returned !== undefined ? req.body.returned : product.returned;
      product.price = req.body.price !== undefined ? req.body.price : product.price;

      const updatedProduct = await product.save();

      // Update category counts if category changed
      if (oldCategory.toString() !== product.category.toString()) {
        await Category.findByIdAndUpdate(oldCategory, { $inc: { productCount: -1 } });
        await Category.findByIdAndUpdate(product.category, { $inc: { productCount: 1 } });
      }

      const populatedProduct = await Product.findById(updatedProduct._id).populate('category', 'name');
      res.json(populatedProduct);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  Private
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      await Category.findByIdAndUpdate(product.category, { $inc: { productCount: -1 } });
      await product.deleteOne();
      res.json({ message: 'Product removed' });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Search products by date range and filters
// @route   GET /api/products/search
// @access  Private
export const searchProducts = async (req, res) => {
  try {
    const {
      startDate,
      endDate,
      filter, // 'sold', 'returned', 'inStock', or 'all'
      keyword,
      page = 1,
      limit = 100
    } = req.query;

    // Build date query
    let dateQuery = {};
    if (startDate || endDate) {
      dateQuery.createdAt = {};
      if (startDate) {
        dateQuery.createdAt.$gte = new Date(startDate);
      }
      if (endDate) {
        dateQuery.createdAt.$lte = new Date(endDate);
      }
    }

    // Build filter query based on filter type
    let filterQuery = {};
    switch (filter) {
      case 'sold':
        filterQuery.sold = { $gt: 0 };
        break;
      case 'returned':
        filterQuery.returned = { $gt: 0 };
        break;
      case 'inStock':
        filterQuery.stock = { $gt: 0 };
        break;
      case 'outOfStock':
        filterQuery.stock = { $eq: 0 };
        break;
      case 'lowStock':
        filterQuery.status = 'Low Stock';
        break;
      default:
        // 'all' or no filter - no additional filter query
        break;
    }

    // Build keyword search query
    let keywordQuery = {};
    if (keyword) {
      keywordQuery.name = { $regex: keyword, $options: 'i' };
    }

    // Combine all queries
    const query = { ...dateQuery, ...filterQuery, ...keywordQuery };

    const products = await Product.find(query)
      .populate('category', 'name')
      .sort('-createdAt')
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const count = await Product.countDocuments(query);

    // Calculate summary statistics for the filtered results
    const allFilteredProducts = await Product.find(query);
    const totalStockAdded = allFilteredProducts.reduce((sum, p) => sum + p.totalStock, 0);
    const totalSold = allFilteredProducts.reduce((sum, p) => sum + p.sold, 0);
    const totalReturned = allFilteredProducts.reduce((sum, p) => sum + p.returned, 0);
    const totalInStock = allFilteredProducts.reduce((sum, p) => sum + p.stock, 0);

    res.json({
      products,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      total: count,
      summary: {
        totalStockAdded,
        totalSold,
        totalReturned,
        totalInStock,
        dateRange: {
          startDate: startDate || null,
          endDate: endDate || null
        },
        appliedFilter: filter || 'all'
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get product statistics
// @route   GET /api/products/stats
// @access  Private
export const getProductStats = async (req, res) => {
  try {
    const products = await Product.find();

    const totalStockAdded = products.reduce((sum, p) => sum + p.totalStock, 0);
    const totalSold = products.reduce((sum, p) => sum + p.sold, 0);
    const totalReturned = products.reduce((sum, p) => sum + p.returned, 0);
    const totalRemaining = products.reduce((sum, p) => sum + p.stock, 0);
    const lowStockCount = products.filter(p => p.status === 'Low Stock').length;
    const outOfStockCount = products.filter(p => p.status === 'Out of Stock').length;

    res.json({
      totalStockAdded,
      totalSold,
      totalReturned,
      totalRemaining,
      lowStockCount,
      outOfStockCount,
      totalProducts: products.length
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

