import mongoose, { Schema, Document, Model } from "mongoose";
import { IProject } from "../types/project.types";

export interface IProjectDocument extends IProject, Document {}

const ProjectSchema: Schema<IProjectDocument> = new Schema(
  {
    projectName: {
      type: String,
      required: true,
      trim: true
    },
    clientName: {
      type: String,
      required: true,
      trim: true
    },
    startDate: {
      type: Date,
      required: true
    },
    endDate: {
      type: Date,
      required: true
    },
    teamMembers: [
      {
        type: Schema.Types.ObjectId,
        ref: "Employee"
      }
    ],
    projectStatus: {
      type: String,
      enum: ["Not Started", "In Progress", "Completed", "On Hold"],
      default: "Not Started"
    }
  },
  {
    timestamps: true
  }
);

export const ProjectModel: Model<IProjectDocument> =
  mongoose.models.Project ||
  mongoose.model<IProjectDocument>("Project", ProjectSchema);
