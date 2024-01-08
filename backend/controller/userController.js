const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/userModels");
const sendToken= require("../utils/jwtToken")

//Register a User
exports.registerUser=catchAsyncErrors(async(req,res,next)=>{
    const { name, email, password } = req.body;

    const user = await User.create({
        name,
        email,
        password,
        avatar: {
            public_id:" myCloud.public_id",
            url: "myCloud.secure_url",
        },
    });

    const token = user.getJWTToken();

    sendToken(user,200,res);        // means res.status(201).json({ success:true , user, token, });
});

// Login a User
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;
  
    // checking if user has given password and email both
  
    if (!email || !password) {
      return next(new ErrorHandler("Please Enter Email & Password", 400));
    }
  
    const user = await User.findOne({ email }).select("+password");
  
    if (!user) {
      return next(new ErrorHandler("Invalid email or password", 401));
    }
  
    const isPasswordMatched = await user.comparePassword(password);
  
    if (!isPasswordMatched) {
      return next(new ErrorHandler("Invalid email or password", 401));
    }
  
    const token = user.getJWTToken();

    sendToken(user,200,res);               // means res.status(200).json({ success:true , user, token, });
  
});


// Logout a user
exports.logoutUser = catchAsyncErrors(async(req,res,nex)=>{

    res.cookie("token",null,{ expires:new Date(Date.now()) , httpOnly:true } );

    res.status(200).json({success:true, message: "logged out"});
})