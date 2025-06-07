import React, { useEffect, useState , useContext } from 'react';
import Table from 'react-bootstrap/Table';
import { FaPen } from "@react-icons/all-files/fa/FaPen";
import { FaTrash } from "@react-icons/all-files/fa/FaTrash";
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import newRequest from '../../utils';
import { server } from '../../constants.js';

function Viewuser({ setActiveTab, setEmployeeData, refresher , setrefresher }) { 

  const [data, setdata] = useState([]);

  useEffect(() => {
    newRequest.post(`${server}/getEmployee`)
      .then((res) => {
        setdata(res.data);
        setrefresher(!refresher)
      })
      .catch((err) => {
        console.log(err);
      });
  }, [refresher]);

   const fetchEmployee = (id) => {
     setActiveTab('edituser');
     newRequest.post(`${server}/fetchEmployee` , {id})
     .then((res) => {
      console.log("Total = ", res.data)
      setEmployeeData(res.data)
     }).catch((err)=>{
      console.log(err);
     })
   }

   const deleteEmployee = (id) => {
      newRequest.post(`${server}/deleteEmployee` , {id})
   }
  


  return (
    <div className='container'>
      <Table bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Team</th>
            <th>isAdmin</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((content, index) => (
            <tr key={content._id}>
              <td>{index + 1}</td>
              <td>{content.username}</td>
              <td>{content.email}</td>
              <td>{content.team}</td>
              <td>{content.isAdmin ? 'Yes' : 'No'}</td>
              <td style={{ display: 'flex', justifyContent: 'space-around' }}>
                <Button variant="secondary" onClick={()=>{fetchEmployee(content._id)}}>
                  <FaPen />
                </Button>
                <Button variant="danger" onClick={()=>{deleteEmployee(content._id)}}>
                  <FaTrash />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default Viewuser;
