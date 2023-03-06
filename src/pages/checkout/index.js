import { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { Row, Col, Input, Select, Radio, Button, Checkbox } from "antd";
import { Formik } from "formik";
import * as Yup from "yup";

export default function CheckOut() {
  const navigate = useNavigate()
  const [order, setOrder] = useState(null);
  const { state } = useLocation();
  const {
    productsList,
    totalPrice,
    shipping,
    coupon,
    voucher,
    totalCart,
    countryIso2,
    countriesList,
  } = state;
  const formInfo = useRef();
  const formPayment = useRef();
  // validate form
  const checkOutSchema = Yup.object().shape({
    firstName: Yup.string()
      .required("Please enter your first name")
      .min(3, "First name must be at least 3 characters"),
    lastName: Yup.string()
      .required("Please enter your last name")
      .min(3, "Last name must be at least 3 characters"),
    country: Yup.string().required("Please choose your country"),
    address: Yup.string().required("Please enter your address"),
    city: Yup.string().required("Please enter your city"),
    emailAddress: Yup.string().required("Please enter your email"),
    phone: Yup.number().required("Please enter your phone number"),
  });
  const handleSubmit = () => {
    if (formInfo.current && formPayment.current) {
      setOrder({
        customer: formInfo.current.values,
        paymentType: formPayment.current.values,
        order: {
          productsList,
          totalPrice,
          shipping,
          coupon,
          voucher,
          totalCart,
        },
      });
    }
  };
  const handleOrderMore = () => {
    setOrder(null)
    navigate('/')
  }
  return (
    <div className="checkout">
      {console.log(order)}
      <Row gutter={{ md: 32, lg: 32, xl: 32, xxl: 32 }}>
        {order ? (
          <Col xs={24} sm={24} md={15} lg={15} xl={15} xxl={15}>
            <h2>billing details</h2>
            <div className="customer_info">
              <div className="info_row">
                <span className="row_title">Full name:</span>
                <span className="row_detail">{order?.customer?.lastName} {order?.customer?.firstName}</span>
              </div>
              <div className="info_row">
                <span className="row_title">Address: </span>
                <span className="row_detail">{order?.customer?.address},{order?.customer?.city}</span>
              </div>
              <div className="info_row">
                <span className="row_title">Email: </span>
                <span className="row_detail">{order?.customer?.emailAddress}</span>
              </div>
              <div className="info_row">
                <span className="row_title">Phone number: </span>
                <span className="row_detail">{order?.customer?.phone}</span>
              </div>
              <div className="info_row">
                <span className="row_title">Company: </span>
                <span className="row_detail">{order?.customer?.companyName}</span>
              </div>
              <div className="info_row">
                <span className="row_notification">
                  we will contact you to confirm your order through email and cellphone. Thank you for supporting our shop!
                </span>
              </div>
              <div className="info_row">
                <span className="row_notification">
                  if you have any question about our products. Please feel free to contact us through this email: <a href="mailto: kiet.dao3103@gmail.com" target="_blank">kiet.dao3103@gmail.com</a>
                </span>  
              </div>
            </div>
          </Col>  
        ) : (
          <Col xs={24} sm={24} md={15} lg={15} xl={15} xxl={15}>
            <h2>billing details</h2>
            <div className="bill_info">
              <Formik
                initialValues={{
                  firstName: "",
                  lastName: "",
                  country: countryIso2,
                  companyName: "",
                  address: "",
                  postCode: 0,
                  city: "",
                  emailAddress: "",
                  phone: "",
                  confirmRegister: false,
                }}
                validationSchema={checkOutSchema}
                innerRef={formInfo}
              >
                {(props) => (
                  <Row gutter={{ md: 64, lg: 64, xl: 64, xxl: 64 }}>
                    <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
                      <label htmlFor="firstName" className="label_required">
                        first name
                      </label>
                      <Input name="firstName" onBlur={props.handleChange} />
                      {props.errors.firstName && (
                        <div className="error_msg">
                          {props.errors.firstName}
                        </div>
                      )}
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
                      <label htmlFor="lastName" className="label_required">
                        last name
                      </label>
                      <Input name="lastName" onBlur={props.handleChange} />
                      {props.errors.lastName && (
                        <div className="error_msg">{props.errors.lastName}</div>
                      )}
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                      <label htmlFor="country" className="label_required">
                        country
                      </label>
                      <Select
                        name="country"
                        defaultValue={() =>
                          countryIso2
                            ? countriesList.filter(
                                (item) => item.value === countryIso2
                              )[0]
                            : `Select Your Country`
                        }
                        options={countriesList && countriesList}
                        style={{ width: "100%", display: "block" }}
                        onChange={(values) =>
                          props.setFieldValue("country", values, true)
                        }
                      />
                      {props.errors.country && (
                        <div className="error_msg">{props.errors.country}</div>
                      )}
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                      <label htmlFor="companyName">company name</label>
                      <Input name="companyName" onBlur={props.handleChange} />
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                      <label htmlFor="address" className="label_required">
                        address
                      </label>
                      <Input name="address" onBlur={props.handleChange} />
                      {props.errors.address && (
                        <div className="error_msg">{props.errors.address}</div>
                      )}
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                      <label htmlFor="postCode">postcode/zip</label>
                      <Input name="postCode" onBlur={props.handleChange} />
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                      <label htmlFor="city" className="label_required">
                        town/city
                      </label>
                      <Input name="city" onBlur={props.handleChange} />
                      {props.errors.city && (
                        <div className="error_msg">{props.errors.city}</div>
                      )}
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
                      <label htmlFor="emailAddress" className="label_required">
                        email address
                      </label>
                      <Input name="emailAddress" onBlur={props.handleChange} />
                      {props.errors.emailAddress && (
                        <div className="error_msg">
                          {props.errors.emailAddress}
                        </div>
                      )}
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
                      <label htmlFor="phone" className="label_required">
                        phone
                      </label>
                      <Input name="phone" onBlur={props.handleChange} />
                      {props.errors.phone && (
                        <div className="error_msg">{props.errors.phone}</div>
                      )}
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                      <Checkbox
                        name="confirmRegister"
                        className="confirm_register"
                        onChange={props.handleChange}
                      >
                        Create an account?
                      </Checkbox>
                    </Col>
                  </Row>
                )}
              </Formik>
            </div>
          </Col>
        )}
        <Col xs={24} sm={24} md={9} lg={9} xl={9} xxl={9}>
          <div className="bill_table">
            <div className="bill_container">
              <h2>your order</h2>
              <div className="bill_content">
                <div className="bill_group">
                  <div className="bill_title">
                    <div className="title_col1">product</div>
                    <div className="title_col2">total</div>
                  </div>
                  <hr />
                  <div className="bill_list">
                    {productsList &&
                      productsList.map((item) => (
                        <div className="bill_item" key={item.id}>
                          <span className="item">
                            {item.title} <span className="multiply">x</span>{" "}
                            {item.quantity}
                          </span>
                          <span className="value">
                            ${item.price * item.quantity}
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
                <hr />
                <div className="bill_group">
                  <div className="bill_item">
                    <span className="item">subtotal</span>
                    <span className="value">${totalPrice}</span>
                  </div>
                  <div className="bill_item">
                    <span className="item">shipping</span>
                    <span className="value">
                      {shipping === 0 ? "free shipping" : `$${shipping}`}
                    </span>
                  </div>
                  {coupon === 0 ? (
                    ""
                  ) : (
                    <div className="bill_item">
                      <span className="item">coupon</span>
                      <span className="value">-${coupon}</span>
                    </div>
                  )}
                  {voucher === 0 ? (
                    ""
                  ) : (
                    <div className="bill_item">
                      <span className="item">voucher</span>
                      <span className="value">-${voucher}</span>
                    </div>
                  )}
                </div>
                <hr />
                <div className="bill_group_total">
                  <div className="bill_item">
                    <span className="item">total</span>
                    <span className="value">${totalCart}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {order ? '' : (
            <div className="payment_type">
            <Formik
              initialValues={{
                paymentType: "",
              }}
              innerRef={formPayment}
            >
              {(props) => (
                <Radio.Group
                  name="paymentType"
                  className="payment_list"
                  onChange={props.handleChange}
                >
                  <Radio value={"direct"} className="payment_item">
                    Direct Bank Transfer
                  </Radio>
                  <Radio className="payment_advice">
                    Make your payment directly into our bank account. Please use
                    your Order ID as the payment reference. Your order won't be
                    shipped until the funds have cleared in our account.
                  </Radio>
                  <Radio value={"cheque"} className="payment_item">
                    cheque payment
                  </Radio>
                  <Radio value={"paypal"} className="payment_item">
                    paypal
                  </Radio>
                </Radio.Group>
              )}
            </Formik>
          </div>
          )}
        </Col>
      </Row>
      <Row>
        <Col
          xs={24}
          sm={24}
          md={24}
          lg={24}
          xl={24}
          xxl={24}
          className="place_order"
        >
          <Button type="primary" onClick={handleSubmit} disabled={order ? true : false}>
            place order
          </Button>
          <Button type="primary" onClick={handleOrderMore} disabled={order ? false : true}>
            order more
          </Button>
        </Col>
      </Row>
    </div>
  );
}
