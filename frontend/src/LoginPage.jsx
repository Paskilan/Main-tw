import React from 'react';
import { Button, Form, Card, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function LoginPage() {
    return (
        <div style={{ marginTop: '100px' }}>

            <Container>
                <Card style={{ width: '30rem', boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 28px' }}>
                    <Card.Body>
                        <Form>
                            <Row className="mb-3">
                                <Form.Group controlId="EmailLogin">
                                    <Form.Label>PUP Webmail</Form.Label>
                                    <Form.Control type="email" placeholder="Enter email" />
                                </Form.Group>
                            </Row>

                            <Row className="mb-5">
                                <Form.Group controlId="PasswordLogin">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" placeholder="Password" />
                                </Form.Group>
                            </Row>

                            <Link to="/HomePage">
                            <Button 
                                variant="primary"
                                type="submit"
                                style={{ borderRadius: '20px', marginLeft: '10px' }}
                            >
                                Submit
                            </Button>
                            </Link>

                            <Link to="/RegisterPage">
                                <Button
                                    variant="link"
                                >
                                    Register
                                </Button>
                            </Link>

                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    );
}

export default LoginPage;