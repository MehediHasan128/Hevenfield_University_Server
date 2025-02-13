import { Types } from 'mongoose';
import { TUserName } from '../user/user.constant';
import { TAddress } from '../../constant';

export type TAdmin = {
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
  presentAddress: TAddress;
  permanentAddress: TAddress;

  //   Department info
  menegingDepartment: Types.ObjectId;
  isDeleted: boolean;
};
