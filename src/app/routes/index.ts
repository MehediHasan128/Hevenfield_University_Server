import { Router } from "express";
import { UserRoutes } from "../modules/user/user.router";
import { StudentRoutes } from "../modules/student/student.router";
import { AcademicFaccultyRoutes } from "../modules/academicFaculty/academicFaculty.router";
import { AcademicDepartmentRoutes } from "../modules/academicDepartment/academicDepartment.router";
import { AcademicSemesterRoutes } from "../modules/academicSemester/academicSemester.router";
import { AuthRoutes } from "../modules/auth/auth.router";
import { FacultyRoutes } from "../modules/faculty/faculty.router";

const router = Router();

const moduleRoutes = [
    {
        path: '/users',
        routes: UserRoutes
    },
    {
        path: '/students',
        routes: StudentRoutes
    },
    {
        path: '/faculties',
        routes: FacultyRoutes
    },
    {
        path: '/academicFaulties',
        routes: AcademicFaccultyRoutes
    },
    {
        path: '/academicDepartment',
        routes: AcademicDepartmentRoutes
    },
    {
        path: '/academicSemester',
        routes: AcademicSemesterRoutes
    },
    {
        path: '/auth',
        routes: AuthRoutes
    },
];

moduleRoutes.forEach((route) => router.use(route.path, route.routes));

export default router;