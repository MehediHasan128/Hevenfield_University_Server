import { Router } from "express";
import { UserRoutes } from "../modules/user/user.router";
import { StudentRoutes } from "../modules/student/student.router";
import { AcademicFaccultyRoutes } from "../modules/academicFaculty/academicFaculty.router";
import { AcademicDepartmentRoutes } from "../modules/academicDepartment/academicDepartment.router";
import { AcademicSemesterRoutes } from "../modules/academicSemester/academicSemester.router";
import { AuthRoutes } from "../modules/auth/auth.router";
import { FacultyRoutes } from "../modules/faculty/faculty.router";
import { AdminRoutes } from "../modules/admin/admin.router";
import { SemesterRegistrationRoutes } from "../modules/semesterRagistration/smesterRgistration.router";
import { OfferedCourseRoutes } from "../modules/offeredCourse/offeredCourse.router";

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
        path: '/admin',
        routes: AdminRoutes
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
    {
        path: '/semesterRegistration',
        routes: SemesterRegistrationRoutes
    },
    {
        path: '/offeredCourse',
        routes: OfferedCourseRoutes
    },
];

moduleRoutes.forEach((route) => router.use(route.path, route.routes));

export default router;