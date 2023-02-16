import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { Avatar, Modal, Dropdown, message, MenuProps } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { setToken } from "../../../../redux/modules/global/action";
import avatar from "../../../../assets/images/avatar.png";
import InfoModal from "./InfoModal";

interface ModalProps {
    showModal : (params : any) => void,
}

function AvatarIcon(props : any) {
    const navigate = useNavigate();
    const { setToken } = props;
    const infoRef = useRef<ModalProps>(null);

    // 退出登录
    const logout = () => {
        Modal.confirm({
            title: '温馨提示 🧡',
            icon: <ExclamationCircleOutlined />,
            content: '是否确认退出登录？',
            okText: "确认",
			cancelText: "取消",
            onOk() {
                setToken("");
				message.success("退出登录成功！");
				navigate("/login");
            }
        });
    }

    // DropDown Menu items
    const items : MenuProps['items'] = [
        {
            key: '1',
            label: <span className="dropdown-item">首页</span>,
            onClick: () => navigate("/home/index")
        },
        {
            key: '2',
            label: <span className="dropdown-item">个人信息</span>,
            onClick: () => infoRef.current!.showModal(null)
        },
        {
            type: "divider"
        },
        {
            key: '3',
            label: <span className="dropdown-item">退出登录</span>,
            onClick: logout
        },
    ];

    return (
        <>
            <Dropdown menu={{items}} placement="bottom" arrow trigger={["click"]}>
                {/* Dropdown点击前显示内容写在html标签内，下拉菜单显示内容由menu属性定义 */}
                <Avatar size="large" src={avatar} />
            </Dropdown>
            <InfoModal innerRef={infoRef}></InfoModal>
        </>
    );
}

export default connect(null, { setToken })(AvatarIcon);