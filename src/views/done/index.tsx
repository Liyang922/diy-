import { connect } from "react-redux";
import CardComponent from "../comoponents/Card";
import { setItemList, addItem, setItem } from "../../redux/modules/item/action";
import "./index.less";

function Done(props: any) {
    const { itemList } = props; 
    // console.log("itemList", itemList);
    return (
        <div className="card-display">
            {
                itemList.map((item : any, index : any) => {
                    if(item.status == "done") return <CardComponent item={item} key={index} />
                })
            }
        </div>
    );
}

const mapStateToProps = (state : any) => state.item;
const mapDispatchToProps = { setItem, addItem, setItemList};
export default connect(mapStateToProps, mapDispatchToProps)(Done);