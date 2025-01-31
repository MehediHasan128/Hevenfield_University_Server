import QueryBuilder from "../../buildre/QueryBuildre";
import AppError from "../../errors/AppError";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import { registrationStatus } from "./smesterRgistration.constant";
import { TSemesterRegistration } from "./smesterRgistration.interface";
import { SemesterRegistration } from "./smesterRgistration.model";
import httpStatus from 'http-status';

const createSemesterRegistrationIntoDB = async(payload: TSemesterRegistration) => {

    // check the semester registration is exists or not
    const isSemesterRegistrationExists = await SemesterRegistration.findOne({
        $and: [
            {academicSemester: payload?.academicSemester},
            {
                $or: [
                    {status: registrationStatus.UPCOMING},
                    {status: registrationStatus.ONGOING}
                ]
            }
        ]
    });
    if(isSemesterRegistrationExists){
        throw new AppError(httpStatus.CONFLICT, 'Semester is already resgistred');
    }
    
    // Check if there are any upcoming or ongoing semester
    const isThereAnyUpcomingOrOngoingSemester = await SemesterRegistration.findOne({
        $or: [
            {status: registrationStatus.UPCOMING},
            {status: registrationStatus.ONGOING}
        ]
    });

    if(isThereAnyUpcomingOrOngoingSemester){
        throw new AppError(httpStatus.BAD_REQUEST, `There is already an ${isThereAnyUpcomingOrOngoingSemester?.status} registered semester`);
    }

    // Check if the semester is exists
    const isAcademicSemesterExists = await AcademicSemester.findById(payload?.academicSemester);
    if(!isAcademicSemesterExists){
        throw new AppError(httpStatus.NOT_FOUND, 'Academic semester not found!');
    }

    // Create semester registration
    const data = await SemesterRegistration.create(payload);
    return data;

}

const getAllSemesterRegistrationFromDB = async(query: Record<string, unknown>) => {
    const semesterRegistrationQuery = new QueryBuilder(SemesterRegistration.find().populate('academicSemester'), query).filter().sort().paginate().fields();
    const data = await semesterRegistrationQuery.queryModel;
    return data;
}

const getSingleSemesterRegistrationFromDB = async(semesterRegistrationId: string) => {
    const data = await SemesterRegistration.findById(semesterRegistrationId).populate('academicSemester');
    return data;
}

const updateSingleSemesterRegistrationIntoDB = async() => {
    console.log(4);
}

export const SemesterRegistrationServices = {
    createSemesterRegistrationIntoDB,
    getAllSemesterRegistrationFromDB,
    getSingleSemesterRegistrationFromDB,
    updateSingleSemesterRegistrationIntoDB
}