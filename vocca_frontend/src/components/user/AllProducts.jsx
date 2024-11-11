import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductDetailModal from "./SingleProduct";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filters, setFilters] = useState({
    gender: '',
    category: '',
  });

  // Base API URL - replace with your actual API base URL
  const API_URL = 'http://localhost:3000/product';

  // Fetch all products
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/allproducts`);
      setProducts(response.data.products);
      setError(null);
    } catch (err) {
      setError(err.message || 'Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  // Fetch products by gender
  const fetchProductsByGender = async (gender) => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/gender/${gender}`);
      setProducts(response.data.products);
      setError(null);
    } catch (err) {
      setError(err.message || 'Failed to fetch products by gender');
    } finally {
      setLoading(false);
    }
  };

  // Fetch products by category
  const fetchProductsByCategory = async (category) => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/category/${category}`);
      setProducts(response.data.products);
      setError(null);
    } catch (err) {
      setError(err.message || 'Failed to fetch products by category');
    } finally {
      setLoading(false);
    }
  };

  // Fetch products by both gender and category
  const fetchProductsByGenderAndCategory = async (gender, category) => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/products/gender/${gender}/category/${category}`);
      setProducts(response.data.products);
      setError(null);
    } catch (err) {
      setError(err.message || 'Failed to fetch filtered products');
    } finally {
      setLoading(false);
    }
  };

  // Handle filter changes
  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  // Effect to fetch products based on filters
  useEffect(() => {
    if (filters.gender && filters.category) {
      fetchProductsByGenderAndCategory(filters.gender, filters.category);
    } else if (filters.gender) {
      fetchProductsByGender(filters.gender);
    } else if (filters.category) {
      fetchProductsByCategory(filters.category);
    } else {
      fetchProducts();
    }
  }, [filters.gender, filters.category]);

  const toggleFavorite = (productId) => {
    setProducts(products.map(product =>
      product._id === productId
        ? { ...product, isFavorite: !product.isFavorite }
        : product
    ));
  };

  const handleQuickView = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="bg-white">
      {/* Filter Controls */}
      <div className="mx-auto max-w-2xl px-4 py-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="flex gap-4 mb-6">
          <select
            value={filters.gender}
            onChange={(e) => handleFilterChange('gender', e.target.value)}
            className="border rounded-md px-3 py-2"
          >
            <option value="">All Genders</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="unisex">Unisex</option>
          </select>

          <select
            value={filters.category}
            onChange={(e) => handleFilterChange('category', e.target.value)}
            className="border rounded-md px-3 py-2"
          >
            <option value="">All Categories</option>
            <option value="tshirts">T-Shirts</option>
            <option value="pants">Pants</option>
            <option value="shoes">Shoes</option>
            {/* Add more categories as needed */}
          </select>
        </div>
      </div>

      {/* Product Grid */}
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <div key={product._id} className="group relative">
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-100">
                <img
                  src={product.images}
                  alt={product.productName}
                  className="h-full w-full object-cover object-center transition-all duration-300 group-hover:scale-105 cursor-pointer"
                  onClick={() => handleQuickView(product)}
                />
                <div className="absolute inset-0 bg-black opacity-0 transition-opacity duration-300 group-hover:opacity-10" />

                {/* Favorite Button */}
                <button
                  onClick={() => toggleFavorite(product._id)}
                  className="absolute right-3 top-3 rounded-full bg-white p-2 opacity-0 shadow-lg transition-all duration-300 hover:scale-110 group-hover:opacity-100"
                >
                  <svg
                    className={`h-5 w-5 transition-colors duration-200 ${
                      product.isFavorite ? "text-red-500 fill-current" : "text-gray-500"
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </button>

                {/* Quick View Button */}
                <div className="absolute bottom-4 left-0 right-0 flex justify-center opacity-0 transition-all duration-300 group-hover:opacity-100">
                  <button
                    onClick={() => handleQuickView(product)}
                    className="rounded-full bg-white px-4 py-2 text-sm font-medium text-gray-900 shadow-lg transition-all duration-200 hover:bg-gray-100"
                  >
                    Quick View
                  </button>
                </div>
              </div>

              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700 transition-colors duration-200 group-hover:text-gray-900">
                    {product.productName}
                  </h3>
                  <p className="mt-1 text-lg font-medium text-gray-900">
                    ${product.price}
                    {product.offerPrice && (
                      <span className="ml-2 text-sm text-red-500 line-through">
                        ${product.offerPrice}
                      </span>
                    )}
                  </p>
                </div>
                {product.status === "trending" && (
                  <span className="inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800">
                    Trending
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Product Detail Modal */}
      {isModalOpen && selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default ProductList;