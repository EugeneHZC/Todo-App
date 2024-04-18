import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import { config } from "dotenv";
import userRouter from "./routes/userRoutes";
import todoRouter from "./routes/todoRoutes";

config();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/user", userRouter);
app.use("/api/todo", todoRouter);

mongoose
  .connect(process.env.MONGO_DATABASE_URI!)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Listening on port ${process.env.PORT}...`);
    });
  })
  .catch((error) => {
    console.error(error);
  });
