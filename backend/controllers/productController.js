import Product from '../models/Product.js';

/**
 * @desc    Get all products with search, filters, and pagination
 * @route   GET /api/products
 * @access  Public
 */
export const getProducts = async (req, res) => {
  try {
    const {
      search,
      category,
      brand,
      minPrice,
      maxPrice,
      inStock,
      minRating,
      page = 1,
      limit = 12,
      sort = '-createdAt', // Default: newest first
    } = req.query;

    // Build query object
    const query = {};

    // Text search (case-insensitive)
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { category: { $regex: search, $options: 'i' } },
        { brand: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    // Category filter
    if (category) {
      query.category = category;
    }

    // Brand filter
    if (brand) {
      query.brand = brand;
    }

    // Price range
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = parseFloat(minPrice);
      if (maxPrice) query.price.$lte = parseFloat(maxPrice);
    }

    // Stock availability
    if (inStock === 'true') {
      query.stock = { $gt: 0 };
    } else if (inStock === 'false') {
      query.stock = 0;
    }

    // Rating filter
    if (minRating) {
      query.rating = { $gte: parseFloat(minRating) };
    }

    // Pagination
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    // Execute query with pagination
    const products = await Product.find(query)
      .sort(sort)
      .skip(skip)
      .limit(limitNum)
      .lean(); // Use lean() for better performance

    // Get total count for pagination
    const total = await Product.countDocuments(query);

    // Ensure images array exists (backward compatibility)
    const productsWithImages = products.map((product) => ({
      ...product,
      images: product.images && product.images.length > 0 
        ? product.images 
        : product.image 
          ? [product.image] 
          : [],
      image: product.images?.[0] || product.image || '',
    }));

    res.json({
      products: productsWithImages,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        pages: Math.ceil(total / limitNum),
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc    Get single product
 * @route   GET /api/products/:id
 * @access  Public
 */
export const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(product);
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc    Create new product
 * @route   POST /api/products
 * @access  Private/Admin
 */
export const createProduct = async (req, res) => {
  try {
    const { name, description, price, category, images, image, brand, stock, rating } = req.body;

    // Validation
    if (!name || !description || !price || !category || stock === undefined) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    // Handle images array or single image (backward compatibility)
    const productImages = images && images.length > 0 
      ? images 
      : image 
        ? [image] 
        : [];

    if (productImages.length === 0) {
      return res.status(400).json({ message: 'At least one image is required' });
    }

    const product = await Product.create({
      name,
      description,
      price,
      category,
      brand: brand || '',
      images: productImages,
      image: productImages[0], // Keep for backward compatibility
      stock,
      rating: rating || 0,
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc    Update product
 * @route   PUT /api/products/:id
 * @access  Private/Admin
 */
export const updateProduct = async (req, res) => {
  try {
    const { name, description, price, category, images, image, brand, stock, rating } = req.body;

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Update fields
    if (name !== undefined) product.name = name;
    if (description !== undefined) product.description = description;
    if (price !== undefined) product.price = price;
    if (category !== undefined) product.category = category;
    if (brand !== undefined) product.brand = brand;
    if (stock !== undefined) product.stock = stock;
    if (rating !== undefined) product.rating = rating;

    // Handle images
    if (images && images.length > 0) {
      product.images = images;
      product.image = images[0]; // Keep for backward compatibility
    } else if (image) {
      product.images = [image];
      product.image = image;
    }

    const updatedProduct = await product.save();

    res.json(updatedProduct);
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc    Get filter options (categories, brands, price range)
 * @route   GET /api/products/filters
 * @access  Public
 */
export const getFilterOptions = async (req, res) => {
  try {
    // Get distinct categories
    const categories = await Product.distinct('category');
    
    // Get distinct brands (filter out null/empty)
    const brands = await Product.distinct('brand').then(brands => 
      brands.filter(brand => brand && brand.trim() !== '')
    );

    // Get price range
    const priceStats = await Product.aggregate([
      {
        $group: {
          _id: null,
          minPrice: { $min: '$price' },
          maxPrice: { $max: '$price' },
        },
      },
    ]);

    res.json({
      categories: categories.sort(),
      brands: brands.sort(),
      priceRange: priceStats[0] || { minPrice: 0, maxPrice: 0 },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc    Delete product
 * @route   DELETE /api/products/:id
 * @access  Private/Admin
 */
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    await product.deleteOne();

    res.json({ message: 'Product removed' });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(500).json({ message: error.message });
  }
};

