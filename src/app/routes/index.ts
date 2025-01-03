import { Router } from "express";
import { UserRoutes } from "../modules/user/user.router";
import { StudentRoutes } from "../modules/student/student.router";

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
];

moduleRoutes.forEach((route) => router.use(route.path, route.routes));

export default router;