import type { SizeType } from "antd/lib/config-provider/SizeContext";
import { Menu } from "../api/interface";

/* 主题配置 */
export interface ThemeConfigProp {
	primary: string;
	isDark: boolean;
	weakOrGray: string;
	breadcrumb: boolean;
	tabs: boolean;
	footer: boolean;
}

/* 全局配置 */
export interface GlobalState {
	token: string;
	userInfo: any;
	assemblySize: SizeType;
	language: string;
	themeConfig: ThemeConfigProp;
}

/* AuthState */
export interface AuthState {
	authButtons: {
		[propName: string]: any;
	};
	authRouter: string[];
}

/* MenuState */
export interface MenuState {
	isCollapse: boolean;
	menuList: Menu.MenuOptions[];
}

/* BreadcrumbState */
export interface BreadcrumbState {
	breadcrumbList: {
		[propName: string]: any;
	};
}

/* stock */
export interface StockData {
	key: string,
	category: string,
	subcategory?: string,
	number: string,
}
export interface StockState {
	stockData: StockData[]
}

/* item：展示项 */
export interface ItemState {
	itemList: Item[]
}

export interface Item {
	id: string,
	name: string,
	status: string, // status: idea | plan | done
	description?: string,
	stockList?: ItemStock, // 每个item需要的零件列表
	ideaDate: string, //item创建时间（所属展示类别）
	planDate: string, //计划完成时间
	doneDate: string, //实际完成时间
}

// 所需零件
export interface ItemStock {
	[propName: string]: number;
}