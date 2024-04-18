import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import { config } from "dotenv";

config();

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_DATABASE_URI!).then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}...`);
  });
});
