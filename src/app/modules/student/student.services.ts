import QueryBuilder from "../../buildre/QueryBuildre";
import { studentSearchableFields } from "./student.constant";
import { Student } from "./student.model";

const getAllStudentFromDB = async(query: Record<string, unknown>) => {
    const studentQuery = new QueryBuilder(Student.find().populate('addmissionSemester').populate({
        path: 'academicDepartment',
        populate: {path: 'academicFaculty'}
    }), query).search(studentSearchableFields).filter().sort().paginate().fields();

    const data = await studentQuery.queryModel;

    return data;
}


export const StudentServices = {
    getAllStudentFromDB
}