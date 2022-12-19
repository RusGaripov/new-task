import {
    CART_ADD_ITEM, CART_RESET,
} from '../constants/cartConstants'


export const cartReducer = (state = { cartItems: [] }, action) => {
    switch (action.type) {
        case CART_ADD_ITEM:
            return {
                cartItems: [...state.cartItems, action.payload],
            }
        case CART_RESET:
            return {
                cartItems: [],
            }
        default:
            return state
    }
}
