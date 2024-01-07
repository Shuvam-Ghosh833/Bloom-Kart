const mongoose= require("mongoose");


const connectDatabase=()=>{
    mongoose.connect(process.env.DB_URI)
    .then((data)=>{
        console.log(`Mongodb connected with server: ${data.connection.host}`);
    })                  //catch error is already handled in UNHANDLED PROMISE REJECTION in server
}

module.exports=connectDatabase