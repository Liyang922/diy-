import { RouteObject } from "../interface";
import { LayoutIndex } from "../constant";
import Done from "../../views/done";

const doneRouter : RouteObject = {
    element: <LayoutIndex />,
    children: [
        {
            path: "/done",
            element: <Done />,
            meta: {
                requiresAuth: true,
                title: "已完成",
                key: "done"
            }
        }
    ]
};

export default doneRouter;