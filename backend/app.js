const express=require("express");
const app =express();

const errorMiddleware=require("./middleware/error")

app.use(express.json());

//ROUTE IMPORTS
const product=require("./routes/productRoute");
const user=require("./routes/userRoute");


app.use("/api/v1",product);
app.use("/api/v1",user);


//MIDDLEWARE FOR ERRORS
app.use(errorMiddleware);

module.exports= app;