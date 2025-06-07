import React, { useState , useEffect , useMemo} from "react";
import { Container, Row, Col, Button, Table, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import newRequest from "../../utils";
import { server } from '../../constants.js';

function ViewAllTask({setKey , seteditId , sethistoryId , setupdateDone , updateDone}) {

  const [tasks , settasks] = useState([]);
  const [copytasks , setcopytasks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [deleteTasks , setdeleteTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [showList, setShowList] = useState(false);

  useEffect(() => {
    if (tasks.length > 0) {
      setSelectedTask(tasks[0]); 
    } else{
      setSelectedTask(undefined)
    }
  }, [tasks]);

  const [filtervalue , setfiltervalue] = useState({
    subject: "",
    assignedToPrimary: "",
    category:"",
    priority:"",
    assignedToSecondary: "",
    status:"",
    assignedBy:"",
})

 const OpenEdit = (selectedTask)=>{
      
  setKey('edit')
  seteditId(selectedTask._id)


 }  
 
 const OpenHistroy = (selectedTask)=>{
  setKey('histroy')
  sethistoryId(selectedTask._id)
 }  

  const filterTask = useMemo(()=>{
    return tasks.filter((task)=>
       Object.keys(filtervalue).every(
        (key) => { 
          return !filtervalue[key] || task[key] === filtervalue[key]
         }
        
       )
    )    
} , [tasks, filtervalue])

 
  const deleteTask = async (deletevalue) => {
          console.log("delete Value = " , deletevalue)
          const id = deletevalue._id
          newRequest.post(`${server}/deleteTask` , {id} ,{withCredentials: true})
          .then((res) => {
             if(res.data.code){
                 settasks((prevtask) => prevtask.filter(task => task._id !== id))
             }
            })
          .catch((err) => { console.log(err) })
  }

  const handleChange = (e)=>{
    const { name, value } = e.target;
    setfiltervalue({
      ...filtervalue,
      [name]: value,
    });
  }

 
 useEffect(()=>{
      newRequest.post(`${server}/fetchAllTask`)
      .then((res)=>{
        console.log(res.data)
          settasks(res.data)
          setcopytasks(res.data)

      })
      .catch((err)=>{
          console.log(err)
      })
  }, [updateDone])


  
  


  useEffect(()=>{
    newRequest.post(`${server}/fetchdatafortask`)
      .then((res)=>{
        const [categoryRes, employeeRes] = res.data;
        setCategories(categoryRes);
        setEmployees(employeeRes);
        setShowList(!showList)

      })  
      .catch((err)=>{ 
         console.log(err)
      })
  } , [])




  return (
    <Container fluid className="p-3">
      <Row className="mb-3">
    
    

        <Form className="d-flex flex-nowrap gap-2">
         < Form.Group>
           <Form.Group>
              <Form.Label><b>Filter : </b></Form.Label>
           </Form.Group>
         </Form.Group>
          <Form.Group controlId="subject">
            <Form.Label>Subject</Form.Label>
            <Form.Control type="subject" placeholder="Enter subject" 
            value={filtervalue.subject}
            onChange={handleChange}
            name="subject"
            />
          </Form.Group>

          <Form.Group controlId="assignedToPrimary">
  <Form.Label>Assigned To (Prim)</Form.Label>
  <Form.Control
    as="select"
    name="assignedToPrimary"
    value={filtervalue.assignedToPrimary}
    onChange={handleChange}
    required
  >
    <option value="">Select User</option>
    {employees.map((user, index) => (
      <option key={index} value={user.name}>{user.username}</option>
    ))}
  </Form.Control>
</Form.Group>

<Form.Group controlId="assignedBy">
  <Form.Label>Assigned By</Form.Label>
  <Form.Control
    as="select"
    name="assignedBy"
    value={filtervalue.assignedBy}
    onChange={handleChange}
    required
  >
    <option value="">Select User</option>
    {employees.map((user, index) => (
      <option key={index} value={user.name}>{user.username}</option>
    ))}
  </Form.Control>
</Form.Group>

<Form.Group controlId="assignedToSecondary">
  <Form.Label>Assigned To (Sec)</Form.Label>
  <Form.Control
    as="select"
    name="assignedToSecondary"
    value={filtervalue.assignedToSecondary}
    onChange={handleChange}
    required
  >
    <option value="">Select User</option>
    {employees.map((user, index) => (
      <option key={index} value={user.name}>{user.username}</option>
    ))}
  </Form.Control>
</Form.Group>


          <Form.Group controlId="Category">
            <Form.Label>Category</Form.Label>
             <Form.Control
                as="select" 
                name="category"
                value={filtervalue.category}
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

           <Form.Group controlId="Priority">
                    <Form.Label>Priority</Form.Label>
                    <Form.Control
                      as="select"
                      name="priority"
                      value={filtervalue.priority}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Status</option>
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                    </Form.Control>
            </Form.Group>


          
           <Form.Group controlId="status">
                    <Form.Label>Status</Form.Label>
                    <Form.Control
                      as="select"
                      name="status"
                      value={filtervalue.status}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Status</option>
                      <option value="open">Open</option>
                      <option value="in-progress">In Progress</option>
                      <option value="closed">Closed</option>
                    </Form.Control>
                  </Form.Group>
        
        </Form>
      </Row>

      <Row>
      <Col md={3} className={`border-end p-3 ${!showList ? "w-100" : ""}`} >
        <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="fw-bold text-primary">Tasks</h5>
           {
          <Button style={{display: selectedTask ? "block" : "none"}} variant="secondary" size="sm" onClick={() => setShowList(!showList)}>
                  {showList ? "Hide" : "Show"}
            </Button> 
          }
          </div>
         <div style={{height:'450px' , overflowY:'auto'}}>
         <Table bordered hover responsive>
            <tbody>
              {filterTask.map((task) => (
                <tr
                  key={task.id}
                  onClick={() => {setSelectedTask(task)}}
                  className="task-row"
                  style={{ cursor: "pointer" }}
                >
                  <td className="p-3">
                    <span className="fw-bold text-dark d-block" style={{ fontSize: "18px" }}>
                      <span>
                        <svg
                          style={{ width: "20px" }}
                          role="img"
                          aria-hidden="true"
                          focusable="false"
                          className="svg-inline--fa fa-ticket"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 576 512"
                        >
                          <path
                            fill="currentColor"
                            d="M64 64C28.7 64 0 92.7 0 128l0 64c0 8.8 7.4 15.7 15.7 18.6C34.5 217.1 48 235 48 256s-13.5 38.9-32.3 45.4C7.4 304.3 0 311.2 0 320l0 64c0 35.3 28.7 64 64 64l448 0c35.3 0 64-28.7 64-64l0-64c0-8.8-7.4-15.7-15.7-18.6C541.5 294.9 528 277 528 256s13.5-38.9 32.3-45.4c8.3-2.9 15.7-9.8 15.7-18.6l0-64c0-35.3-28.7-64-64-64L64 64zm64 112l0 160c0 8.8 7.2 16 16 16l288 0c8.8 0 16-7.2 16-16l0-160c0-8.8-7.2-16-16-16l-288 0c-8.8 0-16 7.2-16 16zM96 160c0-17.7 14.3-32 32-32l320 0c17.7 0 32 14.3 32 32l0 192c0 17.7-14.3 32-32 32l-320 0c-17.7 0-32-14.3-32-32l0-192z"
                          ></path>
                        </svg>
                      </span>{" "}
                      {task.subject}
                    </span>
                    <small className="text-muted">{task.category}</small>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          </div> 
        
        </Col>
        {showList && selectedTask &&  (
           <Col md={9} className="p-4" style={{overflowY: "auto" , flexDirection:'column' , display:'flex' ,height:'500px'}}>
            <h3 className="fw-bold text-dark">Subject: {selectedTask.subject}</h3>
            <div className="mb-3">
              <Button variant="warning" className="me-2" onClick={() => OpenEdit(selectedTask)}>
                Edit ✏️
              </Button>
              <Button variant="secondary" className="me-2" onClick={() => OpenHistroy(selectedTask)}>
                History 🔄
              </Button>
              <Button variant="danger" onClick={ () => deleteTask(selectedTask) }>Delete ❌</Button>
            </div>
            <h5 className="fw-bold text-primary">Details</h5>
            <p>
              <strong>Category:</strong> {selectedTask.category}
            </p>
            <p>
              <strong>Priority:</strong> {selectedTask.priority}
            </p>
            <p>
              <strong>Status:</strong> {selectedTask.status}
            </p>
            <h5 className="fw-bold text-primary">Description</h5>
            <p>{selectedTask.description}</p>
            <h5 className="fw-bold text-primary">People</h5>
            <p>
              <strong>Assigned To (Primary):</strong> {selectedTask.assignedToPrimary}
            </p>
            <p>
              <strong>Assigned By:</strong> {selectedTask.assignedBy}
            </p>
            <h5 className="fw-bold text-primary">Date</h5>
            <p>
              <strong>Created On:</strong> {selectedTask.updatedAt.slice(0,10)}
            </p>
            <p>
              <strong>Due Date: </strong> {selectedTask.dueDate}
            </p>
          </Col>
        )}
      </Row>

      <style>
        {`
          .task-row:hover {
            background-color: #f8f9fa;
            transition: background 0.3s ease-in-out;
          }
        `}
      </style>
    </Container>
  );
}

export default ViewAllTask;
