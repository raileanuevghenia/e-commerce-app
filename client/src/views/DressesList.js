import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Button, Table,Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listProducts, deleteProduct, createProduct } from '../actions/dressActions'
import { PRODUCT_CREATE_RESET } from '../constants/dressConstants'
import Paginate from '../components/Paginate'

const DressesList = ({ history , match}) => {
    const pageNumber = match.params.pageNumber || 1
    const dispatch = useDispatch()

    const productList = useSelector(state => state.productList)
    const { loading, error, products, page, pages} = productList

    const productDelete = useSelector(state => state.productDelete)
    const { loading: loadingDelete, error: errorDelete, success: successDelete} = productDelete

    const productCreate = useSelector(state => state.productCreate)
    const { loading: loadingCreate, 
        error: errorCreate, 
        success: successCreate,
        product: createdProduct,
    } = productCreate

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {
        dispatch({ type: PRODUCT_CREATE_RESET })
        if(!userInfo.isAdmin){
            history.push("/login")
        } 

        if(successCreate){
            history.push(`/admin/product/${createdProduct._id}/edit`)
        } else{
            dispatch(listProducts("", pageNumber))
        }
        
    }, [dispatch, history, userInfo,successDelete, successCreate, createdProduct, pageNumber])

    const deleteHandler = (id) => {
        if(window.confirm("Are you sure you want to delete this dress?")){
            dispatch(deleteProduct(id))
        }
    }

    const createDressHandler = (() => {
        dispatch(createProduct())
    })
    return (
        <>
            <Row className="align-items-center">
                <Col>
                    <h1>Dresses</h1>
                </Col>
                <Col className="text-end">
                    <Button className="my-3" onClick={createDressHandler}>
                        <i className="fas fa-plus"></i>Create Dress
                    </Button>
                </Col>
            </Row>
            {loadingDelete && <Loader/>}
            {errorDelete && <Message variant="danger">{errorDelete}</Message>}
            {loadingCreate && <Loader/>}
            {errorCreate && <Message variant="danger">{errorCreate}</Message>}
            {loading ? <Loader/> : error ? <Message variant="danger">{error}</Message> : (
                <>
                <Table striped bordered hover responsive className="table-sm" style={{border: "1px solid black"}} >
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Category</th>
                            <th>Brand</th>
                            <th>Actios</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => (
                            <tr key={product._id}>
                                <td>{product._id}</td>
                                <td>{product.name}</td>
                                <td>$ {product.price}</td>
                                <td>{product.category}</td>
                                <td>{product.brand}</td>
                                <td>
                                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                        <Button variant="dark" className="btn-small"><i className="fas fa-edit"></i></Button>
                                    </LinkContainer>
                                    <Button 
                                    variant="danger" 
                                    className="btn-small"
                                    style={{marginLeft: "25px"}}
                                    onClick = {() => deleteHandler(product._id)}
                                    ><i className="fas fa-trash"></i></Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <Paginate pages={pages} page={page} isAdmin={true}/>
                </>
            )}
        </>
    )
}

export default DressesList