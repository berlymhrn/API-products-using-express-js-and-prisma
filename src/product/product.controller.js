// ini untuk handle request dan response juga validasi body 

const express = require('express');
const prisma = require("../db");
const router = express.Router();

const { getAllProducts } = require('./product.servis');
const { getProductById } = require("./product.servis");
const { createProduct } = require("./product.servis");
const { deleteProductById } = require("./product.servis");
const { patchProductById } = require("./product.servis");


router.get("/", async (req, res) => {
  const products = await getAllProducts();

  res.send(products);
});

router.get("/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await getProductById(productId);
    res.send(product);
  } catch (err) {
    res.status(400).send(err.message);
  }
});


router.post("/", async (req, res) => {
  try {
    const newProductData = req.body;
    const product = await createProduct (newProductData);
     res.send({
      data:product,
      message : "create product successfully",
     });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.delete("/:id", async (req, res) => {
  const productId = req.params.id;
  await deleteProductById(parseInt(productId));
  
  res.status(200).send("product deleted successful!");
});

router.put("/:id", async (req, res) => {
  const productId = req.params.id;
  const productData = req.body;

  if (
    !(
      productData.name &&
      productData.description &&
      productData.price &&
      productData.image
    )
  ) {
    res.status(400).send("Some field are missing");
    return;
  }

  const product = await prisma.product.update({
    where: {
      id: parseInt(productId),
    },
    data: {
      description: productData.description,
      image: productData.image,
      name: productData.name,
      price: productData.price,
    },
  });
  res.send({
    data: product,
    message: "product edited successful!",
  });
});

router.patch("/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const productData = req.body;

    const product = await patchProductById(parseInt(productId), productData);
    res.send({
      data: product,
      message: "Product edited successfully!",
    });
  } catch (err) {
    res.status(400).send(err.message);
  }
});


module.exports = router;