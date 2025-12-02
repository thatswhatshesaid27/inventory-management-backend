import { Request, Response } from "express";
import { UserModel } from "../schemas/user.schema";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";


export const getUsers = asyncHandler(async (req: Request, res: Response) => {
  const users = await UserModel.find();
  return res.json(new ApiResponse(true, "Users fetched", users));
});

export const getUserById = asyncHandler(async (req: Request, res: Response) => {
  const user = await UserModel.findById(req.params.id);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  return res.json(new ApiResponse(true, "User fetched", user));
});


export const createUser = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, role } = req.body;
  console.log("🚀 INSIDE createUser START");
  const existing = await UserModel.findOne({ email });
  if (existing) {
    throw new ApiError(400, "Email already exists");
  }

  const user = await UserModel.create({name, email, role });

  return res.status(201).json(new ApiResponse(true, "User created", user));
});


export const updateUser = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, role } = req.body;

  const user = await UserModel.findByIdAndUpdate(
    req.params.id,
    { name, email, role },
    { new: true }
  );

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  return res.json(new ApiResponse(true, "User updated", user));
});

export const deleteUser = asyncHandler(async (req: Request, res: Response) => {
  const user = await UserModel.findByIdAndDelete(req.params.id);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  return res.json(new ApiResponse(true, "User deleted"));
});
