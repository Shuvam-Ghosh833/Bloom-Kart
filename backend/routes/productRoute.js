const express=require("express");
const { getAllProduct , createProduct, updateProduct, deleteProduct, getProductDetails} = require("../controller/productController");
const { isAuthenticatedUser } = require("../middleware/auth");


const router=express.Router();

router.route("/products").get(isAuthenticatedUser ,getAllProduct);
router.route("/product/new").post(createProduct);
router.route("/product/:id").put(updateProduct).delete(deleteProduct).get(getProductDetails);  //updating, Getting and deleting in the same route




module.exports=router;