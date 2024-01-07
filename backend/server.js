const app=require("./app");
const dotenv=require("dotenv");
const connectDatabase=require("./config/database")

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