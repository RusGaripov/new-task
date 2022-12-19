import {
    BRAND_LIST_SUCCESS,
  } from '../constants/brandConstants'


export const brandListReducer = (state = {}, action) => {
    switch (action.type) {
        case BRAND_LIST_SUCCESS:
            return {
                brands: action.payload,
            }
        default:
            return state
    }
}