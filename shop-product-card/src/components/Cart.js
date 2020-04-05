import React, { Component } from 'react';

export const CartContext = React.createContext();

export class CartProvider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cartItems: []
    }

    this.addToCart = this.addToCart.bind(this);
  }

  addToCart(product) {
    var items = this.state.cartItems.slice();
    let itemIndex = items.findIndex(i => i.id === product.id);
    if (itemIndex === -1) {
      items.push({
        id: product.id,
        price: product.price,
        count: 1
      })
    } else {
      items[itemIndex].count += 1;
    }
    this.setState(state => {
      return {
        cartItems: items
      }
    });
  }

  render() {
    return <CartContext.Provider
      value={{
        cartItems: this.state.cartItems,
        addToCart: this.addToCart
      }}
    >
      { this.props.children }
    </CartContext.Provider>
  }
}