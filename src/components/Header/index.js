import { useEffect, useState } from "react";
import { Dropdown, Menu, Space, Badge } from "antd";
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux'
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

export default function Header() {
  const numberItems = useSelector(state => state.cart.numberItems)
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
            <span className="logo_highlight">renoshop</span>
            bee
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