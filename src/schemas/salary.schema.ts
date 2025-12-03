import mongoose, { Schema, Document, Model } from "mongoose";
import { ISalaryDetail } from "../types/salary.types";

export interface ISalaryDocument extends ISalaryDetail, Document {}

const SalarySchema: Schema<ISalaryDocument> = new Schema(
  {
    employeeId: {
      type: Schema.Types.ObjectId,
      ref: "Employee",
      required: true
    },
    basicPay: {
      type: Number,
      required: true
    },
    otherAllowances:{
      type: Number,
      required: true,
    },
    bonuses: {
      type: Number,
      required: true
    },
    deductions: {
      pf: {
        type: Number,
        required: true
      },
      tax:{
       type: Number,
       required: true
      },
      loan:{
        type: Number,
        required: false
      },
      others:{
        type: Number,
        required: false
      }
    
    },
    netSalary: {
      type: Number,
      required: true
    },
    paymentStatus: {
      type: String,
      enum: ["Paid", "Pending", "Failed"],
      default: "Pending"
    }
  
   
    },
    {
      timestamps: true
    }
);



export const SalaryModel: Model<ISalaryDocument> =
  mongoose.models.Salary ||
  mongoose.model<ISalaryDocument>("Salary", SalarySchema);
