import { Router } from "express";
import PostController from "../controllers/postController";

const postRouter = Router();

postRouter.get("/api/posts", PostController.listPosts);
postRouter.post("/api/post", PostController.createPost);
postRouter.patch("/api/post/:id", PostController.updatePost);
postRouter.delete("/api/post/:id", PostController.deletePost);
postRouter.get("/api/post/:id", PostController.getPostById);

export default postRouter;