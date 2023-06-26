import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import axios from 'axios'

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState({})
  useEffect(() => {
    const fetchProduct = async (id) => {
        try {
          const res = await axios.get(`https://fakestoreapi.com/products/${id}`)
          setProduct(res.data)
        } catch(err) {  
          console.log('error fetch produc', err)
        }
    }
    fetchProduct(id)
  }, [id])
  return (
    <div>
      
    </div>
  )
}
