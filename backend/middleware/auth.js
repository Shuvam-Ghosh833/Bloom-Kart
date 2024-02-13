const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");
const User = require("../models/userModels");

exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
    const {token}  = req.cookies;
    
    if(!token) {
        return next(new ErrorHandler("Please login to access this resources",401));
    }
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);  //read:  https://www.npmjs.com/package/jsonwebtoken

    req.user = await User.findById(decodedData.id);
    
    next()
  });

  exports.authorizeRoles= (...roles) => {       //The rest parameter syntax allows a function to accept an indefinite number of arguments as an array, providing a way to represent variadic functions in JavaScript.
    return (req,res,next)=>{
        if(!roles.includes(req.user.role)){
           return next (new ErrorHandler(`${req.user.role} is not allowed to access this resource`,403));
        }
        next();
    };
  };