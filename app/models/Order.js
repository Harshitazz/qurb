import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  items: [
    {
      productId: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      price: {
        type: String,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        min: 1,
      },
      isOffer: {
        type: Boolean,
        default: false,
      },
      offerType: {
        type: String,
        enum: ['buy6get1', 'buy3get1coffee', 'none'],
        default: 'none',
      },
    },
  ],
  subtotal: {
    type: Number,
    required: true,
  },
  discount: {
    type: Number,
    required: true,
    default: 0,
  },
  total: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Order || mongoose.model('Order', OrderSchema);