import { RouteObject } from "../interface";
import { LayoutIndex } from "../constant";
import Home from "../../views/home";

// 首页路由表
const homeRouter : RouteObject = {
    element: <LayoutIndex />,
    children: [
        {
            path: "/home/index",
            element: <Home />,
            meta: {
                requiresAuth: true,
                title: "首页",
                key: "home"
            }
        }
    ]
};

export default homeRouter;