import { Router } from "express";
import { UserRoutes } from "../modules/user/user.router";
import { AuthRoutes } from "../modules/auth/auth.router";
import { AdminRoutes } from "../modules/admin/admin.router";
import { StudentRoutes } from "../modules/student/student.router";
import { FacultyRoutes } from "../modules/faculty/faculty.router";
import { OfferedCourseRoutes } from "../modules/offeredCourse/offeredCourse.router";
import { AcademicFaccultyRoutes } from "../modules/academicFaculty/academicFaculty.router";
import { AcademicSemesterRoutes } from "../modules/academicSemester/academicSemester.router";
import { AcademicDepartmentRoutes } from "../modules/academicDepartment/academicDepartment.router";
import { SemesterRegistrationRoutes } from "../modules/semesterRagistration/smesterRgistration.router";
import { CourseRoutes } from "../modules/course/course.router";

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
        path: '/course',
        routes: CourseRoutes
    },
    {
        path: '/offeredCourse',
        routes: OfferedCourseRoutes
    },
];

moduleRoutes.forEach((route) => router.use(route.path, route.routes));

export default router;