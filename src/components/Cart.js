import React, { useState } from 'react'
import { BASE_URL } from '../api'
import formatCurrency from '../helpers/formatCurrency'

const Cart = ({ cartItems, changeView, getCartItems }) => {
    const [status, setStatus] = useState('')
    const [showCheckout, setshowCheckout] = useState(false)
    const [state, setState] = useState({
        name: "",
        email: "",
        address: ""
    })
    const buyBtn = () => {
        setshowCheckout(!showCheckout)
    }
    const createOrder = (e) => {
        e.preventDefault();
        setStatus(state.name + " bought this product.")
        setState({
            name: "",
            email: "",
            address: ""
        })
    }
    const handleInput = (e) => {
        setState({...state, [e.target.name]: e.target.value })
    }
    const IncreaseQuantity = async (product) => {
        try {
            const requestOptions = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title: product.title,
                    price: product.price,
                    description: product.description,
                    id: product.id,
                    quantity: product.quantity + 1
                })
            };

            const response = await fetch(`${BASE_URL}/cart/${product.id}`, requestOptions)
            const data = await response.json()
        } catch (error) {
            console.log(error)
        }
        getCartItems()
    }

    const DecraseQuantity = async (product) => {
        try {
            const requestOptions = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title: product.title,
                    price: product.price,
                    description: product.description,
                    id: product.id,
                    quantity: product.quantity === 1 ? removeFromCart(product) : product.quantity - 1
                })
            };

            const response = await fetch(`${BASE_URL}/cart/${product.id}`, requestOptions)
            await response.json()
        } catch (error) {
            console.log(error)
        }
        getCartItems()
    }
    const removeFromCart = async (cartItem) => {
        await fetch(`${BASE_URL}/cart/${cartItem.id}`, { method: 'DELETE' });
        setStatus(cartItem.title + ' removed successful!');
        getCartItems()
        setTimeout(() => {
            setStatus('')
        }, 3000);
    }

    if (cartItems.length === 0) {
        return <h3 className="empty-cart">Your Cart is empty!. Go to <span onClick={() => changeView('main')}>Main page</span> and add new products.</h3>
    }
    return (
        <div className="cart">
            <h1>Cart</h1>
            <div className="cart-products">
                {status && <h4 className="success-text">{status}</h4>}
                {cartItems.map((cartItem) => (
                    <div className="cart-product" key={cartItem.id}>
                        <div className="cart-item-detail">
                            <h2 className="cart-product-title">{cartItem.title}</h2>
                            <p className="cart-product-price">{formatCurrency(cartItem.price)}</p>
                            <p className="cart-product-description">{cartItem.description}</p>
                        </div>
                        <div className="cart-main">
                            <div className="add-remove">
                                <button onClick={() => DecraseQuantity(cartItem)} className="btn-remove btn-secondary">-</button>
                                <span>{cartItem.quantity}</span>
                                <button onClick={() => IncreaseQuantity(cartItem)} className="btn-add btn-primary">+</button>
                            </div>
                            <div className="rempve-from-cart">
                                <button onClick={() => removeFromCart(cartItem)} className="btn btn-secondary">Remove</button>
                            </div>
                        </div>
                    </div>
                ))}
                <div className="total">
                    {cartItems.length !== 0 && (
                        <div className="total-money">
                            <span> Total:{" "}
                                <strong> {formatCurrency(
                                    cartItems.reduce((a, c) => a + c.price * c.quantity, 0)
                                )}</strong></span>
                            <div className="btns">
                                <button onClick={buyBtn} className="btn btn-primary buy-btn">Buy</button>
                                <button onClick={() => changeView('main')} className="btn btn-secondary buy-btn">Cancel</button>
                            </div>
                        </div>
                    )}
                </div>
                {showCheckout && (
                    <div className="buy-form">
                        <form onSubmit={createOrder}>
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Name"
                                    required
                                    value={state.name}
                                    onChange={handleInput}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    required
                                    value={state.email}
                                    onChange={handleInput}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="address">Address</label>
                                <input
                                    type="text"
                                    name="address"
                                    placeholder="Address"
                                    required
                                    value={state.address}
                                    onChange={handleInput}
                                />
                            </div>
                            <div className="form-group">
                                <button type="submit" className="btn btn-primary buy-btn">Payment</button>
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Cart
