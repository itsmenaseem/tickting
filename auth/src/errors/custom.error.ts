
export abstract class CustomError extends Error{

    constructor(message:string){
        super(message);
        Object.setPrototypeOf(this,CustomError.prototype);
    }
    abstract serialze():{
        message:string;
        feild?:string;
    }[];
};