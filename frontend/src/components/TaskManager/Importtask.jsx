import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import axios from "axios";
import newRequest from "../../utils";

function ImportTask() {
   const [file , setfile] = useState();
   const handleFileUpload = async ()=>{
       if(!file) return alert("Please Select a file")
        const formData = new FormData();
        formData.append("file" ,file)

       try {
          await newRequest.post("http://localhost:8001/uploadExcel" , formData , {
            headers: { "Content-Type": "multipart/form-data" },
          }).then((res)=>{
                console.log(res.data.message)
                alert("file uploaded Successfully")
          })
       } catch (error) {
          console.log(error)
       } 
   }

  return (
    <div className="container d-flex justify-content-left align vh-30">
      <div className="card p-4" style={{ width: "400px" }}>
        <h3 className="text-center mb-3">Import CSV File</h3>
        <input 
          type="file" 
          accept=".csv,.xlsx" 
          className="form-control mb-3" 
          onChange={(e) => setfile(e.target.files[0])}
        />
        <button type="button" className="btn btn-primary w-100" onClick={handleFileUpload}>Submit</button>
      </div>
    </div>
  );
}

export default ImportTask;
