import React from "react";
import { RouteObject } from "../interface";
import { LayoutIndex } from "../constant";
import lazyLoad from "../utils/lazyLoad";

const chartRouter : RouteObject = {
    element: <LayoutIndex />,
    children: [
        {
            path: "/chart",
            element: lazyLoad(React.lazy(() => import("../../views/chart"))),
            meta: {
                requiresAuth: true,
                title: "可视化",
                key: "chart"
            }
        }
    ]
};

export default chartRouter;