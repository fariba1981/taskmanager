import db from "mongoose";
import taskRoutes from "./routes/taskRoutes";
import authRoutes from "./routes/authRoutes";
import { json, urlencoded } from "body-parser";
import express from 'express';
import cors from 'cors';
const app = express();

db.connect("mongodb://localhost:27017/taskmanager", () => {
  console.log("Database connected");
});

app.use(json());
app.use(cors());

app.use(urlencoded({ extended: true }));

app.use("/tasks", taskRoutes);
app.use("/auth", authRoutes);

app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    res.status(500).json({ message: err.message });
  }
);

app.get('/', (req,res) => res.send('Welcome to Task Management System'))
app.listen(3000, () => console.log('listening on port 3000'))