import { AnyAction } from "redux";
import { MenuState } from "../../interface";
import produce from "immer";
import { UPDATE_COLLAPSE, SET_MENU_LIST } from "../../types";

const menuState: MenuState = {
	isCollapse: false,
	menuList: []
};

// menu reducer
export default function menuReducer(state: MenuState = menuState, action: AnyAction) {
    return produce(state, draftState => {
		switch (action.type) {
			case UPDATE_COLLAPSE:
				draftState.isCollapse = action.isCollapse;
				break;
			case SET_MENU_LIST:
				draftState.menuList = action.menuList;
				break;
			default:
				return draftState;
		}
    });
}	
