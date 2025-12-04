export interface ItoolsDetail  {
    _id?: string;
    toolName: string;
    category: string;
    serialNo : number;
    AssignedTo: string;
    IssueDate: Date;
    returnDate:Date;
    condition:string;
    createdAt?: Date;
    updatedAt?: Date;
}