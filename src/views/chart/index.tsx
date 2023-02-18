import { connect } from "react-redux";
import { setItemList, addItem, setItem } from "../../redux/modules/item/action";
import { Tabs } from "antd";
import Pie from "./components/pie";
import Curve from "./components/curve";
import "./index.less";
import BookSum from "./images/book-sum.png";
import AddPerson from "./images/add_person.png";
import AddTeam from "./images/add_team.png";
import Today from "./images/today.png";
import BookSum1 from "./images/book_sum.png";
import { useEffect, useState } from "react";
import { Item } from "../../redux/interface";

const { TabPane } = Tabs;

function Chart(props : any) {
    const { itemList } = props.item;
    const { stockData } = props.stock;

    const tabsList = [
		{ label: "近一月", name: 1 },
		{ label: "近三月", name: 2 },
		{ label: "近半年", name: 3 },
		{ label: "近一年", name: 4 },
	];
    const onChange = (key: string) => {
		console.log(key);
	};

    const [ideaNum, setIdeaNum] = useState(0);
    const [planNum, setPlanNum] = useState(0);
    const [doneNum, setDoneNum] = useState(0);
    const getNum = (itemList : Item[]) => {
        const num = {
            ideaNum: 0,
            planNum: 0,
            doneNum: 0,
        };
        for(const item of itemList) {
            const key = item["status"] + "Num";
            num[key]++;
        }
        return num;
    }
    useEffect(() => {
        const num = getNum(itemList);
        setIdeaNum(num.ideaNum);
        setPlanNum(num.planNum);
        setDoneNum(num.doneNum);
    }, [itemList])

    return (
        <div className="dataVisualize-box">
			<div className=" card top-box">
				<div className="top-title">数据可视化</div>
				<Tabs defaultActiveKey="1" onChange={onChange}>
					{tabsList.map(item => {
						return <TabPane tab={item.label} key={item.name}></TabPane>;
					})}
				</Tabs>
				<div className="top-content">
					<div className="item-left sle">
						<span className="left-title">品类总数</span>
						<div className="img-box">
							<img src={BookSum} alt="" />
						</div>
						<span className="left-number">{itemList.length}</span>
					</div>
					<div className="item-center">
						<div className="gitee-traffic traffic-box">
							<div className="traffic-img">
								<img src={AddPerson} alt="" />
							</div>
							<span className="item-value">{ideaNum}</span>
							<span className="traffic-name sle">点子总数</span>
						</div>
						<div className="gitHub-traffic traffic-box">
							<div className="traffic-img">
								<img src={AddTeam} alt="" />
							</div>
							<span className="item-value">{planNum}</span>
							<span className="traffic-name sle">计划总数</span>
						</div>
						<div className="today-traffic traffic-box">
							<div className="traffic-img">
								<img src={Today} alt="" />
							</div>
							<span className="item-value">{doneNum}</span>
							<span className="traffic-name sle">完成总数</span>
						</div>
						<div className="yesterday-traffic traffic-box">
							<div className="traffic-img">
								<img src={BookSum1} alt="" />
							</div>
							<span className="item-value">6</span>
							<span className="traffic-name sle">上月总数</span>
						</div>
					</div>
					<div className="item-right">
						<div className="echarts-title">点子 / 完成 数量对比</div>
						<div className="book-echarts">
							<Pie ideaNum={ideaNum} doneNum={doneNum} />
						</div>
					</div>
				</div>
			</div>
			<div className="card bottom-box">
				<div className="bottom-title">库存数据</div>
				<div className="bottom-tabs">
					<Tabs defaultActiveKey="1" onChange={onChange}>
						{tabsList.map(item => {
							return <TabPane tab={item.label} key={item.name}></TabPane>;
						})}
					</Tabs>
				</div>
				<div className="curve-echarts">
					<Curve stockData={stockData}/>
				</div>
			</div>
		</div>
    )
}

const mapStateToProps = (state : any) => {return {item: state.item, stock: state.stock}};
const mapDispatchToProps = { setItem, addItem };
export default connect(mapStateToProps, mapDispatchToProps)(Chart);