import mongoose from "mongoose";
import Project from "../models/projectModel.js";
import "../models/userModel.js";
import AppError from "../utils/AppError.js";

const createProject = async (req, res) => {
  // TODO: replace the clientId when auth is written;
  const clientId = "6ae781e659e43f5567243687";
  const { title, description, category, coverImage } = req.body;
  if (!title || !description || !category) {
      throw new AppError("missing fields",400)
  }

    const result = await Project.create({
      clientId: clientId,
      title: title,
      description: description,
      category: category,
      coverImage: coverImage,
    });
    res.status(201).json(result);
};

const fetchProjects = async (req, res) => {
    const projects = await Project.find()
      .populate("clientId", "firstName lastName username")
      .sort({ createdAt: -1 });

    return res.status(200).json(projects);
};

const singleProjectFetch = async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        throw new AppError('invalid id format',400);
    }

    const project = await Project.findById(req.params.id);

    if (!project) {
        throw new AppError('project not found',404);
    }

    res.status(200).json(project);
};

const updateProject = async (req, res) => {
    const allowedFields = [
        "title",
        "description",
        "category",
        "status",
        "coverImage",
        "deadline"
    ]
    const updates={};
      for(const field of allowedFields){
          if(req.body[field] !== undefined){
              updates[field]=req.body[field];
          }
      }

      if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
          throw new AppError('invalid id format',400);
      }

      if(Object.keys(updates).length===0){
          throw new AppError('no valid fields provided',400);
      }

      const project = await Project.findByIdAndUpdate(

      req.params.id,
      { $set: updates },
      {
        new: true,
        runValidators:true,
      }); 

    if (!project) {
        throw new AppError('no project found',404);
    }

    return res.status(200).json(project);
};

const deleteProject = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new AppError('invalid project id',400);
    }

    const result = await Project.findByIdAndDelete(req.params.id);

    if (!result) {
        throw new AppError('project not found',404);
    }

    return res.status(200).json({
      message: "Project deleted successfully",result,
    });
};

export {
  createProject,
  fetchProjects,
  singleProjectFetch,
  updateProject,
  deleteProject,
};
