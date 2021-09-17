import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { login } from '../actions/userActions'
import FormContainer from '../components/FormContainer'


const Login = ({ location , history}) => {
    const [ email, setEmail] = useState("")
    const [ password, setPassword] = useState("")

    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { loading, error,  userInfo} = userLogin

    const redirect =location.search ? location.search.split('=')[1] : '/'

    useEffect(() => {
        if(userInfo){
            history.push(redirect)
        }
    }, [history, userInfo, redirect])
    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(email, password))
    }
    return (
        <FormContainer>
            <h1>Sign In </h1>
            { error && <Message variant="danger">{error}</Message>}
            {loading && <Loader/>}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId= 'email'>
                    <Form.Label style={{color: "black", fontSize: "19px"}}>Email Address</Form.Label>
                    <Form.Control 
                    type="email" 
                    placeholder="Enter email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group controlId= 'password'>
                    <Form.Label style={{color: "black", fontSize: "19px"}}>Password</Form.Label>
                    <Form.Control 
                    type="password" 
                    placeholder="Enter password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ backgroundColor: "#F4F4F4"}}
                    ></Form.Control>
                </Form.Group>
                <br/>
                <Button type="submit" variant="primary">Sign In</Button>
            </Form>
            <Row>
                <Col style={{color: "black"}} className="py-3">
                New Customer? {' '}
                    <Link to={ redirect ? `/register?redirect=${redirect}` : '/register'} style={{color: "blue"}} > Register </Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default Login
