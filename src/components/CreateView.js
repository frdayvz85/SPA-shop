import React, { useState } from 'react'
import { BASE_URL } from '../api';
import useInput from '../hooks/useInput';

const CreateView = ({ changeView, getProducts }) => {
    const [success, setSucces] = useState(false)
    const {
        value: enteredTitleValue,
        isValid: enteredTitleIsValid,
        hasError: titleInputHasError,
        valueChangeHandler: titleChangedHandler,
        inputBlurHandler: titleBlurHandler,
        reset: resetTitleInput
    } = useInput(value => value.trim() !== '');


    const {
        value: enteredPriceValue,
        isValid: enteredPriceIsValid,
        hasError: priceInputHasError,
        valueChangeHandler: priceChangedHandler,
        inputBlurHandler: priceBlurHandler,
        reset: resetPriceInput
    } = useInput(value => value.trim() !== '');

    const {
        value: enteredDescriptionValue,
        isValid: enteredDescriptionIsValid,
        hasError: descriptionInputHasError,
        valueChangeHandler: descriptionChangedHandler,
        inputBlurHandler: descriptionBlurHandler,
        reset: resetDescriptionInput
    } = useInput(value => value.trim() !== '');

    let formIsValid = false;

    if (enteredTitleIsValid && enteredPriceIsValid && enteredDescriptionValue) {
        formIsValid = true;
    }

    const addProduct = async (e) => {
        e.preventDefault();

        resetTitleInput()
        resetPriceInput()
        resetDescriptionInput()


        if (!enteredTitleIsValid) {
            return;
        }

        if (!enteredPriceIsValid) {
            return;
        }
        if (!enteredDescriptionIsValid) {
            return;
        }

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                title: enteredTitleValue,
                price: enteredPriceValue,
                description: enteredDescriptionValue,
                id: new Date(),
                inCart: false
            }),
        };
        const response = await fetch(`${BASE_URL}/products`, requestOptions);
        await response.json();
        setSucces(true)
        setTimeout(() => {
            setSucces(false)
        }, 4000);
        getProducts()

    }

    return (
        <form onSubmit={addProduct} className="form-create">
            <h1>Create a Product</h1>
            {success && <h3 className="success-text">Your product has been created.</h3>}
            <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                    type="text"
                    placeholder="Title"
                    id="title"
                    value={enteredTitleValue}
                    onBlur={titleBlurHandler}
                    onChange={titleChangedHandler}
                />
            </div>
            {titleInputHasError && <p className="error-text">Name must be fill out.</p>}
            <div className="form-group">
                <label htmlFor="price">Price</label>
                <input
                    type="number"
                    placeholder="Price"
                    id='price'
                    min="0"
                    value={enteredPriceValue}
                    onBlur={priceBlurHandler}
                    onChange={priceChangedHandler}
                />
            </div>
            {priceInputHasError && <p className="error-text">Please fill a valid price.</p>}
            <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                    placeholder="Description"
                    id='description'
                    name="description"
                    value={enteredDescriptionValue}
                    onBlur={descriptionBlurHandler}
                    onChange={descriptionChangedHandler}
                    cols="30"
                    rows="10"></textarea>
            </div>
            {descriptionInputHasError && <p className="error-text">Please fill a description.</p>}
            <div className="btns">
                <button disabled={!formIsValid} type="submit" className="btn btn-primary btn-save">Save</button>
                <button onClick={() => changeView('main')} type="button" className="btn btn-secondary">Main menu</button>
            </div>
        </form>
    )
}

export default CreateView
