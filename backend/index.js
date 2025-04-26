require('dotenv').config();
const express=require("express");
const app=express();
const path=require("path");
const mongoose=require("mongoose");
const Form=require("./models/form.js");
const nodemailer = require("nodemailer");


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
//    const data=new Form(req.body.data);
//    console.log(data);
//    const savedData=await data.save();
//    console.log("Saved to DB:", savedData); 
//    res.redirect("/");

const formData = req.body.data;

    try {
        const data = new Form(formData);
        const savedData = await data.save();

        await sendMail(formData);

        console.log("📦 Saved to DB:", savedData);
        res.redirect("/");
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Something went wrong.");
    }

})







const sendMail = async (formData) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER, // your inbox
        subject: "New Form Submission",
        text: `A new form has been submitted:\n\nName: ${formData.name}\nEmail: ${formData.email}\nMessage: ${formData.message}`,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log("✅ Email sent successfully!");
    } catch (error) {
        console.error("❌ Email sending failed:", error);
    }
};












app.listen(8080,()=>{
    console.log("app is listening");
})