import {
    BRAND_LIST_SUCCESS,
} from '../constants/brandConstants'
import { brands } from '../assets/brands'

export const listBrands = () => dispatch => {
    dispatch({
        type: BRAND_LIST_SUCCESS,
        payload: brands,
    })
}