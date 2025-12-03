import { ProjectModel } from "../schemas/project.schema";
import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";

export const getProjects = asyncHandler(async (req: Request, res: Response) => {
  const projects = await ProjectModel.find().populate("teamMembers");
  return res.json(new ApiResponse(true, "Projects fetched", projects));
});


export const createProject = asyncHandler(async (req: Request, res: Response) => {
    const { projectName, clientName, startDate, endDate, teamMembers, projectStatus } = req.body;
    const project = await ProjectModel.create({ projectName, clientName, startDate, endDate, teamMembers, projectStatus });
    return res.json(new ApiResponse(true, "Project created", project));
})


export const getProjectById = asyncHandler(async (req: Request, res: Response) => {
  const project = await ProjectModel.findById(req.params.id).populate("teamMembers");

  if (!project) throw new ApiError(404, "Project not found");

  return res.json(new ApiResponse(true, "Project fetched", project));
});


export const updateProject = asyncHandler(async (req: Request, res: Response) => {
  const project = await ProjectModel.findByIdAndUpdate(req.params.id, req.body, { new: true });

  if (!project) throw new ApiError(404, "Project not found");

  return res.json(new ApiResponse(true, "Project updated", project));
});


export const deleteProject = asyncHandler(async (req: Request, res: Response) => {
  const project = await ProjectModel.findByIdAndDelete(req.params.id);

  if (!project) throw new ApiError(404, "Project not found");

  return res.json(new ApiResponse(true, "Project deleted"));
});



export const getProjectsByEmployee = asyncHandler(async (req: Request, res: Response) => {
  const employeeId = req.params.id;
  const projects = await ProjectModel.find({ teamMembers: employeeId }).populate("teamMembers");

  return res.json(new ApiResponse(true, "Projects fetched", projects));
});





