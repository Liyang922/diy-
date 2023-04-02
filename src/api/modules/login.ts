import qs from "qs";
import { Login, Menu } from "../interface";
import { PORT1 } from "../config/servicePort";
import http from "../index";


/** 
 *  @name 登录模块
 */
// 用户登录接口
export function loginApi(params: Login.ReqLoginForm) {
    return http.post<Login.ResLogin>(PORT1 + '/login', params);
    // return http.post<Login.ResLogin>(PORT1 + `/login`, {}, { params }); // post 请求携带 query 参数  ==>  ?username=admin&password=123456
	// return http.post<Login.ResLogin>(PORT1 + `/login`, qs.stringify(params));  // post 请求携带 表单 参数  ==>  application/x-www-form-urlencoded
	// return http.post<Login.ResLogin>(PORT1 + `/login`, params, { headers: { noLoading: true } }); // 控制当前请求不显示 loading
}

// * 获取按钮权限
export function getAuthorButtons() {
    return http.get<Login.ResAuthButtons>(PORT1 + '/auth/buttons');
}

// * 获取菜单列表
export const getMenuList = () => {
	return http.get<Menu.MenuOptions[]>(PORT1 + `/menu/list`);
};






