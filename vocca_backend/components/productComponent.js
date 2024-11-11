const Product = require("../models/productSchema");
const addProduct = async (req, res) => {
  try {
    const {
      productName,
      category,
      description,
      price,
      offerPrice,
      gender,
      sizes, 
      images,
      status,
    } = req.body;

    // Convert images array to string if present
    const imageData = images?.length > 0 ? images : [];

    // Validate required fields
    if (
      !productName ||
      !description ||
      !price ||
      !category ||
      !gender ||
      !sizes ||
      !Array.isArray(sizes)
    ) {
      return res
        .status(400)
        .json({ message: "Please fill all required fields." });
    }

    


    const newProduct = new Product({
      productName,
      description,
      price,
      offerPrice,
      images: imageData,
      category,
      sizes,  
      gender,
      status: status || "normal",
    });

    const savedProduct = await newProduct.save();
    res.status(201).json({
      success: true,
      message: "Product added successfully",
      product: savedProduct,
    });
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      message: "Products fetched successfully",
      products,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};



// const getAllProducts = async (req, res) => {
//   try {
//     const { gender, category, minPrice, maxPrice, sort, search } = req.query;
    
//     // Build filter object
//     const filter = {};
    
//     // Add gender filter if provided
//     if (gender) {
//       filter.gender = gender.toLowerCase();
//     }
    
//     // Add category filter if provided
//     if (category) {
//       filter.category = category.toLowerCase();
//     }
    
//     // Add price range filter if provided
//     if (minPrice || maxPrice) {
//       filter.price = {};
//       if (minPrice) filter.price.$gte = Number(minPrice);
//       if (maxPrice) filter.price.$lte = Number(maxPrice);
//     }
    
//     // Add search functionality
//     if (search) {
//       filter.$or = [
//         { name: { $regex: search, $options: 'i' } },
//         { description: { $regex: search, $options: 'i' } }
//       ];
//     }
    
//     // Build sort object
//     let sortOptions = {};
//     if (sort) {
//       switch (sort) {
//         case 'price_high':
//           sortOptions = { price: -1 };
//           break;
//         case 'price_low':
//           sortOptions = { price: 1 };
//           break;
//         case 'newest':
//           sortOptions = { createdAt: -1 };
//           break;
//         case 'oldest':
//           sortOptions = { createdAt: 1 };
//           break;
//         default:
//           sortOptions = { createdAt: -1 };
//       }
//     }

//     // Get total count for pagination
//     const total = await Product.countDocuments(filter);
    
//     // Pagination
//     const page = parseInt(req.query.page) || 1;
//     const limit = parseInt(req.query.limit) || 10;
//     const skip = (page - 1) * limit;

//     // Execute query with all filters
//     const products = await Product.find(filter)
//       .sort(sortOptions)
//       .skip(skip)
//       .limit(limit);

//     // Return response
//     res.status(200).json({
//       success: true,
//       message: "Products fetched successfully",
//       products,
//       pagination: {
//         total,
//         page,
//         pages: Math.ceil(total / limit),
//         limit
//       }
//     });

//   } catch (error) {
//     res.status(500).json({ 
//       success: false,
//       message: "Failed to fetch products", 
//       error: error.message 
//     });
//   }
// };

// Get products by specific gender
const getProductsByGender = async (req, res) => {
  try {
    const { gender } = req.params;
    
    const products = await Product.find({ 
      gender: gender.toLowerCase() 
    });

    res.status(200).json({
      success: true,
      message: `${gender}'s products fetched successfully`,
      products
    });

  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: "Failed to fetch products by gender", 
      error: error.message 
    });
  }
};

// Get products by category
const getProductsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    
    const products = await Product.find({ 
      category: category.toLowerCase() 
    });

    res.status(200).json({
      success: true,
      message: `Products in category ${category} fetched successfully`,
      products
    });

  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: "Failed to fetch products by category", 
      error: error.message 
    });
  }
};

// Get products by both gender and category
const getProductsByGenderAndCategory = async (req, res) => {
  try {
    const { gender, category } = req.params;
    
    const products = await Product.find({ 
      gender: gender.toLowerCase(),
      category: category.toLowerCase()
    });

    res.status(200).json({
      success: true,
      message: `${gender}'s ${category} fetched successfully`,
      products
    });

  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: "Failed to fetch products by gender and category", 
      error: error.message 
    });
  }
};



const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
      deletedProduct: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

const editProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const {
      productName,
      description,
      price,
      offerPrice,
      images,
      category,
      sizes,
      gender,
      status,
    } = req.body;

    // Convert images array to string if present
    const imageData = images?.length > 0 ? images : [];

    // Validate required fields
    if (
      !productName ||
      !description ||
      !price ||
      !category ||
      !gender ||
      !sizes ||
      !Array.isArray(sizes)
    ) {
      return res
        .status(400)
        .json({ message: "Please fill all required fields." });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      {
        productName,
        description,
        price,
        offerPrice,
        category,
        images: imageData,
        sizes,
        gender,
        status,
      },
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found." });
    }

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
module.exports = { addProduct, editProduct, getAllProducts,getProductsByGender,getProductsByCategory,getProductsByGenderAndCategory, deleteProduct };
