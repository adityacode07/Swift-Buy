import axios from "axios";
import { useState, useEffect } from "react";

const Home = () => {
  const [productList, setProductList] = useState([]);
  const [cart, setCart] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showCart, setShowCart] = useState(false);  //cart visib
  const [searchTerm, setSearchTerm] = useState(""); //searchterm
  const [minPrice, setMinPrice] = useState(""); // minprice
  const [maxPrice, setMaxPrice] = useState(""); // maxsmprice

  useEffect(() => {
    getAllProductList();
  }, []);

  const getAllProductList = async () => {
    setIsLoading(true);
    const response = await axios.get("https://dummyjson.com/products");
    setProductList(response.data.products);
    setIsLoading(false);
  };

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  const calculateTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price, 0);
  };

  const filteredProducts = productList.filter((product) => {
    return (
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (!minPrice || product.price >= minPrice) &&
      (!maxPrice || product.price <= maxPrice)
    );
  });

  return (
    <div className="App">
      <button onClick={() => setShowCart(!showCart)}>Show Cart</button>
      {showCart && (
        <div>
          <h2>Shopping Cart</h2>
          <ul>
            {cart.map((item, index) => (
              <li key={index}>
                {item.title} - {item.price}
                <button onClick={() => removeFromCart(index)}>Remove</button>
              </li>
            ))}
          </ul>
          <div>Total Price: {calculateTotalPrice()}</div>
        </div>
      )}
      <div>
        <input
          type="text"
          placeholder="Search by product name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <input
          type="number"
          placeholder="Filter by : Min Price"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
        />
        <input
          type="number"
          placeholder="Filter by : Max Price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />
      </div>
      <h1>Product list</h1>
      {isLoading && <div>is loading</div>}
      <div className="product-container">
        {filteredProducts.map((product) => {
          return (
            <div key={product.id} className="product-item">
              <div>
                <span>
                  Name: <a href="#">{product.title}</a>
                </span>
                <br />
                <span>Price: {product.price}</span>
              </div>
              <br />
              <button onClick={() => addToCart(product)}>Add to Cart</button>
              <br />
              <img src={product.thumbnail} alt={product.title} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
