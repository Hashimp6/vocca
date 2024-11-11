import React, { useState, useEffect } from "react";
import { Trash2, Edit2, X, Plus } from "lucide-react";
import axios from "axios";
import AddProduct from "./AddProduct"; // Import the AddProduct component

// Toast Component remains the same
const Toast = ({ message, type, onClose }) => {
  return (
    <div
      className={`fixed top-4 right-4 flex items-center justify-between p-4 mb-4 rounded-lg shadow-lg ${
        type === "success" ? "bg-green-500" : "bg-red-500"
      } text-white min-w-[300px] z-50`}
    >
      <span>{message}</span>
      <button onClick={onClose} className="ml-4 hover:text-gray-200">
        <X size={18} />
      </button>
    </div>
  );
};

// Alert Dialog Component remains the same
const AlertDialog = ({ isOpen, message, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full mx-4">
        <h3 className="text-lg font-semibold mb-4">{message}</h3>
        <div className="flex justify-end gap-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 border rounded hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

// Modified ProductCard Component
const ProductCard = ({ product, onDelete, onEdit }) => {
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);

  const handleDeleteClick = () => {
    setShowDeleteAlert(true);
  };

  const handleDeleteConfirm = () => {
    onDelete(product._id);
    setShowDeleteAlert(false);
  };

  return (
    <>
      <div className="border rounded-lg shadow-sm p-4 mb-4 bg-white">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">{product.productName}</h2>
          <div className="flex gap-2">
            <button
              onClick={handleDeleteClick}
              className="p-2 text-red-500 hover:text-red-700 rounded"
            >
              <Trash2 className="h-5 w-5" />
            </button>
            <button
              onClick={() => onEdit(product)}
              className="p-2 text-gray-500 hover:text-gray-700 rounded"
            >
              <Edit2 className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            {product.images && (
              <img
                src={product.images}
                alt={product.productName}
                className="w-full h-48 object-cover rounded-lg mb-2"
              />
            )}
            <div className="flex flex-wrap gap-2">
              <span className="px-2 py-1 bg-gray-100 text-sm rounded-full">
                {product.category}
              </span>
              <span className="px-2 py-1 bg-gray-100 text-sm rounded-full">
                {product.gender}
              </span>
              {/* <span
                className={`px-2 py-1 text-sm rounded-full ${
                  product.stock > 0 ? "bg-green-100" : "bg-red-100"
                }`}
              >
                Stock: {product.stock}
              </span> */}
              <span
                className={`px-2 py-1 text-sm rounded-full bg-red-100
              `}
              >
                Status: {product.status}
              </span>
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-sm text-gray-600">{product.description}</p>
            <div className="space-y-1">
              <div className="flex justify-between">
                <span className="font-medium">Price:</span>
                <span>${product.price}</span>
              </div>
              {product.offerPrice && (
                <div className="flex justify-between">
                  <span className="font-medium">Offer Price:</span>
                  <span className="text-green-600">${product.offerPrice}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <AlertDialog
        isOpen={showDeleteAlert}
        message="Are you sure you want to delete this product?"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setShowDeleteAlert(false)}
      />
    </>
  );
};

// Modified Main ProductList Component
const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [toast, setToast] = useState(null);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/product/allproducts"
      );
      if (response.data.success) {
        setProducts(response.data.products);
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError("Failed to fetch products");
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (productId) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/product/delete/${productId}`
      );

      if (response.data.success) {
        setProducts(products.filter((product) => product._id !== productId));
        showToast("Product deleted successfully");
      } else {
        showToast(response.data.message, "error");
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Failed to delete product";
      showToast(errorMessage, "error");
      console.error("Error deleting product:", err);
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setShowAddProduct(true);
  };

  const handleAddEditSuccess = () => {
    setShowAddProduct(false);
    setEditingProduct(null);
    fetchProducts(); // Refresh the product list
    showToast(`Product ${editingProduct ? "updated" : "added"} successfully`);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Loading products...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl text-red-500">{error}</div>
      </div>
    );
  }

  if (showAddProduct) {
    return (
      <div className="max-w-7xl mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">
            {editingProduct ? "Edit Product" : "Add New Product"}
          </h1>
          <button
            onClick={() => {
              setShowAddProduct(false);
              setEditingProduct(null);
            }}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Cancel
          </button>
        </div>
        <AddProduct
          product={editingProduct}
          onSuccess={handleAddEditSuccess}
          onCancel={() => {
            setShowAddProduct(false);
            setEditingProduct(null);
          }}
        />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4">
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Products</h1>
        <button
          onClick={() => setShowAddProduct(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center gap-2"
        >
          <Plus size={20} />
          Add New Product
        </button>
      </div>
      <div className="space-y-4">
        {products.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
