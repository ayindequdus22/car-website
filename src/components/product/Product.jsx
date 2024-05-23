import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addToLiked,  } from '../../store/likeSlice';
import { useQuery } from '@tanstack/react-query';
import { Axios } from '../../utils/axios';
import Loader from '../../Loader';
import { toast } from 'react-toastify';
import './products.scss';
import { UseAddToCartFunction } from '../../utils/cartQueries';
const toastME =({img})=>{
  return(
    <div className="addToast">
<div className="img">
<img src={img} />
</div>
    </div>
  )
}
const Product = () => {
  const dispatch = useDispatch();
  const likedItems = useSelector((state) => state.likedSlice.likedItems);
  const addToCart = UseAddToCartFunction()
  const { data: products, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const data = await Axios.get("/products/all-products");
      return data;
    }
  })

  return (
    <div className="brandProductsContainer fldc">
      <h3>Products</h3>
      {isLoading ? <Loader/> :  <div className="brandProducts fldcW">
        {products?.data.map((productItem) => {
          const isLiked = likedItems.some(item => item._id === productItem._id);
          return (
            <div className="brand" key={productItem._id}>
              <div
                className={isLiked ? "fa fa-heart active" : "fa fa-heart"}
                onClick={() => dispatch(addToLiked(productItem))

                }
              ></div>
              <div className="image">
                <picture>
                  <img src={productItem.image} alt={productItem.name} />
                </picture>
              </div>
              <div className="details fldc">
                <p>{productItem.name}</p>
                <p>${productItem.price?.toFixed(2)}</p>
                <button
                  style={{ height: "4rem", width: "13rem", fontSize: '1.5rem' }}
                  className='btn'
                  onClick={async () => {
                    console.log(productItem.image)
                      toast(
                      <toastME img={productItem.image}/>
                    );
                    addToCart.mutate({ productId: productItem._id, quantity: 1 })
                  }}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          );
        })}
      </div>
      }
    
    </div>
  );
};

export default Product;
