import React, { useState, useEffect, createContext, Children } from 'react';
import { Form, Button } from 'react-bootstrap';
import './Edituser.css';
import axios from 'axios';
import Viewuser from './Viewuser';
import newRequest from '../../utils';
import { server } from '../../constants.js';

export const MyContext = createContext();
function EditUser({ employeeData, setEmployeeData , setrefresher , refresher}) {
 
  const [editUserData, setEditUserData] = useState({
    id : '',
    username: '',
    email: '',
    password: '',
    team: '',
    isAdmin: false,
  });
  
  const [loading , setloading] = useState(false);
  const [updates , setupdates] = useState(false)

  useEffect(() => {
    if (employeeData && employeeData[0]) {
      setEditUserData({
        id: employeeData[0]._id,
        username: employeeData[0].username || '',
        email: employeeData[0].email || '',
        password: '', 
        team: employeeData[0].team || '',
        isAdmin: employeeData[0].isAdmin || false,
      });
    }
  }, [employeeData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditUserData({
      ...editUserData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setloading(true)
    if (employeeData && employeeData[0] && employeeData[0]._id) {
      const updatedEmployeeData = employeeData.map((employee) => {
        if (employee._id === employeeData[0]._id) {
          return {
            ...employee,
            ...editUserData,
          };
        }
        return employee;
      });
  
      setEmployeeData(updatedEmployeeData);
      newRequest.post(`${server}/updateEmployee`, editUserData , {withCredentials: true})
        .then((res) => setloading(false) , setupdates(!updates) , setrefresher(!refresher))
        .catch((err) => console.log("err = " , err))
        
    }
  };
  

  if (employeeData && employeeData[0]) {
    return (
      <div className="container w-50 ms-0 me-3 px-0">
        <div className="edit-user-form" style={{ marginLeft: '20px' }}>
          <h3>Edit User Information</h3>

          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                value={editUserData.email}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                name="password"
                value={editUserData.password}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formTeam">
              <Form.Label>Team</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter team"
                name="team"
                value={editUserData.team}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                name="username"
                value={editUserData.username}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formIsAdmin">
              <Form.Check
                type="checkbox"
                label="Is Admin"
                name="isAdmin"
                checked={editUserData.isAdmin}
                onChange={handleChange}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Save Changes
            </Button>
           
          </Form>
         
        </div>
      </div>
    );
  } else {
    return null;
  }
}

export default EditUser;
