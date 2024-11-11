const express = require("express");
const {
  addToCart,
  userCart,
  removeItem,
} = require("../components/cartComponent");
const cartRouter = express.Router();

cartRouter.post("/add", addToCart);
cartRouter.get("/:userId", userCart);
cartRouter.post("/remove", removeItem);

module.exports = cartRouter;
