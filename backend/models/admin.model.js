import mongoose from 'mongoose';
import { applyAuthMethods } from '../utils.backend.js';

const Admin = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, required: true , default: true}
});

applyAuthMethods(Admin);

const AdminSchema = mongoose.model('Admin', Admin);
export default AdminSchema;
