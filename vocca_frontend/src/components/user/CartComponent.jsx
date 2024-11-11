import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart, updateQuantity } from '../../redux/cartSlice';

const CartComponent = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.items);
  console.log("cart itemsss areee",cart);

  const handleQuantityChange = (item, newQuantity) => {
    dispatch(updateQuantity({ id: item._id, quantity: newQuantity }));
  };

  const handleRemoveItem = (item) => {
    dispatch(removeFromCart(item));
  };

  const calculateTotals = () => {
    const subTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    const gst = subTotal * 0.1;
    const postage = 5;
    const offer = 10;
    const total = subTotal + gst + postage - offer;

    return { subTotal, gst, postage, offer, total };
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4">Cart</h2>
      {cart.map((item) => (
        <div key={item._id} className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <img src={item.image} alt={item.productName} className="w-16 h-16 object-cover rounded-md mr-4" />
            <div>
              <h3 className="text-lg font-medium">{item.productName}</h3>
              <p className="text-gray-500">Price: ${item.price}</p>
            </div>
          </div>
          <div className="flex items-center">
            <button
              className="bg-red-500 text-white px-2 py-1 rounded-md mr-2"
              onClick={() => handleQuantityChange(item, item.quantity - 1)}
            >
              -
            </button>
            <span className="text-gray-700">{item.quantity}</span>
            <button
              className="bg-green-500 text-white px-2 py-1 rounded-md ml-2"
              onClick={() => handleQuantityChange(item, item.quantity + 1)}
            >
              +
            </button>
            <button
              className="bg-gray-200 text-gray-700 px-2 py-1 rounded-md ml-4"
              onClick={() => handleRemoveItem(item)}
            >
              Remove
            </button>
          </div>
        </div>
      ))}

      <div className="bg-gray-100 rounded-lg p-4 mt-4">
        <h3 className="text-xl font-bold mb-2">Order Totals</h3>
        <div className="flex justify-between mb-2">
          <p>Subtotal:</p>
          <p>${calculateTotals().subTotal.toFixed(2)}</p>
        </div>
        <div className="flex justify-between mb-2">
          <p>GST:</p>
          <p>${calculateTotals().gst.toFixed(2)}</p>
        </div>
        <div className="flex justify-between mb-2">
          <p>Postage:</p>
          <p>${calculateTotals().postage.toFixed(2)}</p>
        </div>
        <div className="flex justify-between mb-2">
          <p>Offer:</p>
          <p>-${calculateTotals().offer.toFixed(2)}</p>
        </div>
        <div className="flex justify-between font-bold">
          <p>Total:</p>
          <p>${calculateTotals().total.toFixed(2)}</p>
        </div>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4 w-full">Checkout</button>
      </div>
    </div>
  );
};

export default CartComponent;