import { RouteObject } from "../routers/interface";
import { Menu } from "../api/interface";
import { Item } from "../redux/interface";

/**
 * @description 获取浏览器默认语言
 * @return string
 */
export const getBrowserLang = () => {
	// const browserLang = navigator.language ? navigator.language : navigator.browserLanguage;
	const browserLang = navigator.language;
	let defaultBrowserLang = "";
	if (browserLang.toLowerCase() === "cn" || browserLang.toLowerCase() === "zh" || browserLang.toLowerCase() === "zh-cn") {
		defaultBrowserLang = "zh";
	} else {
		defaultBrowserLang = "en";
	}
	return defaultBrowserLang;
};

/**
 * @description 递归查询对应路由
 * @param path 当前访问地址
 * @param routes 路由列表
 * @returns 对应路由对象
 */
export function searchRoute (path: string, routes: RouteObject[] = []) : RouteObject {
    // console.log("searchRoute接收到的rootRouter", routes);
    let result : RouteObject = {};
    for(const item of routes) {
        // console.log("item of routes", item);
        if(item.path == path) {
            // console.log("item.path == path", item);
            return item;
        }
        if(item.children) {
            const res = searchRoute(path, item.children);
            if(Object.keys(res).length) result = res;
        }
    }
    return result;
}

/**
 * @description 使用递归处理路由菜单，生成一维数组，做菜单权限判断
 * @param {Array} menuList 所有菜单列表
 * @param {Array} newArr 菜单的一维数组
 * @return array
 */
export function handleRouter(routerList: Menu.MenuOptions[], newArr: string[] = []) {
	routerList.forEach((item: Menu.MenuOptions) => {
		typeof item === "object" && item.path && newArr.push(item.path);
		item.children && item.children.length && handleRouter(item.children, newArr);
	});
	return newArr;
}

/**
 * @description 得到当前path的面包屑导航array
 * @param path 当前访问地址
 * @param menuList 菜单列表
 */
export function getBreadcrumbList(path : string, menuList : Menu.MenuOptions[]) {
    const tempPath : any[] = [];

    function getNodePath(node : Menu.MenuOptions) {
        tempPath.push(node);
        if(node.path == path) throw new Error();
        if(node.children && node.children.length > 0) {
            node.children.forEach(item => getNodePath(item));
            // 当前节点的所有子节点未匹配，删除当前节点
            tempPath.pop();
        } else {
            // 当前节点未匹配
            tempPath.pop();
        }
    }

    try {
        menuList.forEach(item => {
            getNodePath(item);
        });
    } catch(e) {
        return tempPath.map(item => item.title);
    }
}

/**
 * @description 遍历menuList，得到每一项的面包屑导航array
 * @param menuList 菜单列表
 * @returns 每一项菜单对应的面包屑导航
 */
export function findAllBreadcrumb(menuList: Menu.MenuOptions[]): { [key: string]: any } {
    const allBreadcrumb : any = {};

    function loop(item : Menu.MenuOptions) {
        if(item?.children?.length) item.children.forEach(element => loop(element));
        allBreadcrumb[item.path] = getBreadcrumbList(item.path, menuList);
    }

    menuList.forEach(item => loop(item));
    return allBreadcrumb;
}

/**
 * @description 得到当前展开菜单及以上的根项
 * @param {String} path 当前访问地址
 * @returns array
 */
export const getOpenKeys = (path: string) => {
    // console.log("getOpenKeys的参数:", path);
	let newStr = "";
	const newArr = [];
	const arr = path.split("/").map(i => "/" + i); //pathname:"/menu/menu2/menu22/menu221"
	for (let i = 1; i < arr.length - 1; i++) { // 没有最后一项！
		newStr += arr[i];
		newArr.push(newStr);
	}
    // console.log("getOpenKeys的返回值:", newArr);
	return newArr; // ['/menu', '/menu/menu2', '/menu/menu2/menu22']
};

/**
 * @description 获取每个状态应该渲染的item的id列表
 * @param itemList 
 * @param status 
 */
export const getRenderItemList = (itemList : Item[], status : string) => {
    const res : {[propName: string]: string[]} = {};
    const key = status + "Date";
    itemList.forEach((item : Item) => {
        const date = item[key];  
        if(item.status == status) {
            if(!Object.hasOwn(res, date)) {
                res[date] = [];
                res[date].push(item.id);
            } else {
                res[date].push(item.id);
            }
        }
    });
    return res;
}