import { Router, Request, Response } from "express";
import { PrismaClient } from '../../generated/prisma/client';

const prisma = new PrismaClient()
const userRouter = Router();

userRouter.get("/api/users", async (req: Request, res: Response) => {
    res.status(200).json({
        status: "ok",
    });
});

userRouter.post("/api/user", async(req: Request, res: Response) => {
    const user = req.body;

    if (!user.email) {
        res.status(400).json({
            status: 'bad request',
            message: 'Você não passou o email.',
        })
    }

    try {
        const newuser = await prisma.user.create({
            data: user,
        });
        res.status(200).json({
            status: "ok",
        });
    } catch(error) {
        res.status(500).json({
            status: "error",
            error: error
        });
    };
});

userRouter.patch("/api/user/:id", async (req: Request, res: Response) => {
    const id = req.params.id;

    if(!id){
        res.status(400).json({
            status: 'bad request',
            message: 'id not declared',
        })
    }


})

userRouter.delete("/api/user/:id", async (req: Request, res: Response) => {
    const id = req.params.id;

    if(!id){
        res.status(400).json({
            status: 'bad request',
            message: 'id not declared',
        });
    return;
    }

    try{
        await prisma.user.delete({
            where: {
                id: parseInt(id)
            }
        })
    }catch(error){
        res.status(500).json({
            status: "error",
            error: error,
        })
    }
})