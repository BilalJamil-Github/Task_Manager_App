import React, { useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { useEffect } from 'react';
import Addcategory from './Addcategory';
import Viewcategory from './Viewcategory';
import { useLocation } from 'react-router-dom';   
import { useNavigate } from 'react-router-dom';   

function Categorymanager({ setActiveTab}) {
        const [key, setKey] = useState('profile'); 
        const [updatecategory , setupdatecategory] = useState(false);


      
        return (
          <div>
            <Tabs
              id="noanim-tab-example"
              activeKey={key}
              onSelect={(k) => setKey(k)} 
              className="mb-3"
            >
              <Tab eventKey="home" title="Add Category">
                <Addcategory updatecategory={updatecategory} setupdatecategory={setupdatecategory}/>
              </Tab>
              <Tab eventKey="profile" title="View Category">
                <Viewcategory updatecategory={updatecategory} setupdatecategory={setupdatecategory}/>
              </Tab>
            </Tabs>
          </div>
        
      
  )
}

export default Categorymanager;
