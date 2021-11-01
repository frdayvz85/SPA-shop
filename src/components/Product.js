import React from 'react'
import formatCurrency from '../helpers/formatCurrency'

const Product = ({product,removeProduct, addToCart,editProduct, cartItems}) => {
    const cartId = cartItems?.map((item) =>item.id)
    return (
        <div className="product">
            <div className="product-detail">
                <h2 className="product--title">{product.title}</h2>
                <p className="product--price"><strong>{formatCurrency(product.price)}</strong></p>
                <p className="product--description">{product.description}</p>
            </div>
            <div className="product-footer">
                <button onClick={()=>editProduct(product)} className="btn btn-primary btn-edit">Edit</button>
                <button disabled={cartId.includes(product.id)} className="btn btn-primary btn-view" onClick={()=>addToCart(product)}>+ Cart</button>
                <button className="btn btn-primary btn-secondary" onClick={()=>removeProduct(product)}>Delete</button>
            </div>
        </div>
    )
}

export default Product


// {products.length>0  ? products.map((product) => (
//     <Product key={product.id} product={product} />
// )) : <h1>There are no products</h1>}