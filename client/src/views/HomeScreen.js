import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Dresses from '../components/Dresses';
import { listProducts } from '../actions/dressActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Paginate from '../components/Paginate'
import DressCarousel from '../components/DressCarousel'
import {Link} from 'react-router-dom'

const HomeScreen = ({ match }) => {
    const keyword = match.params.keyword
    const pageNumber = match.params.pageNumber || 1
    const dispatch = useDispatch()

    const productList = useSelector(state => state.productList)
    const { loading, error, products, page, pages} = productList
    
    useEffect(() => {
        dispatch(listProducts(keyword,pageNumber))
    }, [dispatch,keyword,pageNumber])

    return (
        <>
        {!keyword ? <DressCarousel/> : <Link to="/" className="btn btn-dark">Go Back</Link>}
        <br/>
        <br/>
            <h1>Latest Dresses</h1>
            <br/>
            {loading ? <Loader /> : error ? <Message variant="danger">{error}</Message> : (
            <> 
            <Row>
                {
                    products.map(product => (
                        <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                            <Dresses product={ product }/>
                        </Col>
                    ))
                }
            </Row>
            <Paginate pages={pages} page={page} keyword={keyword ? keyword : ""} />
            </>
            )}
            
        </>
    )
}

export default HomeScreen
