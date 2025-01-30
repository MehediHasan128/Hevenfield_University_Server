import { Types } from 'mongoose';
import { TUserName } from '../user/user.constant';

export type TFaculty = {
  id: string;
  userId: Types.ObjectId;

  // Personal Information
  imageURL?: string;
  userName: TUserName;
  email: string;
  gender: 'male' | 'female';
  dateOfBirth: Date;
  contactNumber: string;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'O+' | 'O-' | 'AB+' | 'AB-';
  dateOfJoining: Date;

  // Address Info
  presentAddress: string;
  permanentAddress: string;

  //   Department info
  menegingDepartment: Types.ObjectId
};
