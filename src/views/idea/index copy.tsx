import { connect } from "react-redux";
import { List } from "antd";
import CardComponent from "../comoponents/Card";
import { setItemList, addItem, setItem } from "../../redux/modules/item/action";

function Idea(props: any) {
    const { itemList } = props; 
    // console.log("itemList", itemList);
    return (
        itemList.map((item : any, index : any) => {
            if(item.status == "idea") return <CardComponent item={item} key={index} />
        })
    );
}

const mapStateToProps = (state : any) => state.item;
const mapDispatchToProps = { setItem, addItem, setItemList};
export default connect(mapStateToProps, mapDispatchToProps)(Idea);