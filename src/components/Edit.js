import React, { useState } from 'react'
import { BASE_URL } from '../api';


const Edit = ({ changeView, singleProduct, getProducts, setLoading }) => {

    console.log(singleProduct)
    const [message, setMessage] = useState('')

    const [state, setState] = useState({
        title: singleProduct ? singleProduct.title : '',
        price: singleProduct ? singleProduct.price : '',
        description: singleProduct ? singleProduct.description : '',
    })

    const changeHandler = (e) => {
        setState({ ...state, [e.target.name]: e.target.value })
    }

    const editProduct = async (e) => {
        e.preventDefault();

        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                title: state.title,
                price: state.price,
                description: state.description
            }),
        };
        const response = await fetch(`${BASE_URL}/products/${singleProduct.id}`, requestOptions);
        await response.json();
        setMessage('Product updated successfully')

        setTimeout(() => {
            setMessage('')
            changeView('main')
            getProducts()
        }, 4000);

    }

    return (
        <form onSubmit={editProduct} className="form-create">
            <h1>Edit a Product</h1>
            {message && <h3 className="success-text">{message}</h3>}
            <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                    type="text"
                    placeholder="Title"
                    id="title"
                    value={state.title}
                    name="title"
                    onChange={changeHandler}
                />
            </div>
            <div className="form-group">
                <label htmlFor="price">Price</label>
                <input
                    type="number"
                    placeholder="Price"
                    id='price'
                    min="0"
                    name="price"
                    value={state.price}
                    onChange={changeHandler}
                />
            </div>
            <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea 
                placeholder="Description"
                id='description'
                name="description"
                value={state.description}
                onChange={changeHandler}
                cols="30" 
                rows="10"></textarea>
            </div>
            <div className="btns">
                <button type="submit" className="btn btn-primary">Save</button>
                <button onClick={() => changeView('main')} type="button" className="btn btn-secondary">Main menu</button>
            </div>
        </form>
    )
}

export default Edit
