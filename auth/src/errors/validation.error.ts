import { ValidationError } from "express-validator";

export  class RequestValidationError extends Error {
     statusCode = 400;
     constructor(private errors:ValidationError[]){
        super('Request Validation Error');
        Object.setPrototypeOf(this, RequestValidationError.prototype);
     }

     serialize() {
      return this.errors.map((err:ValidationError) => {

         if (err.type === "field") {
            return {
            message: err.msg,
            field: err.path
            };
         }

         // fallback for non-field errors
         return {
            message: err.msg
         };
      });
      }
}