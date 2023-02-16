import React from "react";
import { RouteObject } from "../interface";
import lazyLoad from "../utils/lazyLoad";
import { LayoutIndex } from "../constant";

const stockRouter : RouteObject = {
    element: <LayoutIndex />,
    meta: {
        title: "库存分析"
    },
    children: [
        {
            path: "/stock/exsitingForm",
            element: lazyLoad(React.lazy(() => import("../../views/stock/exsitingStock/index"))),
            meta: {
                requiresAuth: true,
                title: "现有库存",
                key: "exsitingStock"
            }
        },
        {
            path: "/stock/requiredForm",
            element: lazyLoad(React.lazy(() => import("../../views/stock/requiredStock/index"))),
            meta: {
                requiresAuth: true,
                title: "计划所需库存",
                key: "requiredForm"
            }
        },
    ]
};

export default stockRouter;