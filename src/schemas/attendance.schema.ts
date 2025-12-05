import mongoose, { Schema, Document, Model } from "mongoose";
import { IAttendanceDetail } from "../types/attendance.types";

export interface IAttendanceDocument extends IAttendanceDetail, Document {}

const AttendanceSchema: Schema<IAttendanceDocument> = new Schema(
  {

    employeeId: {
      type: Schema.Types.ObjectId,
      ref: "Employee",
      required: true
    },
    date: {
      type: Date,
      required: true
    },
    status: {
      type: String,
      required: true ,
      enum: ["Present", "Absent", "Leave", "Work From Home"],
      default: "Present"
    },

    checkInTime:{
    type: Date,
    reuired: false
    },

    checkOutTime:{
      type: Date,
      reuired: false
    },

    remarks: {
      type: String,
      required: false
    },

    },
    {
      timestamps: true
    }
);



export const AttendanceModel: Model<IAttendanceDocument> =
  mongoose.models.Attendance ||
  mongoose.model<IAttendanceDocument>("Attendance", AttendanceSchema);
