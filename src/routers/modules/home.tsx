import React from "react";
import { RouteObject } from "../interface";
import { LayoutIndex } from "../constant";
// import lazyLoad from "../utils/lazyLoad";
import Home from "../../views/home";

// 首页路由表
const homeRouter : RouteObject = {
    element: <LayoutIndex />,
    children: [
        {
            path: "/home/index",
            // element: lazyLoad(React.lazy(() => import("../../views/home"))),
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