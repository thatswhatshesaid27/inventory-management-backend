export interface IProject{
    _id?: string;
    projectName: string;
    clientName: string;
    startDate: Date;
    endDate: Date;
    teamMembers: string[]; // array of employee IDs
    projectStatus: "Not Started" | "In Progress" | "Completed" | "On Hold";
    createdAt?: Date;
    updatedAt?: Date; 
}