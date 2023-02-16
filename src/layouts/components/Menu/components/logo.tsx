import { connect } from "react-redux";
import logo from "../../../../assets/images/logo.png";

function Logo(props : any) {
    const { isCollapse } = props;

    return (
        <div className="logo-box">
            <img src={logo} alt="logo" className="logo-img"></img>
            { isCollapse ? null : <h2 className="logo-text">DIY-Admin</h2> }
        </div>
    );
}

export default connect((state : any) => state.menu, null)(Logo);