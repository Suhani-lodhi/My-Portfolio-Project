require('dotenv').config({ path: './.env' });
const express=require("express");
const app=express();
const path=require("path");
const mongoose=require("mongoose");
const Form=require("./models/form.js");


main().then(()=>{
    console.log("connection successful");
})
.catch((err)=>{
    console.log(err);
})

async function main() {
    console.log("MONGO_URI from .env:", process.env.MONGO_URI);
    console.log("__dirname:", __dirname);
    
    mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

}




app.set("view engine","ejs");
app.set("views",path.join(__dirname,"./frontend/views"));
app.use(express.static(path.join(__dirname,"./frontend/public")));
app.use(express.urlencoded({extended:true}));

app.get("/",(req,res)=>{
    res.render("index");
})

app.post("/submit",async (req,res)=>{
   const data=new Form(req.body.data);
   console.log(data);
   const savedData=await data.save();
   console.log("Saved to DB:", savedData); 
   res.redirect("/");
})

app.listen(8080,()=>{
    console.log("app is listening");
})