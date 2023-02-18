import React from "react";
import { RouteObject } from "../interface";
import { LayoutIndex } from "../constant";
import lazyLoad from "../utils/lazyLoad";

const doneRouter : RouteObject = {
    element: <LayoutIndex />,
    children: [
        {
            path: "/done",
            element: lazyLoad(React.lazy(() => import("../../views/done"))),
            meta: {
                requiresAuth: true,
                title: "已完成",
                key: "done"
            }
        }
    ]
};

export default doneRouter;