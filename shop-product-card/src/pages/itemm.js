import React, { useContext, useState } from 'react';
import {
  Col,
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button
} from 'reactstrap';
import { CartContext } from '../components/Cart';

export function Itemm(props) {
  const product = props.value;
  const { addToCart } = useContext(CartContext);
  return (
    <Col sm="4">
      <Card>
        <CardImg
          top width="100%"
          src={product.imageUrl} />
        <CardBody>
          <CardTitle>{product.name}</CardTitle>
          <CardSubtitle>{product.price}</CardSubtitle>
          <CardText>{product.descriptions}</CardText>
          <Button onClick={() => addToCart(product)}>Add to cart</Button>
        </CardBody>
      </Card>
    </Col>
  );
}