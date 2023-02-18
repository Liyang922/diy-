import * as echarts from "echarts";
import { useEffect, useRef } from "react";
/**
 * @description 使用Echarts(只是为了添加图表响应式)
 * @param {Element} data 数据 
 * @param {Object} options 绘制Echarts的参数(必传)
 * @return chart
 * */
export const useEcharts = (options: echarts.EChartsCoreOption, data?: any) => {
	const myChart = useRef<echarts.EChartsType>(); //chart
	const echartsRef = useRef<HTMLDivElement>(null); //页面中echart的容器

	const echartsResize = () => {
		echartsRef && myChart?.current?.resize();
	};

	useEffect(() => {
		if (data?.length !== 0) {
			myChart?.current?.setOption(options);
		}
	}, [data]);

	// 初始化
	useEffect(() => {
		if (echartsRef?.current) {
			myChart.current = echarts.init(echartsRef.current as HTMLDivElement);
		}
		myChart?.current?.setOption(options);
		window.addEventListener("resize", echartsResize, false);
		return () => {
			window.removeEventListener("resize", echartsResize);
			myChart?.current?.dispose();
		};
	}, []);

	return [echartsRef];
};