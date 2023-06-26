import { useEffect, useState, memo } from "react";
import { useDispatch } from 'react-redux'
import { addToCart } from '../../features/cart/cartSlice'
import { useParams } from "react-router-dom";
import { Row, Col, Image, Rate, List } from "antd";
import { useNavigate } from "react-router";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import Sidebar from "./components/Sidebar";
import { useQuery, useQueryClient } from "react-query";

function ProductList() {
  const { typeProduct } = useParams();
  const dispatch = useDispatch()
  const [productsFilteredPrice, setProductsFilteredPrice] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()
  const getProductsWithCategory = async (type) => {
    try {
      setIsLoading(true)
      const res = await axios.get(
        `https://fakestoreapi.com/products/category/${type}` 
      );
      return res.data
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false)
    }
  }
  const { data: productList, isLoading: isProductLoading, isFetching, isError } = useQuery(
    ['productList', typeProduct],
    () => getProductsWithCategory(typeProduct),
  )
  useEffect(() => {
    setProductsFilteredPrice([])
  }, [productList])
  const handleClickProduct = (id) => {
    navigate(`/product/${id}`)
  }
  return (
    <div className="products">
      <Row gutter={30}>
        <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
          <Sidebar products={productList && productList} setProductsFilteredPrice={setProductsFilteredPrice} setIsLoading={setIsLoading}/>
        </Col>
        <Col xs={24} sm={24} md={18} lg={18} xl={18} xxl={18}>
          <div className="product_list">
            <List
              itemLayout="horizontal"
              grid={{column: 3, gutter: 30, xs: 1, sm: 1, md: 3, lg: 3, xl: 3, xxl: 3}}
              pagination={{
                pageSize: 3,
                showTotal: (total, range) => {    
                  return (
                    <span>Showing {range[0]}-{range[1]} of {total} results</span>
                  )
                }
              }}
              dataSource={productsFilteredPrice.length === 0 ? productList : productsFilteredPrice}
              loading={isProductLoading || isLoading}
              renderItem={(item) => (
                <List.Item>
                  <div className="product_item" onClick={() => handleClickProduct(item.id)}>
                    <div className="product_img">
                      <Image
                        src={item?.image}
                        preview={false}
                        placeholder={true}
                      />
                    </div>
                    <div className="product_info">
                      <h4 className="product_name">{item?.title}</h4>
                      <span className="product_price">{`$` + item?.price}</span>
                      <div className="product_rating">
                        <Rate
                          disabled
                          defaultValue={item?.rating?.rate}
                          style={{
                            color: "#ff9600",
                            borderColor: "#ff9600",
                          }}
                        />
                      </div>
                    </div>
                    <div className="product_action">
                      <div className="action_item" onClick={() => dispatch(addToCart(item))}>
                        <i className="fa-solid fa-cart-shopping"></i>
                      </div>
                      <div className="action_item">
                        <i className="fa-solid fa-heart"></i>
                      </div>
                      <div className="action_item">
                        <i className="fa-solid fa-arrows-rotate"></i>
                      </div>
                    </div>
                  </div>
                </List.Item>
              )}
            />
          </div>
        </Col>
      </Row>
    </div>
  );
}
export default memo(ProductList);
