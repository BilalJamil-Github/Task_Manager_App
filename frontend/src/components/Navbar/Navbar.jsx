import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; 
import { FaUser } from "@react-icons/all-files/fa/FaUser";
import { FaList } from "@react-icons/all-files/fa/FaList";
import { FaTasks } from "@react-icons/all-files/fa/FaTasks";
import { FaSignOutAlt } from "@react-icons/all-files/fa/FaSignOutAlt";
import { useNavigate } from 'react-router-dom';
  

function Navbar() {
 
  const navigate = useNavigate();
  const logout = ()=>{
      localStorage.removeItem('token');
      navigate('/')
  }

  const storedIsAdmin = localStorage.getItem('isAdmin');
  
  const Name = localStorage.getItem('Name');
 
  const isAdmin = storedIsAdmin ? storedIsAdmin === "true" : null;
  console.log("isAdmin =", isAdmin);
  
  return (
    <div className="navbar">
      <div>
      <h3>TASK MANAGER</h3>
      <h4>Welcome, {Name}</h4>
      </div>
 
      <nav>
  {isAdmin !== null ? (
    isAdmin ? (
      <ul>
        <li><Link to="/admin/usermanager"><FaUser /> <span>User Manager</span></Link></li> 
        <li><Link to="/admin/categorymanager"><FaList /> <span>Category Manager</span></Link></li> 
        <li><Link to="/admin/taskmanager"><FaTasks /> <span>Task Manager</span></Link></li> 
        <li onClick={logout}><Link to="/admin/logout"><FaSignOutAlt /> <span>Logout</span></Link></li> 
      </ul>
    ) : (
      <ul>
        <li><Link to="/admin/taskmanager"><FaTasks /> <span>Task Manager</span></Link></li> 
        <li onClick={logout}><Link to="/admin/logout"><FaSignOutAlt /> <span>Logout</span></Link></li> 
      </ul>
    )
  ) : (
    <div>Loading...</div> 
  )}
</nav>


    </div>
  );
}

export default Navbar;
