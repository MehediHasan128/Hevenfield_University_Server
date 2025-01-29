import { Types } from 'mongoose';
import { TUserName } from '../user/user.constant';

export type TEducationalBackground = {
  degree: string;
  university: string;
  yearOfGraduation: string;
  specialization: string;
}[];

export type TProfessionalExperience = {
  role?: string;
  institution?: string;
  duration?: string;
  responsibilities?: string;
}[];

export type TRecommendationLetters = {
  name?: string;
  designation?: string;
  institution?: string;
  contactEmail?: string;
}[];

export type TSampleWorkPortfolio = {
  type?: string;
  url?: string;
}[];

export type TReference = {
  name: string;
  designation: string;
  institution: string;
  contactNumber: string;
  email: string;
};

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

  // Address Info
  presentAddress: string;
  permanentAddress: string;

  // Educational Background
  educationalBackground: TEducationalBackground;
  // Professional Experience
  professionalExperience?: TProfessionalExperience | undefined;
  skillsAndCertifications?: string[] | undefined;
  sampleWorkPortfolio?: TSampleWorkPortfolio | undefined;
  awardsAndAchievements?: string[] | undefined;
  recommendationLetters?: TRecommendationLetters | undefined;
  reference: TReference;
};
