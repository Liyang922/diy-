import welcome from "../../assets/images/welcome01.png";
import "./index.less";

export default function Home() {
    return (
        <div className="home card">
			<img src={welcome} alt="welcome" />
		</div>    
    );
}