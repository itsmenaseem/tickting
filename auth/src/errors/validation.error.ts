
export  class ValidationError extends Error {
     statusCode = 400;
     reason;
     constructor(reason:any){
        super();
        this.reason = reason;
        Object.setPrototypeOf(this, ValidationError.prototype);
     }
}