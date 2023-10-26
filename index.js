const express = require("express");
const app = express();
const mongoose = require("mongoose");

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

const Usermodel = require("./database");

app.get("/", async(req, res) => {
  const users = await Usermodel.find({});
  res.render("index",{
    title:"this is homepage",
    users:users
  })
});

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  const newuser = new Usermodel({ name, email, password }); // Use Usermodel here
  try {
    const usersave = await newuser.save();
    res.redirect("/");
  } catch (err) {
    console.error(err);
    // Handle the error appropriately, e.g., send an error response to the client
    res.status(500).send("Internal Server Error");
  }
});

app.get("/register", (req, res) => {
  res.render("register");
});

app.get("/edit/:id",async(req,res)=>{
    const {id} = req.params;
    const user = await Usermodel.findById({_id:id});
    if(user==null){
        res.redirect("/");
    }else{
        res.render("edit",{
            user:user
        })
    }
})


app.post("/update/:id",async(req,res)=>{
    const {id} = req.params;
    const {name,email,password} = req.body;
    const updateuser= await Usermodel.findByIdAndUpdate({_id:id},{name,email,password},{new:true});
    res.redirect("/");
})

app.get("/delete/:id",async(req,res)=>{
    const {id} = req.params;
    const deleteuser = await Usermodel.findByIdAndDelete({_id:id});
    res.redirect("/");
})

app.listen(3000, () => {
  console.log("Server listening on port no. : 3000");
});
