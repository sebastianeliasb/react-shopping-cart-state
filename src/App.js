import React, { Component } from "react";

import Home from "./pages/Home";

import * as api from "./api";

function newCartComponent(product) {
  return {
    id: product.id,
    title: product.title,
    img: product.img,
    price: product.price,
    unitsInStock: product.unitsInStock,
    createdAt: product.createdAt,
    updatedAt: product.updatedAt,
    quantity: product.quantity + 1,
  };
}
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: [],
      cartItems: [],
      isLoading: false,
      hasError: false,
      loadingError: null,
    };
    this.handleAddToCart = this.handleAddToCart.bind(this);
  }

  componentDidMount() {
    this.setState({
      isLoading: true,
    });

    api.getProducts().then((data) => {
      this.setState({
        products: data,
        isLoading: false,
      });
    });
  }

  handleAddToCart(productId) {
    const { cartItems, products } = this.state;

    const index = products.findIndex((x) => x.id === productId);
    const element = cartItems.find((x) => x.id === productId);

    if (element) {
      const updatedInfo = cartItems.map((item) => {
        if (item.id !== productId) {
          return item;
        }
        return { ...item, quantity: item.quantity + 1 };
      });

      this.setState({ cartItems: updatedInfo });
      return;
    }

    const updatedInfo = newCartComponent(products[index]);
    this.setState((prevstate) => ({
      cartItems: [...prevstate.cartItems, updatedInfo],
    }));
  }
  // handleChange(event, productId) {}

  // handleRemove(productId) {}

  // handleDownVote(productId) {}

  // handleUpVote(productId) {}

  // handleSetFavorite(productId) {}

  render() {
    const {
      cartItems,
      products,
      isLoading,
      hasError,
      loadingError,
    } = this.state;

    return (
      <Home
        cartItems={cartItems}
        products={products}
        isLoading={isLoading}
        hasError={hasError}
        loadingError={loadingError}
        handleDownVote={() => {}}
        handleUpVote={() => {}}
        handleSetFavorite={() => {}}
        handleAddToCart={this.handleAddToCart}
        handleRemove={() => {}}
        handleChange={() => {}}
      />
    );
  }
}

export default App;
