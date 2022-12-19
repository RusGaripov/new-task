import {
    CART_ADD_ITEM,
} from '../constants/cartConstants'

export const addToCart = (product) => async (dispatch) => {

    dispatch({
        type: CART_ADD_ITEM,
        payload: {
            cartProduct: product
        },
    })
}


