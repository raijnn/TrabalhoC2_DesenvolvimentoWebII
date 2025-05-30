import { Request, Response } from "express";
import UserService from "../services/userService";

class UserController {
    async getUsers(req: Request, res: Response) {
        try {
            const users = await UserService.listUsers();
            res.status(200).json({
                status: "ok",
                users
            });
        } catch (error) {
            res.status(500).json({
                status: "error",
                message: error
            });
        }
    }

    async getUserById(req: Request, res: Response): Promise<void> {
        try {
            const id = Number(req.params.id);
            const users = await UserService.listUsers();
            const user = users?.find(u => u.id === id);

            if (!user) {
                res.status(404).json({
                    status: "notfound",
                    message: "usuário não encontrado"
                });
            }
  
            res.status(200).json({
                status: "ok",
                user
            });
        } catch (error) {
            res.status(500).json({
                status: "error",
                message: error
            });
        }
    }

    async createUser(req: Request, res: Response) {
        try {
            const { email, name } = req.body;
            const newUser = await UserService.createUser({ email, name });
            res.status(201).json({
                status: "ok",
                user: newUser
            });
        } catch (error) {
            res.status(500).json({
                status: "error",
                message: error
            });
        }
    }

    async updateUser(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const { email, name } = req.body;
            const updatedUser = await UserService.updateUser(id, { email, name });
            res.status(200).json({
                status: "ok",
                user: updatedUser
            });
        } catch (error) {
            res.status(500).json({
                status: "error",
                message: error
            });
        }
    }

    async deleteUser(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            await UserService.deleteUser(id);
            res.status(200).json({
                status: "ok",
                message: "usuário deletado"
            });
        } catch (error) {
            res.status(500).json({
                status: "error",
                message: error
            });
        }
    }
}

export default new UserController();
