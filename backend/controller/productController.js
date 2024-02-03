//All the callback Functions required for http method are stored here

//importing Product Models Schema
const Product=require("../models/productModels");

const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");



//create products (ADMIN)
exports.createProduct= catchAsyncErrors(async(req, res, next) => {
    req.body.user=req.user.id;
    const product=await Product.create(req.body)
    res.status(201).json({success:true,product})
});

//get all products
exports.getAllProduct = catchAsyncErrors(async(req, res, next) => {
    /*console.log(req.query)*/
    const productsperpage=15;
    const productCount=await Product.countDocuments();
    const apiFeature=new ApiFeatures(Product.find(),req.query).search().filter().pagination(productsperpage);
    const product=await apiFeature.query;
    res.status(200).json({success:true,product,productCount})
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


// Create new Review or Update the review
exports.createProductReview= catchAsyncErrors(async(req, res, next) => {
    const {rating , comment ,productID} = req.body;
    const review={
        user:req.user._id,
        name:req.user.name,
        rating:Number(rating),
        comment
    }
    const product=await Product.findById(productID);

    /*So, rev => rev.user.toString() is essentially a function that, given an element rev 
    (which is assumed to be an object with a user property), returns the string 
    representation of the user property*/
    const isReviewed= product.reviews.find( (rev)=>rev.user.toString() === req.user._id.toString());

    if(isReviewed){
        product.reviews.forEach(rev=>{
            if((rev)=>rev.user.toString() === req.user._id.toString())
            {
                rev.rating=rating;
                rev.comment=comment;
            }
        });
    } 
    else{
        product.reviews.push(review);
        product.numOfReviews=product.reviews.length;
    }
    
    // Average rating of a product
    let sum = 0;
    product.reviews.forEach((rev) => {sum += rev.rating;});
    product.ratings = sum / product.reviews.length; 

    await product.save({ validateBeforeSave: false });

    res.status(200).json({success: true, message: "Reviews Updated Successfully"});

});


// Get all Reviews of a Product
exports.getProductReviews = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.query.id);
  
    if (!product) {
      return next(new ErrorHandler("Product not found", 404));
    }
  
    res.status(200).json({
      success: true,
      reviews: product.reviews,
    });
  });


 
// Delete Review(BUG: - One user can delete other users review)
exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.query.productId);
  
    if (!product) {
      return next(new ErrorHandler("Product not found", 404));
    }
  
    const reviews = product.reviews.filter(
      (rev) => rev._id.toString() !== req.query.id.toString()
    );
  
    let avg = 0;
  
    reviews.forEach((rev) => {
      avg += rev.rating;
    });
  
    let ratings = 0;
  
    if (reviews.length === 0) {
      ratings = 0;
    } else {
      ratings = avg / reviews.length;
    }
  
    const numOfReviews = reviews.length;
  
    await Product.findByIdAndUpdate(
      req.query.productId,
      {
        reviews,
        ratings,
        numOfReviews,
      },
      {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      }
    );
  
    res.status(200).json({
      success: true,
    });
  });