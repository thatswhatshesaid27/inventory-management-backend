export interface IConveyanceDetail  {
    _id?: string;
    employeeId: string;
    date: Date;
    travelType: "Bus" | "Train" | "Taxi" | "Personal Vehicle" | "Other";
    fromLocation: string;
    toLocation: string;
    amount: number;
    purpose: string;
    status: "Pending" | "Approved" | "Rejected";
    createdAt?: Date;
    updatedAt?: Date;
} 