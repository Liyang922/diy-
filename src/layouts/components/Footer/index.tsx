import { connect } from "react-redux";
import "./index.less";

function LayoutFooter (props: any) {
	const { themeConfig } = props;
	return (
		<>
			{!themeConfig.footer && (
				<div className="footer">
					<a href="https://www.google.com/" target="_blank" rel="noreferrer">
						2022 © diy-Admin.
					</a>
				</div>
			)}
		</>
	);
};

const mapStateToProps = (state: any) => state.global;
export default connect(mapStateToProps)(LayoutFooter);
