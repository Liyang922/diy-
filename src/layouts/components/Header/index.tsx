import { Layout } from "antd";
// 子组件
import CollapseIcon from "./components/CollapseIcon";
import BreadcrumbNav from "./components/BreadcrumbNav";
import Theme from "./components/Theme";
import Fullscreen from "./components/Fullscreen";
import AvatarIcon from "./components/AvatarIcon";
import "./index.less";

export default function Header(props: any) {
    const { Header } = Layout;

    return (
        <Header>
            <div className="header-lf">
				<CollapseIcon />
				<BreadcrumbNav />
			</div>
			<div className="header-ri">
				{/* <AssemblySize /> */}
				{/* <Language /> */}
				<Theme />   
				<Fullscreen />
				<span className="username">DIY</span>
				<AvatarIcon />
			</div>
        </Header>
    );
}