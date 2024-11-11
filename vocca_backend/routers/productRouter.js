const express = require("express");
const { addProduct, editProduct, getAllProducts, deleteProduct, getProductsByGender, getProductsByCategory, getProductsByGenderAndCategory } = require("../components/productComponent");
const productRouter = express.Router();

productRouter.post("/addproduct",addProduct );
productRouter.put('/update/:id', editProduct);
productRouter.get('/allproducts', getAllProducts);
productRouter.get('/gender/:gender', getProductsByGender);
productRouter.get('/category/:category', getProductsByCategory);
productRouter.get('/products/gender/:gender/category/:category', getProductsByGenderAndCategory);
productRouter.delete('/delete/:id', deleteProduct);

module.exports = productRouter;