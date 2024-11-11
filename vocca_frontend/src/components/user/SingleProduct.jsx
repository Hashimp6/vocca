import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/cartSlice"; // Update path according to your project structure

const ProductDetailModal = ({ product, onClose }) => {
  const dispatch = useDispatch();
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const { items, totalQuantity, totalAmount } = useSelector((state) => state.cart);
  console.log('items are',items, totalQuantity, totalAmount);

  // Check if size is in stock
  const isSizeInStock = (size) => {
    const sizeInfo = product?.sizes?.find((s) => s.size === size);
    return sizeInfo?.quantity > 0;
  };

  // Get available quantity for selected size
  const getAvailableQuantity = () => {
    const sizeInfo = product?.sizes?.find((s) => s.size === selectedSize);
    return sizeInfo?.quantity || 0;
  };

  // Handle add to cart
  const handleAddToCart = () => {
    const cartItem = {
      _id: product._id,
      productName: product.productName,
      price: product.offerPrice || product.price,
      selectedSize: selectedSize,
      image: product.images[0],
      quantity: quantity,
    };

    dispatch(addToCart(cartItem));
    console.log("cart item is ",cartItem);
    onClose(); // Close modal after adding to cart
  };

  if (!product) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="relative">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 z-10"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="aspect-w-1 aspect-h-1 w-full">
                <img
                  src={product.images[selectedImage]}
                  alt={product.productName}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-w-1 aspect-h-1 rounded-md overflow-hidden ${
                      selectedImage === index ? "ring-2 ring-blue-500" : ""
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.productName} view ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              {/* Status Badge */}
              {product.status !== "normal" && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium capitalize bg-blue-100 text-blue-800">
                  {product.status.replace("_", " ")}
                </span>
              )}

              {/* Basic Info */}
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {product.productName}
                </h1>
                <p className="mt-2 text-gray-500">
                  {product.category} • {product.gender}
                </p>
              </div>

              {/* Pricing */}
              <div className="flex items-baseline space-x-3">
                {product.offerPrice ? (
                  <>
                    <p className="text-2xl font-bold text-gray-900">
                      ₹{product.offerPrice}
                    </p>
                    <p className="text-lg text-gray-500 line-through">
                      ₹{product.price}
                    </p>
                  </>
                ) : (
                  <p className="text-2xl font-bold text-gray-900">
                    ₹{product.price}
                  </p>
                )}
              </div>

              {/* Ratings */}
              <div className="flex items-center space-x-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, index) => (
                    <svg
                      key={index}
                      className={`w-5 h-5 ${
                        index < product.ratings
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-sm text-gray-600">
                  ({product.numOfReviews} reviews)
                </p>
              </div>

              {/* Description */}
              <p className="text-gray-700 leading-relaxed">
                {product.description}
              </p>

              {/* Size Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Size
                </label>
                <div className="grid grid-cols-6 gap-2">
                  {product.sizes.map(({ size, quantity }) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      disabled={quantity === 0}
                      className={`
                        px-4 py-2 text-sm font-medium rounded-md
                        ${
                          selectedSize === size
                            ? "bg-gray-900 text-white"
                            : quantity === 0
                            ? "bg-gray-100 text-gray-300 cursor-not-allowed"
                            : "bg-gray-100 text-gray-900 hover:bg-gray-200"
                        }
                      `}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity Selection */}
              {/* {selectedSize && (
                <div className="flex items-center space-x-3">
                  <label className="text-sm font-medium text-gray-700">
                    Quantity:
                  </label>
                  <select
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className="rounded-md border-gray-300 py-1.5 text-base focus:border-blue-500 focus:ring-blue-500"
                  >
                    {[...Array(Math.min(getAvailableQuantity(), 5))].map(
                      (_, i) => (
                        <option key={i + 1} value={i + 1}>
                          {i + 1}
                        </option>
                      )
                    )}
                  </select>
                </div>
              )} */}

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                disabled={!selectedSize || getAvailableQuantity() === 0}
                className={`
                  w-full py-3 px-8 rounded-md text-sm font-medium text-white
                  ${
                    selectedSize && getAvailableQuantity() > 0
                      ? "bg-blue-600 hover:bg-blue-700"
                      : "bg-gray-400 cursor-not-allowed"
                  }
                `}
              >
                {!selectedSize
                  ? "Select a Size"
                  : getAvailableQuantity() === 0
                  ? "Out of Stock"
                  : "Add to Cart"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailModal;