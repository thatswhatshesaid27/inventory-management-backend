export interface ISalaryDetail  {
    _id?: string;
    employeeId: string;
    basicPay: number;
    otherAllowances: number;
    bonuses: number;
    deductions: {
        pf: number;
        tax: number;
        loan: number;
        others?: number;
    };
    netSalary: number;
    paymentStatus: "Paid" | "Pending" | "Failed";
} 