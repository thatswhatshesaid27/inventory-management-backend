import { UserModel } from "../schemas/user.schema";
import { asyncHandler } from "../utils/asyncHandler";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";


export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const existing = await UserModel.findOne({ email });
if (!existing) {
    throw new ApiError(400, "Invalid email or password");
  }

    const isPasswordValid = await bcrypt.compare(password, existing.password);
    if (!isPasswordValid) {
      throw new ApiError(400, "Invalid email or password");
    }

    const token = jwt.sign({ id: existing._id, role: existing.role }, process.env.JWT_SECRET || "secret", {
      expiresIn: "7d",
    });

    return res.json(new ApiResponse(true, "Login successful", { token }));
});