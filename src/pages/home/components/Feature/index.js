import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addToCart } from '../../../../features/cart/cartSlice'
import { Row, Col, Image, Rate } from 'antd'
import { useNavigate } from 'react-router'

export default function FeatureProduct() {
  const products = useSelector(state => state?.products?.products)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const featuredProduct = products.filter(product => product.rating.rate > 3.6)
  const handleClickProduct = (id) => {
    navigate(`/product/${id}`);
  };
  return (
    <div className='feature_products'>
        <div className='feature_title'>
            <h3 className='title'>featured products</h3>
            <h5 className='subtitle'>newest trends from top brands</h5>
        </div>
        <Row gutter={30} justify={'space-round'}>
          {featuredProduct && featuredProduct.map((item) => {
            return (
              <Col xs={24} sm={24} md={8} key={item?.id} className={'col-2'}>
                <div className='feature_product'>
                        <div className='product_img'>
                          <Image src={item?.image} preview={false} placeholder={true}/>
                        </div>
                        <div className='product_info' onClick={() => handleClickProduct(item.id)}>
                          <h4 className='product_name'>{item?.title}</h4>
                          <span className='product_price'>{`$`+item?.price}</span>
                          <div className='product_rating'>
                            <Rate disabled defaultValue={item?.rating?.rate} style={{
                              color: '#ff9600',
                              borderColor: '#ff9600'
                            }}/>
                          </div>
                        </div>
                        <div className='product_action'>
                          <div className='action_item' onClick={() => dispatch(addToCart(item))}>
                            <i className="fa-solid fa-cart-shopping"></i>
                          </div>
                          <div className='action_item'>
                            <i className="fa-solid fa-heart"></i>
                          </div>
                          <div className='action_item'>
                            <i className="fa-solid fa-arrows-rotate"></i>
                          </div>
                        </div>
                </div>
              </Col>
            )
          })}
        </Row>
    </div>
  )
}
