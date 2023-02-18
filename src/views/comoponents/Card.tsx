import { useState } from "react";
import { connect } from "react-redux";
import { setItemList, addItem, setItem, deleteItem } from "../../redux/modules/item/action";
import { Avatar, Card, message, Descriptions } from 'antd';
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import ItemInfoModal from "./ItemInfoModal";

function CardComponent(props: any) {
    const { item, setItem, deleteItem } = props;
    // console.log("card收到的item", item);
    
    // 将item的stockList转为string，以显示在card中
    const getStockDescription = (stock : {[propName: string]: number}) : string => {
        let result = "";
        Object.keys(stock).forEach(key => {
            result = result + key + stock[key] + "个-";
        });
        return result.slice(0 , result.length - 1);
    }

    // Modal是否显示
    const [open, setOpen] = useState(false);
    const objProps = [ "stockList" ];

    const onCreate = (values : any) => {
        // 接收到form数据
        // console.log('Received values of form: ', values);
        const correctValues = {...values, id: item.id};
        Object.keys(correctValues).forEach(key => {
            // 删除undefined数据
            if(correctValues[key] == undefined) delete correctValues[key];
            if(objProps.includes(key)) {
                if(correctValues[key]) correctValues[key] = JSON.parse(correctValues[key]);
            }
        })
        console.log('修改后的数据: ', correctValues);
        message.success("修改成功！");
        setOpen(false);
        // 存储form数据
        setItem(correctValues);
    };

    // 点击edit icon出现Modal
    const handleEdit = () => {
        setOpen(true);
    }

    // 删除
    const handleDelte = () => {
        deleteItem(item.id);
    }

    const displayKey = ["description", "stockList", "ideaDate", "planDate", "doneDate"];
    return (
        <Card
            hoverable
            bordered
            cover={
                <img
                    alt="example"
                    // src={itemImage}
                    src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                />
            }
            actions={[
                <EditOutlined key="edit" onClick={handleEdit}/>,
                <DeleteOutlined key="delete" onClick={handleDelte}/>
            ]}
        >
            <Descriptions title={`${item.name}`} column={1} size="small" style={{fontFamily:"PingFang SC",}}>
                {
                    Object.keys(item).map(key => {
                        if(displayKey.includes(key) && item[key]) {
                            if(key == "stockList") return <Descriptions.Item label={key} key={key}>{getStockDescription(item[key])}</Descriptions.Item>
                            return <Descriptions.Item label={key} key={key} >{`${item[key]}`}</Descriptions.Item>
                        }
                    })
                }
            </Descriptions>
            <ItemInfoModal
                open={open}
                onCreate={onCreate}
                onCancel={() => {
                    setOpen(false);
                }}
                item={item}
            />
        </Card>
    );
}

const mapDispatchToProps = { setItem, addItem, deleteItem };
export default connect(null, mapDispatchToProps)(CardComponent);