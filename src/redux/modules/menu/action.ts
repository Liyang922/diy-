import { UPDATE_COLLAPSE, SET_MENU_LIST } from "../../types";
import { getMenuList } from "../../../api/modules/login";
import { Menu } from "../../../api/interface";
import { Dispatch } from "react";

// * updateCollapse
export const updateCollapse = (isCollapse: boolean) => ({
	type: UPDATE_COLLAPSE,
	isCollapse
});

// * setMenuList
export const setMenuList = (menuList: Menu.MenuOptions[]) => ({
	type: SET_MENU_LIST,
	menuList
});

// ? 下面方法仅为测试使用，不参与任何功能开发
interface MenuProps {
	type: string;
	menuList: Menu.MenuOptions[];
}
// * redux-thunk
export const getMenuListActionThunk = () => {
	return async (dispatch: Dispatch<MenuProps>) => {
		const res = await getMenuList();
		dispatch({
			type: SET_MENU_LIST,
			menuList: (res.data as Menu.MenuOptions[]) ?? []
		});
	};
};

// * redux-promise《async/await》
export const getMenuListAction = async (): Promise<MenuProps> => {
	const res = await getMenuList();
	return {
		type: SET_MENU_LIST,
		menuList: res.data ? res.data : []
	};
};

// * redux-promise《.then/.catch》
export const getMenuListActionPromise = (): Promise<MenuProps> => {
	return getMenuList().then(res => {
		return {
			type: SET_MENU_LIST,
			menuList: res.data ? res.data : []
		};
	});
};
