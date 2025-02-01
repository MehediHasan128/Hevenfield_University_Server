import { Types } from "mongoose";

export type TPreRequisiteCourse = {
    course: Types.ObjectId;
    isDeleted: boolean;
}

export type TCourse = {
    courseTitle: string;
    prefix: string;
    code: string;
    courseCode: string;
    credits: number;
    preRequisiteCourse: TPreRequisiteCourse[];
    isDeleted: boolean;
}