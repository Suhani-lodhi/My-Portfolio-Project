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
    await mongoose.connect("mongodb://127.0.0.1:27017/Portfolio");
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
   await data.save();
   res.redirect("/");
})

app.listen(8080,()=>{
    console.log("app is listening");
})