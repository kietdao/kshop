import React from 'react'
import { Row, Col } from 'antd' 

export default function () {
  return (
    <footer className='footer'>
  
      <div className='footer_social'>
        <Row>
          <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
            <p>We're confident we've provided all the best for you. Stay connect with us</p>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
            <div className='social_list'>
              <a href='#'><i className="fa-brands fa-facebook-f"></i></a>
              <a href='#'><i className="fa-brands fa-twitter"></i></a>
              <a href='#'><i className="fa-brands fa-instagram"></i></a>
              <a href='#'><i className="fa-brands fa-linkedin-in"></i></a>
              <a href='#'><i className="fa-brands fa-behance"></i></a>
            </div>
          </Col>
        </Row>
      </div>
      <div className='footer_contents'>
        <Row>
          <Col xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
            <div className='content_item'>
              <h4 className='title'>Information</h4>
              <div className='links'>
                <a href='#'>delivery information</a>
                <a href='#'>discount</a>
                <a href='#'>sitemap</a>
                <a href='#'>privacy policy</a>
                <a href='#'>my account</a>
              </div>
            </div>
          </Col>  
          <Col xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
            <div className='content_item'>
              <h4 className='title'>my account</h4>
              <div className='links'>
                <a href='#'>sign in</a>
                <a href='#'>view cart</a>
                <a href='#'>my wishlist</a>
                <a href='#'>check out</a>
                <a href='#'>track my order</a>
              </div>
            </div>
          </Col> 
          <Col xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
            <div className='content_item'>
              <h4 className='title'>help</h4>
              <div className='links'>
                <a href='#'>F.A.Q</a>
                <a href='#'>shipping</a>
                <a href='#'>contact us</a>
                <a href='#'>privacy policy</a>
              </div>
            </div>
          </Col> 
          <Col xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
            <div className='content_item'>
              <h4 className='title'>contact info</h4>
              <div className='contact_info'>
                <p>
                  <i className="fa-solid fa-earth-americas"></i>
                  <span>1234 your address, country.</span>
                </p>
                <p>
                  <i className="fa-solid fa-phone"></i>
                  <span>+1 123 456 789</span>
                </p>
                <p>
                  <i className="fa-solid fa-envelope"></i>
                  <span className='email'>info@company.com</span>
                </p>
              </div>
            </div>
          </Col> 
        </Row>
      </div>
      <div className='footer_bottom'>
        <div className='footer_bottom_content'>
          <Row>
            <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
              <p className='copy_right'>Copyright 2017 RenoshopBee all right reserved - Design by Beestudios</p>
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
              <div className='cards_list'>
                <img src='./static/images/visa_card.png' alt='visa'/>
                <img src='./static/images/paypal_card.png' alt='paypal'/>
                <img src='./static/images/amazon_card.png' alt='amazon'/>
                <img src='./static/images/maestro_card.png' alt='maestro'/>
                <img src='./static/images/amex_card.png' alt='amex'/> 
              </div>
            </Col>
          </Row>
         
         
        </div>
      </div>
    </footer>
  )
}
