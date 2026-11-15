import mongoose from "mongoose";
import Project from "../models/projectModel.js";
import "../models/userModel.js";

const createProject = async (req, res) => {
  // TODO: replace the clientId when auth is written;
  const clientId = "6ae781e659e43f5567243687";
  const { title, description, category, coverImage } = req.body;
  if (!title || !description || !category) {
    return res.status(400).json({ error: "mt fields" });
  }
  try {
    const result = await Project.create({
      clientId: clientId,
      title: title,
      description: description,
      category: category,
      coverImage: coverImage,
    });
    res.status(201).json(result);
  } catch (error) {
    res.status(404).json({ error: "error creating projects" });
  }
};

const fetchProjects = async (req, res) => {
  try {
    const projects = await Project.find()
      .populate("clientId", "firstName lastName username")
      .sort({ createdAt: -1 });

    return res.status(200).json(projects);
  } catch (error) {
    console.error("Error fetching projects:", error.message);

    return res.status(500).json({
      message: "Error fetching projects",
    });
  }
};

const singleProjectFetch = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: "Invalid id format" });
    }

    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ error: "error fetching project" });
  }
};

const updateProject = async (req, res) => {
    const allowedFields = [
        "title",
        "description",
        "category",
        "status",
        "coverImage"
    ]
    const updates={};
  try {
      for(const field of allowedFields){
          if(req.body[field] !== undefined){
              updates[field]=req.body[field];
          }
      }
      if(Object.keys(updates).length===0){
          res.status(400).json({message:"no valid fields provided"});
      }

      const project = await Project.findByIdAndUpdate(

      req.params.id,
      { $set: updates },
      {
        new: true,
      }); 

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }
    res.status(200).json(project);

  }catch(error){
    res.status(404).json(error);
  }
};

const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid project ID",
      });
    }

    const result = await Project.findByIdAndDelete(req.params.id);

    if (!result) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    return res.status(200).json({
      message: "Project deleted successfully",
      result,
    });
  } catch (error) {
    res.status(500).json({
        message:"error deleting project"
    });
  }
};

export {
  createProject,
  fetchProjects,
  singleProjectFetch,
  updateProject,
  deleteProject,
};
