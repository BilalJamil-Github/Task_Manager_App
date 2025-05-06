import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Usermanager from './components/UserManager/Usermanager'; 
import Adduser from './components/UserManager/Adduser';
import Viewuser from './components/UserManager/Viewuser';
import Edituser from './components/UserManager/Edituser';
import Categorymanager from './components/CategoryManager/Categorymanager';
import Addcategory from './components/CategoryManager/Addcategory';
import Viewcategory from './components/CategoryManager/Viewcategory';
import Applayout from './components/Applayout/Applayout';
import Auth from './components/Authentication/Auth';
import Taskmanager from './components/TaskManager/Taskmanager';
function App() {
  const [count, setCount] = useState(0);
  const router = createBrowserRouter([
            {
           path:'/',
           element:<Auth></Auth>
             }, 

              {
          path:'/admin',
          element:<Applayout></Applayout>,
          children: [
            {
              path: "usermanager",
              element: <Usermanager />,
             
            },
            {
              path: "categorymanager",
              element: <Categorymanager />,
            }
            ,
            {
                path: "taskmanager",
                element: <Taskmanager />,
               
            }

          ]
         },
         {
          path:'/employee',
          element:<Applayout></Applayout>,
          children: [
            {
              path: "usermanager",
              element: <Usermanager />,
             
            }
            ,
            {
                path: "taskmanager",
                element: <Taskmanager />,
               
            }

          ]
         }
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
