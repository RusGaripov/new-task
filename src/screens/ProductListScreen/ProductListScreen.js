import React, { useEffect, useState } from "react";
import { listProducts } from "../../actions/productActions";
import { listBrands } from "../../actions/brandActions";
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from '../../actions/cartActions'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import styles from "./ProductListScreen.module.css";
import closeIcon from "../../assets/icons/close.png";
import shoppingCart from "../../assets/icons/shoppingCart.png";
import triangle from "../../assets/icons/triangle.png";
import Paginate from "../../components/Paginate";
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom'


const ProductListScreen = () => {

  const [brandsShow, setBrandsShow] = useState(true)

  const [brandsList, setBrandsList] = useState([]);

  const { pageNumber } = useParams() || 1;

  const dispatch = useDispatch()

  const productList = useSelector((state) => state.productList)

  const brandList = useSelector((state) => state.brandList)

  const { productsInfo } = productList

  const { products, page, pages, loading } = productsInfo

  const { brands } = brandList

  const cart = useSelector((state) => state.cart)

  const { cartItems } = cart

  console.log(cartItems.length)

  useEffect(() => {
    if (!pageNumber) {
      dispatch(listProducts(1))
    } else {
      dispatch(listProducts(pageNumber, brandsList))
    }
    dispatch(listBrands())
  }, [dispatch, pageNumber, listProducts])

  const resetFilter = () => {
    if (!pageNumber) {
      dispatch(listProducts(1))
    } else {
      dispatch(listProducts(pageNumber))
    }
    dispatch(listBrands())
    setBrandsList([])
  }

  const filterHandler = () => {
    if (brandsList.length > 0) {
      let filtered = 'yes'
      dispatch(listProducts(pageNumber, brandsList, filtered))
    } else {
      dispatch(listProducts(pageNumber, brandsList))
    }
  }

  if (!loading)
    return (
      <div className={styles.container}>
        <div className={styles.contentBox}>
          <div className={styles.filters}>
            <div className={styles.shoppingCart}>
              <Link to='/cart'>
                <img className={styles.shoppingCartImg} src={shoppingCart} alt="Shopping cart" />
                <p>{cartItems && cartItems.length}</p>
              </Link>
              <img onClick={() => setBrandsShow(!brandsShow)} style={brandsShow ? { transform: 'rotate(58deg)' } : null} className={styles.triangle} src={triangle} alt="brandlist" />
            </div>
            <h5 style={brandsShow ? { width: 'inherit' } : { display: 'none' }} className={styles.header}>Бренды</h5>

            {brands && <div className={styles.brands} style={brandsShow ? { width: 'inherit' } : { display: 'none' }}>
              {brands.map((brand) =>
                <Form>
                  {['checkbox'].map((type) => (
                    <div key={brand.id} className="mb-3">
                      <Form.Check
                        type={type}
                        checked={brandsList.filter(item => item === brand.id).length > 0 ? true : false}
                        id={brand.id}
                        label={brand.title}
                        style={{ color: 'green' }}
                        onClick={(e) => {
                          if (e.target.checked) {
                            console.log(brandsList)
                            setBrandsList([...brandsList, brand.id])
                          }
                          else {
                            let brands = brandsList.filter(item => {
                              return item !== brand.id;
                            });
                            setBrandsList(brands)
                          }
                        }
                        }
                      />
                    </div>
                  ))}
                </Form>
              )}
            </div>}
            <Button variant="success" onClick={filterHandler}>Применить</Button>{' '}
            <div className={styles.reset} onClick={resetFilter}>
              <img src={closeIcon} />
              <p>Сбросить</p>
            </div>
          </div>

          {products && <div className={styles.cards}>
            {products.map((product) => (
              <Card className={styles.card}>
                <Card.Img variant="top" src={require(`../../assets${product.image}`)} alt='Image' />
                <Card.Body>
                  <Card.Title>{product.title}</Card.Title>
                  <Button
                    variant="primary"
                    onClick={() =>
                      dispatch(
                        addToCart(product)
                      )
                    }
                  >
                    Add to Basket
                  </Button>
                </Card.Body>
              </Card>
            ))}
          </div>}
        </div>
        <div className={styles.paginator}>
          <Paginate pages={pages} page={page} />
        </div>
      </div>
    )
};

export default ProductListScreen;
