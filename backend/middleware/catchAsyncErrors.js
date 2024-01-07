module.exports=f => (req,res,next) => {

    Promise.resolve(f(req,res,next)).catch(next);  //try and catch in one line
}