import Return from '../models/Return.js';
import Product from '../models/Product.js';

// @desc    Get all returns
// @route   GET /api/returns
// @access  Private
export const getReturns = async (req, res) => {
  try {
    const { keyword, page = 1, limit = 100 } = req.query;

    const query = keyword
      ? {
          $or: [
            { name: { $regex: keyword, $options: 'i' } },
            { sku: { $regex: keyword, $options: 'i' } }
          ]
        }
      : {};

    const returns = await Return.find(query)
      .sort('-createdAt')
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const count = await Return.countDocuments(query);

    res.json({
      returns,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      total: count
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create return (when updating product returns)
// @route   POST /api/returns
// @access  Private
export const createReturn = async (req, res) => {
  try {
    const { productId, name, sku, category, returned, price } = req.body;

    const returnItem = await Return.create({
      product: productId,
      name,
      sku,
      category,
      returned,
      price,
      totalValue: returned * price
    });

    res.status(201).json(returnItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get return statistics
// @route   GET /api/returns/stats
// @access  Private
export const getReturnStats = async (req, res) => {
  try {
    const returns = await Return.find();
    
    const totalReturned = returns.reduce((sum, r) => sum + r.returned, 0);
    const totalValue = returns.reduce((sum, r) => sum + r.totalValue, 0);

    res.json({
      totalReturned,
      totalValue,
      totalReturnRecords: returns.length
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

