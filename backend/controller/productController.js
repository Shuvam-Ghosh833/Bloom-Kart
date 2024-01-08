//All the callback Functions required for http method are stored here

//importing Product Models Schema
const Product=require("../models/productModels");

const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");



//create products (ADMIN)
exports.createProduct= catchAsyncErrors(async(req, res, next) => {
    const product=await Product.create(req.body)
    res.status(201).json({success:true,product})
});

//get all products
exports.getAllProduct = catchAsyncErrors(async(req, res, next) => {
    /*console.log(req.query)*/
    const productsperpage=5;
    const apiFeature=new ApiFeatures(Product.find(),req.query).search().filter().pagination(productsperpage);
    const product=await apiFeature.query;
    res.status(200).json({success:true,product})
});

//Get Product Details
exports.getProductDetails=catchAsyncErrors(async(req,res,next) => {
    const product=await Product.findById(req.params.id);      
    if(!product)
    {
        return next(new ErrorHandler("Product not found",404));
    }
    
    res.status(200).json({success:true,product})

});

//Update Product (ADMIN)
exports.updateProduct=catchAsyncErrors(async(req,res,next) => {
    let product=await Product.findById(req.params.id);       //taking 'let' so we can change the product
    if(!product)
    {
        return next(new ErrorHandler("Product not found",404));
    }
    product=await Product.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    });
    
    res.status(200).json({success:true,product})

});

//Delete Product (ADMIN)
exports.deleteProduct= catchAsyncErrors(async(req, res, next) => {
    const product=await Product.findById(req.params.id);  
    if(!product)
    {
        return next(new ErrorHandler("Product not found",404));
    }
    await product.deleteOne();
    res.status(201).json({success:true, message: "Product deleted Successfully"});

});