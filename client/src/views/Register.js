import React, { useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col} from 'react-bootstrap'
import { useDispatch, useSelector} from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { register } from '../actions/userActions'
import FormContainer from '../components/FormContainer'


const Register = ({ location , history}) => {
    const [ name, setName] = useState("")
    const [ email, setEmail] = useState("")
    const [ password, setPassword] = useState("")
    const [ confirmPassword, setConfirmPassword] = useState("")
    const [ message, setMessage] = useState(null)

    const dispatch = useDispatch()

    const userRegister = useSelector(state => state.userRegister)
    const { loading, error,  userInfo} = userRegister

    const redirect =location.search ? location.search.split('=')[1] : '/'

    useEffect(() => {
        if(userInfo){
            history.push(redirect)
        }
    }, [history, userInfo, redirect])
    const submitHandler = (e) => {
        e.preventDefault()
        if(password !== confirmPassword){
            setMessage("Passwords do not match.Pleaase try again.")
        } else {
            dispatch(register(name, email, password))
        }
    }
    return (
        <FormContainer>
            <h1>Sign Up </h1>
            { message && <Message variant="danger">{ message}</Message>}
            { error && <Message variant="danger">{error}</Message>}
            {loading && <Loader/>}
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
                <Form.Group controlId= 'confirmPassword'>
                    <Form.Label style={{color: "black", fontSize: "19px"}}>Confirm Password</Form.Label>
                    <Form.Control 
                    type="password" 
                    placeholder="Confirm your password" 
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    style={{ backgroundColor: "#F4F4F4"}}
                    ></Form.Control>
                </Form.Group>
                <br/>
                <Button type="submit" variant="primary">Register</Button>
            </Form>
            <Row>
                <Col className="py-3" style={{color: "black"}}>
                Have an Account? {' '}
                    <Link to={ redirect ? `/login?redirect=${redirect}` : '/login'} style={{color: "blue"}} > Sign In </Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default Register