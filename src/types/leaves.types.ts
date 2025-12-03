export interface ILeavesDetail {
    _id?: string;
  employeeId: string;
  leaveType: "Sick" | "Casual" | "Earned" | "Maternity" | "Paternity" | "Unpaid"| "Other";
  fromDate:Date;  
  toDate: Date;
  noOfDays: number;
  reason: string;
  status: "Pending" | "Approved" | "Rejected";
  createdAt?: Date;
  updatedAt?: Date;
}