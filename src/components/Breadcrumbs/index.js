import { useLocation, useParams } from 'react-router-dom' 
import { useQuery } from 'react-query'
import axios from 'axios'

export default function Breadcrumbs() {
  const location = useLocation()
  const { id } = useParams()
  const fetchNameProduct = async (id) => {
    try {
      const res = await axios.get(`https://fakestoreapi.com/products/${id}`);
      return res.data.title
    } catch (err) {
      console.log("error fetch product", err);
    }
  };
  const { data: name } = useQuery(["nameOfProduct", id], () =>
    fetchNameProduct(id)
  );
  return (
    <div className='breadcrumbs'>
        <span className='breadcrumb_item'>home</span>
        <span className="breadcrumb_arrow">&gt;&gt;</span>
        <span className='breadcrumb_item'>page</span>
        <span className="breadcrumb_arrow">&gt;&gt;</span>
        <span className='breadcrumb_item'>shop</span>
        <span className="breadcrumb_arrow">&gt;&gt;</span>
        <span className='breadcrumb_item'>{id ? name : location.pathname.split("/").slice(-1)[0].replace("%20"," ")}</span>
    </div>
  )
}
