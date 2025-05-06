import React, { useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Adduser from './Adduser';
import Edituser from './Edituser';
import Viewuser from './Viewuser';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

function Usermanager({ setActiveTab}) {
  const [key, setKey] = useState('profile'); 
  const [employeeData, setEmployeeData] = useState(null);
  const [refresher , setrefresher] = useState(false);


      

  return (
    <div>
      <Tabs
        id="noanim-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)} 
        className="mb-3"
      >
        <Tab eventKey="home" title="Add User">
          <Adduser refresher={refresher} setrefresher={setrefresher} />
        </Tab>
        <Tab eventKey="profile" title="View User">
          <Viewuser refresher={refresher} setrefresher={setrefresher} setActiveTab={setKey} setEmployeeData={setEmployeeData}/>
        </Tab>
        <Tab eventKey="edituser" title="Edit User"  disabled>
          <Edituser refresher={refresher} setrefresher={setrefresher} setEmployeeData={setEmployeeData} employeeData={employeeData}/>
        </Tab>
      </Tabs>
    </div>
  );
}

export default Usermanager;
