class ApiFeatures {
    constructor(query, queryStr) {          /* eg:  query = Product.find() and queryStr = value of the parameter 
                                                    given in url  */
      this.query = query;
      this.queryStr = queryStr;
    }


    search()
    {
        const keyword=this.queryStr.keyword ? {
            name:{
                $regex:this.queryStr.keyword,           //   regular expression
                $options:"i",                           //  'i' for case insensitive search 
            },
        }:{};
        
        this.query=this.query.find({...keyword});       //changing Product.find() to Product.find({...keyword})
        return this;
    }


    filter(){
        const queryCopy={ ...this.queryStr }              //  pass by value
        

        //removing some field for category
        const removeFields=["keyword","page","limit"];
        removeFields.forEach((key)=> delete queryCopy[key]);

        
        //Filter for Price range and rating range
        let s = JSON.stringify(queryCopy);
        s = s.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`); //mongodb needs '$' sign before each operator
       
        this.query = this.query.find(JSON.parse(s));

        return this;
    }

    
}
module.exports=ApiFeatures;