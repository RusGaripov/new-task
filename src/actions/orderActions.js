import {
    ORDER_REQUEST,
    ORDER_SUCCESS,
    ORDER_FAIL
} from '../constants/orderConstants'
import axios from 'axios'

export const createOrder = (order) => async (dispatch) => {

    try {
        dispatch({
            type: ORDER_REQUEST,
        })

        const config = {
            headers : {
                'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
            }
        }

        const { data } = await axios.post(`https://app.aaccent.su/js/confirm.php`, order, config)

        dispatch({
            type: ORDER_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: ORDER_FAIL,
            payload: 'some error',
        })
    }
}