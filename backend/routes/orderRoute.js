const express=require("express");
const router=express.Router();
const { isAuthenticatedUser ,authorizeRoles} = require("../middleware/auth");
const { newOrder, getSingleOrder } = require("../controller/orderController");

router.route("/order/new").post(isAuthenticatedUser ,newOrder);
router.route("/order/:id").get(isAuthenticatedUser ,authorizeRoles("admin"),getSingleOrder);



module.exports=router;