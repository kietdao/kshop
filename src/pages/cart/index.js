import {React, Fragment, useEffect, useState} from "react";
import { Table, Button, Row, Col, Input, InputNumber, Select, Image } from "antd";
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import * as Yup from 'yup'
import {deleteItem, editQuantity} from '../../features/cart/cartSlice'
import { Formik } from 'formik'
import axios from 'axios'
import vouchercode from 'voucher-code-generator'

export default function Cart() {
  const cartFromStore = useSelector(state => state.cart.cart)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const couponCodeList = ['b37acc43', 'cbb66ba1', '741751c2', 'a9755135', 'c6c7c357']
  const voucherCodeList = ['KFbQzw', 'FqSmDc', 'QRuuVE', 'PcrFUO', 'lCzpqU']
  const [cart, setCart] = useState([])
  const [totalPrice, setTotalPrice] = useState(0)
  const [coupon, setCoupon] = useState(0)
  const [voucher, setVoucher] = useState(0)
  const [shipping, setShipping] = useState(0)
  const [totalCart, setTotalCart] = useState(0)
  const [countriesData, setCountriesData] = useState(null)
  const [countriesList, setCountriesList] = useState(null)
  const [statesList, setStatesList] = useState(null)
  const [selectedState, setSelectedState] = useState(null)
  const [countryIso2, setCountryIso2] = useState('')
  // Custom cart data
  useEffect(() => {
    async function getCartData() {
      try {
        let result = []
        cartFromStore.map(item => {
              result.push(
                {
                  key: item.id,
                  image: item.image,
                  product: item.title,
                  quantity: item.quantity,
                  price: item.price
                }
              )
        })
        setCart([...result])
      } catch (error) {
        console.log(error)
      }
    }
    getCartData()
  }, [cartFromStore])
  // Total Price
  useEffect(() => {
    const result = cart.reduce((acc, curr) => {
      return acc + (curr.price*curr.quantity)
    }, 0)
    setTotalPrice(Math.ceil(result))
  }, [cart])
  // Total Cart
  useEffect(() => {
    setTotalCart(totalPrice - (coupon + totalPrice*voucher) + shipping)
  }, [totalPrice, voucher, coupon])
  // get countries data
  useEffect(() => {
    async function getCountriesData() {
      try {
        const res = await axios.get('https://countriesnow.space/api/v0.1/countries/states')
        setCountriesData([...res.data.data])
        const customedData = res.data.data.map(item => {
          return {
            value: item.iso2,
            label: item.name
          }
        })
        setCountriesList([...customedData])
      } catch (err) {
        console.log(err)
      }
    }
    getCountriesData()
  }, [])

  // Display cart
  const cartList = cart
  const columns = [
    {
      title: "Products",
      dataIndex: "",
      render: ({product, image}) => (
        <div>
          <Image 
            src={image} 
            alt={product} 
            width={80}
            height={100}
            placeholder={true}
            fallback="data:image/png;base64,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"
          />
          <span className="product_name">{product}</span>
        </div>
      )
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      render: (quantity, index) => (
            <InputNumber 
              defaultValue={`${quantity}`}
              min={1}
              max={10}
              onChange={(value) => dispatch(editQuantity({itemId: cart.indexOf(index), newQuantity: value}))}
            />
      )
    },
    {
      title: "Price",
      dataIndex: "price",
      render: (price) => (
        <span className="product_price">${price}</span>
      )
    },
    {
      title: "Total",
      dataIndex: '',
      render: ({ quantity, price }, index) => (
        <div className="total_cell">
          <span className="product_total">${Math.ceil(quantity*price)}</span>
          <i className="fa-regular fa-circle-xmark" onClick={() => dispatch(deleteItem(cart.indexOf(index)))}></i>
        </div>
      )
    },
  ];
  // Validate forms
  const couponSchema = Yup.object().shape({
    couponCode: Yup.string()
    .required('You have to enter your Coupon Code')
  })
  const voucherSchema = Yup.object().shape({
    voucherCode: Yup.string()
    .required('You have to enter your Voucher Code')
  })
  // hanlde countries list change
  const handleCountriesListChange = (value) => {
    const result = countriesData.filter(item => value === item.iso2)[0]?.states.map(item => {
      return {
        value: item.state_code,
        label: item.name
      }
    })
    setStatesList([...result])
    setCountryIso2(value)
    setSelectedState(null)
  }
  const handleStatesListChange = (value) => {
    setSelectedState(value)
  }
  // Check out
  const proceedToCheckOut = () => {
    const checkoutList = {
      productsList: cartFromStore,
      totalPrice: totalPrice,
      shipping: shipping,
      coupon: coupon,
      voucher: voucher,
      totalCart: totalCart,
      countryIso2: countryIso2,
      countriesList: countriesList
    }
    navigate('../checkout', {state: checkoutList})
  }
  return (
    <div className="cart">
      <div className="cart_list">
        <Table dataSource={cartList} columns={columns} />
        <div className="cart_list_button">
          <Button type="primary" onClick={() => navigate('../products/electronics')}>Continue Shopping</Button>
        </div>
      </div>
      <div className="payment">
        <Row gutter={{md: 32, lg: 32, xl: 32, xxl:32}}>
          <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
            <div className="payment_coupon payment_item">
              <h2 className="title">use coupon code</h2>
              <span className="sub_title">Enter your coupon here</span>
              <Formik 
                initialValues={{couponCode: ''}} 
                validationSchema = {couponSchema}
                onSubmit={(values, actions) => {
                  if(couponCodeList.some(item => item === values.couponCode)) {
                      setCoupon(50)
                  } else {
                    actions.setFieldError('couponCode','Coupon Code is not available')
                  }
                }}
              > 
                {(props) => (
                  <Input.Group compact>
                    <Input name="couponCode" onChange={props.handleChange} style={{ width: "calc(100% - 128px)", height: '45px' }} placeholder="Enter your coupon here" onPressEnter={props.handleSubmit}/>
                    <Button type="primary" onClick={props.handleSubmit}>Apply</Button> 
                    {props.errors.couponCode && (
                      <div className="error_msg">
                        {props.errors.couponCode}
                      </div>
                    )}
                  </Input.Group>
                 )
                }
              </Formik>  
            </div>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
            <div className="payment_voucher payment_item">
              <h2 className="title">use gift voucher</h2>
              <span className="sub_title">Enter your gift voucher code here</span>
              <Formik 
                initialValues={{voucherCode: ''}} 
                validationSchema = {voucherSchema}
                onSubmit={(values, actions) => {
                  if(voucherCodeList.some(item => item === values.voucherCode)) {
                    console.log('them voucher thanh cong')
                    setVoucher(0.1)
                  } else {
                    actions.setFieldError('voucherCode','Voucher Code is not available')
                  }
                }}
              >
                  {(props) => (
                    <Input.Group compact>
                     <Input name='voucherCode' onChange={props.handleChange} style={{ width: "calc(100% - 128px)", height: '45px' }} placeholder="Enter your voucher here" onPressEnter={props.handleSubmit}/>
                     <Button type="primary" onClick={props.handleSubmit}>Apply</Button> 
                     {props.errors.voucherCode && (
                      <div className="error_msg">
                        {props.errors.voucherCode}
                      </div>
                    )}
                    </Input.Group>
                  )}
              </Formik> 
            </div>
          </Col>
        </Row>
        <Row gutter={{md: 32, lg: 32, xl: 32, xxl:32}}>
          <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
            <div className="payment_shipping payment_item">
              <h2 className="title">shipping availability</h2>
              <Formik initialValues={{country: '', state: '', postCode: ''}}>
                  {(props) => (
                    <Fragment>
                      <span className="sub_title">select country</span>
                      <Select
                        name='country' 
                        defaultValue={`Select Your Country`}
                        style={{width: '100%', display: 'block'}}
                        onChange={handleCountriesListChange}
                        options={countriesList && countriesList}
                      />
                      <span className="sub_title">select state</span>
                      <Select
                        name='state'
                        placeholder={statesList && (statesList.length !== 0? `Choose your state` : `Don't have any state`)}
                        onChange={handleStatesListChange}
                        value={selectedState}
                        style={{width: '100%', display: 'block'}}
                        options={statesList && statesList}
                      />
                      <span className="sub_title">postcode / zip</span>
                      <Input name="postCode" placeholder="Postcode/Zip"/>
                    </Fragment>
                  )}
              </Formik> 
            </div>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
            <div className="payment_calculation payment_item">
              <h2 className="title">shopping cart calculation</h2>
              <div className="calculation_table">
                  <div className="calculation_item">
                    <span className="item">subtotal</span>
                    <span className="value">${totalPrice}</span>
                  </div>
                  <div className="calculation_item">
                    <span className="item">coupon</span>
                    <span className="value">-${coupon}</span>
                  </div>
                  <div className="calculation_item">
                    <span className="item">shipping</span>
                    <span className="value">{shipping === 0 ? 'free shipping' : `$${shipping}`}</span>
                  </div>
                  <div className="calculation_item-total">
                    <span className="item">total</span>
                    <span className="value">${totalCart}</span>
                  </div>
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24} className='proceed_checkout'>
            <Button type='primary' onClick={proceedToCheckOut}>Proceed to checkout</Button>
          </Col>  
        </Row>
      </div>
    </div>
  );
}
