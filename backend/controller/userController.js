const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/userModels");

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

    res.status(201).json({ success:true ,  token, });
});