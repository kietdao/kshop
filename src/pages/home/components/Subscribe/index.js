import React from 'react'
import {Row, Col, Button, Input, Image} from 'antd'
import { LoremIpsum } from 'lorem-ipsum' 

export default function Subscribe() {
    const lorem = new LoremIpsum({
        sentencesPerParagraph: {
          max: 1,
          min: 1
        },
        wordsPerSentence: {
          max: 12,
          min: 4
        }
    });
  return (
    <div className='subscribe'>
        <Row>
            <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
                <div className='subscribe_content'>
                    <h2 className='subscribe_title'>get out special discount</h2>
                    <p>{lorem.generateParagraphs(1)}</p>
                    <span>register your email for news and special offers</span>
                    <div className='subscribe_input'>
                        <Input type='email' placeholder='Email address...' />
                        <Button type='submit'>get coupon now</Button>
                    </div>
                </div>
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
                <div className='clients_list'>
                    <Image src='./static/images/logo_brand_1.png' preview={false} placeholder={true}/>
                    <Image src='./static/images/logo_brand_2.png' preview={false} placeholder={true}/>
                    <Image src='./static/images/logo_brand_3.png' preview={false} placeholder={true}/>
                    <Image src='./static/images/logo_brand_4.png' preview={false} placeholder={true}/>
                </div>
            </Col>
        </Row>
    </div>
  )
}
