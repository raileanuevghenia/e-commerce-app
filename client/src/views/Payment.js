import React, { useState } from 'react'
import { Form, Button, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { savePaymentMethod } from '../actions/cartActions'

const Payment = ({ history}) => {
    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart

    if(!shippingAddress){
        history.push("/shipping")
    }

    const [paymentMethod, setPaymentMethod] = useState('PayPal')
    

    const dispatch = useDispatch()

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        history.push("/placeorder")
    }
    return (
        <FormContainer>
            <CheckoutSteps step1 step2 step3/>
            <h1>Payment Method</h1>
            <br/>
            <Form onSubmit={submitHandler} >
                <Form.Group>
                    <Form.Label style={{color: "black"}}as="legend">Select Method</Form.Label>
                    <br/>
                    <Col>
                        <Form.Check 
                        type="radio" 
                        label="PayPal" 
                        id="PayPal"
                        name="paymentMethod"
                        value="PayPal"
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        style={{color: "blue"}}
                        ></Form.Check>
                    </Col>
                    <Col>
                        <Form.Check 
                        type="radio" 
                        label=" Credit Card" 
                        id="CreditCard"
                        name="paymentMethod"
                        value="CreditCard"
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        style={{color: "blue"}}
                        ></Form.Check>
                    </Col>
                </Form.Group>
                <br/>
                <Button type="submit" variant="primary">Countinue</Button>
            </Form>
        </FormContainer>
    )
}

export default Payment

