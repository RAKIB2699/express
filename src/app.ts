import express, { NextFunction, Request, Response } from "express";

import config from "./config";
import initDB, { pool } from "./config/db";
import { logger } from "./middleware/logger";
import { userRoute } from "./module/user/user.routes";
import { todosRoute } from "./module/todos/todos.routes";
import { authRoutes } from "./module/auth/auth.routes";




const app = express()

app.use(express.json());


initDB();



app.get('/',(req: Request, res: Response) => {
    res.send('Hellooo lasu!')
})

app.use('/users',userRoute );

app.use("/todos", todosRoute);

app.use("/auth",authRoutes);

app.use((req,res)=>{
    res.status(404).json({
        success: false,
        message: "route not found",
        path : req.path
    })
})

export default app;
