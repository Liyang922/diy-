import React from "react";
import { RouteObject } from "../interface";
import { LayoutIndex } from "../constant";
import lazyLoad from "../utils/lazyLoad";

const ideaRouter : RouteObject = {
    element: <LayoutIndex />,
    children: [
        {
            path: "/idea",
            element: lazyLoad(React.lazy(() => import("../../views/idea"))),
            meta: {
                requiresAuth: true,
                title: "新点子",
                key: "idea"
            }
        }
    ]
};

export default ideaRouter;