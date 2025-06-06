import React, { useState } from "react";
import { Form, Button, Table } from "react-bootstrap";
import newRequest from '../../utils.js';
const API_URL = import.meta.env.VITE_API_URL;

const AddCategory = ({updatecategory , setupdatecategory}) => {
  const [category, setCategory] = useState("");
  const handleAddCategory = (e) => {
      e.preventDefault();
      setCategory("")
     newRequest.post(`{API_URL}/addCategory` , {category} , {withCredentials: true})
      .then((res)=>{console.log(res) ; setupdatecategory(!updatecategory)})
      .catch((err)=>{console.log(err)})
  
    };


  return (
    <div className="container mt-4">
      <h3>Add Category</h3>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Category</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" onClick={handleAddCategory }>
          Save
        </Button>
      </Form>


    </div>
  );
};

export default AddCategory;
