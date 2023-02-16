import { Navigate, useRoutes } from "react-router-dom";
import { RouteObject } from "./interface";
import Login from "../views/login";

// glob导入
const metaRouters = import.meta.glob("./modules/*.tsx"); //默认懒加载，返回值为以module为结果的Promise
// const metaRouters = import.meta.globEager("./modules/*.tsx"); //默认懒加载，返回值为以module为结果的Promise

// * 处理routeArr
const routeArr: RouteObject[] = [];
for (const path in metaRouters) {
    const mod : any = await metaRouters[path]();
    routeArr.push(mod.default);
}
console.log("routeArr", routeArr);

export const rootRouter : RouteObject[] = [
    {
        path: "/",
        element: <Navigate to="/login" />
    },
    {
        path: "/login",
        element: <Login />,
        meta: {
            requiresAuth: false,
            title: "登录页",
            key: "login"
        }
    },
    ...routeArr,
    {
        path: "*",
        element: <Navigate to="/404" />
    }
];

export default function Router() {
    const routes = useRoutes(rootRouter);
    return routes;
};