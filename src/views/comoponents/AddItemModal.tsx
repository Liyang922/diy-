import { Modal, message, Form, Input, Select, DatePicker } from "antd";

const AddItemModal = (props: any) => {
    const { status, open, onCreate, onCancel }= props;
    const [form] = Form.useForm();

    const example = {
        stockList: {木头: 3},
    }

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
                                'ideaDate': values['ideaDate'] ? values['ideaDate'].format('YYYY-MM') : values['ideaDate'],
                                'planDate': values['planDate'] ? values['planDate'].format('YYYY-MM') : values['planDate'],
                                'doneDate': values['doneDate'] ? values['doneDate'].format('YYYY-MM') : values['doneDate'],
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
                // initialValues={{status:`${item.status}`}}
                initialValues={{status: status}}
            >
                <Form.Item
                    label="品名"
                    name="name"
                >
                    <Input placeholder={"输入物品名称（必须）"}/>
                </Form.Item>
                <Form.Item
                    label="状态"
                    name="status"
                >
                    {/* 数据验证：status和date的对应（待完成，2-13） */}
                    {/* 数据验证：name，description不能为空（2-14） */}
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
                    <Input placeholder={"输入描述"}/>
                </Form.Item>
                <Form.Item
                    label="所需库存物品列表"
                    name="stockList"
                >
                    <Input placeholder={"输入示例："+`${JSON.stringify(example.stockList)}`}/>
                </Form.Item>
                <Form.Item
                    label="点子创建日期（年-月）"
                    name="ideaDate"
                >
                    <DatePicker picker="month" />
                </Form.Item>
                <Form.Item
                    label="点子计划完成日期（年-月）"
                    name="planDate"
                >
                    <DatePicker picker="month" />
                </Form.Item>
                <Form.Item
                    label="点子完成日期（年-月）"
                    name="doneDate"
                >
                    <DatePicker picker="month" />
                </Form.Item>
            </Form>
		</Modal>
	);
};
export default AddItemModal;
