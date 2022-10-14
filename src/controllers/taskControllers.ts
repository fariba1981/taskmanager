import { RequestHandler } from "express";
import TaskModel, { ITask } from "../models/taskModel";
import UserModel, { IUser } from "../models/userModel";

export const createTask: RequestHandler = async (req, res, next) => {
  try {
    const data: ITask = req.body;
    console.log("Data", data);
    var task = await TaskModel.create(data);
    return res
      .status(200)
      .json({ message: "Task created successfully", data: task });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const getTasks: RequestHandler = async (req, res, next) => {
  try {
    var tasks = await TaskModel.find({}, 'title worker');
    return res.status(200).json({ message: "All tasks!", data: tasks });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const getTask: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    var task = await TaskModel.findById(id);
    return res.status(200).json({ message: "Tasks found!", data: task });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const getTaskByOwner: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    var task = await TaskModel.find({owner:id}).populate("owner",["title","description"]).exec();
    return res.status(200).json({ message: "Tasks found!", data: task });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const getTaskByWorker: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    var task = await TaskModel.find({worker:id}).populate("worker",["title","description"]).exec();
    return res.status(200).json({ message: "Tasks found!", data: task });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateTask: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    var task = await TaskModel.findByIdAndUpdate(id, req.body, { new: true });
    return res
      .status(200)
      .json({ message: "Task updated successfully!", data: task });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteTask: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    var isDeleted = await TaskModel.findByIdAndDelete(id);
    if (!isDeleted) throw new Error("Failed to delete task");
    return res.status(200).json({ message: "Task deleted successfully!" });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};