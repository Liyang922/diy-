import { connect } from "react-redux";
import CardComponent from "../comoponents/Card";
import { setItemList, addItem, setItem } from "../../redux/modules/item/action";
import "./index.less";


function Plan(props: any) {
    const { itemList } = props; 
    // console.log("itemList", itemList);
    return (
        <div className="card-display">
            {
                itemList.map((item : any, index : any) => {
                    if(item.status == "plan") return <CardComponent item={item} key={index} className="idea-card"/>
                })
            }
        </div>
    );
}

const mapStateToProps = (state : any) => state.item;
const mapDispatchToProps = { setItem, addItem, setItemList};
export default connect(mapStateToProps, mapDispatchToProps)(Plan);