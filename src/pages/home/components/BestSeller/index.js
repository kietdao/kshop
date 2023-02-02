import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addToCart } from '../../../../features/cart/cartSlice'
import { Row, Col, Image, Rate } from 'antd'
import { LoremIpsum } from 'lorem-ipsum'

export default function BestSeller() {
    const products = useSelector(state => state?.products?.products)
    const dispatch = useDispatch()
    const countSeller = []
    products.forEach(item => {
      countSeller.push(item.rating.count)
    })
    const bestCountSeller = countSeller.sort((a,b) => b-a).splice(0, 4)
    const bestseller = products.map(item => {
      for(let i = 0; i < bestCountSeller.length; i++) {
        if(item.rating.count === bestCountSeller[i]) {
          return item
        }
      }
    })
    const lorem = new LoremIpsum({
      sentencesPerParagraph: {
        max: 4,
        min: 2
      },
      wordsPerSentence: {
        max: 12,
        min: 4
      }
    });
  return (
    <div className='bestseller'>
      <Row gutter={30}>
        <Col xs={24} sm={24} md={4} lg={4} xl={4} xxl={4} >
            <div className='bestseller_intro'>
              <h3 className='bestseller_title'>best sellers</h3>
              <h5 className='bestseller_subtitle'>The best productions from us</h5>
              <p>
                {lorem.generateParagraphs(1)}
              </p>
            </div>
        </Col>
        <Col xs={24} sm={24} md={20} lg={20} xl={20} xxl={20} >
          <Row gutter={30}>
            {bestseller.length > 0 && bestseller.map(item => {
              {if(item !== undefined) {
                return (
                  <Col xs={24} sm={24} md={12} lg={6} xl={6} xxl={6} key={item?.id}>
                    <div className='bestseller_product'>
                        <div className='product_img'>
                          <Image src={item?.image} preview={false} placeholder={true}/>
                        </div>
                        <div className='product_info'>
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
              }}
            })}
          </Row>  
        </Col>  
       
      </Row>
    </div>
  )
}
