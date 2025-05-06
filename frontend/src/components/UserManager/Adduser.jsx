import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './Adduser.css';
import Auth from '../Authentication/Auth';
import axios from 'axios';
import newRequest from '../../utils';

function Adduser() {
  const [userUpdate, setuserUpdate] = useState(false);
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: '',
    team: '',
    isAdmin: false,
  });

  const AddEmployee = () => {
    newRequest
      .post('http://localhost:8001/addEmployee', userData, { withCredentials: true })
      .then((response) => {
        console.log(response.data);
        setuserUpdate(!userUpdate);
        setUserData({
          username: '',
          email: '',
          password: '',
          team: '',
          isAdmin: false,
        });
      })
      .catch((error) => {
        console.error('There was an error adding the employee!', error);
      });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUserData({
      ...userData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    AddEmployee(); 
  };

  return (
    <>
      <div className="container">
        <Form className="form" onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              name="username"
              value={userData.username}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              name="email"
              value={userData.email}
              onChange={handleChange}
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              value={userData.password}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formTeam">
            <Form.Label>Team</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter team name"
              name="team"
              value={userData.team}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formIsAdmin">
            <Form.Check
              type="checkbox"
              label="Is Admin"
              name="isAdmin"
              checked={userData.isAdmin}
              onChange={handleChange}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </>
  );
}

export default Adduser;