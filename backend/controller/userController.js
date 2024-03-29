const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/userModels");
const sendToken= require("../utils/jwtToken");
const sendEmail=require("../utils/sendEmail");
const crypto = require("crypto");
const cloudinary = require("cloudinary")


//Register a User
exports.registerUser=catchAsyncErrors(async(req,res,next)=>{

    const myCloud=await cloudinary.v2.uploader.upload(req.body.avatar,{
      folder: "avatars",
      width: 150,
      crop: "scale",
    });

    const { name, email, password } = req.body;

    const user = await User.create({
        name,
        email,
        password,
        avatar: {
            public_id:myCloud.public_id,
            url: myCloud.secure_url,
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

  // const resetPasswordUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`;

   const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`;

  const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it.`;

  try {
    await sendEmail({
      email: user.email,
      subject: `Bloom-Kart Password Recovery`,
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


// Get User Details
exports.getUserDetails=catchAsyncErrors(async(req,res,next) => {
  const user=await User.findById(req.user.id);      
  if(!user)
  {
      return next(new ErrorHandler("User not found",404));
  }
  
  res.status(200).json({success:true,user})

});


//Update Password
exports.updatePassword=catchAsyncErrors(async(req,res,next) => {
  const user=await User.findById(req.user.id).select("+password");    

  const isPasswordMatched = await user.comparePassword(req.body.oldPassword);
  
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Previous Password is Incorrect ", 400));
  }

  if(req.body.newPassword!==req.body.confirmPassword)
  {
      return next(new ErrorHandler("Password does not match",400));
  }

  user.password=req.body.newPassword;

  await user.save()
  
  sendToken(user,200,res);

});


//Update User Profile
exports.updateProfile=catchAsyncErrors(async(req,res,next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
  };

  if (req.body.avatar !== "") {
    const user = await User.findById(req.user.id);

    const imageId = user.avatar.public_id;

    await cloudinary.v2.uploader.destroy(imageId);

    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: "avatars",
      width: 150,
      crop: "scale",
    });

    newUserData.avatar = {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    };
  }


  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({success:true,message: "User Profile updated Successfully"});

});

// Get all users (ADMIN)
exports.getAllUser = catchAsyncErrors(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    success: true,
    users,
  });
});

// Get Single Users Details (ADMIN)
exports.getSingleUser = catchAsyncErrors(async(req, res, next) => {
  const user=await User.findById(req.params.id);      
    if(!user)
    {
        return next(new ErrorHandler(`User does not exist with ID: ${req.params.id}`,404));
    }
    
    res.status(200).json({success:true,user})
  });


  //Update User Role (ADMIN)
exports.updateRole=catchAsyncErrors(async(req,res,next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };

  const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({success: true,message: "User Role Updated Successfully"});

});


//Delete User Profile (ADMIN)
exports.deleteUser=catchAsyncErrors(async(req,res,next) => {
  const user=await User.findById(req.params.id);  

  if(!user)
  {
      return next(new ErrorHandler(`User does not exist with ID: ${req.params.id}`,404));
  }

  // Remove cloudinary 
  
  const imageId = user.avatar.public_id;

  await cloudinary.v2.uploader.destroy(imageId);
  
  await user.deleteOne();
  res.status(201).json({success:true, message: "User deleted Successfully"});
  
});