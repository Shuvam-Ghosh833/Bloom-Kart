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


    pagination(productsperpage){
        const currentpage= Number(this.queryStr.page) || 1;     //if there is no page default page is 1
        const skip = productsperpage*(currentpage-1)            // Nunber of products skipped to show products in current page
        this.query=this.query.limit(productsperpage).skip(skip);

        return this;
    }
}
module.exports=ApiFeatures;