import { model, Schema } from "mongoose";
import { TSemesterRegistration } from "./smesterRgistration.interface";

const semesterRegistrationSchema = new Schema<TSemesterRegistration>({
    academicSemester: {
        type: Schema.Types.ObjectId,
        ref: 'AcademicSemester',
        required: [true, 'Academic semester is required.']
    },
    status: {
        type: String,
        enum: ['UPCOMING', 'ONGOING', 'ENDED'],
        required: [true, 'Status is required.'],
        default: 'UPCOMING'
    },
    startDate: {
        type: Date,
        required: [true, 'Start date is required.'],
        validate: {
            validator: function (value) {
                return value instanceof Date && !isNaN(value.getTime());
            },
            message: 'Invalid start date format.'
        }
    },
    endDate: {
        type: Date,
        required: [true, 'End date is required.'],
        validate: {
            validator: function (value) {
                return value instanceof Date && !isNaN(value.getTime());
            },
            message: 'Invalid end date format.'
        }
    },
    minCredits: {
        type: Number,
        required: [true, 'Minimum credits are required.'],
        min: [12, 'Minimum credits must be at least 13.'],
        default: 12
    },
    maxCredits: {
        type: Number,
        required: [true, 'Maximum credits are required.'],
        max: [22, 'Maximum credits must be at least 22.'],
        default: 22
    }
}, {timestamps: true});


export const SemesterRegistration = model<TSemesterRegistration>('SemesterRegistration', semesterRegistrationSchema);