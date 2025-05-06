import mongoose from "mongoose";
import { Schema } from "mongoose";

const Category = new Schema({
    name : {
        type: String,
        required : true
     }
})

const CategorySchema = mongoose.model("Category" , Category)
export default CategorySchema;
