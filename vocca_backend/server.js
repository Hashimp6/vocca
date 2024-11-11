require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/moongoose");
const userRouter = require("./routers/userRouter");
const productRouter = require("./routers/productRouter");
const cartRouter = require("./routers/cartRouter");

const app = express();
const Port = process.env.PORT || 3001;

app.use(cors()); 
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true })); 

connectDB(); 

app.use('/',userRouter );
app.use('/product',productRouter );
app.use('/cart',cartRouter );

app.listen(Port, () => {
  console.log(`server running on port ${Port}`);
});
