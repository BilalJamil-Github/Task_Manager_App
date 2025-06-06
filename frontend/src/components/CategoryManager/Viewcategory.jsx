import React, { useEffect, useState } from 'react';
import { Table, Button } from "react-bootstrap";
import { FaTrash } from "@react-icons/all-files/fa/FaTrash";
import axios from 'axios';
import newRequest from '../../utils.js';
import { useLocation } from 'react-router-dom';   
import { useNavigate } from 'react-router-dom';  
const API_URL = import.meta.env.VITE_API_URL;

function Viewcategory({ updatecategory }) { 
  const [categories, setcategories] = useState([]);
  const [update ,setupdate] = useState(false);


  const deleteCategory = (id) => {
     newRequest.post(`${API_URL}/deleteCategory`, {id : id} ,{ withCredentials: true, baseURL: 'http://localhost:8001' })
      .then(
        (res)=> { 
          if(res.data.code){
              setupdate(!update)
          }
        }
    )
      .catch((err)=> console.log(err) )
  }

  useEffect(() => {

    newRequest.get('${API_URL}/fetchCategory').then(res => {
      setcategories(res.data);
    })
    
  }, [updatecategory , update]); 



  return (
    <div style={{ marginLeft: '30px' }}>
      <h3 className="mt-4">View Categories</h3>
      <Table bordered hover className="mt-3" style={{ width: "60%" }}>
        <thead>
          <tr>
            <th>#</th>
            <th>Category</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((cat, index) => (
            <tr key={cat._id || index}>
              <td>{index + 1}</td>
              <td>{cat.name}</td>
              <td style={{ width: '20%' }}>
                <Button variant="danger">
                  <FaTrash onClick={() => deleteCategory(cat._id)}/>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default Viewcategory;
