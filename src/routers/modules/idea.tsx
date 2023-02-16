import { RouteObject } from "../interface";
import { LayoutIndex } from "../constant";
import Idea from "../../views/idea";

const ideaRouter : RouteObject = {
    element: <LayoutIndex />,
    children: [
        {
            path: "/idea",
            element: <Idea />,
            meta: {
                requiresAuth: true,
                title: "新点子",
                key: "idea"
            }
        }
    ]
};

export default ideaRouter;