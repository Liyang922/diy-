// 请求响应参数（不含data）
export interface Result {
    code: string;
    msg: string;
}

// 请求响应参数（含data)
export interface ResultData<T = any> extends Result{
    data?: T;
}

// 登录
// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace Login {
    export interface ReqLoginForm {
        name: string;
        password: string;
    }
    export interface ResLogin {
        access_token: string;
    }
    export interface ResAuthButtons {
        [propName: string]: any;
    }
}

// * Menu
// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace Menu {
	export interface MenuOptions {
		path: string;
		title: string;
		icon?: string;
		isLink?: string;
		close?: boolean;
		children?: MenuOptions[];
	}
}