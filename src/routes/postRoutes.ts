import { Router, Request, Response } from "express";
import { PrismaClient } from '../../generated/prisma/client';

const prisma = new PrismaClient()
const postRouter = Router();

postRouter.get("/api/posts", async (req: Request, res: Response) => {
    res.status(200).json({
        status: "ok",
    });
});

postRouter.post("/api/post", async(req: Request, res: Response) => {
    const post = req.body;

    if (!post.email) {
        res.status(400).json({
            status: 'bad request',
            message: 'email not declared',
        })
    }

    try {
        const newpost = await prisma.post.create({
            data: post,
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

postRouter.patch("/api/post/:id", async (req: Request, res: Response) => {
    const id = req.params.id;

    if(!id){
        res.status(400).json({
            status: 'bad request',
            message: 'id not declared',
        })
    }


})

postRouter.delete("/api/post/:id", async (req: Request, res: Response) => {
    const id = req.params.id;

    if(!id){
        res.status(400).json({
            status: 'bad request',
            message: 'id not declared',
        });
    return;
    }

    try{
        await prisma.post.delete({
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