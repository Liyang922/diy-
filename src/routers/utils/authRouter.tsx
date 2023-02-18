import { Navigate, useLocation } from "react-router-dom";
import { searchRoute } from "../../utils";
import { rootRouter } from "..";
import { AxiosCanceler } from "../../api/helper/axiosCancel";
import { store } from "../../redux/store";

const axiosCancel = new AxiosCanceler();

/**
 * @description 路由守卫组件
 */
export default function AuthRouter(props : { children: JSX.Element }) {
    const { pathname } = useLocation();
    // console.log("AuthRouter: pathname", pathname);
    const route = searchRoute(pathname, rootRouter);
    // console.log("AuthRouter: route", route);
    // * 清除请求
    axiosCancel.removeAllPending();

    // * 判断是否需要访问权限
    if(!route.meta?.requiresAuth) return props.children;

    // * 判断是否有token
    const token = store.getState().global.token;
    if(!token) return <Navigate to="/login" replace />;

    // * 动态路由（根据后端返回的菜单数据生成）
    const dynamicRouter = store.getState().auth.authRouter;
    // console.log("dynamicRouter", dynamicRouter);
    // * 静态路由
    const staticRouter = ["/home/index", "/403"];
    const routerList = dynamicRouter.concat(staticRouter);
	// * 如果访问的地址没有在路由表中重定向到403页面
	if (routerList.indexOf(pathname) == -1) return <Navigate to="/403" />;

	// * 当前账号有权限返回 Router，正常访问页面
	return props.children;
}