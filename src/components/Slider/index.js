import React from 'react'
import { LoremIpsum } from 'lorem-ipsum'
import { Button } from 'antd'

export default function Slider() {
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
  return (
    <div className='slider'>
      <div className='slider_list'>
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
      </div>   
    </div>
  )
}
