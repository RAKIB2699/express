import { Request, Response } from "express";
import { todosService } from "./todos.service";

const createTodos = async(req:Request,res:Response)=>{
    const {user_id,title} = req.body;
    
    try {
        const result =await todosService.createTodos(user_id,title);
        res.status(201).json({
            success : true,
            message : "post successfully",
            data : result.rows[0]
        })
    } catch (err:any) {
        res.status(500).json({
            success : false,
            message : "post failed"
        });
    };
};

const getTodos=async (req: Request, res: Response) => {

    try {
        const result = await todosService.getTodos();

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

const getSingleTodos= async (req:Request, res:Response) => {
  try {

   const result = await todosService.getSingleTodos(req.params.id as string);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Todo not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to fetch todo" });
  }
};

const updateTodos=async (req:Request, res:Response) => {
  const { title, completed } = req.body;

  try {

    const result = await todosService.updateTodos(title,completed,req.params.id as string)
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Todo not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to update todo" });
  }
};

const deleteTodos=async (req:Request, res:Response) => {
  try {
    const result = await todosService.deleteTodos(req.params.id as string);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Todo not found" });
    }

    res.json({ success: true, message: "Todo deleted", data: null });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to delete todo" });
  }
}

export const todosController ={
    createTodos,
    getTodos,
    getSingleTodos,
    updateTodos,
    deleteTodos
}

