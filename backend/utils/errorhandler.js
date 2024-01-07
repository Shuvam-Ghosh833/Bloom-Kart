class ErrorHandler extends Error{
    constructor(message,statusCode){
        super(message);
        this.statusCode = statusCode

        Error.captureStackTrace(this,this.constructor);

    }
    
}

module.exports = ErrorHandler


/*class ErrorHandler extends Error: This line declares a new class named ErrorHandler that extends 
                                    the built-in Error class. This means that ErrorHandler inherits
                                    properties and methods from the Error class.

constructor(message, statuscode): The class constructor is defined with two parameters - message 
                                and statuscode. The message parameter is used to set the error message,
                                and the statuscode parameter is used to set a custom status code 
                                for the error.

super(message): The super keyword is used to call the constructor of the parent class  
                (Error in this case) and pass the message parameter to it. This initializes
                 the error object with the specified message.

this.statuscode = statuscode;: This line assigns the statuscode parameter to a property named 
                                statuscode of the ErrorHandler instance. This allows you to associate
                                 a custom status code with the error.

Error.captureStackTrace(this, this.constructor);: This line captures the current stack trace for the
                                 error instance. It is often used to provide more detailed information 
                                about where the error occurred. The this.constructor argument specifies 
                                the starting point of the stack trace, which is the constructor function 
                                of the ErrorHandler class.
*/
