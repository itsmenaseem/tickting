import { Request,Response,NextFunction } from "express";
import { CustomError } from "../errors/custom.error";

export function errorMiddleware(err:CustomError,req:Request,res:Response,next:NextFunction){
    if(err  instanceof CustomError){
        return res.status(err.statusCode).json({
            errors:err.serialize()
        })
    }
    res.status(400).json({
        message:"something went wrong!!"
    });
}