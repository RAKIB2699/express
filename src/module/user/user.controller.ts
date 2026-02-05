import { Request, Response } from "express";
import { userService } from "./user.service";


const createUser = async (req: Request, res: Response) => {
   

    try {
        
        const result =await userService.createUser(req.body);
        res.status(201).json({
            success: true,
            meassage: "data inserted",
            data: result.rows[0]
        });

    } catch (err: any) {
        res.status(500).json({
            success: false,
            meassage: "data not inserted"
        });
    };

};

const getUser =async (req: Request, res: Response) => {

    try {
        
        const result =await userService.getUser();
        res.status(200).json({
            success: true,
            message: "data retrive successfully",
            data: result.rows
        });

    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: "Request fail"
        });
    };
};

const getSingleUser =async (req: Request, res: Response) => {

    try {
        const result = await userService.getSingleUser(req.params.id as string);
        if (result.rows.length === 0) {
          return res.status(404).json({
                success : false,
                message : "failed data retrived"
            })
        } else {
            res.status(200).json({
                success: true,
                message: "data retrived successfully",
                data: result.rows[0]
            })
        }

    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: "data retrived failed"
        })
    }
};

const updateUser =async (req: Request, res: Response) => {
    
    const {name,email} = req.body;
    try {
        const result = await userService.updateUser(name,email,req.params.id as string);

        if (result.rows.length == 0) {
           return res.status(404).json({
                success : false,
                message : "failed data update"
            })
        } else {
            res.status(200).json({
                success: true,
                message: "data update successfully",
                data: result.rows[0]
            })
        }

    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: "data update failed"
        })
    }
};

const deleteUser=async (req: Request, res: Response) => {

    try {
        const result = await userService.deleteUser(req.params.id as string);
        if (result.rowCount === 0) {
            return res.status(404).json({
                success : false,
                message : "user not found"
            })
        } else {
            res.status(200).json({
                success: true,
                message: "data delete successfully",
                data: result.rows[0]
            })
        }

    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: "data delete failed"
        })
    }
};

export const userController ={
    createUser,
    getUser,
    getSingleUser,
    updateUser,
    deleteUser,

}