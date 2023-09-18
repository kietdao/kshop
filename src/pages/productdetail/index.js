import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import { useQuery } from "react-query";
import { Row, Col, Image } from "antd";
import Slider from "react-slick";

export default function ProductDetail() {
  const [slider, setSlider] = useState(null)
  // fetch product following id
  const { id } = useParams();
  const fetchProduct = async (id) => {
    try {
      const res = await axios.get(`https://fakestoreapi.com/products/${id}`);
      return res.data;
    } catch (err) {
      console.log("error fetch product", err);
    }
  };
  const { data: item, isLoading } = useQuery(["product", id], () =>
    fetchProduct(id)
  );
  // set image slider for product
  const slideSetting = {
    customPaging: function () {
      return (
          <a>
            <img src={item?.image} className='slick-paging'/>
          </a>
      );
    },
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    appendDots: dots => (
      <div className="slick-dots">
        <li className="slick-arrow slick-prev" onClick={() => slider.slickPrev()} />
        {dots}
        <li className="slick-arrow slick-next" onClick={() => slider.slickNext()} />
      </div>
    ),
  };
  return (
    <div className="product_detail">
      <Row gutter={8}>
        <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
          <div className="product_img">
            <Slider ref={(slider) => setSlider(slider)}{...slideSetting}>
              <div>
                <Image src={item?.image} preview={false} />
              </div>
              <div>
                <Image src={item?.image} preview={false} />
              </div>
              <div>
                <Image src={item?.image} preview={false} />
              </div>
            </Slider>
          </div>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
          <div className="product_info"></div>
        </Col>
      </Row>
      <Row gutter={8}>
        <div className="product_tabs"></div>
        <div className="product_tabs_content">
          <div className="description"></div>
          <div className="reviews"></div>
        </div>
      </Row>
      <Row gutter={8}>
        <div className="related_products"></div>
      </Row>
    </div>
  );
}
