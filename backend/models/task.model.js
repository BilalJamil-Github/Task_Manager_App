import mongoose from 'mongoose';


const TaskSchema = new mongoose.Schema(
  {
    assignedBy: { type: String, required: true },
    assignedOn: { type: String, required: true },
    assignedToPrimary: { type: String, required: true },
    assignedToSecondary: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    dueDate: { type: String, required: true },
    links: { type: String, required: true },
    priority: { type: String, required: true },
    status: { type: String, required: true },
    subject: { type: String, required: true },
    statusHistory: [{
      status: { type: String, required: true },
      assignedBy: { type: String, required: true },
      date: { type: Date, default: Date.now },
    }],
  },
  { timestamps: true }
);

export default mongoose.model('Task', TaskSchema);
