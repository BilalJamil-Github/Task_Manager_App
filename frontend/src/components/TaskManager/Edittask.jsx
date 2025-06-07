import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import newRequest from '../../utils';
import { server } from '../../constants.js';

const Edittask = ({ editId  , setupdateDone , updateDone}) => {
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
    statusHistroy: []
  });

  const [categories, setCategories] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    newRequest.post(`${server}/fetchdatafortask`)
      .then((res) => {
        const [categoryRes, employeeRes] = res.data;
        setCategories(categoryRes);
        setEmployees(employeeRes);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (editId) {
      newRequest.post(`${server}/fetchtask`, { editId }, { withCredentials: true })
        .then((res) => {
          const task = res.data.content[0];
          setFormData(task);
          console.log("Your form Data " , formData)
          if (task.category && !categories.some(cat => cat.name === task.category)) {
            setFormData((prevData) => ({ ...prevData, category: '' })); 
          }

          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
        });
    }
  }, [editId, categories]); 

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    if (name !== 'status') {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        status: value,
        statusHistory: [
          ...prevData.statusHistory,
          {
            status: value,
            assignedBy: prevData.assignedBy,
            date: new Date(),
          },
        ],
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  
  const updateMyTask = () => {
       newRequest.post(`${server}/updateTask` , {formData} ,  {withCredentials: true})
       .then((res)=>{
          console.log("your response" ,res)
          if(res.data.code){
            setupdateDone(!updateDone)
          }else{
            alert("Error")
          }
       })
       .catch((err)=>{
           console.log(err)
       })
      };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="form-container" style={{ maxHeight: '600px', overflowY: 'auto', marginLeft: '0', width: '50%' }}>
      <Form onSubmit={handleSubmit} style={{ marginLeft: '20px' }}>
        <Form.Group controlId="subject">
          <Form.Label>Subject</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter subject"
            name="subject"
            value={formData.subject || ''}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="category">
          <Form.Label>Category</Form.Label>
          <Form.Control as="select" name="category" value={formData.category || ''} onChange={handleChange} required>
            <option value="">Select Category</option>
            {categories.map((cat, index) => (
              <option key={index} value={cat.name}>{cat.name}</option>
            ))}
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control as="textarea" rows={3} placeholder="Enter description" name="description" value={formData.description || ''} onChange={handleChange} required />
        </Form.Group>

        <Form.Group controlId="links">
          <Form.Label>Links</Form.Label>
          <Form.Control type="url" placeholder="Enter links" name="links" value={formData.links || ''} onChange={handleChange} />
        </Form.Group>

        <Form.Group controlId="status">
          <Form.Label>Status</Form.Label>
          <Form.Control as="select" name="status"  value={formData.status || ''} onChange={handleChange} required>
            <option>Select Status</option>
            <option value="open">Open</option>
            <option value="in-progress">In Progress</option>
            <option value="closed">Closed</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="priority">
          <Form.Label>Priority</Form.Label>
          <Form.Control as="select" name="priority" value={formData.priority || ''} onChange={handleChange} required>
            <option value="">Select Priority</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="assignedBy">
          <Form.Label>Assigned By</Form.Label>
          <Form.Control as="select" name="assignedBy" value={formData.assignedBy || ''} onChange={handleChange} required>
            <option value="">Select User</option>
            {employees.map((user, index) => (
              <option key={index} value={user.name}>{user.username}</option>
            ))}
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="assignedToPrimary">
          <Form.Label>Assigned To (Primary)</Form.Label>
          <Form.Control as="select" name="assignedToPrimary" value={formData.assignedToPrimary || ''} onChange={handleChange} required>
            <option value="">Select Primary Assignee</option>
            {employees.map((user, index) => (
              <option key={index} value={user.username}>{user.username}</option>
            ))}
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="assignedToSecondary">
          <Form.Label>Assigned To (Secondary)</Form.Label>
          <Form.Control as="select" name="assignedToSecondary" value={formData.assignedToSecondary || ''} onChange={handleChange}>
            <option value="">Select Secondary Assignee</option>
            {employees.map((user, index) => (
              <option key={index} value={user.username}>{user.username}</option>
            ))}
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="assignedOn">
          <Form.Label>Assigned On</Form.Label>
          <Form.Control type="date" name="assignedOn" value={formData.assignedOn || ''} onChange={handleChange} required />
        </Form.Group>

        <Form.Group controlId="dueDate">
          <Form.Label>Due Date</Form.Label>
          <Form.Control type="date" name="dueDate" value={formData.dueDate || ''} onChange={handleChange} required />
        </Form.Group>

        <Button variant="primary" type="submit" style={{ marginTop: '20px' }} onClick={updateMyTask}>
          Update Task
        </Button>
      </Form>
    </div>
  );
};

export default Edittask;
