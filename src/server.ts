import express, { Request, Response } from "express";
import { Pool } from "pg";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

const app = express()
const port = 5000

app.use(express.json());

const pool = new Pool({
    connectionString: process.env.CONNECTION_STR
})



const initDB = async () => {
    await pool.query(`
        CREATE TABLE IF NOT EXISTS users(
        id SERIAL PRIMARY KEY,
        name VARCHAR(150) NOT NULL,
        email VARCHAR(150) UNIQUE NOT NULL,
        age INT,
        phone VARCHAR(15),
        address TEXT,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
        ) `
    )

    await pool.query(`
        CREATE TABLE IF NOT EXISTS todos(
        id SERIAL PRIMARY KEY,
        user_id INT REFERENCES users(id) ON DELETE CASCADE,
        title VARCHAR(150) NOT NULL,
        description TEXT,
        completed BOOLEAN DEFAULT false,
        due_date DATE,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
        )
        `)
}
initDB();



app.get('/', (req: Request, res: Response) => {
    res.send('Hello billai!')
})

app.post('/users', async (req: Request, res: Response) => {
    const { name, email } = req.body;

    try {
        const result = await pool.query(`INSERT INTO users(name,email) VALUES($1,$2) RETURNING *`, [name, email]);

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

});

app.get("/users", async (req: Request, res: Response) => {


    try {
        const result = await pool.query(`SELECT * FROM users`);

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
});

app.get("/users/:id", async (req: Request, res: Response) => {

    try {
        const result = await pool.query(`SELECT * FROM users WHERE id = $1`, [req.params.id]);

        if (result.rows.length == 0) {
            res.status(500).json({
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
})


app.put("/users/:id", async (req: Request, res: Response) => {
    
    const {name,email} = req.body;
    try {
        const result = await pool.query(`UPDATE users SET name=$1, email=$2 WHERE id=$3 RETURNING *`,[name,email,req.params.id]);

        if (result.rows.length == 0) {
            res.status(500).json({
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
})

app.delete("/users/:id", async (req: Request, res: Response) => {

    try {
        const result = await pool.query(`DELETE FROM users WHERE id = $1 RETURNING *`, [req.params.id]);

        if (result.rows.length == 0) {
            res.status(500).json({
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
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
