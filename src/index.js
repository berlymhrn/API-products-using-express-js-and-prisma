const express = require("express");
const dotenv = require("dotenv");
const app = express();

dotenv.config();
const PORT = process.env.PORT;
app.listen(PORT,()=>{
  console.log(`Running on port http://localhost:${PORT}`);
})

app.use(express.json());

const productController = require("./product/product.controller")
app.use("/products",productController);