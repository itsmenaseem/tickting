import { CustomError } from "./custom.error";

export class DBConnectionError extends CustomError{
    statusCode = 500
    constructor(){
        super("Failed to connect DB");
        Object.setPrototypeOf(this,DBConnectionError.prototype);
    }
    serialize(): { message: string; field?: string; }[] {
        return [{
            message:'Database is down'
        }]
    }
}