import { useEffect, useState } from 'react';
import CreateView from './components/CreateView';
import Pagination from './components/Pagination';
import Products from './components/Products';
import Search from './components/Search';
import Cart from './components/Cart';
import Edit from './components/Edit';
import Loading from './components/Loading';
import { BASE_URL } from './api'
import './App.css';

function App() {
  const [view, setView] = useState('main')
  const [products, setProducts] = useState([])
  const [cartItems, setCartItems] = useState([])
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [productsPerPage, setProductsPerPage] = useState(10)
  const [searchTerm, setSearchTerm] = useState('')
  const [message, setMessage] = useState('')
  const [singleProduct, setSingleProduct] = useState()


  useEffect(() => {
    getProducts();
    getCartItems();
  }, [])

  const getProducts = async () => {
    try {
      setLoading(true)
      const response = await fetch(`${BASE_URL}/products`)
      const data = await response.json()
      setProducts(data)
      setLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  const getCartItems = async () => {
    try {
      const response = await fetch(`${BASE_URL}/cart`)
      const data = await response.json()
      setCartItems(data)
    } catch (error) {
      console.log(error)
    }
  }
  console.log(products)



  const IndexOfLastProduct = currentPage * productsPerPage;
  const IndexOfFirstProduct = IndexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(IndexOfFirstProduct, IndexOfLastProduct)


  const paginate = (number) => {
    setCurrentPage(number)
  }

  //add
  const addToCart = async (product) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: product.title,
        price: product.price,
        description: product.description,
        id: product.id,
        quantity: 1
      }),
    };
    const response = await fetch(`${BASE_URL}/cart`, requestOptions);
    await response.json();
    setMessage(product.title + ' added successfully')
    getCartItems()
    setTimeout(() => {
      setMessage('')
    }, 4000);
  };
  //remove from locally not from API
  // const removeFromCart = (product) => {
  //   const Items = products.slice();
  //   setProducts(Items.filter((x) => x.id !== product.id));
  // }

  const removeProduct = async (product) => {
    await fetch(`${BASE_URL}/products/${product.id}`, { method: 'DELETE' });
    setMessage(product.title + ' deleted successful!');
    getProducts()
    setTimeout(() => {
      setMessage('')
    }, 5000);
  }


  const editProduct = async (product) => {
    setView('edit')
    try {
      setLoading(true)
      const response = await fetch(`${BASE_URL}/products/${product.id}`)
      const data = await response.json()
      setSingleProduct(data)
      setLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  const changeView = (v) => {
    setView(v)
  }


  if (view === 'main') {
    return <div className="container">
      <div className="header">
        <button onClick={() => changeView('create')} className="btn btn-create btn-primary">Create</button>
        <button onClick={() => changeView('cart')} className="btn btn-create btn-primary">Cart ({cartItems.length})</button>
      </div>
      {message && <div className="success-text message">{message}</div>}
      <Search setSearchTerm={setSearchTerm} />
      <Products
        products={currentProducts}
        loading={loading}
        searchTerm={searchTerm}
        removeProduct={removeProduct}
        addToCart={addToCart}
        cartItems={cartItems}
        editProduct={editProduct}
      />
      <Pagination
        productsPerPage={productsPerPage}
        totalProducts={products.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  }
  if (view === 'create') {
    return <div className="container">
      <CreateView changeView={changeView} getProducts={getProducts} />
    </div>
  }
  if (view === 'cart') {
    return <div className="container">
      <Cart cartItems={cartItems} changeView={changeView} getCartItems={getCartItems} />
    </div>
  }
  if (view === 'edit') {
    return <div className="container">
      {loading ? <Loading /> : <Edit changeView={changeView} singleProduct={singleProduct} getProducts={getProducts} setLoading={setLoading} />}
    </div>
  }
  return (
    <div className="container">
      Welcome
    </div>
  );
}

export default App;
