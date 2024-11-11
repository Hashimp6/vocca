const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  productName: {
    type: String,},
  description: {
    type: String,
  },
  price: {
    type: Number,
  },
  offerPrice: {
    type: Number,
  },
  ratings: {
    type: Number,
  },
  images: [{
    type: String,
    required: true
  }],
  sizes: [{
        size: {
          type: String,
          enum: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
          required: true
        },
        quantity: {
          type: Number,
          required: true,
          min: 0
        },
      }],
  category: {
    type: String,
  },
  stock: {
    type: Number,
  },
  numOfReviews: {
    type: Number,
    default: 0
  },
  gender:{
    type:String
  },
  reviews: [
    {
      
    }
  ],
  status: { 
    type: String, 
    enum: ['trending', 'new_arrival', 'normal'],
    default: 'normal'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});
const Product=mongoose.model('Product', productSchema);
module.exports =Product 
