import React, { useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import { Form, Button} from 'react-bootstrap'
import { useDispatch, useSelector} from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listProductsDetails , updateProduct } from '../actions/dressActions'
import FormContainer from '../components/FormContainer'
import { PRODUCT_UPDATE_RESET } from '../constants/dressConstants'
import axios from 'axios'


const DressEdit = ({ match , history}) => {
    const productId = match.params.id
    const [ name, setName] = useState("")
    const [ price, setPrice] = useState(0)
    const [image, setImage] = useState("")
    const [ brand, setBrand] = useState("")
    const [ category, setCategory] = useState(0)
    const [countInStock, setCountInStock] = useState(0)
    const [description, setDescription] = useState("")
    const [uploading, setUploading] = useState(false)


    const dispatch = useDispatch()

    const productDetails = useSelector((state) => state.productDetails)
    const { loading, error,  product} = productDetails

    const productUpdate = useSelector((state) => state.productUpdate)
    const { loading: loadingUpdate, error: errorUpdate,  success: successUpdate} = productUpdate

    useEffect(() => { 
        if(successUpdate){
            dispatch({type: PRODUCT_UPDATE_RESET})
            history.push("/admin/productlist")
        } else {
            if(!product.name || product._id !== productId){
                dispatch(listProductsDetails(productId))
            } else {
                setName(product.name)
                setPrice(product.price)
                setImage(product.image)
                setBrand(product.brand)
                setCategory(product.category)
                setCountInStock(product.countInStock)
                setDescription(product.description)
                    
                }
        }
        }, [ dispatch,history, product, productId,successUpdate])

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('image', file)
        setUploading(true)

        try {
            const config = {
                headers: {
                'Content-Type': 'multipart/form-data',
            },
        }

            const { data } = await axios.post('/api/upload', formData, config)

            setImage(data)
            setUploading(false)
        } catch (error) {
            console.error(error)
            setUploading(false)
        }
    }
    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateProduct({
            _id: productId,
            name,
            price,
            image,
            brand,
            category,
            description,
            countInStock
        }))
    }
    return (
        <>
            <Link to="/admin/productlist" className="btn btn-dark my-3">Go Back</Link>
            <FormContainer>
            <h1>Edit Dress </h1>
            {loadingUpdate && <Loader />}
            {errorUpdate && <Message primary="danger">{errorUpdate}</Message>}
            { loading ? <Loader /> : error ? <Message>{error}</Message> : (
                <Form onSubmit={submitHandler}>
                <Form.Group controlId= 'name'>
                    <Form.Label style={{color: "black", fontSize: "19px"}}>Name</Form.Label>
                    <Form.Control 
                    type="name" 
                    placeholder="Enter your name" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group controlId= 'price'>
                    <Form.Label style={{color: "black", fontSize: "19px"}}>Price</Form.Label>
                    <Form.Control 
                    type="number" 
                    placeholder="Enter price" 
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group controlId= 'image'>
                    <Form.Label style={{color: "black", fontSize: "19px"}}>Image</Form.Label>
                    <Form.Control 
                    type="text" 
                    placeholder="Enter image url" 
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Form.File 
                id="image-file" 
                label="Choose file" 
                custom onChange={uploadFileHandler}
                ></Form.File>
                {uploading && <Loader />}
                <Form.Group controlId= 'brand'>
                    <Form.Label style={{color: "black", fontSize: "19px"}}>Brand</Form.Label>
                    <Form.Control 
                    type="text" 
                    placeholder="Enter the brand" 
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                    <Form.Group controlId= 'category'>
                    <Form.Label style={{color: "black", fontSize: "19px"}}>Category</Form.Label>
                    <Form.Control 
                    type="text" 
                    placeholder="Enter category" 
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group controlId= 'countInStock'>
                    <Form.Label style={{color: "black", fontSize: "19px"}}>Count In Stock</Form.Label>
                    <Form.Control 
                    type="number" 
                    placeholder="Enter how many is in stock" 
                    value={countInStock}
                    onChange={(e) => setCountInStock(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group controlId= 'description'>
                    <Form.Label style={{color: "black", fontSize: "19px"}}>Description</Form.Label>
                    <Form.Control 
                    type="text" 
                    placeholder="Enter description" 
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <br/>
                <Button type="submit" variant="primary">Update</Button>
            </Form>
            )}
            
            
        </FormContainer>
        </>
        
    )
}

export default DressEdit