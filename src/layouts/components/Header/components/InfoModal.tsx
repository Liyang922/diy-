import { useState, useImperativeHandle, Ref } from "react";
import { Modal, message } from "antd";

// 定义InfoModal接收到的props
interface Props {
    innerRef : Ref<{ showModal : ( params : any) => void } | undefined>
}

export default function InfoModal(props : Props) {
    const [ open, setOpen ] = useState(false);

    // useImperativeHandle(ref, createHandle, [deps])
    useImperativeHandle(props.innerRef, () => ({
        showModal
    }))

    const showModal = () => {
        setOpen(true);
    };

    const handleOk = () => {
        message.success("个人信息修改成功！");
        setOpen(false);
    };
    
    const handleCancel = () => {
        setOpen(false);
    };

    return (
        <Modal title="个人信息" open={open} onOk={handleOk} onCancel={handleCancel} destroyOnClose={true}>
            <p>name: li</p>
        </Modal>
    )
}