import { Request, Response } from "express";
import { EmployeeModel } from "../schemas/employee.schema";
import { UserModel } from "../schemas/user.schema";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";


console.log("🔥 EMPLOYEE CONTROLLER FILE LOADED");


export const getEmployees = asyncHandler(async (req: Request, res: Response) => {
  const employees = await EmployeeModel.find().populate("employeeId");
  return res.json(new ApiResponse(true, "Employees fetched", employees));
});

export const getEmployeeById = asyncHandler(async (req: Request, res: Response) => {
  const employee = await EmployeeModel.findById(req.params.id).populate("employeeId");

  if (!employee) {
    throw new ApiError(404, "Employee not found");
  }

  console.log("*********************Employee*********************", employee);
  return res.json(new ApiResponse(true, "Employee fetched", employee));
});


export const createEmployee = asyncHandler(async (req: Request, res: Response) => {
  const { email, employeeId } = req.body;

    console.log("🚀 INSIDE createEmployee START");
  console.log("BODY IS:", req.body);

  console.log("🔍 Received employeeId:", employeeId);
  console.log("📧 Received email:", email);


  const existingEmployee = await EmployeeModel.findOne({ email });
  if (existingEmployee) {
    console.log("⚠️ Employee with email already exists");
    throw new ApiError(400, "Employee with this email already exists");
  }

  // 🔍 DEBUG LINE – Check if employeeId exists in User collection
  console.log("🔎 Checking if user exists in User collection:");
  console.log(await UserModel.findById(employeeId)); // <-- Temporary debug log

  // Validate employeeId exists in UserModel
  const userExists = await UserModel.findById(employeeId);
  console.log("👤 User exists?", !!userExists);

  if (!userExists) {
    console.log("❌ User NOT found for ID:", employeeId);
    throw new ApiError(400, "Invalid employeeId (User not found)");
  }

  const employee = await EmployeeModel.create(req.body);
  return res.status(201).json(new ApiResponse(true, "Employee created", employee));
});

// 📌 UPDATE employee
export const updateEmployee = asyncHandler(async (req: Request, res: Response) => {
  const employee = await EmployeeModel.findByIdAndUpdate(req.params.id, req.body, { new: true });

  if (!employee) {
    throw new ApiError(404, "Employee not found");
  }

  return res.json(new ApiResponse(true, "Employee updated", employee));
});

// 📌 DELETE employee
export const deleteEmployee = asyncHandler(async (req: Request, res: Response) => {
  const employee = await EmployeeModel.findByIdAndDelete(req.params.id);

  if (!employee) {
    throw new ApiError(404, "Employee not found");
  }

  return res.json(new ApiResponse(true, "Employee deleted"));
});
