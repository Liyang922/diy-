import { Modal, message, Form, Input, Select, DatePicker } from "antd";

const ItemInfoModal = (props: any) => {
    const { item, open, onCreate, onCancel }= props;
    const [form] = Form.useForm();

	return (
		<Modal 
            title="点子信息" 
            open={open}  
            onCancel={onCancel} 
            onOk={
                ()=>{
                    form
                        .validateFields()
                        .then((values) => {
                            form.resetFields();
                            // 将表单数据values通过onCreate传给父组件
                            const processedValues = {
                                ...values,
                                'ideaDate': values['ideaDate'] ? values['ideaDate'].format('YYYY-MM') : "",
                                'planDate': values['planDate'] ? values['planDate'].format('YYYY-MM') : "",
                                'doneDate': values['doneDate'] ? values['doneDate'].format('YYYY-MM') : "",
                            }
                            onCreate(processedValues);
                        })
                        .catch((info) => {
                            console.log('Validate Failed:', info);
                        });
                }
            } 
        >
			<Form
                form={form}
                layout="vertical"
                name="basic"
                initialValues={{status:`${item.status}`}}
            >
                <Form.Item
                    label="名字"
                    name="name"
                >
                    <Input placeholder={"输入示例："+`${item.name}`}/>
                </Form.Item>
                <Form.Item
                    label="状态"
                    name="status"
                >
                    {/* 数据验证：status和date的对应（待完成，2-13） */}
                    <Select
                        options={[
                            {
                              value: 'idea',
                              label: 'idea',
                            },
                            {
                              value: 'plan',
                              label: 'plan',
                            },
                            {
                              value: 'done',
                              label: 'done',
                            },
                        ]}
                    />
                </Form.Item>
                <Form.Item
                    label="描述"
                    name="description"
                >
                    <Input placeholder={"输入示例："+`${item.description}`}/>
                </Form.Item>
                <Form.Item
                    label="所需库存物品列表"
                    name="stockList"
                >
                    <Input placeholder={"输入示例："+`${JSON.stringify(item.stockList)}`}/>
                </Form.Item>
                <Form.Item
                    label="点子创建日期（年-月）"
                    name="ideaDate"
                >
                    <DatePicker picker="month" style={{width:"100%"}} placeholder="注意！空日期将覆盖原有数据！"/>
                </Form.Item>
                <Form.Item
                    label="点子计划完成日期（年-月）"
                    name="planDate"
                >
                    <DatePicker picker="month" style={{width:"100%"}} placeholder="注意！空日期将覆盖原有数据！"/>
                </Form.Item>
                <Form.Item
                    label="点子完成日期（年-月）"
                    name="doneDate"
                >
                    <DatePicker picker="month" style={{width:"100%"}} placeholder="注意！空日期将覆盖原有数据！"/>
                </Form.Item>
            </Form>
		</Modal>
	);
};
export default ItemInfoModal;
