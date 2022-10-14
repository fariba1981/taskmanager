import { Router } from "express";
import {
  createTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask,
  getTaskByOwner,
  getTaskByWorker
} from "../controllers/taskControllers";

const router = Router();

router.post("/", createTask);
router.get("/", getTasks);
router.get("/:id", getTask);
router.get("/user/:id", getTaskByOwner);
router.get("/user/:id", getTaskByWorker);
router.patch("/:id", updateTask);
router.delete("/:id", deleteTask);

export default router;