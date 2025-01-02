import { Router } from "express";
import { UserRoutes } from "../modules/user/user.router";

const router = Router();

const moduleRoutes = [
    {
        path: '',
        routes: UserRoutes
    }
];

moduleRoutes.forEach((route) => router.use(route.path, route.routes));

export default router