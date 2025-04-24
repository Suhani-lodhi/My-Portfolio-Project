const mongoose=require("mongoose");

const formSchema=new mongoose.Schema(
   {
    name:String,
    email:String,
    message:String
   }

);

const Form = mongoose.model('Form', formSchema);

module.exports = Form;