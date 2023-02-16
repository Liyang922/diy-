import { RouteObject } from "../interface";
import { LayoutIndex } from "../constant";
import Plan from "../../views/plan";

const planRouter : RouteObject = {
    element: <LayoutIndex />,
    children: [
        {
            path: "/plan",
            element: <Plan />,
            meta: {
                requiresAuth: true,
                title: "计划中",
                key: "plan"
            }
        }
    ]
};

export default planRouter;