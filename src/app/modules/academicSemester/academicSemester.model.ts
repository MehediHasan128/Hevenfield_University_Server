import { model, Schema } from 'mongoose';
import { TAcademicSemester } from './academicSemester.interface';
import {
  Months,
  SemesterCode,
  SemesterName,
} from './academicSemester.constant';

const createAcademicSemesterSchema = new Schema<TAcademicSemester>({
  semesterName: {
    type: String,
    enum: SemesterName,
    required: [true, 'Semester name is required.'],
    validate: {
      validator: function (value) {
        return ['Spring', 'Summer', 'Fall'].includes(value);
      },
      message: (props) => `${props.value} is not a valid semester name.`,
    },
  },
  semesterCode: {
    type: String,
    enum: SemesterCode,
    required: [true, 'Semester code is required.'],
    validate: {
      validator: function (value) {
        return ['01', '02', '03'].includes(value);
      },
      message: (props) => `${props.value} is not a valid semester code.`,
    },
  },
  year: {
    type: String,
    required: [true, 'Year is required.'],
    match: [/^\d{4}$/, 'Year must be a valid 4-digit year.'],
  },
  startMonth: {
    type: String,
    enum: Months,
    required: [true, 'Start month is required.'],
    validate: {
      validator: function (value) {
        return Months.includes(value);
      },
      message: (props) => `${props.value} is not a valid month.`,
    },
  },
  endMonth: {
    type: String,
    enum: Months,
    required: [true, 'End month is required.'],
    validate: {
      validator: function (value) {
        return Months.includes(value);
      },
      message: (props) => `${props.value} is not a valid month.`,
    },
  },
},{
  timestamps: true
});


export const AcademicSemester = model<TAcademicSemester>('AcademicSemester', createAcademicSemesterSchema);
