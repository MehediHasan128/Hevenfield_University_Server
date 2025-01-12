import { Types } from "mongoose";
import { TUserName } from "../user/user.constant";


export type TGuardian = {
    fatherName?: string;
    fatherOccupation?: string;
    fatherContactNumber?: string;

    motherName?: string;
    motherOccupation?: string;
    motherContactNumber?: string;
}

export type TLocalGuardian = {
    name: string;
    occupation: string;
    contactNumber: string;
}

export type TStudent = {
    
    // Personal information
    id: string;
    userId: Types.ObjectId;
    imageURL?: string;
    userName: TUserName;
    email: string;
    gender: 'male' | 'female';
    dateOfBirth: Date;
    contactNumber: string;
    emergencyContactNumber: string;
    bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'O+' | 'O-' | 'AB+' | 'AB-';

    // Address Info
    presentAddress: string;
    permanentAddress: string;

    // Guardian info
    guardian: TGuardian;
    localGuardian: TLocalGuardian;

    // Academic Info
    sscRoll: string;
    sscResult: number;
    hscRoll: string;
    hscResult: number;

    // Addmission Info
    batch: string;
    addmissionSemester: Types.ObjectId;
    academicDepartment: Types.ObjectId;
    addmissionFee: number;
    totalCredits: number;
    creditCost: number;
    creditCostAfterWaiver: number;
    totalCost: number;
    waiver: string;

    isDeleted: boolean;
}

