import { model, Schema } from 'mongoose';
import { TAcademicSchool } from './academicSchool.interface';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

const academicSchoolSchema = new Schema<TAcademicSchool>(
  {
    schoolName: {
      type: String,
      required: [true, 'School name is required.'],
      trim: true,
    },
    schoolCode: {
      type: String,
      required: [true, 'School code is required.'],
      unique: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

academicSchoolSchema.pre('save', async function (next) {
  const isAcademicSchoolExists = await AcademicSchool.findOne({
    schoolName: this.schoolName,
  });

  if (isAcademicSchoolExists) {
    throw new AppError(
      httpStatus.CONFLICT,
      'Academic school is already exists',
    );
  }

  next();
});

export const AcademicSchool = model<TAcademicSchool>(
  'AcademicSchool',
  academicSchoolSchema,
);
