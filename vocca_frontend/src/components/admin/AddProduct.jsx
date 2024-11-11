import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import axios from "axios";

const AddProduct = ({ product, onSuccess, onCancel }) => {
  const categories = ["Shirts", "Pants", "Hoodie", "T-shirt"];
  const genderOptions = ["male", "female", "unisex"];
  const statusOptions = ["normal", "trending", "new_arrival"];
  const sizeOptions = ["XS", "S", "M", "L", "XL", "XXL"];

  const initialFormState = {
    productName: "",
    category: "",
    description: "",
    price: "",
    offerPrice: "",
    gender: "",
    sizes: sizeOptions.map((size) => ({ size, quantity: "" })),
    status: "normal",
    images: [],
  };

  const [formData, setFormData] = useState(initialFormState);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [validationErrors, setValidationErrors] = useState({});
  const [existingImages, setExistingImages] = useState([]);

  const isEditMode = !!product;

  useEffect(() => {
    if (product) {
      const existingSizes = sizeOptions.map((size) => {
        const existingSize = product.sizes?.find((s) => s.size === size);
        return {
          size,
          quantity: existingSize ? existingSize.quantity : "",
        };
      });

      setFormData({
        productName: product.productName || "",
        category: product.category || "",
        description: product.description || "",
        price: product.price || "",
        offerPrice: product.offerPrice || "",
        gender: product.gender || "",
        sizes: existingSizes,
        status: product.status || "normal",
        images: [],
      });

      if (product.images) {
        const images = Array.isArray(product.images)
          ? product.images
          : [product.images];
        setExistingImages(images);
        setImagePreviews(images);
      }
    }
  }, [product]);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setValidationErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSizeChange = (size, value) => {
    setFormData((prev) => ({
      ...prev,
      sizes: prev.sizes.map((s) =>
        s.size === size ? { ...s, quantity: value } : s
      ),
    }));
    setValidationErrors((prev) => ({ ...prev, sizes: "" }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const maxSize = 5 * 1024 * 1024; // 5MB

    const validFiles = files.filter((file) => {
      if (file.size > maxSize) {
        showToast(`File ${file.name} is too large. Max size is 5MB`, "error");
        return false;
      }
      if (!file.type.startsWith("image/")) {
        showToast(`File ${file.name} is not an image`, "error");
        return false;
      }
      return true;
    });

    setFormData((prev) => ({
      ...prev,
      images: validFiles,
    }));

    const previewUrls = validFiles.map((file) => URL.createObjectURL(file));
    setImagePreviews(
      isEditMode ? [...existingImages, ...previewUrls] : previewUrls
    );
    setValidationErrors((prev) => ({ ...prev, images: "" }));
  };

  const removeImage = (index) => {
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));

    if (index >= existingImages.length) {
      const newIndex = index - existingImages.length;
      setFormData((prev) => ({
        ...prev,
        images: Array.from(prev.images).filter((_, i) => i !== newIndex),
      }));
    } else {
      setExistingImages((prev) => prev.filter((_, i) => i !== index));
    }
  };

  const validateForm = () => {
    const errors = {};
    const requiredFields = {
      productName: "Product name is required",
      category: "Category is required",
      description: "Description is required",
      price: "Price is required",
      gender: "Gender is required",
    };

    Object.entries(requiredFields).forEach(([field, message]) => {
      if (!formData[field]) errors[field] = message;
    });

    // Validate sizes
    const hasValidSizes = formData.sizes.some(
      (size) => size.quantity !== "" && parseInt(size.quantity) > 0
    );

    if (!hasValidSizes) {
      errors.sizes = "At least one size must have a valid quantity";
    }

    formData.sizes.forEach((size) => {
      if (
        size.quantity &&
        (isNaN(parseInt(size.quantity)) || parseInt(size.quantity) < 0)
      ) {
        errors.sizes = "All quantities must be valid non-negative numbers";
      }
    });

    if (
      !isEditMode &&
      formData.images.length === 0 &&
      existingImages.length === 0
    ) {
      errors.images = "At least one image is required";
    }

    if (
      formData.price &&
      (isNaN(parseFloat(formData.price)) || parseFloat(formData.price) <= 0)
    ) {
      errors.price = "Price must be a valid positive number";
    }

    if (
      formData.offerPrice &&
      (isNaN(parseFloat(formData.offerPrice)) ||
        parseFloat(formData.offerPrice) <= 0)
    ) {
      errors.offerPrice = "Offer price must be a valid positive number";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      showToast("Please fill in all required fields correctly", "error");
      return;
    }

    setLoading(true);

    try {
      const imageData = [...existingImages];

      if (formData.images.length > 0) {
        const imagePromises = formData.images.map((image) => {
          return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => resolve(e.target.result);
            reader.onerror = (e) => reject(e);
            reader.readAsDataURL(image);
          });
        });
        const newImages = await Promise.all(imagePromises);
        imageData.push(...newImages);
      }

      // Filter out sizes with empty quantities
      const validSizes = formData.sizes.filter(
        (size) => size.quantity !== "" && parseInt(size.quantity) >= 0
      );

      const productData = {
        ...formData,
        sizes: validSizes,
        images: imageData,
      };

      let response;

      if (isEditMode) {
        response = await axios.put(
          `http://localhost:3000/product/update/${product._id}`,
          productData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      } else {
        response = await axios.post(
          "http://localhost:3000/product/addproduct",
          productData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      }

      if (response.data) {
        showToast(`Product ${isEditMode ? "updated" : "added"} successfully`);
        if (typeof onSuccess === "function") {
          onSuccess(response.data);
        }
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      showToast(
        errorMessage || `Error ${isEditMode ? "updating" : "adding"} product`,
        "error"
      );
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const renderField = (name, label, type = "text", options = null) => {
    const baseClasses = `w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 ${
      validationErrors[name] ? "border-red-500" : "border-gray-300"
    }`;

    return (
      <div>
        <label className="block text-sm font-medium mb-2">
          {label}
          {label !== "Offer Price" && "*"}
        </label>
        {options ? (
          <select
            name={name}
            value={formData[name]}
            onChange={handleChange}
            className={baseClasses}
          >
            <option value="">Select {label}</option>
            {options.map((option) => (
              <option key={option} value={option}>
                {option.charAt(0).toUpperCase() +
                  option.slice(1).replace("_", " ")}
              </option>
            ))}
          </select>
        ) : (
          <input
            type={type}
            name={name}
            value={formData[name]}
            onChange={handleChange}
            className={baseClasses}
          />
        )}
        {validationErrors[name] && (
          <p className="text-red-500 text-sm mt-1">{validationErrors[name]}</p>
        )}
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow">
      {toast && (
        <div
          className={`fixed top-4 right-4 flex items-center justify-between p-4 mb-4 rounded-lg shadow-lg ${
            toast.type === "success" ? "bg-green-500" : "bg-red-500"
          } text-white min-w-[300px] z-50`}
        >
          <span>{toast.message}</span>
          <button
            onClick={() => setToast(null)}
            className="ml-4 hover:text-gray-200"
          >
            <X size={18} />
          </button>
        </div>
      )}

      <div className="p-6">
        <h2 className="text-2xl font-bold mb-6">
          {isEditMode ? "Edit Product" : "Add New Product"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {renderField("productName", "Product Name")}
            {renderField("category", "Category", null, categories)}
            {renderField("price", "Price", "number")}
            {renderField("offerPrice", "Offer Price", "number")}
            {renderField("gender", "Gender", null, genderOptions)}
            {renderField("status", "Status", null, statusOptions)}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Stock by Size*
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
              {formData.sizes.map((sizeData) => (
                <div key={sizeData.size}>
                  <label className="block text-sm font-medium mb-1">
                    {sizeData.size}
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={sizeData.quantity}
                    onChange={(e) =>
                      handleSizeChange(sizeData.size, e.target.value)
                    }
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 border-gray-300"
                    placeholder="Qty"
                  />
                </div>
              ))}
            </div>
            {validationErrors.sizes && (
              <p className="text-red-500 text-sm mt-1">
                {validationErrors.sizes}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Images*</label>
            <input
              type="file"
              name="images"
              onChange={handleImageChange}
              multiple
              accept="image/*"
              className={`w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 ${
                validationErrors.images ? "border-red-500" : "border-gray-300"
              }`}
            />
            {validationErrors.images && (
              <p className="text-red-500 text-sm mt-1">
                {validationErrors.images}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Description*
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className={`w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 ${
                validationErrors.description
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            />
            {validationErrors.description && (
              <p className="text-red-500 text-sm mt-1">
                {validationErrors.description}
              </p>
            )}
          </div>

          {imagePreviews.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {imagePreviews.map((preview, index) => (
                <div key={index} className="relative group">
                  <img
                    src={preview}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-32 object-cover rounded"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-2 border rounded hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className={`px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading
                ? `${isEditMode ? "Updating" : "Adding"} Product...`
                : isEditMode
                ? "Update Product"
                : "Add Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

AddProduct.propTypes;
export default AddProduct;
