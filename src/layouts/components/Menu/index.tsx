import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Menu, Spin } from "antd";
import type { MenuProps } from 'antd';
import * as Icons from "@ant-design/icons";
import { connect } from "react-redux";
import { findAllBreadcrumb, getOpenKeys, handleRouter, searchRoute } from "../../../utils/index";
import { Menu as MenuNameSpace} from "../../../api/interface";
import { setMenuList } from "../../../redux/modules/menu/action";
import { setAuthRouter } from "../../../redux/modules/auth/action";
import { setBreadcrumbList } from "../../../redux/modules/breadcrumb/action";
import { getMenuList } from "../../../api/modules/login";
import Logo from "./components/logo";
import "./index.less";

function LayoutMenu(props: any) {
	const { setMenuList : setMenuListAction, setBreadcrumbList, setAuthRouter, isCollapse } = props;
	const { pathname } = useLocation();
	const [selectedKeys, setSelectedKeys] = useState<string[]>([pathname]); // 当前选中的菜单叶子项
	const [openKeys, setOpenKeys] = useState<string[]>([]); // 当前打开的菜单根项

	useEffect(() => {
		// 路径改变时重新设置selectedKeys，被选中的子项变蓝
		setSelectedKeys([pathname]);
		// 折叠状态改变时将当前路径上的菜单项加入openKeys，达到高亮效果
		// isCollapse && setOpenKeys(getOpenKeys(pathname));
		isCollapse ? null : setOpenKeys(getOpenKeys(pathname));
	}, [pathname, isCollapse]);

	// 菜单展开状态改变时，改变openKeys以实现展开菜单高亮，非展开菜单不高亮
	const onOpenChange = (keys : string[]) => {
		if(keys.length <= 1) return setOpenKeys(keys);
		const lastKey = keys[keys.length - 1];
		if(lastKey.includes(keys[0])) return setOpenKeys(keys);
		setOpenKeys([lastKey]);
	}


	// 定义MenuItem类型
	type MenuItem = Required<MenuProps>['items'][number];
	// 将普通数据转换为MenuItem类型
	function getItem(
		label: React.ReactNode,
		key: React.Key,
		icon?: React.ReactNode,
		children?: MenuItem[],
		type?: 'group',
	  ): MenuItem {
		return {
		  key,
		  icon,
		  children,
		  label,
		  type,
		} as MenuItem;
	}

	// 由string类型的name得到React.ReactNode类型的icon
	const customIcons : { [key : string] : any } = Icons;
	function addIcon(name : string) {
		return React.createElement(customIcons[name]);
	}

	// 将后台返回数据（Menu.MenuOptions[]）转换为MenuItem[]
	function deepLoopFloat(menuList : MenuNameSpace.MenuOptions[], newArr : MenuItem[] = []) {
		menuList.forEach((item : MenuNameSpace.MenuOptions) => {
			if(!item?.children?.length) return newArr.push(getItem(item.title, item.path, addIcon(item.icon!))); 
			newArr.push(getItem(item.title, item.path, addIcon(item.icon!), deepLoopFloat(item.children)));
		});
		return newArr;
	}


	// 得到Menu-items
	const [menuList, setMenuList] = useState<MenuItem[]>([]);
	const [loading, setLoading] = useState(false);
	const getMenuData = async () => {
		setLoading(true);
		try {
			const { data : menuListData } = await getMenuList();
			if (!menuListData) return;
			// 转换数据格式
			setMenuList(deepLoopFloat(menuListData));
			// 存储BreadcrumbList到redux
			setBreadcrumbList(findAllBreadcrumb(menuListData));
			// 把路由菜单处理成一维数组，存储到 redux 中，做菜单权限判断
			const dynamicRouter = handleRouter(menuListData);
			setAuthRouter(dynamicRouter);
			// 将菜单数据存储到redux
			setMenuListAction(menuListData);
		} finally {
			// console.log("menulist", menuList);
			setLoading(false);
		}
	};
	useEffect(() => {
		getMenuData();
	}, []);

	// 点击跳转
	const navigate = useNavigate();
	const clickMenu: MenuProps['onClick'] = ({key} : {key : string}) => {
		// console.log("menu点击的key", key);
		const route = searchRoute(key, props.menuList);
		// console.log("menu点击的key搜索到的路由", route, route.isLink);
		if(route.isLink) window.open(route.isLink, "_blank"); 
		navigate(key);
	};

    return (
		<div className="menu">
			<Spin spinning={loading} tip="Loading...">
				<Logo></Logo>
				<Menu
					theme="dark"
					mode="inline"
					triggerSubMenuAction="click"
					openKeys={openKeys}
					selectedKeys={selectedKeys}
					onOpenChange={onOpenChange}
					items={menuList}
					onClick={clickMenu}
				></Menu>
			</Spin>
		</div>
    );
}

const mapStateToProps = (state: any) => state.menu;
const mapDispatchToProps = { setMenuList, setBreadcrumbList, setAuthRouter };
export default connect(mapStateToProps, mapDispatchToProps)(LayoutMenu);