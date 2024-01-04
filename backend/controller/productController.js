const Product=require("../models/productModels");


//create products(ADMIN )
exports.createProduct= async(req, res, next) => {
    const product=await Product.create(req.body)
    res.status(201).json({success:true,product})
}

//get all products
exports.getAllProduct = async(req, res, next) => {
    const product=await Product.find();
    res.status(200).json({success:true,product})
}