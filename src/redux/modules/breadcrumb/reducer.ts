import { AnyAction } from "redux";
import { BreadcrumbState } from "../../interface";
import produce from "immer";
import { SET_BREADCRUMB_LIST } from "../../types";

const breadcrumbState: BreadcrumbState = {
	breadcrumbList: {}
};

// breadcrumb reducer
export default function breadcrumbReducer (state: BreadcrumbState = breadcrumbState, action: AnyAction) {
	return produce(state, draftState => {
		switch (action.type) {
			case SET_BREADCRUMB_LIST:
				draftState.breadcrumbList = action.breadcrumbList;
				break;
			default:
				return draftState;
		}
	});
}