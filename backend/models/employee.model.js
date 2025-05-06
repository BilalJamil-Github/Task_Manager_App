import mongoose from 'mongoose';
import { applyAuthMethods } from '../utils.backend.js';

const Employee = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, required: true },
    team: { type: String, required: true },
  },
  { timestamps: true }
);

applyAuthMethods(Employee);

const EmployeeSchema = mongoose.model('Employee', Employee);
export default EmployeeSchema;
