import { React, useState, useEffect, memo, useCallback } from 'react'
import _debounce from 'lodash/debounce'
import { Link } from 'react-router-dom'
import { Col, InputNumber, Row, Slider, Image } from 'antd';
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid';
import { useQuery } from 'react-query'

function Sidebar(props) {
  const [inputValueLow, setInputValueLow] = useState(0);
  const [inputValueHigh, setInputValueHigh] = useState(500);
  const [topProducts, setTopProducts] = useState([])
  const [lowestPrice, setLowestPrice] = useState(inputValueLow)
  const [highestPrice, setHighestPrice] = useState(inputValueHigh)
  const { data: categoriesList } = useQuery({
    queryKey: ['categoriesSidebar'],
    queryFn: async () => {
      try {
        const res = await axios.get('https://fakestoreapi.com/products/categories')
        return res.data
      } catch(err) {
        console.log(err)
      }
    }
  })
  const { data: productsSidebar } = useQuery({
    queryKey: ['topProducts'],
    queryFn: async () => {
      try {
        const res = await axios.get('https://fakestoreapi.com/products')
        return res.data
      } catch(err) {
        console.log(err)
      }
    }
  })
  useEffect(() => {
    const topProducts = []
    productsSidebar?.forEach(item => {
      if(item.rating.rate > 4.5) {
        topProducts.push(item)
      }
    })
    const topProductList = topProducts?.sort((a, b) => b.rating.rate-a.rating.rate).splice(0, 3)
    setTopProducts([...topProductList])
  }, [productsSidebar])
  useEffect(() => {
    const priceList = productsSidebar?.map(item => {
      return item.price
    })
    setHighestPrice(Math.max(...priceList || []))
    setLowestPrice(Math.min(...priceList || []))
  }, [productsSidebar])
  const onChangeLow = (value) => {
    if (isNaN(value)) {
      return;
    }
    setInputValueLow(value);
  };
  const onChangeHigh = (value) => {
    if (isNaN(value)) {
      return;
    }
    setInputValueHigh(value);
  };
  const onChange = (value) => {
    setInputValueLow(value[0])
    setInputValueHigh(value[1])
    props.setIsLoading(true)
    searchWithPrice(value[0], value[1])

  }
  const searchWithPrice = useCallback(_debounce((lowPrice, highPrice) => {
      const filteredProducts = []
      props?.products.filter(item => {
        if(lowPrice <= item.price && highPrice >= item.price) {
          filteredProducts.push(item)
        }
      })
      props.setProductsFilteredPrice([...filteredProducts])
      props.setIsLoading(false)
  }, 2000), [props.products]) 
  return (
    <div className='sidebar'>
      <div className='categories_list'>
        <h2>categories</h2>
        <ul>
            {categoriesList?.map((category) => {
              return(
                <li key={uuidv4()}><Link to={{pathname: `/products/${category}`}}>{category}</Link></li>
              )
            })}
        </ul>
      </div>
      <hr />
      <div className='price_filter'>
        <h2>Price Filter</h2>
        <Row>
          <Col span={24}>
            <Slider
              min={0}
              max={highestPrice}
              range={true}
              value={(typeof inputValueLow === 'number') && (typeof inputValueHigh === 'number') ? [inputValueLow, inputValueHigh] : 0}
              onChange={onChange}
              step={0.1}
            />
          </Col>
        </Row>
        <Row gutter={16}>  
          <Col span={10}>
            <InputNumber
              min={lowestPrice}
              max={highestPrice / 2}
              style={{
                margin: '0 16px',
              }}
              step={0.1}
              value={`$${inputValueLow}`}
              onChange={onChangeLow}
            />
          </Col>
          <Col span={10}>
            <InputNumber
              min={highestPrice / 2}
              max={highestPrice}
              style={{
                margin: '0 16px',
              }}
              step={0.1}
              value={`$${inputValueHigh}`}
              onChange={onChangeHigh}
            />
          </Col>
        </Row>
      </div>
      <hr />
      <div className='top_rated'>
        <h2>top rated</h2> 
          {topProducts?.map(item => {
            return (
              <div className='top_rated_item' key={uuidv4()}>
                <Image src={item.image} alt={item.title} preview={false} placeholder={true}/>
                <div className='item_content'>
                  <h5 className='item_title'>{item.title}</h5>
                  <span className='item_price'>{`$${item.price}`}</span>
                </div>
              </div>
            )
          })}
      </div>
      <hr />
    </div>
  )
}

export default memo(Sidebar)
