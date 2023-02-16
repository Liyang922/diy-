import { useState } from "react";
import { connect } from "react-redux";
import { Button, List, message } from "antd";
import CardComponent from "../comoponents/Card";
import { setItemList, addItem, setItem } from "../../redux/modules/item/action";
import AddItemModal from "../comoponents/AddItemModal";
import { nanoid } from "nanoid";
import { getRenderItemList } from "../../utils";

function Idea(props: any) {
    const { itemList, addItem } = props; 
    // Modal是否显示
    const [open, setOpen] = useState(false);

    const renderList = getRenderItemList(itemList, "idea");

    const handleAdd = () => {
        setOpen(true);
    }

    const objProps = [ "stockList" ];
    const onCreate = (values : any) => {
        // 接收到form数据
        // console.log('Received values of form: ', values);
        const correctValues = {...values, id: nanoid()};
        Object.keys(correctValues).forEach(key => {
            // 删除undefined数据
            if(!correctValues[key]) delete correctValues[key];
            if(objProps.includes(key)) {
                if(correctValues[key]) correctValues[key] = JSON.parse(correctValues[key]);
            }
        })
        console.log('additem修改后的数据: ', correctValues);
        message.success("创建成功！");
        setOpen(false);
        addItem(correctValues);
    };

    return (
        <>
            <Button
                type="primary"
                onClick={handleAdd}
                style={{
                    marginBottom: 16,
                }}
            >
                增加项
            </Button>
            {/* List需要样式，List item的排版（2.14） */}
            <List 
                header={<div>Header</div>} //需要样式（2.14）
                bordered
                grid={{ gutter: 16, column: 3 }}
                dataSource={itemList}
                renderItem={item => {
                    return (
                        itemList.map((item : any, index : any) => {
                            if(item.status == "idea") return (
                                <List.Item>
                                    <CardComponent item={item} key={index} />
                                </List.Item>
                            )
                        })
                    );
                }}
            ></List>
            <AddItemModal
                open={open}
                onCreate={onCreate}
                onCancel={() => {
                    setOpen(false);
                }}
                status={"idea"}
            >
            </AddItemModal>
        </> 
    )
}

const mapStateToProps = (state : any) => state.item;
const mapDispatchToProps = { setItem, addItem, setItemList};
export default connect(mapStateToProps, mapDispatchToProps)(Idea);