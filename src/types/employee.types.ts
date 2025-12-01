export interface IEmployeeDetail {
  employeeId: string;  // required
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: Date;
  gender: "Male" | "Female" | "Other";
  designation: string;
  dateOfJoining: Date;
  bankDetails: {
    accountNumber: string;
    bankName: string;
    IFSC: string;
  };
  salary: number;
  documents: string[];
}
