import { SET_STOCK } from "../../types";
import { ADD_STOCK } from "../../types";
import { StockState, StockData } from "../../interface";
import { AnyAction } from "redux";
// import produce from "immer";

const stockData: StockData[]= [{
    key: "0",
    category: "类别",
    subcategory: "子类别",
    number: "数量",
}];
const stockState : StockState = {
    stockData : stockData
}

export default function stockReducer(state : StockState = stockState, action : AnyAction) {
    switch (action.type) {
        case SET_STOCK:
            return {stockData : [...action.stock]};
        case ADD_STOCK:
            return {stockData : [...state.stockData, action.newStcok]};
        default:
            return state;
    }
}