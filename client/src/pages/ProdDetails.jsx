import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getOneProd } from '../JS/actions/prodAction';
import { addToCart } from '../JS/actions/cartAction';



const ProdDetails = () => {


    const params = useParams();
    const dispatch = useDispatch();
    const prod = useSelector(state => state.prodReducer.prod);

    const handleAddToCart = () => {
      dispatch(addToCart(prod, 1))
    };
  
    useEffect(() => {
        dispatch(getOneProd(params.id))
    }, [dispatch, params.id]);

    return (
    <div>
      <h2>Product Details</h2>
      <h3>{prod.name}</h3>
      <img src={prod.image} alt={prod.name} />
      <p>{prod.description}</p>
      <p><strong>{prod.price} $</strong></p>

      <button onClick={handleAddToCart}>Add to Cart</button>

    </div>
  )
}

export default ProdDetails
