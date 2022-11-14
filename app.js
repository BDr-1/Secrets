
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
let alert = require('alert'); 
const app = express();

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended:true}));

app.set("view engine","ejs");

mongoose.connect("mongodb://127.0.0.1:27017/userDB" , {useNewUrlParser:true});

const userSchema = {
         email : String,
         password : String,
};
const User = mongoose.model("User",userSchema);


app.get("/",function(req,res){
    res.render("home");
})
app.get("/register",function(req,res){
    res.render("register");
})
app.get("/login",function(req,res){
    res.render("login");
})

app.post("/register",function(req,res){
 const  user = new User({
             email : req.body.username,
             password: req.body.password,
        });
        user.save(function(err){
            if(err) {console.log(err);}
            else {
                res.render("secrets");
            }
        });
       
});


app.post("/login",function(req,res){
      const username = req.body.username;
      const password = req.body.password;
        User.findOne({email:username},function(err,foundUser){
            if(err){
                console.log(err);
            }
            else{ 
                if(foundUser){
                    if(foundUser.password===password){
                        console.log("yes");
                        res.render("secrets");
                    }else{
                        console.log("Error : Check The password");
                    }
                }else{
                 console.log("Error : the email is not definde");
                 res.redirect("/register");
                }
            }
        });
});









app.listen("3000",function(req,res){
    console.log("Server Started on port 3000");
})