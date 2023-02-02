import React from 'react'
import {Row, Col, Image} from 'antd'

export default function Categories() {
  return (
    <div className='categories_overview'>
        <Row>
            <Col xs={24} sm={24} md={24} lg={8} xl={8} xxl={8} >
                <div className='categories_item'>
                    <div className='line_1'></div>
                    <div className='line_2'></div>
                    <div className='categories_content'>
                        <span className='category_subtitle'>fashion</span>
                        <h4 className='category_title'>summer & autumn</h4>
                        <span className='category_subtitle'>winter collection</span>
                    </div>
                </div>
            </Col>    
            <Col xs={24} sm={24} md={24} lg={8} xl={8} xxl={8} >
                <div className='categories_item'>
                    <div className='line_1'></div>
                    <div className='line_2'></div>
                    <div className='categories_content'>
                        <span className='category_subtitle'>fashion for men</span>
                        <h4 className='category_title'>30% off</h4>
                        <span className='category_subtitle'>winter collection</span>
                    </div>
                </div>
            </Col>    
            <Col xs={24} sm={24} md={24} lg={8} xl={8} xxl={8} >
                <div className='categories_item'>
                    <div className='line_1'></div>
                    <div className='line_2'></div>
                    <div className='categories_content'>
                        <span className='category_subtitle'>fashion</span>
                        <h4 className='category_title'>new fashion styles</h4>
                        <span className='category_subtitle'>winter collection</span>
                    </div>
                </div>
            </Col>    
        </Row>
    </div>
  )
}
