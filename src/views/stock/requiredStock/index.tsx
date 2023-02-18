import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Table, Button } from 'antd';
import type { ColumnsType, TableProps } from 'antd/es/table';
import type { SorterResult, FilterValue } from 'antd/es/table/interface';
import { StockData, Item } from "../../../redux/interface";
import produce from "immer";

function RequiredStock(props : any) {
    const { itemList } = props.item;
    const { stockData } = props.stock;
    const [filteredInfo, setFilteredInfo] = useState<Record<string, FilterValue | null>>({});
    const [sortedInfo, setSortedInfo] = useState<SorterResult<StockData>>({});

    // 表格列的配置项
    const columns = [
        {
            title: '子类别',
            dataIndex: 'subcategory',
            key: 'subcategory',
            sorter: (a : any, b : any) => a.subcategory > b.subcategory ? -1 : 1,
            sortOrder: sortedInfo.columnKey === 'subcategory' ? sortedInfo.order : null,
            ellipsis: true,
        },
        {
            title: '数量',
            dataIndex: 'number',
            key: 'number',
            sorter: (a : any, b : any) => +a.number - +b.number,
            sortOrder: sortedInfo.columnKey === 'number' ? sortedInfo.order : null,
            ellipsis: true,
        },
        {
            title: '关联物品',
            dataIndex: 'relative',
            key: 'relative',
            ellipsis: true,
        },
        {
            title: '需要补货的数量',
            dataIndex: 'numberNeedAdd',
            key: 'numberNeedAdd',
            sorter: (a : any, b : any) => +a.numberNeedAdd - +b.numberNeedAdd,
            sortOrder: sortedInfo.columnKey === 'numberNeedAdd' ? sortedInfo.order : null,
            ellipsis: true,
        },
    ];

    const [data, setData] = useState<any[]>([]);
    const getData = (itemList : Item[]) : any[] => {
        const data : any[] = [];
        const map = new Map(); // 保存subcategory和index的对应关系
        for(const item of itemList) {
            if(item.stockList && item.status == "plan") {
                Object.keys(item.stockList).forEach(stock => {
                    if(!map.has(stock)) {
                        map.set(stock, map.size);
                        const tmp = {};
                        tmp["subcategory"] = stock;
                        item.stockList && (tmp["number"] = item.stockList[stock]);
                        tmp["relative"] = item.name;
                        data.push({...tmp});
                    } else {
                        const index = map.get(stock);
                        item.stockList && (data[index]["number"] += item.stockList[stock]);
                        data[index]["relative"] = data[index]["relative"] + "、" + item.name;
                    }
                })
            }
        }
        return data;
    }
    
    useEffect(() => {
        setData(getData(itemList));
    }, [itemList])

    const handleChange: TableProps<StockData>['onChange'] = (pagination, filters, sorter) => {
        // console.log('Various parameters', pagination, filters, sorter);
        setFilteredInfo(filters);
        setSortedInfo(sorter as SorterResult<StockData>);
    };

    // 计算需要补货数量
    const getAddData = (data : any[], stockList : any[]) => {
        const extraData = new Array(data.length);
        const map = new Map();

        for(const stock of stockList) {
            if(!map.has(stock["subcategory"])) {
                map.set(stock["subcategory"], stock["number"]);
            } else {
                map.set(stock["subcategory"], map.get(stock["subcategory"]) + stock["number"]);
            }
        }

        for(let i = 0; i < data.length; i++) {
            let tmp = data[i]["number"];
            if(map.has(data[i]["subcategory"])) tmp -= map.get(data[i]["subcategory"]);
            tmp < 0 ? extraData[i] = 0 : extraData[i] = tmp;
        }

        return extraData;
    }
    
    const handleClick = () => {
        const extraData = getAddData(data, stockData);
        setData(
            produce(data, draftState => {
                for(let i = 0; i < draftState.length; i++) {
                    draftState[i]["numberNeedAdd"] = extraData[i];
                }
            })
        )
    }

    return (
        <div>
            <Button
                type="primary"
                style={{
                    marginBottom: 16,
                }}
                onClick={handleClick}
            >
                计算需要补货数量
            </Button>
            <Table columns={columns} dataSource={data} onChange={handleChange}/>
        </div>
    )
}
const mapStateToProps = (state : any) => { return {item: state.item, stock: state.stock} };
export default connect(mapStateToProps, null)(RequiredStock);