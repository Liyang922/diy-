import { SET_BREADCRUMB_LIST } from "../../types";

// * setBreadcrumbList
export const setBreadcrumbList = (breadcrumbList: { [propName: string]: any }) => ({
	type: SET_BREADCRUMB_LIST,
	breadcrumbList
});
