const mongoose =require("mongoose");
const productSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please enter the Product name"],
        trim:true                           //  white spaces will be removed from both sides of the string.
    },
    description:{
        type:String,
        required:[true,"Please enter the Product Description"]
    },
    price:{
        type:Number,
        required:[true,"Please enter the Product Price"],
        maxLength:[8,"Price cannto exceed 8 characters"]
    },
    rating:{
        type:Number,
        default:0,
    },
    images:[{                       //array of objects as there can be multiple images
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
    }],
    category: {
        type: String,
        required: [true, "Please Enter Product Category"],
      },
      Stock: {
        type: Number,
        required: [true, "Please Enter product Stock"],
        maxLength: [4, "Stock cannot exceed 4 characters"],
        default: 1,
      },
      numOfReviews: {
        type: Number,
        default: 0,
      },
      reviews: [
        {
        //   user: {
        //     type: mongoose.Schema.ObjectId,
        //     ref: "User",
        //     required: true,
        //   },
          name: {
            type: String,
            required: true,
          },
          rating: {
            type: Number,
            required: true,
          },
          comment: {
            type: String,
            required: true,
          },
        },
      ],
    
    //   user: {
    //     type: mongoose.Schema.ObjectId,
    //     ref: "User",
    //     required: true,
    //   },
    //   createdAt: {
    //     type: Date,
    //     default: Date.now,
    //   },
})

module.exports=mongoose.model("Product",productSchema)