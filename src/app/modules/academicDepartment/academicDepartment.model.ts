import { model, Schema } from "mongoose";
import { TAcademicDepartment } from "./academicDepartment.interface";
import AppError from "../../errors/AppError";
import httpStatus from 'http-status';

const createAcademicDepartmentSchema = new Schema<TAcademicDepartment>({

    academicFaculty: {
        type: Schema.Types.ObjectId,
        ref: 'AcademicFaculties', // Replace with your actual faculty model name
        required: [true, 'Academic faculty is required.'],
      },
      departmentName: {
        type: String,
        required: [true, 'Department name is required.'],
        trim: true,
        validate: {
          validator: (value: string) => value.length >= 3,
          message: 'Department name must be at least 3 characters long.',
        },
      },
      departmentCode: {
        type: String,
        required: [true, 'Department code is required.'],
        unique: true,
        trim: true,
        validate: {
          validator: (value: string) => /^[A-Za-z0-9]+$/.test(value),
          message: 'Department code must be alphanumeric with no spaces.',
        },
      },

});

createAcademicDepartmentSchema.pre('save', async function(next){
    const isDepartmentExists = await AcademicDepartment.findOne({academicFaculty: this.academicFaculty});

    if(isDepartmentExists){
        throw new AppError(httpStatus.CONFLICT, 'Academic department is already exists');
    }

    next();
})

export const AcademicDepartment = model<TAcademicDepartment>('AcademicDepartment', createAcademicDepartmentSchema)