import mongoose, { Schema, Document, Model } from "mongoose";
import { ItoolsDetail } from "../types/tools.types";

export interface IToolsDocument extends ItoolsDetail, Document {}

const ToolsSchema: Schema<IToolsDocument> = new Schema(
  {

    toolName: {
      type: String,
      required: true},

    category: {
      type: String,
      required: true
    },
    serialNo:{
        type: Number,
        required: true
    },
    AssignedTo: {
      type: Schema.Types.ObjectId,
      ref: "Employee",
      required: true
    },
    IssuedDate: {
      type: Date,
      required: true
    },

    returnDate: {
      type: Date,
     
    },

    condition: {
      type: String,
      required: true
    },

    },
    {
      timestamps: true
    }
);



export const ToolsModel: Model<IToolsDocument> =
  mongoose.models.Tools ||
  mongoose.model<IToolsDocument>("Tools", ToolsSchema);
