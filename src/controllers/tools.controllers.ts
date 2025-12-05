import { Request, Response } from "express";
import { ToolsModel } from "../schemas/tools.schema";
import { EmployeeModel } from "../schemas/employee.schema";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";



export const addTools = asyncHandler(async (req: Request, res: Response) => {
  const { toolName, category, serialNo, AssignedTo, IssuedDate, returnDate, condition } = req.body;

  const employeeExists = await EmployeeModel.findById(AssignedTo);
  if (!employeeExists) {
    throw new ApiError(400, "Invalid employeeId");
  }

  const tool = await ToolsModel.create({
    toolName,
    category,
    serialNo,
    AssignedTo,
    IssuedDate,
    returnDate,
    condition
  });

  return res.status(201).json(new ApiResponse(true, "Tool added successfully", tool));
});




export const getTools = asyncHandler(async (req: Request, res: Response) => {
  const tools = await ToolsModel.find().populate("assignedTo");
  return res.json(new ApiResponse(true, "Tools fetched", tools));
});




export const getToolsById = asyncHandler(async (req: Request, res: Response) => {
  const tool = await ToolsModel.findById(req.params.id).populate("assignedTo");
  
  if (!tool) throw new ApiError(404, "Tool not found");

  return res.json(new ApiResponse(true, "Tool fetched", tool));
});



export const updateToolstoEmployee = asyncHandler(async (req: Request, res: Response) => {
  const { assignedTo } = req.body;

  const employeeExists = await EmployeeModel.findById(assignedTo);
  if (!employeeExists) {
    throw new ApiError(400, "Invalid employeeId");
  }

  const tool = await ToolsModel.findByIdAndUpdate(
    req.params.id,
    { assignedTo },
    { new: true }
  );

  if (!tool) throw new ApiError(404, "Tool not found");

  return res.json(new ApiResponse(true, "Tool assigned successfully", tool));
});



export const deleteTools = asyncHandler(async (req: Request, res: Response) => {
  const deleted = await ToolsModel.findByIdAndDelete(req.params.id);
  
  if (!deleted) throw new ApiError(404, "Tool not found");

  return res.json(new ApiResponse(true, "Tool deleted"));
});



export const getToolsByEmployeeId = asyncHandler(async (req: Request, res: Response) => {
  const employeeId = req.params.id;

  const tools = await ToolsModel.find({ AssignedTo: employeeId }).populate("AssignedTo");

  if (!tools) throw new ApiError(404, "No tools found for this employee");

  return res.json(new ApiResponse(true, "Tools fetched", tools));
});
