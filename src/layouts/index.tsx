import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Layout } from "antd";
import { connect } from "react-redux";
// authButtons相关
import { setAuthButtons } from "../redux/modules/auth/action";
import { getAuthorButtons } from "../api/modules/login";
import { updateCollapse } from "../redux/modules/menu/action";
// 引入子组件
import Header from "./components/Header";
import Footer from "./components/Footer";
import Menu from "./components/Menu";
// import Tabs from "./components/Tabs"; 
import "./index.less";

function LayoutIndex(props: any) {
    const { Sider, Content} = Layout;
    const { isCollapse, updateCollapse, setAuthButtons } = props;

    // 获取按钮权限列表
    const getAuthorButtonsList = async () => {
        const { data } = await getAuthorButtons();
        setAuthButtons(data);
    };

    // 监听窗口大小变化
	const listeningWindow = () => {
		window.onresize = () => {
			return (() => {
				const screenWidth = document.body.clientWidth;
				if (!isCollapse && screenWidth < 1200) updateCollapse(true);
				if (!isCollapse && screenWidth > 1200) updateCollapse(false);
			})();
		};
	};

    useEffect(() => {
        listeningWindow();
        getAuthorButtonsList();
    }, []);

    return (
        <section className="container">
            <Sider trigger={null} collapsed={props.isCollapse} width={220} theme="dark">
                <Menu></Menu>
            </Sider>
            <Layout>
                <Header></Header>
                {/* <Tabs></Tabs> */}
                <Content>
                    <Outlet></Outlet>
                </Content>
                <Footer></Footer>
            </Layout>
        </section>
    )
}

const mapStateToProps = (state: any) => state.menu;
const mapDispatchToProps = { setAuthButtons, updateCollapse };
export default connect(mapStateToProps , mapDispatchToProps)(LayoutIndex);
