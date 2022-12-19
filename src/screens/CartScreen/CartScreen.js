import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Image, ListGroup, Form, Button } from 'react-bootstrap'
import styles from "./CartScreen.module.css";
import { createOrder } from '../../actions/orderActions';
import Modals from '../../components/Modals';
import { CART_RESET } from '../../constants/cartConstants'

const CartScreen = () => {

  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false)

  const [object, setObject] = useState({})

  const [totalSum, setTotalSum] = useState(null)

  const dispatch = useDispatch()

  const cart = useSelector((state) => state.cart)

  const { cartItems } = cart

  const order = useSelector((state) => state.order)

  const { orderStatus } = order


  useEffect(() => {
    if (cartItems.length > 0) {
      // сумма из расчета одной штуки товара
      let sum = 0;
      for (let i = 0; i < cartItems.length; i++) {
        sum += cartItems[i].cartProduct.regular_price.value
      }
      setTotalSum(sum.toFixed(2))
      calculatePrice();
    }
  }, [dispatch])

  const calculatePrice = () => {
    let obj = {}
    for (let i = 0; i < cartItems.length; i++) {
      obj[cartItems[i].cartProduct.id] = 1;
    }
    setObject(obj)
  }

  // для dropdown
  const quantityArray = [1, 2, 3, 4, 5];

  // пересчет суммы
  const recalculateSum = (obj) => {
    let sum = 0;
    for (let i = 0; i < cartItems.length; i++) {
      sum += cartItems[i].cartProduct.regular_price.value * Object.values(obj)[i]
    }
    setTotalSum(sum.toFixed(2))
  }

  const sendOrder = () => {
    let dataToPost = JSON.stringify({ name: 'Dennis', phone: '1234567890', password: '12345', cartItems })
    dispatch(createOrder(dataToPost))
    setShowModal(true)

  }

  const modalFun = (a) => {
    setShowModal(a);
    navigate('/')
    dispatch({ type: CART_RESET })
  }

  return (
    <div className={styles.container}>
      {orderStatus && orderStatus.result === 'ok' && showModal && <Modals showModal={modalFun} />}
      <h3 className={styles.header}>Иванов Иван</h3>
      <h5 className={styles.info}>+7(9292) 828282</h5>
      <Button className={styles.button} variant="success" onClick={sendOrder}>Оформить заказ</Button>{' '}

      {cartItems.map((cartItem, index) => (
        <ListGroup variant='flush' className={styles.cartItem}>
          <ListGroup.Item>
            <h3>{cartItem.cartProduct.title}</h3>
          </ListGroup.Item>
          <Image className={styles.image} variant="top" src={require(`../../assets${cartItem.cartProduct.image}`)} alt='Image' />
          <ListGroup.Item className={styles.price}>Price: {cartItem.cartProduct.regular_price.value}{' '}{cartItem.cartProduct.regular_price.currency}</ListGroup.Item>
          <ListGroup.Item>
            <Row className={styles.qtyBox}>
              <Col className={styles.qty}>Qty</Col>
              <Col className={styles.dropdown}>
                <Form.Control
                  as='select'
                  // value={qty}
                  onChange={(e) => {
                    const obj = { ...object }

                    obj[cartItem.cartProduct.id] = Number.parseInt(e.target.value)

                    setObject(obj)

                    recalculateSum(obj);
                  }
                  }
                >
                  {quantityArray.map(
                    (x) => (
                      <option key={x} value={x}>
                        {x}
                      </option>
                    )
                  )}
                </Form.Control>
              </Col>
            </Row>
          </ListGroup.Item>
          <ListGroup.Item className={styles.sum}>
            {(object[cartItem.cartProduct.id] * cartItem.cartProduct.regular_price.value).toFixed(2)}
            {' '}{cartItem.cartProduct.regular_price.currency}
          </ListGroup.Item>
        </ListGroup>
      ))}
      <div className={styles.totalPrice}>
        Total Price: {totalSum} USD
      </div>
    </div>
  )
}

export default CartScreen
