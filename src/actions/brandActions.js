import {
    BRAND_LIST_SUCCESS,
} from '../constants/brandConstants'
import { brands } from '../assets/brands'

export const listBrands = () => dispatch => {
    console.log(brands)
    dispatch({
        type: BRAND_LIST_SUCCESS,
        payload: brands,
    })
}