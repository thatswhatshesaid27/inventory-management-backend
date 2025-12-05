import { Request, Response } from "express";
import { RulesModel } from "../schemas/rules.schema";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";


// ADD TOOL
export const addRules = asyncHandler(async (req: Request, res: Response) => {
  const { title, description, effectiveDate, status } = req.body;
  const tool = await RulesModel.create({
    title,
    description,
    effectiveDate,
    status, 
  });

  return res.status(201).json(new ApiResponse(true, "Tool added successfully", tool));
});

export const getRules = asyncHandler(async (req: Request, res: Response) => {
  const Rules = await RulesModel.find();
  return res.json(new ApiResponse(true, "Rules fetched", Rules));
});

export const getRulesById = asyncHandler(async (req: Request, res: Response) => {
  const tool = await RulesModel.findById(req.params.id);
  
  if (!tool) throw new ApiError(404, "Tool not found");

  return res.json(new ApiResponse(true, "Tool fetched", tool));
});

export const deleteRules = asyncHandler(async (req: Request, res: Response) => {
  const deleted = await RulesModel.findByIdAndDelete(req.params.id);
  
  if (!deleted) throw new ApiError(404, "Tool not found");

  return res.json(new ApiResponse(true, "Tool deleted"));
});

export const updateRules = asyncHandler(async (req: Request, res: Response) => {
  const { title, description, effectiveDate, status } = req.body;       

  const tool = await RulesModel.findByIdAndUpdate(
    req.params.id,
    { title, description, effectiveDate, status },
    { new: true }
  );

  if (!tool) throw new ApiError(404, "Tool not found");

  return res.json(new ApiResponse(true, "Tool assigned successfully", tool));
}
  )
