const app=require("./app");

const dotenv=require("dotenv");
const cloudinary = require("cloudinary");
const connectDatabase=require("./config/database");

//HANDLING UNCAUGHT EXCEPTION
process.on("uncaughtException",(err)=>{
   console.log(`Error: ${err.message}`);
   console.log(`Shutting down the server due to UNCAUGHT EXCEPTION`);

   process.exit(1);
  
 })


//Config
dotenv.config({path: "backend/config/config.env"});

//CONNECTING TO DATABSE
connectDatabase()

cloudinary.config({
   cloud_name: process.env.CLOUDINARY_NAME,
   api_key: process.env.CLOUDINARY__API_KEY,
   api_secret: process.env.CLOUDINARY__API_SECRET
});

 const server=app.listen(process.env.PORT,()=>
 {
    console.log(`server is listening on http://localhost:${process.env.PORT}`);
 })


 //HANDLING UNHANDLED PROMISE REJECTION
 process.on("unhandledRejection",(err)=>{
   console.log(`Error: ${err.message}`);
   console.log(`Shutting down the server due to Unhandled Promise Rejection`);

   server.close(()=>{
      process.exit(1);
   });
 })