import mongoose, { Schema, Document, Model } from "mongoose";
import { IEmployeeDetail } from "../types/employee.types";

export interface IEmployeeDocument extends IEmployeeDetail, Document {}

const EmployeeSchema: Schema<IEmployeeDocument> = new Schema(
  {
    employeeId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    firstName: {
      type: String,
      required: true,
      trim: true
    },
    lastName: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },
    phoneNumber: {
      type: String,
      required: true
    },
    dateOfBirth: {
      type: Date
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"]
    },
    designation: {
      type: String
    },
    dateOfJoining: {
      type: Date
    },
    bankDetails: {
      accountNumber: { type: String },
      bankName: { type: String },
      IFSC: { type: String }
    },
    salary: {
      type: Number
    },
    documents: [
      {
        type: String
      }
    ]
  },
  {
    timestamps: true
  }
);



export const EmployeeModel: Model<IEmployeeDocument> =
  mongoose.models.Employee ||
  mongoose.model<IEmployeeDocument>("Employee", EmployeeSchema);
