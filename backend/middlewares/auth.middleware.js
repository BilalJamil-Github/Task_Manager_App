import jwt from 'jsonwebtoken'
import AdminSchema from '../models/admin.model.js';
import EmployeeSchema from '../models/employee.model.js';
export const verifyJWT = async(req, res, next)=>{
  const unprotectedPaths = ["/login"];

try {
    if (unprotectedPaths.includes(req.path)) {
      next();
    } else {
      const token = req.cookies?.accessToken;
      console.log("Token found = " , token)
    if (!token) {
        return res.status(401).json({ success: false, msg: "Unauthorized: No token provided." });
      }
      const decodedToken = jwt.verify(token , process.env.accessTokenSecret);
      console.log("decodedToken " , decodedToken)
      const Admin  = await AdminSchema.findOne({email: decodedToken?.email}); 
      console.log('userssss', Admin);
      console.log("your token = " , token)
      if (!Admin) {
        const Employee  = await EmployeeSchema.findOne({email: decodedToken?.email}); 
        if(!Employee){
          return res.status(401).json({success: false, msg: "Unauthorized: User not found." });
        }
        req.Employee = Employee;
        next();
      } else {
        req.Admin = Admin; 
        next();
      }
      
    }    
} catch (error) {
  console.log("JWT Error:", error);
  return res.status(401).json({ success: false, msg: "Unauthorized: Invalid or expired token." });
}     
}