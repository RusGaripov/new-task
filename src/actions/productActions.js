import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,
} from '../constants/productConstants'
import { products } from '../assets/products'

export const listProducts = (pageNumber = 1, brandsList = [], filtered) => async (dispatch) => {

    const page = Number.parseInt(pageNumber);

    let productsForPage = [];
    let productsFiltered = [];

    if (brandsList.length > 0) {
        for (let i = 0; i < products.length; i++) {
            for (let j = 0; j < brandsList.length; j++) {
                if (products[i].brand === brandsList[j]) {
                    productsFiltered.push(products[i])
                }
            }
        }
        productsForPage = productsFiltered.slice((page - 1) * 6, (page - 1) * 6 + 6)
    } else {
        productsForPage = products.slice((page - 1) * 6, (page - 1) * 6 + 6)
    }

    let count;

    if (filtered === 'yes') {
        count = productsFiltered.length
    } else {
        count = products.length
    }

    const pages = Math.ceil(count / 6)

    try {
        dispatch({ type: PRODUCT_LIST_REQUEST })

        dispatch({
            type: PRODUCT_LIST_SUCCESS,
            payload: { products: productsForPage, page, pages },
        })
    } catch (error) {
        dispatch({
            type: PRODUCT_LIST_FAIL,
            payload: 'Error',
        })
    }
}
