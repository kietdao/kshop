import React from 'react'
import { Row, Col } from 'antd'

export default function Policies() {
  return (
    <div className='policies_list'>
      <Row>
        <Col xs={24} sm={24} md={12} lg={6} xl={6} xxl={6} >
          <div className='policies_item'>
              <img src='./static/images/diamond_img.png' />
              <div className='policies_info'>
                <h4 className='policies_title'>special offers</h4>
                <span className='policies_subtitle'>shop big save big</span>
              </div>
          </div>
        </Col>
        <Col xs={24} sm={24} md={12} lg={6} xl={6} xxl={6} >
          <div className='policies_item'>
              <img src='./static/images/plane_img.png' />
              <div className='policies_info'>
                <h4 className='policies_title'>free delivery</h4>
                <span className='policies_subtitle'>on orders above $99</span>  
              </div>
          </div>
        </Col>
        <Col xs={24} sm={24} md={12} lg={6} xl={6} xxl={6} >
          <div className='policies_item'>
              <img src='./static/images/returns_img.png' />
              <div className='policies_info'>
                <h4 className='policies_title'>30 days return</h4>
                <span className='policies_subtitle'>policy we offers</span>
              </div>
          </div>
        </Col>
        <Col xs={24} sm={24} md={12} lg={6} xl={6} xxl={6} >
          <div className='policies_item'>
              <img src='./static/images/rocket_img.png' />
              <div className='policies_info'>
                <h4 className='policies_title'>fastest shipping</h4>
                <span className='policies_subtitle'>2 days express</span>
              </div>
          </div>
        </Col>
      </Row>
    </div>
  )
}
