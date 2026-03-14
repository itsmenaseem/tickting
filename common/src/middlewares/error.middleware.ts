import { Request,Response,NextFunction } from "express";
import { CustomError } from "../errors/custom.error";


export function errorMiddleware(err:unknown,req:Request,res:Response,next:NextFunction){
    if(err  instanceof CustomError){
        console.log(err.message);
        return res.status(err.statusCode).json({
            errors:err.serialize()
        })
    }
    console.log(err);
    
    res.status(500).json({
        message:"something went wrong!!"
    });
}