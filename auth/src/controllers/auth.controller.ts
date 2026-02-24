import { Request,Response,NextFunction } from "express";
import { validationResult } from "express-validator";
import { RequestValidationError } from "../errors/validation.error";

export function singup (req:Request,res:Response,next:NextFunction){
    const result = validationResult(req);
    if(!result.isEmpty()){
        throw new RequestValidationError(result.array());
    }
    // assume database is failed here
    throw new Error("failed to connect database");
    res.send({});
}