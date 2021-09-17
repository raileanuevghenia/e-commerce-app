import React  from 'react'
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Rating from '../components/Rating';
const Dresses = (props) => {
    const { product } = props;
    return (
        <>
        <Card className="py-3 p-3 rounded">
            <Link to={`/product/${product._id}`}>
                <Card.Img style={{height: "300px"}} src={product.image} variant="top"/>
            </Link>
            <Card.Body>
                <Link to={`/product/${product._id}`}>
                    <Card.Title as="div">
                        <strong>{product.name}</strong>
                    </Card.Title>
                </Link>
                <Card.Text as="div">
                    <Rating 
                    rating={product.rating} 
                    numReviews={`${product.numReviews} reviews`}/>
                </Card.Text>
                <Card.Text as="h3">${product.price}</Card.Text>
            </Card.Body>
        </Card>
        <br/>
        </>

    )
}

export default Dresses
