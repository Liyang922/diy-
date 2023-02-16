import { connect } from "react-redux";
import CardComponent from "../comoponents/Card";
import { setItemList, addItem, setItem } from "../../redux/modules/item/action";

function Done(props: any) {
    const { itemList } = props; 
    // console.log("itemList", itemList);
    return (
        itemList.map((item : any, index : any) => {
            if(item.status == "done") return <CardComponent item={item} key={index} />
        })
    );
}

const mapStateToProps = (state : any) => state.item;
const mapDispatchToProps = { setItem, addItem, setItemList};
export default connect(mapStateToProps, mapDispatchToProps)(Done);