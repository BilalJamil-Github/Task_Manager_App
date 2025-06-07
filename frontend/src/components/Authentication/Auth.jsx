import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
//const API_URL = import.meta.env.VITE_API_URL;
import { server } from '../../constants.js';

function Auth() {
  const [logEmail, setlogEmail] = useState("");
  const [logPassword, setPassword] = useState("");
  const navigate = useNavigate();


  const login = async (e) => {
    e.preventDefault();
    console.log("Logging in with", logEmail, logPassword);
    
    try {
      const res = await axios.post(`${server}/login`, { logEmail, logPassword }, { withCredentials: true });
      console.log("Response:", res);
      if (res.data.token) {
        alert("Logged in successfully");
          console.log("Your awaited response = " , res )
        if (res.data.code && res.data.access === "admin") {
          navigate('/admin');
          localStorage.setItem("isAdmin" , res.data.admin)
          localStorage.setItem("Name" , res.data.name);
        }
        
        if (res.data.code && res.data.access === "employee") {
          navigate('/employee', { state: { isAdmin: res.data.admin } });
          console.log("watch" , res)
          localStorage.setItem("isAdmin" , res.data.admin)
          localStorage.setItem("Name" , res.data.name);
        }
        
      }
    } catch (err) {
      console.log("Login error", err);
    }
  };

  return (
    <div style={{ backgroundColor: '#f7f7f7', minHeight: '100vh' }}>
      <Container 
        className="d-flex justify-content-center align-items-center" 
        style={{ minHeight: '100vh' }}
      >
        <Row className="justify-content-center w-100">
          <Col xs={12} sm={8} md={6} lg={4}>
            <Card className="p-4 shadow-sm">
              <Card.Body>
                <h2 className="text-center mb-4">Login</h2>
                <Form onSubmit={login}>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      value={logEmail}
                      onChange={(e) => setlogEmail(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      value={logPassword}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Form.Group>

                  <Button variant="primary" type="submit" className="w-100 mt-3">
                    Log In
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Auth;
