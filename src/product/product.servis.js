// ini untuk handle business logic dan membuat function agar reusable jika ingin digunakan ditempat lain 

const prisma = require("../db");

const getAllProducts = async () =>{
  const product = await prisma.product.findMany();
  return product;
};

const getProductById = async (id) => {
  if (isNaN(id)) {
    throw Error("ID is not a valid number");
  }

  const product = await prisma.product.findUnique({
    where: {
      id: parseInt(id),
    },
  });

  if (!product) {
    throw Error("Product not found");
  }
  return product;
};


const createProduct = async (newProductData) => {
  const product = await prisma.product.create({
    data:{
      name: newProductData.name,
      description: newProductData.description,
      price: newProductData.price,
      image: newProductData.image
    },
  });
  return product;
};

const deleteProductById = async (id) => {

  if (typeof id !== "number") {
    throw Error("ID is not a number");
  }

  const product = await prisma.product.findUnique({
    where: {
      id
    },
  });

  if (!product) {
    throw Error("Product not found");
  }

  await prisma.product.delete({
    where: {
      id,
    },
  });
};

const patchProductById = async (id, productData) => {
  await getProductById(id); 

  const product = await prisma.product.update({
    where: {
      id: parseInt(id),
    },
    data: {
      description: productData.description,
      image: productData.image,
      name: productData.name,
      price: productData.price,
    },
  });
  return product;
};


module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  deleteProductById,
  patchProductById,
};