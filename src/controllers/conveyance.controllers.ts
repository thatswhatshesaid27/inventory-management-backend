import { Request, Response } from "express";
import { ConveyanceModel } from "../schemas/conveyance.schema";
import { EmployeeModel } from "../schemas/employee.schema";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";


export const addConveyance = asyncHandler(async (req: Request, res: Response) => {
  const { employeeId, date, travelType, fromLocation, toLocation, amount, purpose, status } = req.body;

  const employeeExists = await EmployeeModel.findById(employeeId);
  if (!employeeExists) {
    throw new ApiError(400, "Invalid employeeId");
  }
  const conveyance = await ConveyanceModel.create({
    employeeId,
    date,
    travelType,
    fromLocation,
    toLocation,
    amount,
    purpose,
    status: "Pending"
  });

  return res.status(201).json(new ApiResponse(true, "Conveyance applied", conveyance));
});


export const getConveyance = asyncHandler(async (req: Request, res: Response) => {
  const conveyances = await ConveyanceModel.find().populate("employeeId");
  return res.json(new ApiResponse(true, "Ceonveyances fetched", conveyances));
});


export const getLeaveById = asyncHandler(async (req: Request, res: Response) => {
  const conveyance = await ConveyanceModel.findById(req.params.id).populate("employeeId");
  if (!conveyance) throw new ApiError(404, "Conveyance not found");
  return res.json(new ApiResponse(true, "Conveyance fetched", conveyance));
});



export const updateConveyanceStatus = asyncHandler(async (req: Request, res: Response) => {
  const { status } = req.body;

  if (!["Pending", "Approved", "Rejected"].includes(status)) {
    throw new ApiError(400, "Invalid status");
  }

  const conveyance = await ConveyanceModel.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true }
  );

  if (!conveyance) throw new ApiError(404, "Conveyance not found");

  return res.json(new ApiResponse(true, "Conveyance status updated", conveyance));
});


export const deleteConveyance = asyncHandler(async (req: Request, res: Response) => {
  const leave = await ConveyanceModel.findByIdAndDelete(req.params.id);
  if (!leave) throw new ApiError(404, "Conveyance not found");
  return res.json(new ApiResponse(true, "Conveyance deleted"));
});




export const getConveyanceByEmployeeId = asyncHandler(async (req: Request, res: Response) => {
  const employeeId = req.params.id;
  const conveyance = await ConveyanceModel.find({ employeeId }).populate("employeeId");
  return res.json(new ApiResponse(true, "Leaves fetched", conveyance));
});
