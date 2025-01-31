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

const updateSingleSemesterRegistrationIntoDB = async(semesterRegistrationId: string, payload: Partial<TSemesterRegistration>) => {
    
    // Check the semester is exist or not
    const isSemesterRegistrationExists = await SemesterRegistration.findById(semesterRegistrationId);
    if(!isSemesterRegistrationExists){
        throw new AppError(httpStatus.NOT_FOUND, 'Registered semester not found');
    }

    // Check the semester registration is ended or not
    const currentSemesterRegistrationStatus = isSemesterRegistrationExists?.status;
    const requestSemesterRegistrationStatus = payload?.status;

    if(currentSemesterRegistrationStatus === registrationStatus.ENDED){
        throw new AppError(httpStatus.NOT_FOUND, `This semester is already ${currentSemesterRegistrationStatus}`);
    }

    if(currentSemesterRegistrationStatus === registrationStatus.UPCOMING && requestSemesterRegistrationStatus === registrationStatus.ENDED){
        throw new AppError(httpStatus.BAD_REQUEST, `You cant not directly change status from ${currentSemesterRegistrationStatus} to ${requestSemesterRegistrationStatus}`)
    }

    if(currentSemesterRegistrationStatus === registrationStatus.ONGOING && requestSemesterRegistrationStatus === registrationStatus.UPCOMING){
        throw new AppError(httpStatus.BAD_REQUEST, `You cant not directly change status from ${currentSemesterRegistrationStatus} to ${requestSemesterRegistrationStatus}`)
    }

    const data = await SemesterRegistration.findByIdAndUpdate(semesterRegistrationId, payload, {new: true, runValidators: true});
    return data;

}

export const SemesterRegistrationServices = {
    createSemesterRegistrationIntoDB,
    getAllSemesterRegistrationFromDB,
    getSingleSemesterRegistrationFromDB,
    updateSingleSemesterRegistrationIntoDB
}