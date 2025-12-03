import { Request, Response } from "express";
import { SalaryModel } from "../schemas/salary.schema";
import { EmployeeModel } from "../schemas/employee.schema";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";



const calculateNetSalary = (basicPay: number, otherAllowances: number, bonuses: number, deductions: any) => {
  const totalEarnings = basicPay + otherAllowances + bonuses;
  const totalDeductions = (deductions?.pf || 0) + (deductions?.tax || 0) + (deductions?.loan || 0) + (deductions?.others || 0);

  return totalEarnings - totalDeductions; 
};



export const createSalary = asyncHandler(async (req: Request, res: Response) => {
  const { employeeId, basicPay, otherAllowances, bonuses, deductions, paymentStatus } = req.body;

  const employee = await EmployeeModel.findById(employeeId);
  if (!employee) throw new ApiError(400, "Invalid employeeId");

  const netSalary = calculateNetSalary(basicPay, otherAllowances, bonuses, deductions);

  const salary = await SalaryModel.create({
    employeeId,
    basicPay,
    otherAllowances,
    bonuses,
    deductions,
    netSalary,
    paymentStatus
  });

  return res.status(201).json(new ApiResponse(true, "Salary record created", salary));
});



export const getSalaries = asyncHandler(async (req: Request, res: Response) => {
  const salaries = await SalaryModel.find().populate("employeeId");
  return res.json(new ApiResponse(true, "Salaries fetched", salaries));
});



export const getSalaryById = asyncHandler(async (req: Request, res: Response) => {
  const salary = await SalaryModel.findById(req.params.id).populate("employeeId");

  if (!salary) throw new ApiError(404, "Salary record not found");

  return res.json(new ApiResponse(true, "Salary fetched", salary));
});



export const getSalaryByEmployee = asyncHandler(async (req: Request, res: Response) => {
  const employeeId = req.params.id;

  const salaries = await SalaryModel.find({ employeeId }).populate("employeeId");
  return res.json(new ApiResponse(true, "Salaries fetched", salaries));
});



export const updateSalary = asyncHandler(async (req: Request, res: Response) => {
  const existingSalary = await SalaryModel.findById(req.params.id);
  if (!existingSalary) throw new ApiError(404, "Salary record not found");

  const { basicPay, otherAllowances, bonuses, deductions, paymentStatus } = req.body;

  const netSalary = calculateNetSalary(
    basicPay ?? existingSalary.basicPay,
    otherAllowances ?? existingSalary.otherAllowances,
    bonuses ?? existingSalary.bonuses,
    deductions ?? existingSalary.deductions
  );

  const updated = await SalaryModel.findByIdAndUpdate(
    req.params.id,
    {
      basicPay,
      otherAllowances,
      bonuses,
      deductions,
      netSalary,
      paymentStatus
    },
    { new: true }
  );

  return res.json(new ApiResponse(true, "Salary updated", updated));
});



export const deleteSalary = asyncHandler(async (req: Request, res: Response) => {
  const salary = await SalaryModel.findByIdAndDelete(req.params.id);

  if (!salary) throw new ApiError(404, "Salary record not found");

  return res.json(new ApiResponse(true, "Salary deleted"));
});
