const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/userModels");
const sendToken= require("../utils/jwtToken");
const sendEmail=require("../utils/sendEmail");
const crypto = require("crypto");



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

// Forget Paswword
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  // Get ResetPassword Token
  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`;

  const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it.`;

  try {
    await sendEmail({
      email: user.email,
      subject: `Ecommerce Password Recovery`,
      message,
    });

    res.status(200).json({success: true,  message: `Email sent to ${user.email} successfully`});
  } catch (error) {

    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    return next(new ErrorHandler(error.message, 500));
  }
});


//Reset Password
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
  // creating token hash
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next( new ErrorHandler("Reset Password Token is invalid or has been expired", 400));
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler("Password does not password", 400));
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  sendToken(user, 200, res);
});