import express from 'express';
import { addEmployee ,fetchAllTask ,getEmployee , taskhistory , updatetask , fetchtask , deleteTask , uploadExcel , fetchdatafortask , addTask , fetchEmployee, deleteCateory ,fetchCateory , addCategory ,updateEmployee ,deleteEmployee , login} from '../controllers/employee.controller.js';
import  multer from 'multer'
import { verifyJWT } from '../middlewares/auth.middleware.js';

const employeeRoute = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
employeeRoute.use(verifyJWT)
employeeRoute.post('/addEmployee' , addEmployee);
employeeRoute.post('/getEmployee' , getEmployee);
employeeRoute.post('/fetchEmployee' , fetchEmployee);
employeeRoute.post('/updateEmployee' , updateEmployee)
employeeRoute.post('/deleteEmployee' , deleteEmployee);
employeeRoute.post('/login' , login);
employeeRoute.post('/addCategory' , addCategory);
employeeRoute.get('/fetchCategory' , fetchCateory);
employeeRoute.post('/deleteCategory' , deleteCateory);
employeeRoute.post('/fetchdatafortask' , fetchdatafortask);
employeeRoute.post('/addTask' , addTask);
employeeRoute.post('/fetchAllTask' , fetchAllTask)
employeeRoute.post('/uploadExcel' , upload.single("file") , uploadExcel);
employeeRoute.post('/deleteTask' , deleteTask);
employeeRoute.post('/fetchtask' , fetchtask)
employeeRoute.post('/updatetask' , updatetask)
employeeRoute.post('/taskhistory' , taskhistory)

export default employeeRoute;