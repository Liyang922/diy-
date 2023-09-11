import axios, { AxiosRequestConfig, Canceler } from "axios";
import qs from "qs";

// 存储请求和请求的取消函数
let pendingMap = new Map<string, Canceler>();

export function getPendingUrl(config: AxiosRequestConfig) {
    return [config.method, config.url, qs.stringify(config.data), qs.stringify(config.params)].join("&");
}

export class AxiosCanceler {
    
    /**
     * @description 添加请求
     * @param {object} config 
     */
    addPending(config: AxiosRequestConfig) {
        this.removePending(config);
        const url = getPendingUrl(config);
        config.cancelToken = config.cancelToken || new axios.CancelToken(cancel => {
            if(!pendingMap.has(url)) {
                pendingMap.set(url, cancel);
            }
        })
    }

    /**
     * @description 取消请求
     * @param {object} config
     */
    removePending(config: AxiosRequestConfig) {
        const url = getPendingUrl(config);
        if(pendingMap.has(url)) {
            const cancel = pendingMap.get(url);
            cancel && cancel(); // 先取消请求再删除
            pendingMap.delete(url);
        }
    }

    /**
     * @description 取消所有请求
     */
    removeAllPending() {
        pendingMap.forEach(cancel => {
            cancel && cancel();
        });
        pendingMap.clear();
    }

    /**
     * @description 重置
     */
    reset() {
        pendingMap = new Map<string, Canceler>;
    }
}