import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar.jsx';
import './Applayout.css'; 
import { Outlet } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useLocation } from 'react-router-dom';
      
function Applayout() {

  const navigate = useNavigate();
  const token = Cookies.get('accessToken');

 

  return (
    <div className="app-container">
      <Navbar/>
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
}

export default Applayout;
