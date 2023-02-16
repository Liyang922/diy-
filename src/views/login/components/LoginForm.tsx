import { useState } from 'react';
// antd
import { Button, Form, Input, message } from 'antd';
import { UserOutlined, LockOutlined, CloseCircleOutlined } from "@ant-design/icons";
// 国际化
import { useTranslation } from 'react-i18next';
// 登录API
import { loginApi } from '../../../api/modules/login';
// loginForm接口
import { Login } from '../../../api/interface';
// redux相关
import { connect } from 'react-redux';
import { setToken } from '../../../redux/modules/global/action';
// 加密
import md5 from "js-md5";
// 路由
import { useNavigate } from 'react-router-dom';



function LoginForm(props: any) {

    const [form] = Form.useForm(); //创建 Form 实例，用于管理所有数据状态。
    const {t} = useTranslation();   
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();
    const {setToken} = props;

    // 登录
    const onFinish = async (loginForm: Login.ReqLoginForm) => {
        try {
            setLoading(true);
            loginForm.password = md5(loginForm.password);
            const { data } = await loginApi(loginForm); //发出post请求
            // 设置token
            setToken(data?.access_token);

            message.success("登录成功！");
            navigate("/home/index");
        } finally {
            setLoading(false);
        }
    };
      
    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Form
            form={form}
            name="basic"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            size="large"
            autoComplete="off"
        >
            <Form.Item 
                name="username"
                rules={[{ required: true, message: 'Please input your username!' }]}
            >
                <Input placeholder='用户名：admin / user' prefix={<UserOutlined />}/>
            </Form.Item>

            <Form.Item
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
            >
                <Input.Password autoComplete="new-password" placeholder="密码：123456" prefix={<LockOutlined />}/>
            </Form.Item>

            <Form.Item className='login-btn'>
                <Button 
                    onClick={() => {
                        form.resetFields()
                    }}
                    icon={<CloseCircleOutlined />}
                >
                    {t("重置")}
                </Button>
                <Button type="primary" htmlType="submit" loading={loading} icon={<UserOutlined />}>
                    {t("登录")}
                </Button>
            </Form.Item>
        </Form>
    );
}

const mapDispatchToProps = { setToken };
export default connect(null, mapDispatchToProps)(LoginForm);