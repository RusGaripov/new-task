import { products } from '../assets/products'
import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,
} from '../constants/productConstants'


export const productListReducer = (state = { productsInfo: { products: [], page: null, pages: null } }, action) => {
    switch (action.type) {
        case PRODUCT_LIST_REQUEST:
            return { loading: true, productsInfo: {} }
        case PRODUCT_LIST_SUCCESS:
            return {
                productsInfo: action.payload,
                loading: false,
            }
        case PRODUCT_LIST_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

