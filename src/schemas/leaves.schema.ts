import mongoose, { Schema, Document, Model } from "mongoose";
import { ILeavesDetail } from "../types/leaves.types";

export interface ILeavesDocument extends ILeavesDetail, Document {}

const LeavesSchema: Schema<ILeavesDocument> = new Schema(
  {
    employeeId: {
      type: Schema.Types.ObjectId,
      ref: "Employee",
      required: true
    },
    leaveType: {
      type: String,
      enum: ["Sick", "Casual", "Earned", "Maternity", "Paternity", "Unpaid", "Other"],
      required: true,
    //   trim: true
    },
    fromDate: {
      type: Date,
      required: true,
    //   trim: true
    },
    toDate: {
      type: Date,
      required: true,
   
    },
    noOfDays: {
      type: Number,
    //   required: true,
    },
    reason: {   
      type: String,
      required: true
    },
   
    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending"
    }
  },
  {
    timestamps: true
  }
);



export const LeavesModel: Model<ILeavesDocument> =
  mongoose.models.Leaves ||
  mongoose.model<ILeavesDocument>("Leaves", LeavesSchema);
