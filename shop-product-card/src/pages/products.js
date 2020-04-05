import React, { Component } from 'react';
import axios from 'axios';
import {
  Container,
  Row,
} from 'reactstrap';

import { Itemm } from './itemm';
// import { CartContext } from '../components/Cart';


class Products extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: []
    }
  }

  componentDidMount() {
    axios.get("http://localhost:9999/products").then(res => {
      this.setState({
        products: res.data
      });
    })
  }

  render() {
    const { products } = this.state;
    return (
      <Container>
        <h2>Products</h2>
        <Row>
          {products.map(product => (
            <Itemm value={product} key={product.id}/>
          ))};
        </Row>
      </Container>
    )
  };
}

export default Products;