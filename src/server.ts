import express, { Express } from "express";
import { PrismaClient } from "../generated/prisma";
import userRouter from "./routes/userRoutes";
import postRouter from "./routes/postRoutes";
import path from "path";

const app: Express = express();
const prisma = new PrismaClient();

app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "public")));
app.use(userRouter);
app.use(postRouter);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

app.listen(3000, () => {
  console.log("servidor rodando na porta 3000");
});