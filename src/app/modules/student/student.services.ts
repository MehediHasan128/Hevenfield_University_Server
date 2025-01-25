import { Student } from "./student.model";

const getAllStudentFromDB = async(query: Record<string, unknown>) => {
    console.log('baseQuery', query);
    const queryObj = {...query};
    console.log('queryObj', queryObj);

    let searchTerm = '';
    if(query?.searchTerm) {
        searchTerm = query?.searchTerm as string;
    }

    const studentSerachableFields = ['id', 'email', 'contactNumber'];

    const searchQuery = await Student.find({
        $or: studentSerachableFields.map((field) => ({
            [field]: { $regex: searchTerm, $options: 'i'},
        }))
    });

    return searchQuery;
}


export const StudentServices = {
    getAllStudentFromDB
}