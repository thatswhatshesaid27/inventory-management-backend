export interface IRulesDetail {
   _id?: string;    
  title: string;
  description: string;
  effectiveDate: Date;
  status: "Active" | "Inactive";
    createdAt?: Date;
    updatedAt?: Date
  
  
}   