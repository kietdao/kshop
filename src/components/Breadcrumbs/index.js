import { useLocation } from 'react-router-dom' 

export default function Breadcrumbs() {
  const location = useLocation()
  console.log(location.pathname)
  return (
    <div className='breadcrumbs'>
        <span className='breadcrumb_item'>home</span>
        <span className="breadcrumb_arrow">&gt;&gt;</span>
        <span className='breadcrumb_item'>page</span>
        <span className="breadcrumb_arrow">&gt;&gt;</span>
        <span className='breadcrumb_item'>shop</span>
        <span className="breadcrumb_arrow">&gt;&gt;</span>
        <span className='breadcrumb_item'>{location.pathname.split("/").slice(-1)[0].replace("%20"," ")}</span>
    </div>
  )
}
