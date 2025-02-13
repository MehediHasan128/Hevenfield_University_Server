import { Types } from 'mongoose';
import { TAddress } from '../../constant';
import { TUserName } from '../user/user.constant';

export type TRegistrar = {
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

  isDeleted: boolean;
};
