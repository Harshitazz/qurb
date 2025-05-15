import mongoose from 'mongoose';

const CartSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  items: [
    {
      productId: {
        type: Number,
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
      image: {
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
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Cart || mongoose.model('Cart', CartSchema);