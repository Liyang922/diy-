import { SET_STOCK } from "../../types";
import { ADD_STOCK } from "../../types";
import { StockData } from "../../interface";

export function setStock(stock : Array<StockData>){
    return {
        type: SET_STOCK,
        stock
    };
}

export function addStock(newStcok : StockData){
    return {
        type: ADD_STOCK,
        newStcok
    };
}



