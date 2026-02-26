import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import {sign } from "jsonwebtoken"

interface AuthDocument extends mongoose.Document {
    email: string;
    password: string;
    comparePassword(password: string): Promise<boolean>;
    generateJwtToken():string;
}

const authSchema = new mongoose.Schema<AuthDocument>({
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
},{
    toJSON:{
        transform(doc,ret:any){
            ret.id = ret._id;
            delete ret._id;
            delete ret.password;
            delete ret.__v;
        }
    }
});



authSchema.pre("save", async function (this:AuthDocument) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    }
});


authSchema.methods.comparePassword =  function (this:AuthDocument,password: string) {
    return bcrypt.compare(password, this.password);
};

authSchema.methods.generateJwtToken = function(this:AuthDocument){
    const payload = {id:this._id.toString(),email:this.email};
    const token = sign(payload,
            process.env.JWT_SECRET!
        ,{
        expiresIn:"1h"
    });
    return token;
}


export const User = mongoose.model<AuthDocument>("users", authSchema);