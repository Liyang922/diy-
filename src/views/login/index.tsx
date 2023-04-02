import LoginForm from "./components/LoginForm";
import SwitchDark from "../../components/SwitchDark";
import loginLeft from "../../assets/images/login_left.png";
import logo from "../../assets/images/logo.png";
import "./index.less";

export default function Login() {
    
    return (
        <div className="login-container">
            {/* 切换深浅模式组件 */}
            <SwitchDark />  
            <div className="login-box">
                <div className="login-left">
                    <img src={loginLeft} alt="login"></img>
                </div>
                <div className="login-form">
                    <div className="login-logo">
                        <img className="login-icon" src={logo} alt="logo"></img>
                        <span className="logo-text">管理系统</span>
                    </div>
                    <LoginForm />
                </div>
            </div>
        </div>
    );
}