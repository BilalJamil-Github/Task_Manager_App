import React, { useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Addnewtask from './Addnewtask';
import Viewalltask from './Viewalltask';
import ImportTask from './Importtask';
import Edittask from './Edittask';
import Taskhistroy from './Taskhistroy';
import { server } from '../../constants.js';

function Taskmanager() {
        const [key, setKey] = useState('profile'); 
        const [editId , seteditId] = useState(null);
        const [historyId , sethistoryId] = useState(null);
           const [updateDone , setupdateDone] = useState(false);
      
    
      
        return (
          <div>
            <Tabs
              id="noanim-tab-example"
              activeKey={key}
              onSelect={(k) => setKey(k)} 
              className="mb-3"
            >
            <Tab eventKey="home" title="Add New Task"> 
                 <Addnewtask/>
            </Tab>
              <Tab eventKey="viewAll" title="View All Task" > 
                  <Viewalltask setKey={setKey} seteditId={seteditId} sethistoryId={sethistoryId} updateDone={updateDone} setupdateDone={setupdateDone}/>
              </Tab>
              <Tab eventKey="edit" title="Edit Task" disabled>
                 <Edittask editId={editId} updateDone={updateDone} setupdateDone={setupdateDone}/>
              </Tab>
              <Tab eventKey="import" title="Import Task">
                <ImportTask/>
              </Tab>
              <Tab eventKey="histroy">
                <Taskhistroy historyId={historyId} sethistoryId={sethistoryId}/>
              </Tab>
            </Tabs>
           
              
          </div>
        
      
  )
}

export default Taskmanager;
