import { Request,Response } from "express";

import { User } from "../models/auth.model";
import { BadRequestError } from "../errors/bad-request.error";

const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    maxAge: 1000 * 60 * 60
};

export async function singup (req:Request,res:Response){
    const {email,password} = req.body;
    const existingUser = await User.findOne({email});
    if(existingUser){
        throw new BadRequestError("Email is already in use");
    }
    const user = await User.create({
        email,password
    })
    const token:string = user.generateJwtToken();
    res.cookie("token",token,cookieOptions);
    res.status(201).send({user})
}

export async function login(req:Request,res:Response){
    const {email,password} = req.body;
    const user = await User.findOne({email});
    if(!user){
        throw new BadRequestError("Invalid credentials");
    }
    const matchPassword = await user.comparePassword(password);
    if(!matchPassword){
        throw new BadRequestError("Invalid credentials");
    }
    const token:string = user.generateJwtToken();
    res.cookie("token",token,cookieOptions);
     res.status(200).send({user})
}

export function logout(req:Request,res:Response){
    res.clearCookie("token",{
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge:0
    });
     res.status(200).send({message:"Logout successfully"})
}

export async function profile(req:Request,res:Response){
    const id = req.user?.id;
    const user = await User.findById(id);
    return res.status(200).send(user);
}