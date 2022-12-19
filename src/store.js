import { configureStore } from "@reduxjs/toolkit";
import { productListReducer } from "./reducers/productListReducer";
import { brandListReducer } from "./reducers/brandListReducer";
import { cartReducer } from "./reducers/cartReducer";
import { orderReducer } from "./reducers/orderReducer";

const initialState = {
    productList: {
        productsInfo: {}
    },
    brandList: {},
};

const store = configureStore({
    reducer: {
        productList: productListReducer,
        brandList: brandListReducer,
        cart: cartReducer,
        order: orderReducer,
    },
    preloadedState: initialState,
});

export default store;
