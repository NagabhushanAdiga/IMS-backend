import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a product name'],
    trim: true
  },
  sku: {
    type: String,
    trim: true,
    uppercase: true,
    sparse: true,  // Allows multiple null/undefined values, but unique non-null values
    unique: true   // Unique only when value exists
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: [true, 'Please add a category']
  },
  totalStock: {
    type: Number,
    required: [true, 'Please add total stock'],
    min: 0,
    default: 0
  },
  sold: {
    type: Number,
    default: 0,
    min: 0
  },
  returned: {
    type: Number,
    default: 0,
    min: 0
  },
  stock: {
    type: Number,
    default: 0,
    min: 0
  },
  price: {
    type: Number,
    min: 0
  },
  status: {
    type: String,
    enum: ['In Stock', 'Low Stock', 'Out of Stock'],
    default: 'In Stock'
  }
}, {
  timestamps: true
});

// Calculate stock and status before saving
productSchema.pre('save', function (next) {
  this.stock = this.totalStock - this.sold + this.returned;

  if (this.stock === 0) {
    this.status = 'Out of Stock';
  } else if (this.stock < 10) {
    this.status = 'Low Stock';
  } else {
    this.status = 'In Stock';
  }
  next();
});

export default mongoose.model('Product', productSchema);

