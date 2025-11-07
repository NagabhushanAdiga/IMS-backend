import mongoose from 'mongoose';

const saleSchema = new mongoose.Schema({
  saleId: {
    type: String,
    required: true,
    unique: true
  },
  customer: {
    type: String,
    required: [true, 'Please add customer name'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Please add customer email'],
    trim: true,
    lowercase: true
  },
  items: {
    type: Number,
    required: true,
    min: 1
  },
  total: {
    type: Number,
    required: true,
    min: 0
  },
  status: {
    type: String,
    enum: ['Pending', 'Processing', 'Shipped', 'Completed', 'Cancelled'],
    default: 'Pending'
  },
  date: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

export default mongoose.model('Sale', saleSchema);

