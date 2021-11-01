import React from 'react'
import Loading from './Loading'
import Product from './Product'

const Products = ({ products, loading, searchTerm, removeProduct, addToCart,editProduct, cartItems }) => {
    if (loading) {
        return <Loading />
    }
    return (
        <div className="products--wrapper">
            {products.filter(product => {
                if (searchTerm === "") {
                    return product
                } else if (product.title.toLowerCase().includes(searchTerm.toLowerCase())) {
                    return product
                }
            }).map(product => (
                <Product
                    key={product.id}
                    product={product}
                    removeProduct={removeProduct}
                    addToCart={addToCart}
                    cartItems={cartItems}
                    editProduct={editProduct}
                />
            ))}
        </div>
    )
}

export default Products
