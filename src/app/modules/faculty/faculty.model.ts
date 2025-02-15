import { model, Schema } from 'mongoose';
import {
  TEducationalBackground,
  TFaculty,
  TProfessionalExperience,
  TRecommendationLetters,
  TReference,
  TSampleWorkPortfolio,
} from './faculty.interface';
import { TUserName } from '../user/user.constant';
import { addressSchema } from '../../constant';
import { FacultyDesignation } from './faculty.constant';

const userNameSchema = new Schema<TUserName>({
  firstName: { type: String, required: [true, 'First name is required.'] },
  lastName: { type: String, required: [true, 'Last name is required.'] },
});

const educationalBackgroundSchema = new Schema<TEducationalBackground>([
  {
    degree: { type: String, required: [true, 'Degree is required'] },
    university: { type: String, required: [true, 'University is required'] },
    yearOfGraduation: {
      type: String,
      required: [true, 'Year of graduation is required'],
    },
    specialization: {
      type: String,
      required: [true, 'Specialization is required'],
    },
  },
]);

const professionalExperienceSchema = new Schema<TProfessionalExperience>([
  {
    role: { type: String },
    institution: { type: String },
    duration: { type: String },
    responsibilities: { type: String },
  },
]);

const recommendationLetterSchema = new Schema<TRecommendationLetters>([
  {
    name: { type: String },
    designation: { type: String },
    institution: { type: String },
    contactEmail: { type: String },
  },
]);

const sampleWorkPortfolioSchema = new Schema<TSampleWorkPortfolio>([
  {
    type: { type: String },
    url: { type: String },
  },
]);

const referenceSchema = new Schema<TReference>({
  name: { type: String, required: [true, 'Name is required'] },
  designation: { type: String, required: [true, 'Designation is required'] },
  institution: { type: String, required: [true, 'Institution is required'] },
  contactNumber: {
    type: String,
    required: [true, 'Contact number is required'],
  },
  email: { type: String, required: [true, 'Email is required'] },
});

const facultSchema = new Schema<TFaculty>(
  {
    id: { type: String, required: [true, 'ID is required'] },
    userId: {
      type: Schema.Types.ObjectId,
      required: [true, 'User ID is required'],
    },

    // Personal Information
    imageURL: { type: String },
    userName: userNameSchema,
    email: { type: String, required: [true, 'Email is required'] },
    gender: {
      type: String,
      enum: ['male', 'female'],
      required: [true, 'Gender is required'],
    },
    dateOfBirth: { type: Date, required: [true, 'Date of birth is required.'] },
    contactNumber: {
      type: String,
      required: [true, 'Contact number is required'],
    },
    bloodGroup: {
      type: String,
      enum: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'],
      message: 'Invalid blood group.',
    },
    designation: {
      type: String,
      enum: FacultyDesignation,
      required: [true, 'Faculty designation is required']
    },
    joiningDate: { type: Date, required: [true, 'Joining date is required.'] },

    // Address Info
    presentAddress: {
      type: addressSchema,
    },
    permanentAddress: {
      type: addressSchema,
    },

    // Educational Background
    educationalBackground: {
      type: [educationalBackgroundSchema],
      required: [true, 'Educational background is required'],
    },

    // Professional Experience
    professionalExperience: { type: [professionalExperienceSchema] },

    // Skills and Certifications
    skillsAndCertifications: { type: [String] },

    // Sample Work Portfolio
    sampleWorkPortfolio: { type: [sampleWorkPortfolioSchema] },

    // Recommendation Letters
    recommendationLetters: { type: [recommendationLetterSchema] },

    // Awards and Achievements
    awardsAndAchievements: { type: [String] },

    // Reference
    reference: {
      type: referenceSchema,
      required: [true, 'Reference is required'],
    },
    academicDepartment: {
      type: Schema.Types.ObjectId,
      required: [true, 'Academic department is required'],
      ref: 'AcademicDepartment',
    },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

export const Faculty = model<TFaculty>('faculties', facultSchema);
