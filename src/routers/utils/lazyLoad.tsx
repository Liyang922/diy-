import React, { Suspense } from "react";
import { Spin } from "antd";

/**
 * @description 路由懒加载
 * @param Comp 访问的组件
 * @returns 
 */
export default function lazyLoad(Comp : React.LazyExoticComponent<any>) : React.ReactNode {
    return (
        <Suspense
            fallback={
                <Spin
                    size="large"
                    style={{
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						height: "100%"
					}}
                ></Spin>
            }
        >
            <Comp />
        </Suspense>
    );
}