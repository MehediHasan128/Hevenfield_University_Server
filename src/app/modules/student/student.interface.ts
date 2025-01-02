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
    sscResult: string;
    hscRoll: string;
    hscResult: string;

    // Addmission Info
    addmissionSemester: Types.ObjectId;
    academicDepartment: Types.ObjectId;

    isDeleted: boolean;
}