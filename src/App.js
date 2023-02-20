import logo from "./logo.svg";
import "./App.scss";
import { useEffect, Fragment, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, useParams } from "react-router-dom";
import { getProductList } from "./features/products/productsSlice";
import axios from "axios";
import { message } from 'antd'
import "antd/dist/antd.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/home";
import Products from "./pages/products";
import Lookbook from "./pages/lookbook";
import Cart from "./pages/cart";
import About from "./pages/about";
import Contact from "./pages/contact";
import CheckOut from './pages/checkout';
import Breadcrumbs from "./components/Breadcrumbs";

function App() {
  const dispatch = useDispatch();
  const warnMsg = useSelector(state => state?.cart.warnMsg)
  const succMsg = useSelector(state => state?.cart.succMsg)
  const { typeProduct } = useParams();
  useEffect(() => {
    async function getProductData() {
      try {
        const res = await getProducts();
        dispatch(getProductList(res.data));
      } catch (err) {
        console.log(err);
      }
    }
    getProductData();
  }, []);
  useEffect(() => {
    warnMsg && showWarnMsg()
    succMsg && showSuccMsg()
  }, [warnMsg, succMsg])
  const getProducts = function () {
    return axios.get("https://fakestoreapi.com/products");
  };
  const showWarnMsg = () => {
    message.warning(warnMsg, 2)
  }
  const showSuccMsg = () => {
    message.success(succMsg, 2)
  }
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="*" element={<Home />} />
        <Route exact path="/home" element={<Home />} />
        <Route
          path="/products/:typeProduct"
          element={
            <Fragment>
              <Breadcrumbs />
              <Products />
            </Fragment>
          }
        />
        <Route exact path="/lookbook" element={<Lookbook />} />
        <Route
          path="/cart"
          element={
            <Fragment>
              <Breadcrumbs />
              <Cart />
            </Fragment>
          }
        />
        <Route exact path="/about" element={<About />} />
        <Route exact path="/contact" element={<Contact />} />
        <Route 
          exact 
          path="/checkout" 
          element={
            <Fragment>
              <Breadcrumbs />
              <CheckOut />
            </Fragment>
          } 
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
