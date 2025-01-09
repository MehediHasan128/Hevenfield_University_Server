import { model, Schema } from 'mongoose';
import { TUserName } from '../user/user.constant';
import { TGuardian, TLocalGuardian, TStudent } from './student.interface';

const userNameSchema = new Schema<TUserName>({
  firstName: { type: String, required: [true, 'First name is required.'] },
  middleName: { type: String },
  lastName: { type: String, required: [true, 'Last name is required.'] },
});

const guardianSchema = new Schema<TGuardian>({
  // Personal information
  fatherName: { type: String },
  fatherOccupation: { type: String },
  fatherContactNumber: { type: String },

  motherName: { type: String },
  motherOccupation: { type: String },
  motherContactNumber: { type: String },
});

const localGuardianSchema = new Schema<TLocalGuardian>({
  name: { type: String },
  occupation: { type: String },
  contactNumber: { type: String },
});

const studentSchema = new Schema<TStudent>({
  id: {
    type: String,
    required: [true, 'Student ID is required.'],
    unique: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    required: [true, 'User ID is required.'],
  },
  imageURL: { type: String },
  userName: userNameSchema,
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true
  },
  gender: {
    type: String,
    enum: ['male', 'female'],
    required: [true, 'Gender is required.'],
  },
  dateOfBirth: { type: Date, required: [true, 'Date of birth is required.'] },
  contactNumber: {
    type: String,
    required: [true, 'Contact number is required.'],
  },
  emergencyContactNumber: {
    type: String,
    required: [true, 'Emergency contact number is required.'],
  },
  bloodGroup: {
    type: String,
    enum: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'],
    message: 'Invalid blood group.',
  },

  // Address Info
  presentAddress: {
    type: String,
    required: [true, 'Present address is required.'],
  },
  permanentAddress: {
    type: String,
    required: [true, 'Permanent address is required.'],
  },

  // Guardian info
  guardian: guardianSchema,
  localGuardian: localGuardianSchema,

  // Academic Info
  sscRoll: { type: String, required: [true, 'SSC roll is required.'] },
  sscResult: { type: Number, required: [true, 'SSC result is required.'] },
  hscRoll: { type: String, required: [true, 'HSC roll is required.'] },
  hscResult: { type: Number, required: [true, 'HSC result is required.'] },

  // Admission Info
  addmissionSemester: { type: Schema.Types.ObjectId, required: [true, 'Admission semester is required.'], ref: '' },
  academicDepartment: { type: Schema.Types.ObjectId, required: [true, 'Academic department is required.'], ref: '' },
  addmissionFee: { type: Number, required: [true, 'Admission fee is required.'] },
  totalCredits: { type: Number, required: [true, 'Total credits are required.'] },
  creditCost: { type: Number, required: true},
  creditCostAfterWaiver: { type: Number, required: true},
  totalCost: { type: Number, required: [true, 'Total cost is required.'] },
  waiver: { type: String, required: [true, 'Waiver percentage is required.'] },

  isDeleted: { type: Boolean, default: false },
},{
  timestamps: true
});


export const Student = model<TStudent>('Student', studentSchema);
