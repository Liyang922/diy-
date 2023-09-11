import axios, { AxiosInstance, AxiosRequestConfig, AxiosError, AxiosResponse } from "axios";
import { message } from "antd";
import { checkStatus } from "./helper/checkStatus";
import { showFullScreenLoading, tryHideFullScreenLoading } from "../config/serviceLoading";
import { ResultData } from "./interface";
import { AxiosCanceler } from "./helper/axiosCancel";
import { store } from "../redux/store";
import { setToken } from "../redux/modules/global/action";

const config = {
    // 默认请求地址，为vite环境变量，在.env开头文件中修改
    baseURL: import.meta.env.VITE_API_URL as string, //开发-'/api'
    // 超时时间
    timeout: 10000,
    // 跨域时允许携带凭证
    withCredentials: true
}

const axiosCanceler = new AxiosCanceler();

class RequestHtpp {
    service: AxiosInstance;
    
    constructor(config: AxiosRequestConfig) {
        this.service = axios.create(config);

        /**
         * @description 请求拦截器
         * token校验
         */
        this.service.interceptors.request.use(
            (config: any) => { // AxiosRequestConfig-error
                // 保存请求
                axiosCanceler.addPending(config);
                // 如果当前请求不需要显示 loading,在api服务中通过指定的第三个参数: { headers: { noLoading: true } }来控制不显示loading，参见loginApi
				config.headers!.noLoading || showFullScreenLoading();
                // 从本地获取token，发送到服务器
                const token: string = store.getState().global.token;
                return {...config, headers: {...config.headers, "x-access-token": token}};
            },
            (error: AxiosError) => {
                return Promise.reject(error);
            }
        )

        /**
         * @description 响应拦截器
         */
        this.service.interceptors.response.use(
            (response: AxiosResponse) => {
                const {data, config} = response;
                
                axiosCanceler.removePending(config);
                tryHideFullScreenLoading();

                // 登录失效（code == 599）
                if(data.code === 599) {
                    // 1.重置token
                    store.dispatch(setToken(""));
                    // 2.显示错误消息
                    message.error(data.msg);
                    // 3.重定向
                    window.location.hash = "/login";
                    // 4.return
                    return Promise.reject(data.msg);
                }

                // 全局错误信息拦截
                if(data.code && data.code !== 200) {
                    message.error(data.msg);
					return Promise.reject(data);
                }
                // 成功请求
                return data;
            },
            (error: AxiosError) => {
                const {response} = error;
                // progress & loading
                tryHideFullScreenLoading();
                // 请求超时
                if(error.message.includes("timeout")) message.error("请求超时，请稍后再试");
                // 根据响应的错误状态码，分别处理
                if(response) checkStatus(response.status);
                // 服务器没有返回结果，断网处理
                if(!window.navigator.onLine) window.location.hash = "/500";
                return Promise.reject(error);
            }
        )
    }

    // 请求方法封装
    get<T>(url: string, params?: object, _object = {}): Promise<ResultData<T>> {
        return this.service.get(url, { params, ..._object });
    }
    post<T>(url: string, params?: object, _object = {}): Promise<ResultData<T>> {
        return this.service.post(url, params, _object);
    }
    put<T>(url: string, params?: object, _object = {}): Promise<ResultData<T>> {
        return this.service.put(url, params, _object);
    }
    delete<T>(url: string, params?: object, _object = {}): Promise<ResultData<T>> {
        return this.service.delete(url, { params, ..._object });
    }
}

export default new RequestHtpp(config);