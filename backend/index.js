import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import employeeRoute from './routes/employee.route.js'
import AdminSchema from './models/admin.model.js';
import bcrypt from 'bcrypt'
dotenv.config();

const MONGOURL = process.env.MONGOURL;

const app = express();
const PORT = process.env.PORT || 8001;

app.use(cors({
  origin: 'http://18.191.134.40:5174',
  credentials: true
}));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(employeeRoute)


const createInitialAdmin = async()=>{
    try {
       const existingAdmin = await AdminSchema.findOne({email : process.env.ADMIN_EMAIL});
       if(!existingAdmin){
         const Admin = new AdminSchema({
          email: process.env.ADMIN_EMAIL,
          password: process.env.ADMIN_PASSWORD,
          usertype: process.env.TYPE,
        })
         await Admin.save();
         console.log("Admin Created");
       }
    } catch (error) {
      console.log("Error" , error)
    }
}

mongoose.connect(MONGOURL)
  .then(() => {
    console.log("Database connected successfully");
    createInitialAdmin();
  })
  .catch((error) => {
    console.error("Database not connected", error);
  });

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});
