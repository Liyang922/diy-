import { SET_ITEM_LIST } from "../../types";
import { SET_ITEM } from "../../types";
import { ADD_ITEM } from "../../types";
import { DELETE_ITEM } from "../../types";
import { Item } from "../../interface";

// 修改整个列表的内容
export function setItemList(itemList : Array<Item>){
    return {
        type: SET_ITEM_LIST,
        itemList
    };
}

// 修改某个item的配置
export function setItem(item : Item){
    return {
        type: SET_ITEM,
        item
    };
}

// 增加一个item
export function addItem(item : Item){
    return {
        type: ADD_ITEM,
        item
    };
}

// 删除一个item
export function deleteItem(id : string){
    return {
        type: DELETE_ITEM,
        id
    };
}




