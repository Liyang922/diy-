import { SET_ITEM_LIST } from "../../types";
import { SET_ITEM } from "../../types";
import { ADD_ITEM } from "../../types";
import { DELETE_ITEM } from "../../types";
import { Item, ItemState } from "../../interface";
import { AnyAction } from "redux";
// import produce from "immer";
import { nanoid } from "nanoid";

const itemList = [{
        id: nanoid(),
        name: "示例",
        status: "idea",
        description: "一些描述",
        stockList:{
            ["胡桃木"]: 4,
        },
        ideaDate: "2023-02",
        planDate: "",
        doneDate: "",
}];

const itemState = {
    itemList: itemList
}

export default function itemReducer(state : ItemState = itemState, action : AnyAction) {
    switch (action.type) {
        case SET_ITEM_LIST:
            return {itemList: [...action.itemList]};
        case ADD_ITEM:
            return {itemList: [...state.itemList, action.item]};
        case SET_ITEM:
            for(let i = 0; i < state.itemList.length; i++) {
                if(state.itemList[i].id == action.item.id) {
                    state.itemList[i] = { ...state.itemList[i], ...action.item};
                }
            }
            return {itemList: [...state.itemList]};
        case DELETE_ITEM:
            state.itemList = state.itemList.filter(item => item.id != action.id);
            return {itemList: [...state.itemList]};
        default:
            return state;
    }
}