import { Fragment, useEffect, useState } from "react";
import { Dropdown, Menu, Space, Badge, Popover, Image, Button, Empty } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux'
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

export default function Header() {
  const numberItems = useSelector(state => state.cart.numberItems)
  const cartItems = useSelector(state => state.cart.cart)
  const navigate = useNavigate()
  console.log(cartItems)
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    async function getCategories() {
      try {
        const res = await axios.get(
          "https://fakestoreapi.com/products/categories"
        );
        setCategories([...res?.data]);
      } catch (err) {
        console.log(err);
      }
    }
    getCategories();
  }, []);
  const menuMobile =
    categories &&
    categories.map((item) => {
      return {
        label: (
          <Link to={`products/${item}`} key={uuidv4()}>
            {" "}
            {item}{" "}
          </Link>
        ),
        key: `${item}`,
      };
    });
  const menu = (
    <Menu
      items={[
        {
          label: <Link to="/home"> home </Link>,
          key: "home",
        },
        ...menuMobile,
        {
          label: (
            <div className="actions_group">
              <div className="cart_action action_icons">
                <Link to="/cart">
                  <Badge count={numberItems} color={"#3cb878"} size={"small"}>
                    <i className="fa-solid fa-cart-shopping"></i>
                  </Badge>
                </Link>
              </div>
              <div className="search_action action_icons">
                <i className="fa-solid fa-magnifying-glass"></i>
              </div>
              <div className="wish_list_action action_icons">
                <i className="fa-solid fa-bars"></i>
              </div>
            </div>
          ),
          key: "actions",
        },
      ]}
    />
  );
  
  const smallcart = (
    <div className="smallcart">
      {cartItems.length !== 0 ? cartItems.map(item => (
          <div className="item" key={uuidv4()}>
            <Image src={item.image} width={50} alt={item.title} preview={false}/>
            <h5 className="name">{item.title}</h5>
            <span className="quantity">x {item.quantity}</span>
          </div>
      )) : (
        <Empty description={'No item into cart'}/>
      )}
      {cartItems.length !== 0 && <Button onClick={() => navigate('/cart')} align={'right'}>view detail</Button>  }
    </div>
  )
  return (
    <header className="header">
      <div className="header_top">
        <div className="header_contact">
          <p>
            <i className="fa-solid fa-phone"></i>
            <span>+1 123 456 789</span>
          </p>
          <p>
            <i className="fa-regular fa-envelope"></i>
            <span>info@company.com</span>
          </p>
        </div>
        <div className="header_social">
          <a href="#">
            <i className="fa-brands fa-facebook-f"></i>
          </a>
          <a href="#">
            <i className="fa-brands fa-twitter"></i>
          </a>
          <a href="#">
            <i className="fa-brands fa-instagram"></i>
          </a>
          <a href="#">
            <i className="fa-brands fa-linkedin-in"></i>
          </a>
          <a href="#">
            <i className="fa-brands fa-behance"></i>
          </a>
        </div>
      </div>
      <div className="header_menu">
        <div className="header_menu-left">
          <Link to="/home" className="logo">
            <span className="logo_highlight">kshop</span>
          </Link>
        </div>
        <div className="header_menu-center">
          <div className="menu_list">
            <Link to="/home">home</Link>
            {categories &&
              categories.map((category) => {
                return (
                  <Link to={`products/${category}`} key={uuidv4()}>
                    {category}
                  </Link>
                );
              })}
          </div>
        </div>
        <div className="header_menu-right">
          <div className="cart_action action_icons">
            <Link to="/cart">
              <Popover content={smallcart} placement={'bottom'}>
                <Badge count={numberItems} color={"#3cb878"} size={"small"}>
                  <i className="fa-solid fa-cart-shopping"></i>
                </Badge>
              </Popover>
            </Link>
          </div>
          <div className="search_action action_icons">
            <i className="fa-solid fa-magnifying-glass"></i>
          </div>
          <div className="wish_list_action action_icons">
            <i className="fa-solid fa-bars"></i>
          </div>
        </div>
        <div className="header_menu-mobile">
          <Dropdown
            overlay={menu}
            trigger={["click"]}
            overlayClassName="menu_mobile"
          >
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                <i className="fa-solid fa-bars"></i>
              </Space>
            </a>
          </Dropdown>
        </div>
      </div>
    </header>
  );
}
