import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductListScreen from './screens/ProductListScreen/ProductListScreen';
import CartScreen from './screens/CartScreen/CartScreen';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/page/:pageNumber' element={<ProductListScreen />} exact />
        <Route path='/' element={<ProductListScreen />} exact />
        <Route path='/cart' element={<CartScreen />} />
      </Routes>
    </Router>
  )
}
export default App;
