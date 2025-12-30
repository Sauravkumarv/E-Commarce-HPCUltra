import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
      index: true, // Index for search
    },
    description: {
      type: String,
      required: [true, 'Product description is required'],
    },
    price: {
      type: Number,
      required: [true, 'Product price is required'],
      min: [0, 'Price must be positive'],
      index: true, // Index for price range filtering
    },
    category: {
      type: String,
      required: [true, 'Product category is required'],
      trim: true,
      index: true, // Index for category filtering
    },
    brand: {
      type: String,
      trim: true,
      default:"HPC Ultra",
      index: true, // Index for brand filtering
    },
    images: {
      type: [String],
      default: [],
      validate: {
        validator: function (v) {
          return v.length > 0;
        },
        message: 'At least one image is required',
      },
    },
    // Keep image for backward compatibility (will use first image from images array)
    image: {
      type: String,
    },
    stock: {
      type: Number,
      required: [true, 'Stock quantity is required'],
      min: [0, 'Stock cannot be negative'],
      default: 0,
    },
    rating: {
      type: Number,
      min: [0, 'Rating must be between 0 and 5'],
      max: [5, 'Rating must be between 0 and 5'],
      default: 0,
    },
    numReviews: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Compound indexes for common query patterns
productSchema.index({ name: 'text', category: 'text', brand: 'text' }); // Text search index
productSchema.index({ category: 1, price: 1 }); // Category and price sorting
productSchema.index({ brand: 1, price: 1 }); // Brand and price sorting
productSchema.index({ stock: 1 }); // Stock availability filtering

const Product = mongoose.model('Product', productSchema);

export default Product;

