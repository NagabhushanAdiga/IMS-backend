import Sale from '../models/Sale.js';

// Generate unique sale ID
const generateSaleId = async () => {
  const count = await Sale.countDocuments();
  return `ORD-${String(count + 1001).padStart(4, '0')}`;
};

// @desc    Get all sales
// @route   GET /api/sales
// @access  Private
export const getSales = async (req, res) => {
  try {
    const { keyword, page = 1, limit = 100 } = req.query;

    const query = keyword
      ? {
          $or: [
            { saleId: { $regex: keyword, $options: 'i' } },
            { customer: { $regex: keyword, $options: 'i' } },
            { email: { $regex: keyword, $options: 'i' } }
          ]
        }
      : {};

    const sales = await Sale.find(query)
      .sort('-createdAt')
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const count = await Sale.countDocuments(query);

    res.json({
      sales,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      total: count
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single sale
// @route   GET /api/sales/:id
// @access  Private
export const getSale = async (req, res) => {
  try {
    const sale = await Sale.findById(req.params.id);
    
    if (sale) {
      res.json(sale);
    } else {
      res.status(404).json({ message: 'Sale not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create sale
// @route   POST /api/sales
// @access  Private
export const createSale = async (req, res) => {
  try {
    const { customer, email, items, total, status } = req.body;

    const saleId = await generateSaleId();

    const sale = await Sale.create({
      saleId,
      customer,
      email,
      items,
      total,
      status: status || 'Pending'
    });

    res.status(201).json(sale);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update sale
// @route   PUT /api/sales/:id
// @access  Private
export const updateSale = async (req, res) => {
  try {
    const sale = await Sale.findById(req.params.id);

    if (sale) {
      sale.status = req.body.status || sale.status;
      sale.customer = req.body.customer || sale.customer;
      sale.email = req.body.email || sale.email;
      sale.items = req.body.items !== undefined ? req.body.items : sale.items;
      sale.total = req.body.total !== undefined ? req.body.total : sale.total;

      const updatedSale = await sale.save();
      res.json(updatedSale);
    } else {
      res.status(404).json({ message: 'Sale not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete sale
// @route   DELETE /api/sales/:id
// @access  Private
export const deleteSale = async (req, res) => {
  try {
    const sale = await Sale.findById(req.params.id);

    if (sale) {
      await sale.deleteOne();
      res.json({ message: 'Sale removed' });
    } else {
      res.status(404).json({ message: 'Sale not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

