// Route

//       const storage = multer.memoryStorage();
//       const upload = multer({ storage: storage });
//       employeeRoute.post('/uploadExcel' , upload.single("file") , uploadExcel);


// Controller

//       const workbook = xlsx.read(req.file.buffer , {type: "buffer"});
//       const sheetName = workbook.SheetNames[0];
//       const sheetData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);
//       await TaskSchema.insertMany(sheetData);


// Frontend

//  in Request =>  headers: { "Content-Type": "multipart/form-data" },
