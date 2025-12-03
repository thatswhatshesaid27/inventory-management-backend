import { Request, Response } from "express";
import { LeavesModel } from "../schemas/leaves.schema";
import { EmployeeModel } from "../schemas/employee.schema";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";


export const applyLeave = asyncHandler(async (req: Request, res: Response) => {
  const { employeeId, leaveType, fromDate, toDate, reason } = req.body;

  const employeeExists = await EmployeeModel.findById(employeeId);
  if (!employeeExists) {
    throw new ApiError(400, "Invalid employeeId");
  }

  const start = new Date(fromDate);
  const end = new Date(toDate);
  const noOfDays = Math.floor((end.getTime() - start.getTime()) / (1000 * 3600 * 24)) + 1;

  const leave = await LeavesModel.create({
    employeeId,
    leaveType,
    fromDate,
    toDate,
    noOfDays,
    reason,
    status: "Pending"
  });

  return res.status(201).json(new ApiResponse(true, "Leave applied", leave));
});


export const getLeaves = asyncHandler(async (req: Request, res: Response) => {
  const leaves = await LeavesModel.find().populate("employeeId");
  return res.json(new ApiResponse(true, "Leaves fetched", leaves));
});


export const getLeaveById = asyncHandler(async (req: Request, res: Response) => {
  const leave = await LeavesModel.findById(req.params.id).populate("employeeId");
  if (!leave) throw new ApiError(404, "Leave not found");
  return res.json(new ApiResponse(true, "Leave fetched", leave));
});



export const updateLeaveStatus = asyncHandler(async (req: Request, res: Response) => {
  const { status } = req.body;

  if (!["Pending", "Approved", "Rejected"].includes(status)) {
    throw new ApiError(400, "Invalid status");
  }

  const leave = await LeavesModel.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true }
  );

  if (!leave) throw new ApiError(404, "Leave not found");

  return res.json(new ApiResponse(true, "Leave status updated", leave));
});


export const deleteLeave = asyncHandler(async (req: Request, res: Response) => {
  const leave = await LeavesModel.findByIdAndDelete(req.params.id);
  if (!leave) throw new ApiError(404, "Leave not found");
  return res.json(new ApiResponse(true, "Leave deleted"));
});



//here use employeeId not _id
export const getLeavesByEmployeeId = asyncHandler(async (req: Request, res: Response) => {
  const employeeId = req.params.id;
  const leaves = await LeavesModel.find({ employeeId }).populate("employeeId");
  return res.json(new ApiResponse(true, "Leaves fetched", leaves));
});
