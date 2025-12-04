import mongoose, { Schema, Document, Model } from "mongoose";
import { IConveyanceDetail } from "../types/conveyance.types";

export interface IConveyanceDocument extends IConveyanceDetail, Document {}

const ConveyanceSchema: Schema<IConveyanceDocument> = new Schema(
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
    travelType:{
      type: String,
      required: true,
      enum: ["Bus", "Train", "Flight", "Taxi", "Other"]
    },
    fromLocation: {
      type: String,
      required: true
    },
    toLocation: {
      type: String,
      required: true
    },

    amount:{
        type: Number,
        required: true
    },

    purpose: {
      type: String,
      required: true
    },

    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending"
    },   
    },
    {
      timestamps: true
    }
);



export const ConveyanceModel: Model<IConveyanceDocument> =
  mongoose.models.Conveyance ||
  mongoose.model<IConveyanceDocument>("Conveyanace", ConveyanceSchema);
