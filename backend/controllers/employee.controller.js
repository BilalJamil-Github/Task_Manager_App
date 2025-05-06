import AdminSchema from "../models/admin.model.js";
import CategorySchema from "../models/category.model.js";
import EmployeeSchema from "../models/employee.model.js"
import TaskSchema from "../models/task.model.js";
import xlsx from 'xlsx';


export const login = async (req, res) => {
  try {
      const { logEmail, logPassword } = req.body; 
      const AvailableAdmin = await AdminSchema.findOne({ email: logEmail });
      console.log("your available admin = ",AvailableAdmin)
      if(!AvailableAdmin){
        const AvailableEmployee = await EmployeeSchema.findOne({ email: logEmail });
        console.log("your available employee = ", AvailableEmployee)
        if(AvailableEmployee){
          const accessibility = await AvailableEmployee.comparePassword(logPassword);
          if (accessibility) {
             const accessToken = await AvailableEmployee.generateAccessToken();
             console.log("Access Token = " , accessToken)
             return res.status(200).cookie('accessToken', accessToken, {
               httpOnly: true,
               secure: false,
               sameSite: "Lax",
               maxAge: 24 * 60 * 60 * 1000, 
             }).json({
                 msg: "Logged in successfully",
                 token: accessToken,
                 code: true,
                 access: "employee",
                 admin: AvailableEmployee.isAdmin,
                 name: AvailableEmployee.username,
             });
           } else {
             console.log("Incorrect Password");
             return res.status(400).json({ msg: "Incorrect password" });
           }
        }
      }


      if (AvailableAdmin) {
         const accessibility = await AvailableAdmin.comparePassword(logPassword);
         if (accessibility) {
            const accessToken = await AvailableAdmin.generateAccessToken();
            console.log("Access Token = " , accessToken)
            return res.status(200).cookie('accessToken', accessToken, {
              httpOnly: true,
              secure: false,
              sameSite: "Lax",
              maxAge: 24 * 60 * 60 * 1000, 
            }).json({
                msg: "Logged in successfully",
                token: accessToken,
                code: true,
                access: "admin",
                admin: true,
                name: AvailableAdmin.username,
            });
          } else {
            console.log("Incorrect Password");
            return res.status(400).json({ msg: "Incorrect password" });
          }
      }

      return res.status(404).json({ msg: "Admin not found" });

  } catch (error) {
      console.error(error);
      return res.status(500).json({ msg: "Server error" });
  }
};



export const addEmployee = async (req, res) => {
    try {
      const { username, email, password, team, isAdmin } = req.body;
      const employee = await EmployeeSchema.create({
        username,
        email,
        password,
        isAdmin,
        team,
      });
      await employee.save({ validateBeforeSave: false });
      return res.status(200).json({ msg: 'Employee Added Successfully' });
    } catch (error) {
      console.error(error);
      return res.status(400).json({ msg: error.message }); 
    }
  };

export const getEmployee = async (req , res)=>{
    try {
        const TotalEmployee = await EmployeeSchema.find();
        if(TotalEmployee){
            return res.status(200).json(TotalEmployee);
           }
        return res.status(200).json("No Employee Find") 
    } catch (error) {
        console.log(error)
    }
}


export const fetchEmployee = async (req , res)=>{
    try {
      console.log("fetch Empployee")
        const {id} = req.body;
        console.log(id , req.body)
        const TotalEmployee = await EmployeeSchema.find({_id: id});
        if(TotalEmployee){
            return res.status(200).json(TotalEmployee);
           }
        return res.status(200).json("No Employee Find") 
    } catch (error) {
        console.log(error)
    }
}

export const updateEmployee = async (req, res) => {
   
    try {
       const { id } = req.body
       const updatedEmployee = await EmployeeSchema.findOneAndUpdate(
         {_id : id},
         req.body,
         { new : true }
       )
       if(updatedEmployee){
          res.status(200).json({code: 200 ,msg:"Employee Updated"})
       }else{
        res.status(404).json({code: 404, msg:"Employee not Updated"})
       }
    }catch(err){
       console.log(err)
    }

};

export const deleteEmployee = async (req, res)=>{
     try {
         const {id} = req.body;
         const updateEmployee = await EmployeeSchema.deleteOne({_id: id});
         if(updatedEmployee){
          res.status(200).json({code: 200 ,msg:"Employee Deleted"})
       }else{
        res.status(404).json({code: 404, msg:"Employee not Deleted"})
       }
     } catch (error) {
        console.log(error)
     }
}


export const addCategory = async (req, res)=>{
       try{
         const {category} = req.body;
         const Category = await CategorySchema.create({
              name: category,
         })
         await Category.save({ validateBeforeSave: false });
         return res.status(200).json({ msg: 'Category Added Successfully' });
       }catch(err){
         console.log(err)
       }
}

export const fetchCateory = async (req, res)=>{
     try {
      const categories = await CategorySchema.find();
      return res.status(200).json(categories)
     } catch (error) {
       console.log(error)
     }
}


export const deleteCateory = async (req , res) => { 
      try {
         const { id } = req.body;
         const response = await CategorySchema.deleteOne({_id : id});
         if(response){
           res.status(200).json({msg: 'Category Deleted' , code: true})
         }
      } catch (error) {
         console.log(error)        
      }
}


export const fetchdatafortask = async (req , res) => {
     try {
         const categoryRes = await CategorySchema.find();
         const employeeRes = await EmployeeSchema.find();
         if(categoryRes && employeeRes){
             return res.status(200).json([categoryRes , employeeRes]);
         }else{
            return res.json({data: "No data found"})
         }
     } catch (error) {
          console.log(error)
     }
}


export const addTask = async (req , res)=> {
     try {
      const {formData} = req.body;
     const task = await TaskSchema.create(formData);
     if(task){
       return res.status(200).json({msg: "task created"})
     }
     return res.status(404).json({msg:"Task not created"})

     } catch (error) {
      console.log(error)
     }
}


export const fetchAllTask = async (req , res) => {
  try {
    const tasks = await TaskSchema.find();
    return res.status(200).json(tasks)
   } catch (error) {
     console.log(error)
   }
}

export const uploadExcel = async (req , res) => {
   if(!req.file) 
     return res.status(400).json({msg:"File Not Found"});

   try {
       const workbook = xlsx.read(req.file.buffer, {type: 'buffer'});
       const sheetName = workbook.SheetNames[0];
       const sheetData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);
       await TaskSchema.insertMany(sheetData);
       return res.json({ message: "Excel data uploaded successfully!" });
   } catch (error) {
        console.log(error)
   }
}


export const deleteTask = async (req , res ) => {
        try {
          const {id} = req.body;
          const response = await TaskSchema.deleteOne({_id : id});
          if(response){
            res.status(200).json({msg: 'Task Deleted' , code: true})
          }
        } catch (error) {
          console.log(error)
        }
      
}


export const fetchtask = async (req , res)=>{
      try {
          const {editId} = req.body;
          const EditTask = await TaskSchema.find({_id: editId});
          res.status(200).json({content: EditTask})

      } catch (error) {
           console.log(error)
      }
}


export const updatetask = async (req, res)=>{
    try {
        console.log('update task = ' , req.body)
        console.log( "formdata = " , req.body.formData)
        const { _id, subject, category, description, links, status, priority, assignedBy, assignedToPrimary, assignedToSecondary, assignedOn, dueDate } = req.body.formData;
        const existingTask = await TaskSchema.findById(_id);
        if (!existingTask) {
            return res.status(404).json({ msg: "Task not found", code: false });
        }

      console.log("existing task = ", existingTask , "status = " , status)

        const statusChanged = existingTask.status !== status;


        const updated = await TaskSchema.findOneAndUpdate(
            { _id },
            { subject, category, description, links, status, priority, assignedBy, assignedToPrimary, assignedToSecondary, assignedOn, dueDate },
            { new: true }
        );
        if(statusChanged){
            console.log("Inner status Changed")
            const update =  await TaskSchema.findOneAndUpdate(
                {_id},
                {
                    $push: {
                        statusHistory : {
                            status: status,
                            assignedBy: assignedBy,
                            date : new Date(),
                        }
                    }
                }
              )
              if(update){
                console.log("Updated")
              return res.status(200).json({msg : "update" , code: true})
             }else{
               console.log("cant update")
             }
        }

        if(updated){
           console.log("Updated")
         return res.status(200).json({msg : "update" , code: true})
        }else{
          console.log("cant update")
        }
    } catch (error) {
        console.log(error)
    }
}

export const taskhistory = async (req , res) => {
  const { historyId }  = req.body;
  console.log("history id = " , historyId)
  const existingTask = await TaskSchema.findById(historyId);
   if(existingTask){
     return res.status(200).json({data: existingTask.statusHistory})
   }else{
      alert("some error occur")
   }
      
}