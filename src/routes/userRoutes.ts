import { Router } from "express";
import userController from "../controllers/userController";

const userRouter = Router();

userRouter.get("/api/users", userController.getUsers);
userRouter.get("/api/user/:id", userController.getUserById);
userRouter.post("/api/user", userController.createUser);
userRouter.patch("/api/user/:id", userController.updateUser);
userRouter.delete("/api/user/:id", userController.deleteUser);

export default userRouter;
