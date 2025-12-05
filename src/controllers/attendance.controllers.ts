import { Request, Response } from "express";
import { AttendanceModel } from "../schemas/attendance.schema";
import { EmployeeModel } from "../schemas/employee.schema";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";


export const addAttendance = asyncHandler(async (req: Request, res: Response) => {
  const { employeeId, date, status, checkInTime, checkOutTime, remarks } = req.body;

  const employeeExists = await EmployeeModel.findById(employeeId);
  if (!employeeExists) {
    throw new ApiError(400, "Invalid employeeId");
  }

  const attendance = await AttendanceModel.create({
    employeeId,
    date,
    status,
    checkInTime,
    checkOutTime,
    remarks
  });

  return res.status(201).json(new ApiResponse(true, "Attendance added successfully", attendance));
});


export const getAttendance = asyncHandler(async (req: Request, res: Response) => {
  const tools = await AttendanceModel.find();
  return res.json(new ApiResponse(true, "Attendance fetched", tools));

});


export const getAttendaceById = asyncHandler(async (req: Request, res: Response) => {
  const tool = await AttendanceModel.findById(req.params.id).populate("employeeId");
  
  if (!tool) throw new ApiError(404, "Attendance not found");

  return res.json(new ApiResponse(true, "Attendance fetched", tool));
});



export const updateAttendance = asyncHandler(async (req: Request, res: Response) => {
  const { status } = req.body;
  const attendance = await AttendanceModel.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true }
  );

  if (!attendance) throw new ApiError(404, "Attendance not found");

  return res.json(new ApiResponse(true, "Attendance updated successfully", attendance));
});



export const deleteAttendance = asyncHandler(async (req: Request, res: Response) => {
  const deleted = await AttendanceModel.findByIdAndDelete(req.params.id);

  if (!deleted) throw new ApiError(404, "Attendance not found");

  return res.json(new ApiResponse(true, "Attendance deleted"));
});




