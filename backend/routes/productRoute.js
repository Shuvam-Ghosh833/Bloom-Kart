const express=require("express");
const { getAllProduct , createProduct, updateProduct, deleteProduct, getProductDetails, createProductReview} = require("../controller/productController");
const { isAuthenticatedUser ,authorizeRoles} = require("../middleware/auth");


const router=express.Router();

router.route("/products").get(getAllProduct);
router.route("/admin/product/new").post(isAuthenticatedUser ,authorizeRoles("admin"),createProduct);
router
    .route("/admin/product/:id")
    .put(isAuthenticatedUser ,authorizeRoles("admin"),updateProduct)
    .delete(isAuthenticatedUser ,authorizeRoles("admin"),deleteProduct);//updating, Getting and deleting in the same route


router.route("/product/:id").get(getProductDetails);  

router.route("/review").put(isAuthenticatedUser , createProductReview);




module.exports=router;