export interface IAttendanceDetail {
    _id?: string;
    employeeId: string;
    date: Date;
    status: "Present" | "Absent" | "Leave" | "Work From Home";
    checkInTime?: Date;
    checkOutTime?: Date;
    remarks?: string;
    createdAt?: Date;
    updatedAt?: Date;
}