//All the callback Functions required for http method are stored here

//importing Product Models Schema
const Product=require("../models/productModels");


//create products (ADMIN)
exports.createProduct= async(req, res, next) => {
    const product=await Product.create(req.body)
    res.status(201).json({success:true,product})
}

//get all products
exports.getAllProduct = async(req, res, next) => {
    const product=await Product.find();
    res.status(200).json({success:true,product})
}

//Get Product Details
exports.getProductDetails=async(req,res,next) => {
    const product=await Product.findById(req.params.id);      
    if(!product)
    {
        return res.status(500).json({ success: false , message: "Product not found"});
    }
    
    res.status(200).json({success:true,product})

}

//Update Product (ADMIN)
exports.updateProduct=async(req,res,next) => {
    let product=await Product.findById(req.params.id);       //taking 'let' so we can change the product
    if(!product)
    {
        return res.status(500).json({ success: false , message: "Product not found"});
    }
    product=await Product.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    }); 
    
    res.status(200).json({success:true,product})

}

//Delete Product (ADMIN)
exports.deleteProduct= async(req, res, next) => {
    const product=await Product.findById(req.params.id);  
    if(!product)
    {
        return res.status(500).json({ success: false , message: "Product not found"});
    }
    await product.deleteOne();
    res.status(201).json({success:true, message: "Product deleted Successfully"});

}