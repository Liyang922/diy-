import { legacy_createStore as createStore, combineReducers, Store, compose, applyMiddleware } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import reduxThunk from "redux-thunk";
import reduxPromise from "redux-promise";
import { composeWithDevTools } from 'redux-devtools-extension';


import globalReducer from "./modules/global/reducer";
import authReducer from "./modules/auth/reducer";
import menuReducer from "./modules/menu/reducer";
import breadcrumbReducer from "./modules/breadcrumb/reducer";
import stockReducer from "./modules/stock/reducer";
import itemReducer from "./modules/item/reducer";

// 合并reducer
const reducers = combineReducers({
    global: globalReducer,
    auth: authReducer,
    menu: menuReducer,
    breadcrumb: breadcrumbReducer,
    stock: stockReducer,
    item: itemReducer,
})

// 持久化
const persistConfig = {
    key: "redux-state",
    storage: storage
};
const persistReducerConfig = persistReducer(persistConfig, reducers);

// 开启 redux-devtools
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// 使用 redux 中间件
const middleWares = applyMiddleware(reduxThunk, reduxPromise);

// 创建 store
const store: Store = createStore(persistReducerConfig, composeWithDevTools(middleWares));

// 创建持久化 store
const persistor = persistStore(store);

export { store, persistor };