import { Drawer, Divider, Switch } from "antd";
import { FireOutlined, SettingOutlined } from "@ant-design/icons";
import { useState } from "react";
import { connect } from "react-redux";
import { setThemeConfig } from "../../../../redux/modules/global/action";
import { updateCollapse } from "../../../../redux/modules/menu/action";
import SwitchDark from "../../../../components/SwitchDark";


function Theme(props : any) {
    const [open, setOpen] = useState<boolean>(false);
    const { setThemeConfig, updateCollapse } = props;
	const { isCollapse } = props.menu;
	const { themeConfig } = props.global;
	const { weakOrGray, breadcrumb, tabs, footer } = themeConfig;

    const onChange = (checked: boolean, keyName: string) => {
		return setThemeConfig({ ...themeConfig, [keyName]: !checked });
	};

    return (
        <>
            <i
				className="icon-style iconfont icon-zhuti"
				onClick={() => {
					console.log("theme, clicked");
					setOpen(true);
				}}
			></i>
            <Drawer
                title="布局设置"
				closable={true}
				onClose={() => {
					setOpen(false);
				}}
				open={open}
				width={320}
            >
                {/* 全局主题 */}
				<Divider className="divider">
					<FireOutlined />
					全局主题
				</Divider>
                <div className="theme-item">
					<span>暗黑模式</span>
					<SwitchDark />
				</div>
                <br />
				{/* 界面设置 */}
                <Divider className="divider">
					<SettingOutlined />
					界面设置
				</Divider>
                <div className="theme-item">
					<span>折叠菜单</span>
					<Switch
						checked={isCollapse}
						onChange={e => {
							updateCollapse(e);
						}}
					/>
				</div>
                <div className="theme-item">
					<span>面包屑导航</span>
					<Switch
						checked={!breadcrumb}
						onChange={e => {
							onChange(e, "breadcrumb");
						}}
					/>
				</div>
                <div className="theme-item">
					<span>页脚</span>
					<Switch
						checked={!footer}
						onChange={e => {
							onChange(e, "footer");
						}}
					/>
				</div>
            </Drawer>
        </>
    )
}

const mapStateToProps = (state: any) => state;
const mapDispatchToProps = { setThemeConfig, updateCollapse };
export default connect(mapStateToProps, mapDispatchToProps)(Theme);