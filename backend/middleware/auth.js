const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");
const User = require("../models/userModels");

exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
    const {token}  = req.cookies;
    
    if(!token) {
        return next(new ErrorHandler("Please logint to access this resources",401));
    }
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);  //read:  https://www.npmjs.com/package/jsonwebtoken

    req.user = await User.findById(decodedData.id);
    
    next()
  });