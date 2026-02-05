import { Request, Response } from "express";
import { authServices } from "./auth.service";

const loginUser=async(req:Request,res:Response)=>{
    const {email,password}= req.body;
    
        try {
            
           const result = await authServices.loginUser(email,password);
            res.status(201).json({
                success: true,
                meassage: "login successfull",
                data: result
            });
    
        } catch (err: any) {
            res.status(500).json({
                success: false,
                meassage: "login failrd"
            });
        };
    
}

export const authController={
    loginUser
}