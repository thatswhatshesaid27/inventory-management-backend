import mongoose, { Schema, Document, Model } from "mongoose";
import { IRulesDetail } from "../types/rules.types";

export interface IRulesDocument extends IRulesDetail, Document {}

const RulesSchema: Schema<IRulesDocument> = new Schema(
  {
     title: {
      type: String,
      required: true},

    description: {
      type: String,
      required: true
    },
    effectiveDate:{
        type: Date,
        required: true
    },
    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active"
    },          
   
    },
    {
      timestamps: true
    }
);



export const RulesModel: Model<IRulesDocument> =
  mongoose.models.Rules ||
  mongoose.model<IRulesDocument>("Rules", RulesSchema);
