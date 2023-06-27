import React, { useState } from 'react'
import { LoremIpsum } from 'lorem-ipsum'
import { Button } from 'antd'
import Slider from "react-slick"

export default function MainSlider() {
  const [slider, setSlider] = useState(null)
  const lorem = new LoremIpsum({
    sentencesPerParagraph: {
      max: 2,
      min: 2
    },
    wordsPerSentence: {
      max: 8,
      min: 4
    }
  });
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    appendDots: dots => (
      <div className="slick-dots">
        {/* <li className="slick-arrow slick-prev" onClick={() => slider.slickPrev()} /> */}
        {dots}
        {/* <li className="slick-arrow slick-next" onClick={() => slider.slickNext()} /> */}
      </div>
    ),
  };
  return (
    <div className='slider'>
      <div className='slider_list'>
      <Slider ref={slider => setSlider(slider)} {...settings}>
        <div className='slider_item'>
          <div className='slider_item-bg'></div>
          <div className='slider_item-content'>
            <h1 className='title'>
              the best
              <span>woocommerce</span>
            </h1>
            <p className='intro'>
                {lorem.generateParagraphs(1)}
            </p>
            <Button>buy now</Button>
          </div>
        </div>  
        <div className='slider_item'>
          <div className='slider_item-bg'></div>
          <div className='slider_item-content'>
            <h1 className='title'>
              the best
              <span>woocommerce</span>
            </h1>
            <p className='intro'>
                {lorem.generateParagraphs(1)}
            </p>
            <Button>buy now</Button>
          </div>
        </div>  
        <div className='slider_item'>
          <div className='slider_item-bg'></div>
          <div className='slider_item-content'>
            <h1 className='title'>
              the best
              <span>woocommerce</span>
            </h1>
            <p className='intro'>
                {lorem.generateParagraphs(1)}
            </p>
            <Button>buy now</Button>
          </div>
        </div>  
      </Slider>  
      </div>   
    </div>
  )
}
