import { model, Schema } from "mongoose";
import { TAcademicFaculty } from "./academicFaculty.interface";
import AppError from "../../errors/AppError";
import httpStatus from 'http-status';

const academicFacultySchema = new Schema<TAcademicFaculty>({
    facultyName: {
        type: String,
        required: [true, 'Faculty name is required.'],
        trim: true
      },
      facultyCode: {
        type: String,
        required: [true, 'Faculty code is required.'],
        unique: true,
        trim: true
      }
},{
    timestamps: true
});

// academicFacultySchema.pre('save', async function(next) {
//     const isAcademicFacultyExists = await AcademicFaculty.findOne({facultyName: this.facultyName});

//     if(isAcademicFacultyExists){
//         throw new AppError(httpStatus.CONFLICT, 'Academic faculty is already exists');
//     }

//     next();
// })

export const AcademicFaculty = model<TAcademicFaculty>('AcademicFaculties', academicFacultySchema);