import { model, Schema } from 'mongoose';
import { userNameSchema } from '../user/user.constant';
import { addressSchema } from '../../constant';
import { TRegistrar } from './registrar.interface';

const RegistrarSchema = new Schema<TRegistrar>(
  {
    id: {
      type: String,
      required: [true, 'Faculty ID is required'],
      unique: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: [true, 'User ID is required'],
      ref: 'User',
    },

    // Personal Information
    imageURL: { type: String },
    userName: userNameSchema,
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      match: [/.+@.+\..+/, 'Invalid email format'],
    },
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
    dateOfJoining: {
      type: Date,
      required: [true, 'Date of joining is required'],
    },

    // Address Info
    presentAddress: {
      type: addressSchema,
    },
    permanentAddress: {
      type: addressSchema,
    },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true },
);

export const Registrar = model<TRegistrar>('Registrar', RegistrarSchema);