import React, { useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import newRequest from '../../utils';

const Addnewtask = () => {
  const [formData, setFormData] = useState({
    subject: '',
    category: '',
    description: '',
    links: '',
    status: '',
    priority: '',
    assignedBy: '',
    assignedToPrimary: '',
    assignedToSecondary: '',
    assignedOn: '',
    dueDate: '',
    statusHistroy: [],
  });

  const [categories, setCategories] = useState([]);
  const [employees, setEmployees] = useState([]);

  useEffect(()=>{
      newRequest.post('http://localhost:8001/fetchdatafortask')
      .then((res)=>{
        const [categoryRes, employeeRes] = res.data;
        setCategories(categoryRes);
        setEmployees(employeeRes);

      })  
      .catch((err)=>{ 
         console.log(err)
      })
  } , [])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    if (formData.status && formData.assignedBy) {
      setFormData(prev => ({
        ...prev,
        statusHistory: [
          {
            status: prev.status,
            assignedBy: prev.assignedBy,
          },
        ],
      }));
    }
  }, [formData.status, formData.assignedBy]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData); 
    newRequest.post('http://localhost:8001/addTask' , {formData} , {withCredentials:true})
    .then((res) => {
        console.log(res)
    })
    .catch((err) => {
        console.log(err)
    })
  };

  return (
    <div className="form-container" style={{ maxHeight: '600px' , overflowY: 'auto', marginLeft: '0', width: '50%' }}>
      <Form onSubmit={handleSubmit} style={{ marginLeft: "20px" }}>
        <Form.Group controlId="subject">
          <Form.Label>Subject</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="category">
  <Form.Label>Category</Form.Label>
  <Form.Control
    as="select" 
    name="category"
    value={formData.category}
    onChange={handleChange}
    required
  >
    <option value="">Select Category</option>
            {
            categories.map((cat, index) => (
              <option key={index} value={cat.name}>{cat.name}</option>
            ))
            }
  </Form.Control>
</Form.Group>

        <Form.Group controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="links">
          <Form.Label>Links</Form.Label>
          <Form.Control
            type="url"
            placeholder="Enter links"
            name="links"
            value={formData.links}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="status">
          <Form.Label>Status</Form.Label>
          <Form.Control
            as="select"
            name="status"
            value={formData.status}
            onChange={handleChange}
            required
          >
            <option value="">Select Status</option>
            <option value="open">Open</option>
            <option value="in-progress">In Progress</option>
            <option value="closed">Closed</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="priority">
          <Form.Label>Priority</Form.Label>
          <Form.Control
            as="select"
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            required
          >
            <option value="">Select Priority</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="assignedBy">
          <Form.Label>Assigned By</Form.Label>
          <Form.Control
            as="select"
            name="assignedBy"
            value={formData.assignedBy}
            onChange={handleChange}
            required
          >
            <option value="">Select User</option>
           { 
             employees.map((user, index) => (
              <option key={index} value={user.name}>{user.username}</option>
            ))
              } 
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="assignedToPrimary">
          <Form.Label>Assigned To (Primary)</Form.Label>
          <Form.Control
            as="select"
            name="assignedToPrimary"
            value={formData.assignedToPrimary}
            onChange={handleChange}
            required
          >
            <option value="">Select Primary Assignee</option>
            {
            employees.map((user, index) => (
              <option key={index} value={user.username}>{user.username}</option>
            ))
            } 
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="assignedToSecondary">
          <Form.Label>Assigned To (Secondary)</Form.Label>
          <Form.Control
            as="select"
            name="assignedToSecondary"
            value={formData.assignedToSecondary}
            onChange={handleChange}
          >
            <option value="">Select Secondary Assignee</option>
            {
            employees.map((user, index) => (
              <option key={index} value={user.username}>{user.username}</option>
            ))
            } 
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="assignedOn">
          <Form.Label>Assigned On</Form.Label>
          <Form.Control
            type="date"
            name="assignedOn"
            value={formData.assignedOn}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="dueDate">
          <Form.Label>Due Date</Form.Label>
          <Form.Control
            type="date"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" style={{marginTop:'20px'}}>
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default Addnewtask;
