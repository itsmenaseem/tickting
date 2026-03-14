import { CustomError } from "./custom.error";

export class ForbiddenError extends CustomError {
    statusCode = 403;
    constructor(message:string){
        super(message);
        Object.setPrototypeOf(this,ForbiddenError.prototype)
    }
    serialize(): { message: string; field?: string; }[] {
        return [
            {
                message:this.message
            }
        ]
    }
}