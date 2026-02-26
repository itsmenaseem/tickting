import { Request,Response,NextFunction } from "express";
import { UnauthorizedError } from "../errors/unauthorized.error";
import { verify } from "jsonwebtoken";


 export interface AuthJwtPayload {
    id:string;
    email:string;
}

declare global {
  namespace Express {
    interface Request {
      user?: AuthJwtPayload;
    }
  }
}

export function authMiddleware(req:Request,res:Response,next:NextFunction){
    if(!req.cookies?.token){
        throw new UnauthorizedError()
    }
    try {
        const token = req.cookies.token as string;
        const payload = verify(token,process.env.JWT_SECRET!) as AuthJwtPayload;
        req.user = payload;
    } catch (error) {
        console.log("Token verification failed");
        throw new UnauthorizedError()
    }
    next()
}
