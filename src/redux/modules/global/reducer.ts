import { AnyAction } from "redux";
import produce from "immer";
import { GlobalState } from "../../interface";
import { SET_TOKEN, SET_LANGUAGE, SET_ASSEMBLY_SIZE, SET_THEME_CONFIG } from "../../types";

const globalState : GlobalState = {
    token: "",
    userInfo: "",
    assemblySize: "middle",
	language: "",
	themeConfig: {
		// 默认 primary 主题颜色
		primary: "#1890ff",
		// 深色模式
		isDark: false,
		// 色弱模式(weak) || 灰色模式(gray)
		weakOrGray: "",
		// 面包屑导航
		breadcrumb: true,
		// 标签页
		tabs: true,
		// 页脚
		footer: true
	}
}

export default function globalReducer(state : GlobalState = globalState, action : AnyAction) {
    return produce(state, draftState => {
        switch (action.type) {
			case SET_TOKEN:
				draftState.token = action.token;
				break;
			case SET_ASSEMBLY_SIZE:
				draftState.assemblySize = action.assemblySize;
				break;
			case SET_LANGUAGE:
				draftState.language = action.language;
				break;
			case SET_THEME_CONFIG:
				draftState.themeConfig = action.themeConfig;
				break;
			default:
				return draftState;
		}
    });
}
