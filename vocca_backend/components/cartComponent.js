const cartModel = require("../models/cartModel");

const addToCart= async (req, res) => {
    const { userId, productId, quantity } = req.body;
    try {
      let cart = await cartModel.findOne({ userId });
      if (cart) {
        // Check if item exists in cart
        const itemIndex = cart.items.findIndex((item) => item.productId.equals(productId));
        if (itemIndex > -1) {
          // Update quantity
          cart.items[itemIndex].quantity += quantity;
        } else {
          // Add new item
          cart.items.push({ productId, quantity });
        }
      } else {
        // No cart for user, create new cart
        cart = new cartModel({ userId, items: [{ productId, quantity }] });
      }
      await cart.save();
      res.status(200).json(cart);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  const userCart= async (req, res) => {
    const { userId } = req.params;
    try {
      const cart = await cartModel.findOne({ userId }).populate('items.productId');
      res.status(200).json(cart);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  const removeItem=async (req, res) => {
    const { userId, productId } = req.body;
    try {
      let cart = await cartModel.findOne({ userId });
      if (cart) {
        cart.items = cart.items.filter((item) => !item.productId.equals(productId));
        await cart.save();
      }
      res.status(200).json(cart);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  module.exports={addToCart,userCart,removeItem}