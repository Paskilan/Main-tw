import React, { useState } from 'react';
import { Button, Form, Card, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';


function RegisterPage() {

    const [step, setStep] = useState('register'); 
    const [email, setEmail] = useState(''); 

    const handleSubmit = (event) => {
        event.preventDefault();
        // Transition to OTP verification step
        setStep('otp');
    };

    const handleOTPSubmit = (event) => {
        event.preventDefault();
        alert('OTP Submitted');
    };

    const handleBackToRegister = () => {
        setStep('register'); // Set state back to 'register'
    };

    return (
        <div style={{ marginTop: '100px' }}>

            <Container>
                <Card style={{ width: '30rem', height: '28rem', boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 28px' }}>
                    <Card.Body>
                        {step === 'register' ? (
                            <Form onSubmit={handleSubmit}>
                            <Row className="mb-3">
                                <Col>
                                <Form.Group controlId="FName">
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control type="text" placeholder="Crown" />
                                </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group controlId="LName">
                                        <Form.Label>Last Name</Form.Label>
                                        <Form.Control type="text" placeholder="Nose" />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group controlId="EmailRegister">
                                    <Form.Label>PUP Webmail</Form.Label>
                                    <Form.Control type="email" placeholder="Enter email" />
                                </Form.Group>
                            </Row>

                            <Row className="mb-3">
                                <Form.Group controlId="PhoneRegister">
                                    <Form.Label>Mobile Number</Form.Label>
                                    <Form.Control type="text" placeholder="Enter Number" />
                                </Form.Group>
                            </Row>

                            <Row className="mb-5">
                                <Form.Group controlId="PasswordRegister">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" placeholder="Password" />
                                </Form.Group>
                            </Row>

                                <Button
                                    variant="primary"
                                    type="submit"
                                    style={{ borderRadius: '20px', marginLeft: '10px' }}
                                >
                                    Submit
                            </Button>

                                <Link to="/LoginPage">
                                    <Button
                                        as={Col}
                                        xs={{ order: 'first' }}
                                        variant="link"
                                    >
                                    Login
                                    </Button>
                                </Link>
                                
                            </Form>
                        ) : (
                            <Form onSubmit={handleOTPSubmit}>
                                <Row className="mb-3">
                                    <Form.Group controlId="OTPInput">
                                        <Form.Label>Enter OTP sent to {email}</Form.Label>
                                        <Form.Control type="text" placeholder="Enter OTP" required />
                                    </Form.Group>
                                </Row>
                                <Button
                                    variant="primary"
                                    type="submit"
                                    style={{ borderRadius: '20px', marginLeft: '10px' }}
                                >
                                    Verify OTP
                                    </Button>
                                <Button
                                        variant='link'
                                        onClick={handleBackToRegister}
                                    >
                                    Back
                                    </Button>
                            </Form>
                        )}
                    </Card.Body>
                </Card>
            </Container>
        </div>
    );
}

export default RegisterPage;